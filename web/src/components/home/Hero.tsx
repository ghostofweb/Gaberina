"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { media } from "@/content/media";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";
import { onIntroComplete } from "@/lib/intro";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.set("[data-hero-image]", { scale: 1.25, autoAlpha: 0 });
        gsap.set("[data-hero-fade]", { autoAlpha: 0, y: 20 });

        let split: SplitText | undefined;
        // contextSafe: see Header — keeps these tweens out of the preloader's context.
        const off = onIntroComplete(contextSafe!(() => {
          // Bail out if the hero is no longer on the page (e.g. React's dev double-mount).
          if (!root.current) return;
          gsap.to("[data-hero-image]", { scale: 1, autoAlpha: 1, duration: 2.8, ease: "expo.out" });
          split = SplitText.create("[data-hero-title]", {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, { yPercent: 110, duration: 1.6, stagger: 0.12, ease: "expo.out", delay: 0.5 }),
          });
          gsap.to("[data-hero-fade]", { autoAlpha: 1, y: 0, duration: 1.4, stagger: 0.1, delay: 1.1 });
        }));

        // Leaving the hero: image drifts slower than the page, copy dissolves.
        gsap.to("[data-hero-parallax]", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-copy]", {
          autoAlpha: 0,
          y: -60,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "45% top", scrub: true },
        });

        return () => {
          off();
          split?.revert();
        };
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-noir">
      <div data-hero-parallax className="absolute inset-0">
        <div data-hero-image className="absolute inset-0">
          <div data-kenburns className="absolute inset-0 animate-[kenburns_24s_ease-in-out_infinite_alternate]">
            <Image
              src={media.pipetteWide.src}
              alt={media.pipetteWide.alt}
              fill
              priority
              sizes="100vw"
              quality={80}
              className="object-cover object-[58%_50%] brightness-[0.62] contrast-[1.08] saturate-[0.9]"
            />
          </div>
        </div>
      </div>

      {/* Grade: vignette, a warm leak, and a floor of noir for the wordmark to sit on. */}
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_35%,transparent_30%,rgba(12,11,10,0.85)_100%)]" />
      <div aria-hidden className="light-leak right-[-8%] top-[8%] size-[38vw] bg-[#c6a15b]/25" />
      <div aria-hidden className="light-leak left-[-12%] bottom-[10%] size-[30vw] bg-[#8a3b12]/25 [animation-delay:-7s]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-noir via-noir/70 to-transparent" />

      <div className="gutter relative flex h-full flex-col justify-end pb-[3vh]">
        <div data-hero-copy className="mb-[5vh] grid items-end gap-8 md:grid-cols-12">
          <h1
            data-hero-title
            className="font-display text-[clamp(2.75rem,6.4vw,6.5rem)] leading-[0.98] font-light tracking-[-0.01em] md:col-span-7"
          >
            The Art of the <em className="text-champagne/95">Invisible</em>
          </h1>
          <div className="flex flex-col gap-6 md:col-span-4 md:col-start-9">
            <p data-hero-fade className="max-w-sm text-sm leading-relaxed text-ivory/75">
              Fragrances composed as quiet signatures — felt before they are noticed, remembered long after.
            </p>
            <Link
              data-hero-fade
              href="/collection"
              data-cursor="Discover"
              className="label link-underline w-fit pb-1 text-ivory"
            >
              Discover the collection
            </Link>
          </div>
        </div>

        {/* The header's wordmark measures this box and starts here. */}
        <div data-wordmark-slot aria-hidden className="aspect-[619.2/105.7] w-full" />

        <div data-hero-fade className="mt-[2.5vh] flex items-center justify-between text-taupe">
          <span className="label">Maison de Parfum</span>
          <span className="label flex items-center gap-3">
            Scroll
            <span className="relative block h-8 w-px overflow-hidden bg-ivory/15">
              <span data-scroll-cue className="absolute inset-0 animate-[scroll-cue_2.4s_var(--ease-silk)_infinite] bg-ivory" />
            </span>
          </span>
          <span className="label hidden sm:inline">India</span>
        </div>
      </div>
    </section>
  );
}
