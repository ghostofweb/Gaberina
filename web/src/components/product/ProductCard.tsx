"use client";

import Image from "next/image";
import Link from "next/link";
import { useBag } from "@/lib/bag/BagProvider";
import { formatNumber } from "@/lib/catalog";
import { useCatalog } from "@/lib/catalog-context";
import { formatINR, startingPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

type Props = {
  product: Product;
  /** Frame aspect ratio class; large grid tiles use a wider frame. */
  aspect?: string;
  sizes?: string;
  className?: string;
};

export function ProductCard({ product, aspect = "aspect-[4/5]", sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 90vw", className = "" }: Props) {
  const { numberOf } = useCatalog();
  const { add } = useBag();
  const from = startingPrice(product.price);
  const href = `/product/${product._id}`;
  const [primary, secondary] = product.image;

  return (
    <article data-card className={`group relative ${className}`}>
      <div data-card-frame className={`relative overflow-hidden bg-smoke ${aspect}`}>
        <Link href={href} data-cursor="View" aria-label={product.name} className="absolute inset-0">
          {primary && (
            <Image
              src={primary}
              alt={product.name}
              fill
              sizes={sizes}
              className="object-cover brightness-[0.82] grayscale-[35%] transition-[scale,filter,opacity] duration-[1.4s] ease-[var(--ease-luxe)] group-hover:scale-[1.06] group-hover:brightness-100 group-hover:grayscale-0"
            />
          )}
          {secondary && (
            <Image
              src={secondary}
              alt=""
              fill
              sizes={sizes}
              className="object-cover opacity-0 transition-[opacity,scale] duration-[1.2s] ease-[var(--ease-luxe)] group-hover:scale-[1.03] group-hover:opacity-100"
            />
          )}
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-transparent" />
        </Link>

        <span className="label pointer-events-none absolute top-5 left-5 text-ivory/80 tabular-nums">
          {formatNumber(numberOf(product._id))}
        </span>
        {product.bestseller && (
          <span className="label pointer-events-none absolute top-5 right-5 text-champagne">Signature</span>
        )}

        {/* Quick add — hover devices only; touch visitors choose a size on the product page. */}
        <div className="absolute inset-x-0 bottom-0 hidden translate-y-full gap-px transition-transform duration-700 ease-[var(--ease-luxe)] group-focus-within:translate-y-0 group-hover:translate-y-0 [@media(hover:hover)]:flex">
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => add(product._id, size)}
              className="label flex-1 bg-noir/85 py-4 text-ivory backdrop-blur-md transition-colors duration-500 hover:bg-ivory hover:text-noir"
            >
              Add {size}
            </button>
          ))}
        </div>
      </div>

      <Link href={href} className="mt-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-3xl leading-none font-light md:text-[2.4rem]">{product.name}</h3>
          <p className="font-display mt-3 text-lg text-taupe italic">{product.fragranceNotes.slice(0, 3).join(" · ")}</p>
        </div>
        {from && (
          <p className="label shrink-0 pt-2 text-right text-ivory/80">
            {formatINR(from.price)}
            <span className="mt-1 block text-taupe">{from.size}</span>
          </p>
        )}
      </Link>
    </article>
  );
}
