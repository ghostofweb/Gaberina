"use client";

import Image from "next/image";
import { useRef } from "react";
import { media } from "@/content/media";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { Bergamot, Oud, Rose } from "./NoteIllustrations";

const TIERS = [
  {
    tier: "Top",
    title: "The first impression",
    body: "Bright, fleeting notes — bergamot, citrus peel, pink pepper — that greet the skin and lift away within minutes.",
    image: media.bergamot,
    Illustration: Bergamot,
  },
  {
    tier: "Heart",
    title: "The character",
    body: "Florals and spice that bloom once the opening fades. They define a composition for hours.",
    image: media.darkBloom,
    Illustration: Rose,
  },
  {
    tier: "Base",
    title: "The memory",
    body: "Resins, woods and oud that settle close to the skin — what remains long after you have left the room.",
    image: media.bakhoor,
    Illustration: Oud,
  },
];

export function Anatomy() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const layers = gsap.utils.toArray<HTMLElement>("[data-tier-image]");
      const copies = gsap.utils.toArray<HTMLElement>("[data-tier-copy]");
      const drawings = gsap.utils.toArray<SVGSVGElement>("[data-tier-drawing]");
      const strokes = (el: Element) => el.querySelectorAll("path, circle");

      const mm = gsap.matchMedia();
      mm.add({ motion: MOTION_OK, reduce: "(prefers-reduced-motion: reduce)" }, (ctx) => {
        // With reduced motion the tiers still change as you scroll, but as plain crossfades.
        const reduce = Boolean(ctx.conditions?.reduce);

        gsap.set(layers.slice(1), reduce ? { autoAlpha: 0 } : { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(copies.slice(1), { autoAlpha: 0, y: reduce ? 0 : 40 });
        gsap.set(drawings.slice(1), { autoAlpha: 0 });
        gsap.set("[data-tier-drawing] path, [data-tier-drawing] circle", {
          strokeDasharray: 1,
          strokeDashoffset: reduce ? 0 : 1,
        });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=140%",
            pin: true,
            scrub: reduce ? true : 0.8,
          },
        });

        if (!reduce) tl.to(strokes(drawings[0]), { strokeDashoffset: 0, duration: 1, stagger: 0.04 });

        for (let i = 1; i < TIERS.length; i++) {
          const at = i * 2;
          if (reduce) {
            tl.to(layers[i], { autoAlpha: 1, duration: 0.3 }, at);
          } else {
            tl.to(layers[i], { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2 }, at)
              .to(layers[i - 1].querySelector("img"), { scale: 1.12, duration: 1.2 }, at)
              .to(strokes(drawings[i]), { strokeDashoffset: 0, duration: 1, stagger: 0.04 }, at + 0.4);
          }
          tl.to(copies[i - 1], { autoAlpha: 0, y: reduce ? 0 : -40, duration: 0.6 }, at)
            .to(copies[i], { autoAlpha: 1, y: 0, duration: 0.8 }, at + 0.5)
            .to(drawings[i - 1], { autoAlpha: 0, duration: 0.5 }, at)
            .set(drawings[i], { autoAlpha: 1 }, at + 0.4)
            .to("[data-tier-count]", { yPercent: (-100 / TIERS.length) * i, duration: reduce ? 0.01 : 0.8 }, at + 0.3);
        }
        tl.to({}, { duration: 1 });
        tl.fromTo("[data-tier-progress]", { scaleX: 0 }, { scaleX: 1, ease: "none", duration: tl.duration() }, 0);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="anatomy-title" className="relative h-[100svh] overflow-hidden bg-noir">
      {TIERS.map((t, i) => (
        <div key={t.tier} data-tier-image className="absolute inset-0 overflow-hidden" style={{ zIndex: i }}>
          <Image
            src={t.image.src}
            alt={t.image.alt}
            fill
            sizes="100vw"
            className="object-cover brightness-[0.5] saturate-[0.85]"
          />
        </div>
      ))}
      <div aria-hidden className="absolute inset-0 z-10 bg-gradient-to-r from-noir/90 via-noir/40 to-noir/10" />

      <div className="gutter relative z-20 flex h-full flex-col justify-between py-[calc(var(--header-h)+4vh)] pb-[6vh]">
        <div className="flex items-center justify-between">
          <p id="anatomy-title" className="label text-taupe">
            <span className="text-champagne">—</span> Anatomy of a Scent
          </p>
          <p className="label flex text-ivory tabular-nums">
            <span className="relative inline-block h-[1.2em] overflow-hidden">
              <span data-tier-count className="flex flex-col">
                {TIERS.map((_, i) => (
                  <span key={i} className="h-[1.2em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                ))}
              </span>
            </span>
            <span className="text-taupe">&nbsp;/ 03</span>
          </p>
        </div>

        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="relative md:col-span-6">
            {TIERS.map((t, i) => (
              <div key={t.tier} data-tier-copy className={i === 0 ? "relative" : "absolute inset-x-0 bottom-0"}>
                <p className="font-display text-2xl text-champagne italic">{t.tier} notes</p>
                <h3 className="font-display mt-2 text-[clamp(2.75rem,6vw,6rem)] leading-[0.95] font-light">{t.title}</h3>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-ivory/75">{t.body}</p>
              </div>
            ))}
          </div>
          <div className="relative hidden aspect-square w-full max-w-[26rem] justify-self-end md:col-span-5 md:col-start-8 md:block">
            {TIERS.map(({ tier, Illustration }) => (
              <Illustration key={tier} data-tier-drawing aria-hidden className="absolute inset-0 size-full text-ivory/70" />
            ))}
          </div>
        </div>

        <div className="hairline relative mt-10 overflow-hidden">
          <div data-tier-progress className="absolute inset-0 origin-left scale-x-0 bg-champagne" />
        </div>
      </div>
    </section>
  );
}
