"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  images: { key: string; src: string }[];
  active: number;
  visible: boolean;
  /** Tailwind width/aspect classes for the frame. */
  className?: string;
  sizes?: string;
  /** Stacking layer within the parent context. */
  layer?: string;
};

/**
 * A framed image that trails the pointer, crossfading between `images` as `active` changes.
 * Large fine-pointer screens only; renders nothing visible elsewhere.
 */
export function CursorPreview({
  images,
  active,
  visible,
  className = "aspect-[4/5] w-[20vw]",
  sizes = "20vw",
  layer = "z-30",
}: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(hover: hover) and (pointer: fine) and (min-width: 1024px)", () => {
        const xTo = gsap.quickTo(root.current, "x", { duration: 0.9, ease: "power3" });
        const yTo = gsap.quickTo(root.current, "y", { duration: 0.9, ease: "power3" });
        const move = (e: PointerEvent) => {
          xTo(e.clientX);
          yTo(e.clientY);
        };
        window.addEventListener("pointermove", move);
        return () => window.removeEventListener("pointermove", move);
      });
    },
    { scope: root },
  );

  useGSAP(
    () => {
      gsap.to(root.current, {
        autoAlpha: visible ? 1 : 0,
        scale: visible ? 1 : 0.9,
        duration: 0.6,
        ease: "expo.out",
      });
    },
    { dependencies: [visible] },
  );

  return (
    <div
      ref={root}
      aria-hidden
      className={`pointer-events-none fixed top-0 left-0 ${layer} hidden -translate-x-1/2 -translate-y-1/2 overflow-hidden opacity-0 lg:block ${className}`}
    >
      {images.map((img, i) =>
        img.src ? (
        <Image
          key={img.key}
          src={img.src}
          alt=""
          fill
          sizes={sizes}
          className="object-cover transition-[opacity,scale] duration-700 ease-[var(--ease-luxe)]"
          style={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.15 }}
        />
        ) : null,
      )}
    </div>
  );
}
