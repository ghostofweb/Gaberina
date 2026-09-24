"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/components/providers/SmoothScroll";
import { CursorPreview } from "@/components/ui/CursorPreview";
import { primaryNav, socials } from "@/content/site";
import { useAuth } from "@/lib/auth/AuthProvider";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = { open: boolean; onClose: () => void };

export function MenuOverlay({ open, onClose }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [previewOn, setPreviewOn] = useState(false);
  const lenis = useLenis();
  const { signedIn } = useAuth();

  // Open / close choreography.
  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (open) {
        gsap.set(root.current, { visibility: "visible" });
        const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });
        tl.fromTo(
          root.current,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: reduce ? 0.01 : 1.1 },
        )
          .fromTo(
            "[data-menu-link]",
            { yPercent: 110 },
            { yPercent: 0, duration: reduce ? 0.01 : 1.2, stagger: 0.06, ease: "expo.out" },
            reduce ? 0 : 0.45,
          )
          .fromTo("[data-menu-fade]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, stagger: 0.05 }, reduce ? 0 : 0.8);
      } else if (root.current?.style.visibility === "visible") {
        gsap
          .timeline({ defaults: { ease: "expo.inOut" } })
          .to("[data-menu-fade]", { autoAlpha: 0, duration: 0.3 })
          .to("[data-menu-link]", { yPercent: -110, duration: 0.6, stagger: 0.03, ease: "power3.in" }, 0)
          .to(root.current, { clipPath: "inset(0% 0% 0% 100%)", duration: reduce ? 0.01 : 0.9 }, 0.25)
          .set(root.current, { visibility: "hidden" });
      }
    },
    { scope: root, dependencies: [open] },
  );

  // Lock scroll, close on Escape, keep focus inside while open.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const first = root.current?.querySelector<HTMLElement>("a, button");
    first?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !root.current) return;
      const items = [...root.current.querySelectorAll<HTMLElement>("a, button")];
      const header = document.querySelector<HTMLElement>("[aria-controls='site-menu']");
      const cycle = header ? [header, ...items] : items;
      const i = cycle.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey ? (i <= 0 ? cycle.length - 1 : i - 1) : (i + 1) % cycle.length;
      e.preventDefault();
      cycle[next]?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [open, onClose, lenis]);

  return (
    <div
      ref={root}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!open}
      className="invisible fixed inset-0 z-40 overflow-hidden bg-smoke"
      style={{ clipPath: "inset(0% 0% 100% 0%)" }}
    >
      {/* Soft light behind the links */}
      <div className="light-leak left-[-10%] top-[20%] size-[50vw] bg-champagne/10" aria-hidden />

      <CursorPreview
        images={primaryNav.map((item) => ({ key: item.href, src: item.image.src }))}
        active={active}
        visible={open && previewOn}
        layer="z-0"
      />

      <div className="gutter relative z-10 flex h-full flex-col pt-[calc(var(--header-h)+4vh)] pb-8">
        <nav aria-label="Primary" className="flex-1">
          <ul onPointerLeave={() => setPreviewOn(false)}>
            {primaryNav.map((item, i) => (
              <li key={item.href} className="overflow-hidden border-b border-ivory/10">
                <Link
                  data-menu-link
                  href={item.href}
                  onClick={onClose}
                  onPointerEnter={() => {
                    setActive(i);
                    setPreviewOn(true);
                  }}
                  onFocus={() => setActive(i)}
                  className="group flex items-baseline gap-6 py-[1.2vh] md:gap-10"
                >
                  <span className="label w-8 text-taupe tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-[clamp(2.4rem,7.2vh,6rem)] leading-[1.05] font-light transition-[translate,color] duration-700 ease-[var(--ease-luxe)] group-hover:translate-x-4 group-hover:text-champagne group-hover:italic">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6 text-taupe">
          <div data-menu-fade className="flex gap-8">
            {socials.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="label link-underline pb-0.5 hover:text-ivory">
                {s.label}
              </a>
            ))}
            <Link href={signedIn ? "/orders" : "/login"} onClick={onClose} className="label link-underline pb-0.5 hover:text-ivory">
              {signedIn ? "Your Orders" : "Account"}
            </Link>
          </div>
          <p data-menu-fade className="label">
            India · ₹ INR
          </p>
        </div>
      </div>
    </div>
  );
}
