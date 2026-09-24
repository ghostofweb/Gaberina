"use client";

import Image from "next/image";
import Link from "next/link";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { useBag } from "@/lib/bag/BagProvider";
import { formatNumber } from "@/lib/catalog";
import { useCatalog } from "@/lib/catalog-context";
import { formatINR } from "@/lib/format";
import { OrderSummary } from "./OrderSummary";

export function CartView() {
  const { lines, count, setQty, remove } = useBag();
  const { numberOf } = useCatalog();

  return (
    <section className="gutter pt-[calc(var(--header-h)+12vh)] pb-32">
      <p className="label text-taupe">
        <span className="text-champagne">—</span> Your selection
      </p>
      <div className="mt-6 flex items-start gap-3">
        <h1 className="font-display text-[clamp(3.5rem,10vw,10rem)] leading-[0.9] font-light">The Bag</h1>
        <span className="label mt-[0.6em] text-champagne tabular-nums md:text-sm">({count})</span>
      </div>

      {lines.length === 0 ? (
        <div className="mt-20 flex flex-col items-start gap-8">
          <p className="max-w-md text-sm text-ivory/70">Your bag is empty. Every signature begins with a single drop.</p>
          <MagneticLink href="/collection">Explore the Collection</MagneticLink>
        </div>
      ) : (
        <div className="mt-16 grid gap-16 md:grid-cols-12">
          <ul className="divide-y divide-ivory/10 border-y border-ivory/10 md:col-span-7">
            {lines.map(({ product, size, qty, unitPrice }) => (
              <li key={`${product._id}-${size}`} className="flex gap-6 py-8">
                <Link href={`/product/${product._id}`} className="relative aspect-[4/5] w-28 shrink-0 overflow-hidden bg-smoke md:w-36">
                  {product.image[0] && <Image src={product.image[0]} alt={product.name} fill sizes="9rem" className="object-cover" />}
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="label text-taupe">{formatNumber(numberOf(product._id))}</p>
                      <Link href={`/product/${product._id}`} className="font-display mt-2 block text-3xl leading-none md:text-4xl">
                        {product.name}
                      </Link>
                      <p className="font-display mt-2 text-lg text-taupe italic">
                        {product.subCategory} · {size}
                      </p>
                    </div>
                    <p className="tabular-nums">{formatINR(unitPrice * qty)}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center border border-ivory/20">
                      <button
                        type="button"
                        aria-label={`One less ${product.name} ${size}`}
                        onClick={() => setQty(product._id, size, qty - 1)}
                        className="grid size-10 place-items-center text-ivory/70 hover:text-ivory"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm tabular-nums">{qty}</span>
                      <button
                        type="button"
                        aria-label={`One more ${product.name} ${size}`}
                        onClick={() => setQty(product._id, size, qty + 1)}
                        className="grid size-10 place-items-center text-ivory/70 hover:text-ivory"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(product._id, size)}
                      className="label link-underline pb-0.5 text-taupe hover:text-ivory"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="md:col-span-5">
            <div className="md:sticky md:top-[calc(var(--header-h)+2rem)]">
              <OrderSummary />
              <Link href="/checkout" className="group relative mt-4 flex h-16 items-center justify-center overflow-hidden bg-ivory text-noir">
                <span
                  aria-hidden
                  className="absolute inset-0 translate-y-full bg-champagne transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:translate-y-0"
                />
                <span className="label relative">Proceed to Checkout</span>
              </Link>
              <Link href="/collection" className="label link-underline mx-auto mt-6 block w-fit pb-0.5 text-taupe hover:text-ivory">
                Continue browsing
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
