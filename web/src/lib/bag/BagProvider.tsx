"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { useCatalog } from "@/lib/catalog-context";
import type { Product } from "@/lib/types";
import { bagStore, loadRemoteBag, type BagItems } from "./store";

export const DELIVERY_FEE = 150;

export type BagLine = { product: Product; size: string; qty: number; unitPrice: number };

type Bag = {
  items: BagItems;
  lines: BagLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  add: (id: string, size: string, qty?: number) => void;
  setQty: (id: string, size: string, qty: number) => void;
  remove: (id: string, size: string) => void;
  clear: () => void;
};

const BagContext = createContext<Bag | null>(null);

export function useBag() {
  const bag = useContext(BagContext);
  if (!bag) throw new Error("useBag must be used inside <BagProvider>");
  return bag;
}

export function BagProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(bagStore.subscribe, bagStore.getSnapshot, bagStore.getServerSnapshot);
  const [isOpen, setOpen] = useState(false);
  const { byId } = useCatalog();

  useEffect(() => {
    loadRemoteBag();
  }, []);

  const setQty = useCallback((id: string, size: string, qty: number) => {
    const current = bagStore.getSnapshot();
    const next: BagItems = { ...current, [id]: { ...current[id], [size]: Math.max(0, qty) } };
    bagStore.set(next);
  }, []);

  const add = useCallback(
    (id: string, size: string, qty = 1) => {
      setQty(id, size, (bagStore.getSnapshot()[id]?.[size] ?? 0) + qty);
      setOpen(true);
    },
    [setQty],
  );

  const remove = useCallback((id: string, size: string) => setQty(id, size, 0), [setQty]);
  const clear = useCallback(() => bagStore.set({}, { persistRemote: false }), []);

  const value = useMemo<Bag>(() => {
    // Lines for products that no longer exist in the catalogue are skipped, not deleted.
    const lines: BagLine[] = [];
    for (const [id, sizes] of Object.entries(items)) {
      const product = byId.get(id);
      if (!product) continue;
      for (const [size, qty] of Object.entries(sizes)) {
        const unitPrice = product.price[size];
        if (qty > 0 && unitPrice !== undefined) lines.push({ product, size, qty, unitPrice });
      }
    }
    return {
      items,
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((sum, l) => sum + l.qty * l.unitPrice, 0),
      isOpen,
      setOpen,
      add,
      setQty,
      remove,
      clear,
    };
  }, [items, byId, isOpen, add, setQty, remove, clear]);

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}
