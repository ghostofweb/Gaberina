"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Dot + trailing ring. Elements with data-cursor="View" (etc.) grow the ring into a
 * labelled disc; any link or button makes it swell slightly. Fine pointers only.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(hover: hover) and (pointer: fine)", () => {
      document.documentElement.classList.add("has-cursor");
      gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

      const dotX = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
      const dotY = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
      const ringX = gsap.quickTo(ring.current, "x", { duration: 0.55, ease: "power3" });
      const ringY = gsap.quickTo(ring.current, "y", { duration: 0.55, ease: "power3" });

      let visible = false;
      let current: string | null = null;

      const onMove = (e: PointerEvent) => {
        if (!visible) {
          visible = true;
          gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.4 });
        }
        dotX(e.clientX);
        dotY(e.clientY);
        ringX(e.clientX);
        ringY(e.clientY);

        const target = e.target instanceof Element ? e.target : null;
        const labelled = target?.closest<HTMLElement>("[data-cursor]");
        const interactive = target?.closest("a, button, input, [role='button']");
        const next = labelled?.dataset.cursor ?? (interactive ? "" : null);
        if (next === current) return;
        current = next;
        setLabel(next || null);
        gsap.to(ring.current, {
          scale: next ? 2.6 : next === "" ? 1.6 : 1,
          backgroundColor: next ? "rgba(237,230,218,1)" : "rgba(237,230,218,0)",
          borderColor: next ? "rgba(237,230,218,0)" : "rgba(237,230,218,0.5)",
          duration: 0.5,
          ease: "expo.out",
        });
        gsap.to(dot.current, { scale: next !== null ? 0 : 1, duration: 0.3 });
      };

      const onLeave = () => {
        visible = false;
        gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.3 });
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      return () => {
        document.documentElement.classList.remove("has-cursor");
        window.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("pointerleave", onLeave);
      };
    });
  });

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] hidden [@media(hover:hover)_and_(pointer:fine)]:block">
      <div
        ref={ring}
        className="fixed top-0 left-0 grid size-10 place-items-center rounded-full border border-ivory/50 opacity-0"
      >
        <span
          className="label scale-[0.4] text-[0.625rem] whitespace-nowrap text-noir transition-opacity duration-300"
          style={{ opacity: label ? 1 : 0 }}
        >
          {label}
        </span>
      </div>
      <div ref={dot} className="fixed top-0 left-0 size-1.5 rounded-full bg-ivory opacity-0" />
    </div>
  );
}
