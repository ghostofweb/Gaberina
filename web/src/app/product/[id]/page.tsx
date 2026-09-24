import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/product/Gallery";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductDetails } from "@/components/product/ProductDetails";
import { getProducts } from "@/lib/api";
import { categoryLabel, relatedTo } from "@/lib/catalog";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: p._id }));
}

async function findProduct(id: string) {
  const products = await getProducts();
  return { product: products.find((p) => p._id === id), products };
}

export async function generateMetadata({ params }: PageProps<"/product/[id]">): Promise<Metadata> {
  const { id } = await params;
  const { product } = await findProduct(id);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} — ${categoryLabel(product.category)}`,
      description: product.description,
      images: product.image[0] ? [{ url: product.image[0], alt: product.name }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/product/[id]">) {
  const { id } = await params;
  const { product, products } = await findProduct(id);
  if (!product) notFound();

  const related = relatedTo(product, products);

  return (
    <>
      <section className="pt-[var(--header-h)] md:gutter md:pt-[calc(var(--header-h)+3rem)]">
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-[4vw]">
          <div className="md:col-span-7">
            <Gallery images={product.image} name={product.name} />
          </div>
          <div className="gutter md:col-span-5 md:px-0">
            <div className="md:sticky md:top-[calc(var(--header-h)+2rem)] md:pb-16">
              <ProductDetails product={product} />
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="gutter pt-32 pb-12 md:pt-44">
          <div className="flex items-end justify-between gap-6">
            <h2 id="related-title" className="font-display text-[clamp(2.5rem,5vw,5rem)] leading-none font-light">
              You may <em>also</em> like
            </h2>
          </div>
          <div className="mt-14 grid gap-x-[3vw] gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p._id} product={p} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 46vw, 90vw" />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
