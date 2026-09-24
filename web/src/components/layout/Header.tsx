"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { onIntroComplete } from "@/lib/intro";
import { useBag } from "@/lib/bag/BagProvider";
import { AccountMenu } from "./AccountMenu";
import { MenuOverlay } from "./MenuOverlay";

/**
 * Fixed header. On the home page the wordmark starts at the size and position of the
 * hero's [data-wordmark-slot] and travels up with the page while shrinking, docking into
 * the header exactly as the slot reaches it.
 */
export function Header() {
  const root = useRef<HTMLElement>(null);
  const dock = useRef<HTMLAnchorElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { count: bagCount, setOpen: setBagOpen } = useBag();
  const seenCount = useRef<number | null>(null);

  // Letters rise into place once the preloader lifts. contextSafe keeps these tweens in this
  // component's context; otherwise they'd join the preloader's context (GSAP runs callbacks in the
  // context of the animation that fired them) and be reverted when the preloader cleans up.
  useGSAP(
    (_, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.set("[data-letter]", { y: 120 });
        gsap.set("[data-header-ui]", { autoAlpha: 0, y: -12 });
        const off = onIntroComplete(
          contextSafe!(() => {
            if (!root.current) return;
            gsap.to("[data-letter]", { y: 0, duration: 1.8, stagger: 0.07, ease: "expo.out", delay: 0.25 });
            gsap.to("[data-header-ui]", { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.08, delay: 0.9 });
          }),
        );
        return off;
      });
    },
    { scope: root },
  );

  // The morph from hero slot to header dock.
  useGSAP(
    () => {
      const slot = document.querySelector<HTMLElement>("[data-wordmark-slot]");
      const dockEl = dock.current;
      if (!isHome || !slot || !dockEl) {
        gsap.set(mark.current, { clearProps: "transform" });
        const st = ScrollTrigger.create({
          start: 40,
          end: "max",
          onToggle: (self) => setSolid(self.isActive),
        });
        return () => st.kill();
      }

      const slotTop = () => slot.getBoundingClientRect().top + window.scrollY;
      const travel = () => Math.max(1, slotTop() - dockEl.getBoundingClientRect().top);
      const scale = () => slot.getBoundingClientRect().width / dockEl.getBoundingClientRect().width;

      gsap.set(mark.current, { transformOrigin: "50% 0%" });
      const tween = gsap.fromTo(
        mark.current,
        { y: travel, scale },
        {
          y: 0,
          scale: 1,
          ease: "none",
          immediateRender: true,
          scrollTrigger: {
            start: 0,
            end: travel,
            scrub: true,
            invalidateOnRefresh: true,
            onLeave: () => setSolid(true),
            onEnterBack: () => setSolid(false),
          },
        },
      );

      // Fonts and images can shift the slot after first paint.
      const off = onIntroComplete(() => ScrollTrigger.refresh());
      return () => {
        off();
        tween.scrollTrigger?.kill();
        tween.kill();
        setSolid(false);
      };
    },
    { dependencies: [isHome], revertOnUpdate: true },
  );

  // A small bump whenever the bag count changes (not on first load).
  useGSAP(
    () => {
      if (seenCount.current !== null && seenCount.current !== bagCount) {
        gsap.fromTo(
          "[data-bag-count]",
          { scale: 1.6, color: "#ede6da" },
          { scale: 1, color: "#c6a15b", duration: 0.9, ease: "elastic.out(1, 0.45)" },
        );
      }
      seenCount.current = bagCount;
    },
    { scope: root, dependencies: [bagCount] },
  );

  return (
    <>
      <header ref={root} className="fixed inset-x-0 top-0 z-50 h-[var(--header-h)] text-ivory">
        <div
          aria-hidden
          className={`absolute inset-0 border-b border-champagne/15 bg-noir/70 backdrop-blur-xl transition-opacity duration-700 ${
            solid && !menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="gutter relative grid h-full grid-cols-[1fr_auto_1fr] items-center">
          <div className="flex items-center gap-10">
            <button
              data-header-ui
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              className="group flex items-center gap-3"
            >
              <span className="relative block h-2.5 w-7" aria-hidden>
                <span
                  className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-700 ease-[var(--ease-luxe)] ${
                    menuOpen ? "translate-y-[5px] rotate-[20deg]" : "group-hover:scale-x-75 origin-left"
                  }`}
                />
                <span
                  className={`absolute left-0 bottom-0 h-px w-full bg-current transition-transform duration-700 ease-[var(--ease-luxe)] ${
                    menuOpen ? "-translate-y-[4px] -rotate-[20deg]" : ""
                  }`}
                />
              </span>
              <span className="label hidden sm:inline">{menuOpen ? "Close" : "Menu"}</span>
            </button>
            <Link data-header-ui href="/collection" className="label link-underline hidden pb-0.5 lg:inline">
              Fragrances
            </Link>
          </div>

          <Link
            ref={dock}
            href="/"
            aria-label="Gaberina — home"
            className={`block w-[124px] transition-opacity duration-500 md:w-[164px] ${
              menuOpen && isHome && !solid ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            <div ref={mark}>
              <Wordmark className="block w-full" />
            </div>
          </Link>

          <nav aria-label="Account" className="flex items-center justify-end gap-6 md:gap-9">
            <Link data-header-ui href="/collection?search=1" aria-label="Search" className="hidden sm:block">
              <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.1">
                <circle cx="10.5" cy="10.5" r="6.5" />
                <path d="m15.5 15.5 5 5" />
              </svg>
            </Link>
            <div data-header-ui className="hidden md:block">
              <AccountMenu />
            </div>
            <button
              data-header-ui
              data-bag-target
              type="button"
              onClick={() => setBagOpen(true)}
              className="label link-underline pb-0.5"
              aria-label={`Bag, ${bagCount} ${bagCount === 1 ? "item" : "items"}`}
            >
              Bag{" "}
              <span data-bag-count className="inline-block tabular-nums text-champagne">
                ({bagCount})
              </span>
            </button>
          </nav>
        </div>
      </header>
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
