"use client";

import Image from "next/image";
import { useRef } from "react";
import { Monogram } from "@/components/brand/Monogram";
import { Manifesto } from "@/components/home/Manifesto";
import { Bergamot, Oud, Rose } from "@/components/home/NoteIllustrations";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { media } from "@/content/media";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";

// Placeholder brand copy — evocative, no factual claims. Replace with Gaberina's own story.
const STORY = [
  "Gaberina began with a simple belief: that the most memorable things are",
  media.smoke,
  "the ones you cannot see. A fragrance is a presence without a form —",
  media.darkBloom,
  "it enters a room before you, and lingers after you have gone.",
];

const PRINCIPLES = [
  {
    title: "Composed slowly",
    body: "Each composition is revisited until nothing more can be taken away. Patience is an ingredient too.",
    Drawing: Bergamot,
  },
  {
    title: "Worn close",
    body: "Our perfume oils sit near the skin and speak softly — a signature meant for those who come near.",
    Drawing: Rose,
  },
  {
    title: "Made to linger",
    body: "Resins, woods and musks give every scent a long, quiet memory that stays with you through the day.",
    Drawing: Oud,
  },
];

export function AboutView() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create("[data-about-title]", {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => gsap.from(self.lines, { yPercent: 110, duration: 1.8, stagger: 0.12, delay: 0.2 }),
        });
        gsap.from("[data-about-hero-img]", { scale: 1.25, duration: 3, ease: "expo.out" });
        gsap.to("[data-about-hero-img]", {
          yPercent: 15,
          ease: "none",
          scrollTrigger: { trigger: "[data-about-hero]", start: "top top", end: "bottom top", scrub: true },
        });
        gsap.from("[data-about-fade]", { autoAlpha: 0, y: 24, duration: 1.4, stagger: 0.1, delay: 0.8 });

        // Principles: each drawing traces itself in as its column arrives.
        gsap.utils.toArray<HTMLElement>("[data-principle]").forEach((col) => {
          const strokes = col.querySelectorAll("path, circle");
          gsap.set(strokes, { strokeDasharray: 1, strokeDashoffset: 1 });
          gsap
            .timeline({ scrollTrigger: { trigger: col, start: "top 75%" } })
            .to(strokes, { strokeDashoffset: 0, duration: 2, stagger: 0.05, ease: "power2.inOut" })
            .from(col.querySelectorAll("[data-principle-text]"), { autoAlpha: 0, y: 30, duration: 1.2, stagger: 0.1 }, 0.3);
        });

        // Editorial frames unveil and drift at their own pace.
        gsap.utils.toArray<HTMLElement>("[data-about-frame]").forEach((frame) => {
          const speed = Number(frame.dataset.speed ?? 1);
          gsap.fromTo(
            frame,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "expo.inOut", scrollTrigger: { trigger: frame, start: "top 85%" } },
          );
          gsap.fromTo(
            frame.querySelector("img"),
            { yPercent: -10 * speed, scale: 1.2 },
            { yPercent: 10 * speed, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });
        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section data-about-hero className="relative flex h-[100svh] min-h-[640px] items-end overflow-hidden">
        <div data-about-hero-img className="absolute inset-0">
          <Image src={media.silk.src} alt={media.silk.alt} fill priority sizes="100vw" className="object-cover brightness-[0.55]" />
        </div>
        <div aria-hidden className="light-leak top-[10%] right-[-10%] size-[40vw] bg-[#c6a15b]/20" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-noir/30" />
        <div className="gutter relative w-full pb-[8vh]">
          <p data-about-fade className="label text-taupe">
            <span className="text-champagne">—</span> Our story
          </p>
          <h1 data-about-title className="font-display mt-6 text-[clamp(4rem,14vw,14rem)] leading-[0.85] font-light tracking-[-0.02em]">
            The <em>Maison</em>
          </h1>
          <div className="mt-10 grid gap-8 md:grid-cols-12">
            <p data-about-fade className="max-w-md text-sm leading-relaxed text-ivory/75 md:col-span-5 md:col-start-8">
              A house of perfume oils and parfums, composed for the moments that are felt rather than seen.
            </p>
          </div>
        </div>
      </section>

      <Manifesto pieces={STORY} eyebrow="Beginnings" />

      <section className="gutter py-[16vh]">
        <p className="label text-taupe">
          <span className="text-champagne">—</span> What we hold to
        </p>
        <ol className="mt-16 grid gap-16 md:grid-cols-3 md:gap-[4vw]">
          {PRINCIPLES.map(({ title, body, Drawing }, i) => (
            <li key={title} data-principle className="border-t border-ivory/10 pt-10">
              <Drawing aria-hidden className="size-40 text-ivory/60" />
              <p data-principle-text className="label mt-10 text-champagne tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 data-principle-text className="font-display mt-4 text-4xl leading-none font-light md:text-5xl">
                {title}
              </h2>
              <p data-principle-text className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/70">
                {body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="gutter grid grid-cols-2 gap-4 pb-[16vh] md:grid-cols-12 md:gap-6">
        <div data-about-frame data-speed="0.8" className="relative col-span-2 aspect-[4/5] overflow-hidden md:col-span-5">
          <Image src={media.pour.src} alt={media.pour.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover brightness-[0.85]" />
        </div>
        <div data-about-frame data-speed="1.6" className="relative aspect-[3/4] overflow-hidden md:col-span-3 md:mt-[20vh]">
          <Image src={media.vials.src} alt={media.vials.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover brightness-[0.85]" />
        </div>
        <div data-about-frame data-speed="1.1" className="relative aspect-[3/4] overflow-hidden md:col-span-4 md:mt-[8vh]">
          <Image src={media.pipette.src} alt={media.pipette.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover brightness-[0.85]" />
        </div>
      </section>

      <section className="gutter flex flex-col items-center pb-[18vh] text-center">
        <Monogram className="size-16 text-ivory/60" />
        <h2 className="font-display mt-10 max-w-3xl text-[clamp(2.5rem,5.4vw,5.5rem)] leading-[1] font-light">
          Find the scent that <em>becomes yours</em>
        </h2>
        <div className="mt-12">
          <MagneticLink href="/collection">Explore the Collection</MagneticLink>
        </div>
      </section>
    </div>
  );
}
