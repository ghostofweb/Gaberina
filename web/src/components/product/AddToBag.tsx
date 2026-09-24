"use client";

import { useState, type Ref } from "react";
import { useBag } from "@/lib/bag/BagProvider";
import { formatINR } from "@/lib/format";
import { gsap } from "@/lib/gsap";

type Props = {
  productId: string;
  size: string;
  price: number;
  className?: string;
  compact?: boolean;
  ref?: Ref<HTMLButtonElement>;
};

/** Sends a small copy of the product photograph flying to the header bag, then adds and opens the drawer. */
function flyToBag(onArrive: () => void) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Desktop and mobile galleries both exist in the DOM; use whichever is actually displayed.
  const source = [
    ...document.querySelectorAll<HTMLImageElement>("[data-product-hero-image] img, [data-product-hero-image-mobile] img"),
  ].find((img) => img.getClientRects().length > 0);
  const target = document.querySelector<HTMLElement>("[data-bag-target]");
  if (reduce || !source || !target) return onArrive();

  const from = source.getBoundingClientRect();
  const visible = from.bottom > 0 && from.top < window.innerHeight;
  const start = visible
    ? { left: from.left + from.width / 2 - 60, top: Math.max(from.top, 0) + Math.min(from.height, window.innerHeight) / 2 - 75 }
    : { left: window.innerWidth / 2 - 60, top: window.innerHeight / 2 - 75 };
  const to = target.getBoundingClientRect();

  const ghost = document.createElement("div");
  ghost.setAttribute("aria-hidden", "true");
  Object.assign(ghost.style, {
    position: "fixed",
    zIndex: "65",
    width: "120px",
    height: "150px",
    left: `${start.left}px`,
    top: `${start.top}px`,
    backgroundImage: `url("${source.currentSrc || source.src}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    pointerEvents: "none",
  });
  document.body.appendChild(ghost);

  gsap
    .timeline({ onComplete: () => (ghost.remove(), onArrive()) })
    .fromTo(ghost, { scale: 0.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.35, ease: "power2.out" })
    .to(ghost, {
      x: to.left + to.width / 2 - (start.left + 60),
      y: to.top + to.height / 2 - (start.top + 75),
      scale: 0.12,
      borderRadius: "50%",
      duration: 0.85,
      ease: "power3.in",
    })
    .to(ghost, { autoAlpha: 0, duration: 0.15 }, "-=0.1");
}

export function AddToBag({ productId, size, price, className = "", compact = false, ref }: Props) {
  const { add } = useBag();
  const [busy, setBusy] = useState(false);

  const onClick = () => {
    if (busy) return;
    setBusy(true);
    flyToBag(() => {
      add(productId, size);
      setBusy(false);
    });
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label={`Add ${size} to bag, ${formatINR(price)}`}
      className={`group relative flex items-center justify-center overflow-hidden bg-ivory text-noir ${compact ? "h-12 px-6" : "h-16 w-full"} ${className}`}
    >
      <span
        aria-hidden
        className="absolute inset-0 translate-y-full bg-champagne transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:translate-y-0"
      />
      <span className="label relative flex items-center gap-3">
        Add to Bag <span aria-hidden className="h-px w-6 bg-noir/40" /> <span className="tabular-nums">{formatINR(price)}</span>
      </span>
    </button>
  );
}
