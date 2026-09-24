"use client";

import Image from "next/image";
import { useRef } from "react";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { media } from "@/content/media";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/** Closing moment: a flacon framed in an arch over dark silk. */
export function SignatureCta() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-cta-bg]",
          { yPercent: -12 },
          { yPercent: 12, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
        gsap.fromTo(
          "[data-cta-arch]",
          { clipPath: "inset(40% 30% 0% 30% round 999px 999px 0 0)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 999px 999px 0 0)",
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 80%", end: "center center", scrub: true },
          },
        );
        gsap.from("[data-cta-copy]", {
          y: 50,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1.4,
          scrollTrigger: { trigger: root.current, start: "top 40%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-noir py-[16vh]">
      <div data-cta-bg className="absolute inset-[-12%_0]" aria-hidden>
        <Image src={media.silk.src} alt="" fill sizes="100vw" className="object-cover opacity-50" />
      </div>
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,transparent,rgba(12,11,10,0.95))]" />

      <div className="gutter relative flex flex-col items-center text-center">
        <div
          data-cta-arch
          className="relative aspect-[3/4] w-[min(72vw,26rem)] overflow-hidden rounded-t-full"
          style={{ clipPath: "inset(0% 0% 0% 0% round 999px 999px 0 0)" }}
        >
          <Image src={media.goldenFlaconSilk.src} alt={media.goldenFlaconSilk.alt} fill sizes="26rem" className="object-cover brightness-[0.9]" />
        </div>

        <p data-cta-copy className="label mt-14 text-taupe">
          <span className="text-champagne">—</span> Find your signature
        </p>
        <h2 data-cta-copy className="font-display mt-6 max-w-3xl text-[clamp(2.5rem,5.4vw,5.5rem)] leading-[1] font-light">
          A scent that arrives <em>before you do</em>
        </h2>
        <div data-cta-copy className="mt-12">
          <MagneticLink href="/collection">Explore the Collection</MagneticLink>
        </div>
      </div>
    </section>
  );
}
