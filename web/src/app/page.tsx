import { Anatomy } from "@/components/home/Anatomy";
import { Hero } from "@/components/home/Hero";
import { Maison } from "@/components/home/Maison";
import { Manifesto } from "@/components/home/Manifesto";
import { SignatureCollection } from "@/components/home/SignatureCollection";
import { SignatureCta } from "@/components/home/SignatureCta";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const products = await getProducts();
  // Signatures (bestsellers) lead, then the newest compositions.
  const featured = [...products].sort((a, b) => Number(b.bestseller) - Number(a.bestseller) || b.date - a.date).slice(0, 8);

  return (
    <>
      <Hero />
      <Manifesto />
      <SignatureCollection products={featured} />
      <Anatomy />
      <Maison />
      <SignatureCta />
    </>
  );
}
