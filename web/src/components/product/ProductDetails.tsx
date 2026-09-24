"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { DELIVERY_FEE } from "@/lib/bag/BagProvider";
import { categoryLabel, formatNumber } from "@/lib/catalog";
import { useCatalog } from "@/lib/catalog-context";
import { formatINR, startingPrice } from "@/lib/format";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";
import type { Product } from "@/lib/types";
import { AddToBag } from "./AddToBag";
import { NoteIcon } from "./NoteIcon";
import { PriceRoll, SizeSelector } from "./SizeSelector";

function Accordion({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-ivory/10">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="label">{title}</span>
        <span aria-hidden className="relative block size-3">
          <span className="absolute top-1/2 left-0 h-px w-full bg-current" />
          <span
            className={`absolute top-1/2 left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "" : "rotate-90"}`}
          />
        </span>
      </button>
      <div className={`grid transition-[grid-template-rows] duration-700 ease-[var(--ease-luxe)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="pb-6 text-sm leading-relaxed text-ivory/70">{children}</div>
        </div>
      </div>
    </div>
  );
}

const WEARING: Record<string, string> = {
  Oil: "Warm a single drop between your fingertips and press it to the pulse points — wrists, behind the ears, the base of the throat. Oils stay close to the skin; return to them through the day as you wish.",
  Perfume:
    "Mist onto the pulse points from a short distance and let it settle rather than rubbing it in — a composition unfolds as it warms on skin.",
};

export function ProductDetails({ product }: { product: Product }) {
  const root = useRef<HTMLDivElement>(null);
  const mainButton = useRef<HTMLButtonElement>(null);
  const { numberOf } = useCatalog();
  const [size, setSize] = useState(() => startingPrice(product.price)?.size ?? product.sizes[0]);
  const [showBar, setShowBar] = useState(false);
  const price = product.price[size] ?? 0;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create("[data-product-title]", {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => gsap.from(self.lines, { yPercent: 110, duration: 1.5, stagger: 0.1, delay: 0.15 }),
        });
        gsap.from("[data-product-fade]", { autoAlpha: 0, y: 24, duration: 1.3, stagger: 0.06, delay: 0.4 });
        return () => split.revert();
      });
    },
    { scope: root },
  );

  // Mobile: a fixed purchase bar appears once the main button leaves the screen.
  useEffect(() => {
    const el = mainButton.current;
    if (!el) return;
    // The top margin accounts for the fixed header the button slides behind.
    const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) * 16 || 84;
    const io = new IntersectionObserver(
      ([entry]) => setShowBar(!entry.isIntersecting && entry.boundingClientRect.top < headerH),
      { rootMargin: `-${Math.round(headerH)}px 0px 0px 0px` },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={root}>
      <nav data-product-fade aria-label="Breadcrumb" className="label flex flex-wrap gap-2 text-taupe">
        <Link href="/collection" className="link-underline pb-0.5 hover:text-ivory">
          Collection
        </Link>
        <span aria-hidden>/</span>
        <Link href={`/collection?category=${product.category}`} className="link-underline pb-0.5 hover:text-ivory">
          {categoryLabel(product.category)}
        </Link>
        <span aria-hidden>/</span>
        <Link href={`/collection?family=${encodeURIComponent(product.subCategory)}`} className="link-underline pb-0.5 hover:text-ivory">
          {product.subCategory}
        </Link>
      </nav>

      <p data-product-fade className="label mt-10 text-champagne tabular-nums">
        {formatNumber(numberOf(product._id))}
        {product.bestseller && <span className="ml-4 text-taupe">Signature</span>}
      </p>
      <h1 data-product-title className="font-display mt-4 text-[clamp(3rem,6vw,6.5rem)] leading-[0.92] font-light tracking-[-0.01em]">
        {product.name}
      </h1>
      <p data-product-fade className="font-display mt-4 text-2xl text-taupe italic">
        {product.subCategory} · {categoryLabel(product.category)}
      </p>

      <p data-product-fade className="mt-8 max-w-md text-sm leading-relaxed text-ivory/75">
        {product.description}
      </p>

      <div data-product-fade className="mt-10 flex items-baseline justify-between">
        <PriceRoll amount={price} className="font-display text-4xl" />
        <span className="label text-taupe">{size}</span>
      </div>

      <div data-product-fade className="mt-6">
        <SizeSelector sizes={product.sizes} prices={product.price} value={size} onChange={setSize} />
      </div>

      <div data-product-fade className="mt-4">
        <AddToBag ref={mainButton} productId={product._id} size={size} price={price} />
      </div>

      {product.fragranceNotes.length > 0 && (
        <div data-product-fade className="mt-14">
          <p className="label text-taupe">The notes</p>
          <ul className="mt-6 grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4">
            {product.fragranceNotes.map((note) => (
              <li key={note} className="flex flex-col items-center gap-3 text-center">
                <NoteIcon note={note} className="size-12 text-ivory/70" />
                <span className="font-display text-lg leading-tight italic">{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div data-product-fade className="mt-14 border-t border-ivory/10">
        <Accordion title="Composition" defaultOpen>
          <p>
            <span className="text-taupe">Family — </span>
            {product.subCategory}
          </p>
          <p className="mt-2">
            <span className="text-taupe">Form — </span>
            {categoryLabel(product.category)}, {product.sizes.join(" or ")}
          </p>
          <p className="mt-2">
            <span className="text-taupe">Notes — </span>
            {product.fragranceNotes.join(", ")}
          </p>
        </Accordion>
        <Accordion title="Wearing">{WEARING[product.category] ?? WEARING.Perfume}</Accordion>
        <Accordion title="Delivery">
          A delivery charge of {formatINR(DELIVERY_FEE)} is added to every order at checkout.
        </Accordion>
      </div>

      {/* Mobile purchase bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-ivory/10 bg-noir/90 px-4 py-3 backdrop-blur-xl transition-transform duration-700 ease-[var(--ease-luxe)] md:hidden ${
          showBar ? "translate-y-0" : "translate-y-full"
        }`}
        aria-hidden={!showBar}
      >
        <div>
          <p className="font-display text-xl leading-none">{product.name}</p>
          <p className="label mt-1 text-taupe">{size}</p>
        </div>
        <AddToBag productId={product._id} size={size} price={price} compact />
      </div>
    </div>
  );
}
