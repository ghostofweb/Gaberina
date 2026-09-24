"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CursorPreview } from "@/components/ui/CursorPreview";
import { formatNumber } from "@/lib/catalog";
import { useCatalog } from "@/lib/catalog-context";
import { formatINR, startingPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

/** Typographic list; the hovered composition's photograph trails the cursor. */
export function IndexView({ products }: { products: Product[] }) {
  const { numberOf } = useCatalog();
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  return (
    <>
      <CursorPreview
        images={products.map((p) => ({ key: p._id, src: p.image[0] ?? "" }))}
        active={active}
        visible={hovering}
        className="aspect-[4/5] w-[18vw]"
        sizes="18vw"
      />
      <ul onPointerLeave={() => setHovering(false)} className="border-t border-ivory/10">
        {products.map((p, i) => {
          const from = startingPrice(p.price);
          return (
            <li key={p._id} data-flip-id={p._id} data-grid-item className="border-b border-ivory/10">
              <Link
                href={`/product/${p._id}`}
                onPointerEnter={() => {
                  setActive(i);
                  setHovering(true);
                }}
                className="group grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 py-5 md:grid-cols-[5rem_minmax(0,1.4fr)_minmax(0,0.6fr)_minmax(0,1fr)_auto] md:gap-8 md:py-7"
              >
                <span className="label text-taupe tabular-nums">
                  <span className="relative block aspect-[4/5] w-12 overflow-hidden bg-smoke md:hidden">
                    {p.image[0] && <Image src={p.image[0]} alt="" fill sizes="3rem" className="object-cover" />}
                  </span>
                  <span className="hidden md:inline">{formatNumber(numberOf(p._id))}</span>
                </span>
                <span className="font-display text-[clamp(1.9rem,4.4vw,4.2rem)] leading-none font-light transition-[translate,color] duration-700 ease-[var(--ease-luxe)] group-hover:translate-x-3 group-hover:text-champagne group-hover:italic">
                  {p.name}
                </span>
                <span className="font-display hidden text-xl text-taupe italic md:block">{p.subCategory}</span>
                <span className="hidden text-sm text-ivory/60 md:block">{p.fragranceNotes.slice(0, 3).join(" · ")}</span>
                <span className="label text-right text-ivory/80">{from ? formatINR(from.price) : ""}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
