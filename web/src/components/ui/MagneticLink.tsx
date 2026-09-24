"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = { href: string; children: ReactNode; className?: string };

/** A pill link that leans toward the pointer and fills with ivory on hover. */
export function MagneticLink({ href, children, className = "" }: Props) {
  const root = useRef<HTMLAnchorElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
        const ixTo = gsap.quickTo(inner.current, "x", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
        const iyTo = gsap.quickTo(inner.current, "y", { duration: 0.8, ease: "elastic.out(1, 0.4)" });

        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          xTo(dx * 0.35);
          yTo(dy * 0.35);
          ixTo(dx * 0.15);
          iyTo(dy * 0.15);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
          ixTo(0);
          iyTo(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        return () => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        };
      });
    },
    { scope: root },
  );

  return (
    <Link
      ref={root}
      href={href}
      className={`group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full border border-ivory/30 px-10 ${className}`}
    >
      <span
        aria-hidden
        className="absolute inset-0 translate-y-full rounded-[50%] bg-ivory transition-[translate,border-radius] duration-700 ease-[var(--ease-luxe)] group-hover:translate-y-0 group-hover:rounded-none"
      />
      <span ref={inner} className="label relative text-ivory transition-colors duration-500 group-hover:text-noir">
        {children}
      </span>
    </Link>
  );
}
