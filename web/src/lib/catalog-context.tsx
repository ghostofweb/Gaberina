"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { numberProducts } from "./catalog";
import type { Product } from "./types";

type Catalog = {
  products: Product[];
  byId: Map<string, Product>;
  numberOf: (id: string) => number | undefined;
};

const CatalogContext = createContext<Catalog>({ products: [], byId: new Map(), numberOf: () => undefined });

export const useCatalog = () => useContext(CatalogContext);

/** Makes the full product list available to client components (bag drawer, cards, N° numbering). */
export function CatalogProvider({ products, children }: { products: Product[]; children: ReactNode }) {
  const value = useMemo(() => {
    const numbers = numberProducts(products);
    return {
      products,
      byId: new Map(products.map((p) => [p._id, p])),
      numberOf: (id: string) => numbers.get(id),
    };
  }, [products]);

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}
