"use client";

import Image from "next/image";
import { DELIVERY_FEE, useBag } from "@/lib/bag/BagProvider";
import { formatINR } from "@/lib/format";

/** Compact list of bag lines with subtotal, delivery and total. */
export function OrderSummary() {
  const { lines, subtotal } = useBag();
  return (
    <div className="border border-ivory/10 bg-smoke p-6 md:p-8">
      <p className="label text-taupe">Your order</p>
      <ul className="mt-6 space-y-5">
        {lines.map(({ product, size, qty, unitPrice }) => (
          <li key={`${product._id}-${size}`} className="flex items-center gap-4">
            <span className="relative aspect-[4/5] w-12 shrink-0 overflow-hidden bg-noir">
              {product.image[0] && <Image src={product.image[0]} alt="" fill sizes="3rem" className="object-cover" />}
            </span>
            <span className="flex-1">
              <span className="font-display block text-xl leading-none">{product.name}</span>
              <span className="mt-1 block text-xs text-ivory/60">
                {size} × {qty}
              </span>
            </span>
            <span className="text-sm tabular-nums">{formatINR(unitPrice * qty)}</span>
          </li>
        ))}
      </ul>
      <dl className="mt-8 space-y-3 border-t border-ivory/10 pt-6 text-sm">
        <div className="flex justify-between">
          <dt className="text-ivory/60">Subtotal</dt>
          <dd className="tabular-nums">{formatINR(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ivory/60">Delivery</dt>
          <dd className="tabular-nums">{formatINR(DELIVERY_FEE)}</dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-ivory/10 pt-4">
          <dt className="label">Total</dt>
          <dd className="font-display text-3xl tabular-nums">{formatINR(subtotal + DELIVERY_FEE)}</dd>
        </div>
      </dl>
    </div>
  );
}
