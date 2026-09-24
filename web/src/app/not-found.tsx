import Link from "next/link";
import { Monogram } from "@/components/brand/Monogram";

export default function NotFound() {
  return (
    <section className="gutter flex min-h-[100svh] flex-col items-center justify-center text-center">
      <Monogram className="size-16 text-ivory/60" />
      <p className="label mt-10 text-taupe">
        <span className="text-champagne">—</span> This page is still being composed
      </p>
      <h1 className="font-display mt-6 text-[clamp(2.5rem,6vw,5.5rem)] leading-none font-light">
        Not yet <em>bottled</em>
      </h1>
      <Link href="/" className="label link-underline mt-12 pb-1">
        Return to the Maison
      </Link>
    </section>
  );
}
