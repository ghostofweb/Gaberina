"use client";

import Image from "next/image";
import { Fragment, useRef } from "react";
import { media, type Media } from "@/content/media";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";

export type ManifestoPiece = string | Media;

// Words, with small inline photographs that open up as the sentence is read.
const MANIFESTO: ManifestoPiece[] = [
  "We compose scent the way memory is made —",
  media.smoke,
  "slowly, in layers, from things that barely leave a trace. A drop of",
  media.flaconShadow,
  "resin, the hush of",
  media.darkBloom,
  "petals after dusk, and the warmth of skin.",
];

export function Manifesto({ pieces = MANIFESTO, eyebrow = "Manifesto" }: { pieces?: ManifestoPiece[]; eyebrow?: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create("[data-manifesto-text]", { type: "words" });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: "[data-manifesto-body]", start: "top 75%", end: "bottom 45%", scrub: 0.6 },
        });
        tl.fromTo(split.words, { color: "#4a453f" }, { color: "#ede6da", stagger: 0.1, ease: "none" }, 0).fromTo(
          "[data-manifesto-img]",
          { width: 0 },
          { width: "clamp(4.5rem, 9vw, 9rem)", stagger: 0.8, ease: "power2.inOut", duration: 1.2 },
          0,
        );
        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="gutter relative bg-noir py-[22vh]">
      <div className="grid gap-10 md:grid-cols-12">
        <p className="label text-taupe md:col-span-2">
          <span className="text-champagne">—</span> {eyebrow}
        </p>
        <p
          data-manifesto-body
          className="font-display text-[clamp(2rem,4.4vw,4.6rem)] leading-[1.12] font-light tracking-[-0.01em] md:col-span-10"
        >
          {pieces.map((piece, i) =>
            typeof piece === "string" ? (
              <Fragment key={i}>
                <span data-manifesto-text>{piece}</span>{" "}
              </Fragment>
            ) : (
              <Fragment key={i}>
                <span
                  data-manifesto-img
                  aria-hidden
                  className="relative inline-block h-[0.78em] w-[clamp(4.5rem,9vw,9rem)] translate-y-[0.08em] overflow-hidden rounded-full align-baseline"
                >
                  <Image src={piece.src} alt="" fill sizes="10rem" className="object-cover" />
                </span>{" "}
              </Fragment>
            ),
          )}
        </p>
      </div>
    </section>
  );
}
