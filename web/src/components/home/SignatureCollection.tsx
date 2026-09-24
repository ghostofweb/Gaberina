"use client";

import Link from "next/link";
import { useRef } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import type { Product } from "@/lib/types";

export function SignatureCollection({ products }: { products: Product[] }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Desktop: pin the section and translate the track with vertical scroll.
      mm.add(`${MOTION_OK} and (min-width: 768px)`, () => {
        // The track is a native horizontal scroller by default (mobile, reduced motion);
        // here it hands over to the pinned scroll-driven version.
        gsap.set(track.current, { overflow: "visible", scrollSnapType: "none" });
        const distance = () => (track.current ? track.current.scrollWidth - window.innerWidth : 0);
        const tween = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        // Cards tilt in as they travel across the viewport.
        gsap.utils.toArray<HTMLElement>("[data-card-frame]").forEach((frame) => {
          gsap.fromTo(
            frame,
            { clipPath: "inset(12% 0% 12% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: {
                trigger: frame,
                containerAnimation: tween,
                start: "left 100%",
                end: "left 55%",
                scrub: true,
              },
            },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="signature-title" className="relative overflow-hidden bg-noir">
      <div
        ref={track}
        className="gutter flex h-auto snap-x snap-mandatory items-center gap-[4vw] overflow-x-auto py-24 [scrollbar-width:none] md:h-[100svh] md:py-0"
      >
        <div className="flex w-[80vw] shrink-0 snap-start flex-col justify-between self-stretch md:w-[34vw] md:py-[14vh]">
          <p className="label text-taupe">
            <span className="text-champagne">—</span> The Signature Collection
          </p>
          <div className="my-12 md:my-0">
            <h2 id="signature-title" className="font-display text-[clamp(3rem,6vw,6.5rem)] leading-[0.95] font-light">
              Compositions <em>of the</em> Maison
            </h2>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-ivory/70">
              {products.length > 0
                ? `${products.length} compositions — find the one that becomes yours.`
                : "Our compositions are being prepared. Please return shortly."}
            </p>
          </div>
          <p className="label hidden text-taupe md:block">Scroll to travel →</p>
        </div>

        {products.map((p) => (
          <div key={p._id} className="snap-start">
            <ProductCard
              product={p}
              sizes="(min-width: 1024px) 26vw, (min-width: 640px) 46vw, 78vw"
              className="w-[78vw] shrink-0 sm:w-[46vw] lg:w-[26vw]"
            />
          </div>
        ))}

        <Link
          href="/collection"
          data-cursor="Enter"
          className="group flex aspect-[4/5] w-[70vw] shrink-0 snap-start flex-col items-center justify-center gap-6 border border-ivory/15 transition-colors duration-700 hover:border-champagne/60 sm:w-[40vw] lg:w-[22vw]"
        >
          <span className="font-display text-4xl font-light italic transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:-translate-y-1">
            The full collection
          </span>
          <span className="label text-taupe transition-colors group-hover:text-champagne">Explore all →</span>
        </Link>
        <div aria-hidden className="w-[2vw] shrink-0" />
      </div>
    </section>
  );
}
