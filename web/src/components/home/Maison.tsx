"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { media } from "@/content/media";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";

export function Maison() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Each frame unveils upward, and its photograph drifts at its own speed.
        gsap.utils.toArray<HTMLElement>("[data-frame]").forEach((frame) => {
          const speed = Number(frame.dataset.speed ?? 1);
          gsap.fromTo(
            frame,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.8,
              ease: "expo.inOut",
              scrollTrigger: { trigger: frame, start: "top 85%" },
            },
          );
          gsap.fromTo(
            frame.querySelector("img"),
            { yPercent: -10 * speed, scale: 1.2 },
            {
              yPercent: 10 * speed,
              ease: "none",
              scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        const split = SplitText.create("[data-maison-title]", {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.5,
              stagger: 0.1,
              scrollTrigger: { trigger: "[data-maison-title]", start: "top 80%" },
            }),
        });
        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="maison-title" className="gutter relative bg-noir py-[20vh]">
      <div className="grid gap-y-16 md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-6">
          <div data-frame data-speed="1" className="relative aspect-[4/5] overflow-hidden">
            <Image src={media.pour.src} alt={media.pour.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover brightness-[0.85]" />
          </div>
        </div>

        <div className="flex flex-col justify-between md:col-span-5 md:col-start-8">
          <div>
            <p className="label text-taupe">
              <span className="text-champagne">—</span> The Maison
            </p>
            <h2
              id="maison-title"
              data-maison-title
              className="font-display mt-8 text-[clamp(2.5rem,4.6vw,5rem)] leading-[1] font-light"
            >
              Made slowly, <em>in small measures</em>
            </h2>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-ivory/75">
              Every Gaberina composition begins as a single drop on a blotter, and is weighed, rested and revisited
              until nothing more can be taken away. What reaches you is quiet by design — close to the skin, and
              entirely your own.
            </p>
            <Link href="/about" className="label link-underline mt-10 inline-block pb-1">
              Our story
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 md:mt-0">
            <div data-frame data-speed="1.8" className="relative aspect-[3/4] overflow-hidden md:translate-y-[18vh]">
              <Image src={media.pipette.src} alt={media.pipette.alt} fill sizes="(min-width: 768px) 20vw, 50vw" className="object-cover brightness-[0.85]" />
            </div>
            <div data-frame data-speed="0.6" className="relative aspect-[3/4] overflow-hidden">
              <Image src={media.vials.src} alt={media.vials.alt} fill sizes="(min-width: 768px) 20vw, 50vw" className="object-cover brightness-[0.85]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
