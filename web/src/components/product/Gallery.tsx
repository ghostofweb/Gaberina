"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type Props = { images: string[]; name: string };

/** Desktop: tall stacked frames with gentle parallax. Mobile: a swipeable strip with a progress line. */
export function Gallery({ images, name }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MOTION_OK} and (min-width: 768px)`, () => {
        gsap.utils.toArray<HTMLElement>("[data-gallery-frame]").forEach((frame, i) => {
          gsap.fromTo(
            frame,
            { clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(12% 6% 12% 6%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: { trigger: frame, start: "top bottom", end: "top 40%", scrub: true },
            },
          );
          gsap.fromTo(
            frame.querySelector("img"),
            { yPercent: -6, scale: 1.12 },
            { yPercent: 6, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });
        // The first image arrives with the page.
        gsap.from("[data-gallery-frame]:first-child img", { scale: 1.3, duration: 2.2, ease: "expo.out" });
      });
    },
    { scope: root },
  );

  const onStripScroll = () => {
    const el = strip.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  return (
    <div ref={root}>
      {/* Desktop */}
      <div className="hidden flex-col gap-4 md:flex">
        {images.map((src, i) => (
          <div
            key={src}
            data-gallery-frame
            data-product-hero-image={i === 0 ? "" : undefined}
            className="relative aspect-[4/5] overflow-hidden bg-smoke"
          >
            <Image
              src={src}
              alt={i === 0 ? name : `${name}, view ${i + 1}`}
              fill
              priority={i === 0}
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div
          ref={strip}
          onScroll={onStripScroll}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]"
        >
          {images.map((src, i) => (
            <div
              key={src}
              data-product-hero-image-mobile={i === 0 ? "" : undefined}
              className="relative aspect-[4/5] w-full shrink-0 snap-center bg-smoke"
            >
              <Image src={src} alt={i === 0 ? name : `${name}, view ${i + 1}`} fill priority={i === 0} sizes="100vw" className="object-cover" />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <div className="gutter mt-4 flex items-center gap-4">
            <span className="label text-taupe tabular-nums">
              {String(Math.round(progress * (images.length - 1)) + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
            <div className="hairline relative flex-1 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-ivory transition-[width] duration-300"
                style={{ width: `${((progress * (images.length - 1) + 1) / images.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
