"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Monogram } from "@/components/brand/Monogram";
import { useLenis } from "@/components/providers/SmoothScroll";
import { gsap, useGSAP } from "@/lib/gsap";
import { completeIntro } from "@/lib/intro";

const SEEN_KEY = "gaberina:intro-seen";

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

const noopSubscribe = () => () => {};

/** Monogram rings draw in while a counter runs to 100, then the curtain splits. Once per session. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  // Server always renders the preloader; the client drops it if this session has seen it.
  const seen = useSyncExternalStore(noopSubscribe, hasSeenIntro, () => false);
  const [finished, setFinished] = useState(false);
  const active = !seen && !finished;
  const lenis = useLenis();
  const lenisRef = useRef(lenis);

  useEffect(() => {
    lenisRef.current = lenis;
    if (active) lenis?.stop();
  }, [lenis, active]);

  useEffect(() => {
    if (seen) completeIntro();
  }, [seen]);

  useGSAP(
    () => {
      if (!active || !root.current || hasSeenIntro()) return;
      document.documentElement.style.overflow = "hidden";

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const finish = () => {
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {}
        document.documentElement.style.overflow = "";
        lenisRef.current?.start();
        setFinished(true);
      };

      if (reduce) {
        gsap.to(root.current, { autoAlpha: 0, duration: 0.6, delay: 0.4, onStart: completeIntro, onComplete: finish });
        return;
      }

      const count = { value: 0 };
      const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });
      tl.set("[data-ring]", { strokeDasharray: 1, strokeDashoffset: 1 })
        .set("[data-glyph]", { autoAlpha: 0, scale: 0.9, transformOrigin: "50% 50%" })
        .to("[data-ring]", { strokeDashoffset: 0, duration: 2.2, stagger: 0.25 }, 0)
        .to(
          count,
          {
            value: 100,
            duration: 2.4,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counter.current) counter.current.textContent = String(Math.round(count.value)).padStart(3, "0");
            },
          },
          0,
        )
        .to("[data-glyph]", { autoAlpha: 1, scale: 1, duration: 1.4, ease: "expo.out" }, 1.1)
        .to("[data-preloader-meta]", { autoAlpha: 0, y: -10, duration: 0.6, ease: "power2.in" }, 2.5)
        .to("[data-preloader-mark]", { scale: 0.85, autoAlpha: 0, duration: 0.9, ease: "power3.in" }, 2.6)
        .add(completeIntro, 3.1)
        .to("[data-curtain='top']", { yPercent: -100, duration: 1.3 }, 3.1)
        .to("[data-curtain='bottom']", { yPercent: 100, duration: 1.3 }, 3.1)
        .add(finish);
    },
    { scope: root, dependencies: [active] },
  );

  if (!active) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[80]" role="status" aria-label="Loading Gaberina">
      <div data-curtain="top" className="absolute inset-x-0 top-0 h-1/2 bg-noir" />
      <div data-curtain="bottom" className="absolute inset-x-0 bottom-0 h-1/2 bg-noir" />

      <div className="absolute inset-0 grid place-items-center">
        <Monogram data-preloader-mark className="size-28 text-ivory md:size-36" />
      </div>

      <div
        data-preloader-meta
        className="gutter absolute inset-x-0 bottom-0 flex items-end justify-between pb-8 text-taupe"
      >
        <span className="label">Gaberina — Maison de Parfum</span>
        <span className="label tabular-nums text-champagne">
          <span ref={counter}>000</span>
        </span>
      </div>
    </div>
  );
}
