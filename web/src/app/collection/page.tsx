import type { Metadata } from "next";
import { CollectionView } from "@/components/collection/CollectionView";
import { getProducts } from "@/lib/api";
import { parseCollectionParams } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "The Collection",
  description: "Perfume oils and parfums from Maison Gaberina — refine by scent family, note or price.",
};

export default async function CollectionPage({ searchParams }: PageProps<"/collection">) {
  const [products, params] = await Promise.all([getProducts(), searchParams]);
  const { state, focusSearch } = parseCollectionParams(params, products);

  // Re-key on the query so menu links (e.g. ?category=Oil) reset the view when already on this page.
  return (
    <CollectionView
      key={JSON.stringify(params)}
      products={products}
      initial={state}
      focusSearch={focusSearch}
    />
  );
}
