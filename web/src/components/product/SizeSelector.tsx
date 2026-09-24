"use client";

import { useRef } from "react";
import { formatINR } from "@/lib/format";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = { sizes: string[]; prices: Record<string, number>; value: string; onChange: (size: string) => void };

export function SizeSelector({ sizes, prices, value, onChange }: Props) {
  return (
    <div role="radiogroup" aria-label="Size" className="flex gap-3">
      {sizes.map((size) => {
        const on = size === value;
        return (
          <button
            key={size}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(size)}
            className={`flex flex-1 flex-col items-start gap-1 border px-5 py-4 text-left transition-colors duration-500 ${
              on ? "border-ivory bg-ivory/[0.04]" : "border-ivory/15 hover:border-ivory/40"
            }`}
          >
            <span className="label">{size}</span>
            <span className={`text-sm tabular-nums ${on ? "text-ivory" : "text-taupe"}`}>
              {prices[size] !== undefined ? formatINR(prices[size]) : "—"}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** A price whose characters roll upward, one after another, whenever it changes. */
export function PriceRoll({ amount, className = "" }: { amount: number; className?: string }) {
  const root = useRef<HTMLSpanElement>(null);
  const first = useRef(true);
  const text = formatINR(amount);

  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from("[data-price-char]", { yPercent: 110, duration: 0.8, stagger: 0.035, ease: "expo.out" });
    },
    { scope: root, dependencies: [text] },
  );

  return (
    <span ref={root} className={`inline-flex tabular-nums ${className}`} aria-label={text}>
      {[...text].map((ch, i) => (
        <span key={`${text}-${i}`} aria-hidden className="inline-block overflow-hidden">
          <span data-price-char className="inline-block">
            {ch === " " ? " " : ch}
          </span>
        </span>
      ))}
    </span>
  );
}
