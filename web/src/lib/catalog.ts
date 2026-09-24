import { startingPrice } from "./format";
import type { Product } from "./types";

export const CATEGORY_LABELS: Record<string, string> = {
  Oil: "Perfume Oils",
  Perfume: "Parfums",
};

export const categoryLabel = (category: string) => CATEGORY_LABELS[category] ?? category;

export const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
] as const;

export type SortValue = (typeof SORTS)[number]["value"];

export type CollectionView = "grid" | "index";

export type CatalogFilters = {
  category: string | null;
  families: string[];
  query: string;
  sort: SortValue;
};

const fromPrice = (p: Product) => startingPrice(p.price)?.price ?? 0;

/**
 * Every family in the catalogue (most common first), counted within `scope` — e.g. the
 * products left after the category and search refinements — so chip counts stay truthful.
 */
export function familiesOf(all: Product[], scope: Product[] = all) {
  const totals = new Map<string, number>();
  for (const p of all) totals.set(p.subCategory, (totals.get(p.subCategory) ?? 0) + 1);
  const counts = new Map<string, number>();
  for (const p of scope) counts.set(p.subCategory, (counts.get(p.subCategory) ?? 0) + 1);
  return [...totals.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name]) => ({ name, count: counts.get(name) ?? 0 }));
}

export function filterProducts(products: Product[], { category, families, query }: CatalogFilters) {
  const q = query.trim().toLowerCase();
  return products.filter(
    (p) =>
      (!category || p.category === category) &&
      (families.length === 0 || families.includes(p.subCategory)) &&
      (!q ||
        p.name.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q) ||
        p.fragranceNotes.some((n) => n.toLowerCase().includes(q))),
  );
}

export function sortProducts(products: Product[], sort: SortValue) {
  const list = [...products];
  switch (sort) {
    case "newest":
      return list.sort((a, b) => b.date - a.date);
    case "price-asc":
      return list.sort((a, b) => fromPrice(a) - fromPrice(b));
    case "price-desc":
      return list.sort((a, b) => fromPrice(b) - fromPrice(a));
    default:
      return list.sort((a, b) => Number(b.bestseller) - Number(a.bestseller) || b.date - a.date);
  }
}

/**
 * Stable catalogue number (N°) by creation order, so a fragrance carries the same
 * number on every page regardless of how a list is filtered or sorted.
 */
export function numberProducts(products: Product[]): Map<string, number> {
  const byAge = [...products].sort((a, b) => a.date - b.date);
  return new Map(byAge.map((p, i) => [p._id, i + 1]));
}

export const formatNumber = (n: number | undefined) => (n ? `N°${String(n).padStart(2, "0")}` : "");

/** Same family first, then same category, excluding the product itself. */
export function relatedTo(product: Product, products: Product[], limit = 4) {
  const others = products.filter((p) => p._id !== product._id);
  const family = others.filter((p) => p.subCategory === product.subCategory);
  const category = others.filter((p) => p.subCategory !== product.subCategory && p.category === product.category);
  return [...family, ...category].slice(0, limit);
}

export type CollectionState = {
  category: string | null;
  families: string[];
  sort: SortValue;
  view: CollectionView;
  query: string;
};

export function parseCollectionParams(params: Record<string, string | string[] | undefined>, products: Product[]) {
  const one = (k: string) => (Array.isArray(params[k]) ? params[k][0] : params[k]) ?? "";
  const categories = new Set(products.map((p) => p.category));
  const families = new Set(products.map((p) => p.subCategory));
  const sort = SORTS.some((s) => s.value === one("sort")) ? (one("sort") as SortValue) : "featured";
  return {
    state: {
      category: categories.has(one("category")) ? one("category") : null,
      families: one("family").split(",").filter((f) => families.has(f)),
      sort,
      view: one("view") === "index" ? "index" : "grid",
      query: one("q"),
    } satisfies CollectionState,
    focusSearch: one("search") === "1",
  };
}
