"use client";

import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/lib/types";

/** Every sixth composition gets a wide editorial tile on large screens. */
const isFeature = (i: number) => i % 6 === 0;

export function GridView({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-flow-row-dense gap-x-[3vw] gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p, i) => (
        <div key={p._id} data-flip-id={p._id} data-grid-item className={isFeature(i) ? "lg:col-span-2" : ""}>
          <ProductCard
            product={p}
            aspect={isFeature(i) ? "aspect-[4/5] lg:aspect-[4/3]" : "aspect-[4/5]"}
            sizes={isFeature(i) ? "(min-width: 1024px) 62vw, (min-width: 640px) 46vw, 90vw" : undefined}
          />
        </div>
      ))}
    </div>
  );
}
