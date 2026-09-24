"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useLenis } from "@/components/providers/SmoothScroll";
import { DELIVERY_FEE, useBag } from "@/lib/bag/BagProvider";
import { formatNumber } from "@/lib/catalog";
import { useCatalog } from "@/lib/catalog-context";
import { formatINR } from "@/lib/format";
import { gsap, useGSAP } from "@/lib/gsap";

export function BagDrawer() {
  const root = useRef<HTMLDivElement>(null);
  const { isOpen, setOpen, lines, count, subtotal, setQty, remove } = useBag();
  const { numberOf } = useCatalog();
  const lenis = useLenis();

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const d = reduce ? 0.01 : 1;
      if (isOpen) {
        gsap.set(root.current, { visibility: "visible" });
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .to("[data-bag-scrim]", { autoAlpha: 1, duration: 0.6 * d }, 0)
          .fromTo("[data-bag-panel]", { xPercent: 100 }, { xPercent: 0, duration: 1.1 * d, ease: "expo.inOut" }, 0)
          .fromTo("[data-bag-reveal]", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9 * d, stagger: 0.05 }, 0.45 * d);
      } else if (root.current?.style.visibility === "visible") {
        gsap
          .timeline({ defaults: { ease: "expo.inOut" } })
          .to("[data-bag-panel]", { xPercent: 100, duration: 0.8 * d }, 0)
          .to("[data-bag-scrim]", { autoAlpha: 0, duration: 0.6 * d }, 0.1 * d)
          .set(root.current, { visibility: "hidden" });
      }
    },
    { scope: root, dependencies: [isOpen] },
  );

  // Scroll lock, Escape, and a focus trap while open.
  useEffect(() => {
    if (!isOpen) return;
    lenis?.stop();
    const panel = root.current?.querySelector<HTMLElement>("[data-bag-panel]");
    panel?.querySelector<HTMLElement>("button, a")?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab" || !panel) return;
      const items = [...panel.querySelectorAll<HTMLElement>("button, a, input")];
      const i = items.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : (i + 1) % items.length;
      e.preventDefault();
      items[next]?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [isOpen, setOpen, lenis]);

  return (
    <div ref={root} className="invisible fixed inset-0 z-[55]" aria-hidden={!isOpen}>
      <button
        type="button"
        data-bag-scrim
        aria-label="Close bag"
        tabIndex={-1}
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-noir/70 opacity-0 backdrop-blur-sm"
      />

      <aside
        data-bag-panel
        role="dialog"
        aria-modal="true"
        aria-label="Your bag"
        className="absolute inset-y-0 right-0 flex w-full flex-col bg-smoke sm:w-[min(34rem,100vw)]"
      >
        <header className="flex items-center justify-between border-b border-ivory/10 px-6 py-6 md:px-10">
          <p className="label text-ivory">
            Your Bag <span className="text-champagne tabular-nums">({count})</span>
          </p>
          <button type="button" onClick={() => setOpen(false)} className="label link-underline pb-0.5 text-taupe hover:text-ivory">
            Close
          </button>
        </header>

        {lines.length === 0 ? (
          <div data-bag-reveal className="flex flex-1 flex-col items-center justify-center gap-6 px-10 text-center">
            <p className="font-display text-4xl font-light">
              Your bag is <em>empty</em>
            </p>
            <p className="max-w-xs text-sm text-ivory/60">Every signature begins with a single drop.</p>
            <Link href="/collection" onClick={() => setOpen(false)} className="label link-underline mt-4 pb-1">
              Explore the collection
            </Link>
          </div>
        ) : (
          <>
            <ul data-lenis-prevent className="flex-1 divide-y divide-ivory/10 overflow-y-auto overscroll-contain px-6 md:px-10">
              {lines.map(({ product, size, qty, unitPrice }) => (
                <li data-bag-reveal key={`${product._id}-${size}`} className="flex gap-5 py-6">
                  <Link
                    href={`/product/${product._id}`}
                    onClick={() => setOpen(false)}
                    className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden bg-noir"
                  >
                    {product.image[0] && <Image src={product.image[0]} alt={product.name} fill sizes="5rem" className="object-cover" />}
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="label text-taupe tabular-nums">{formatNumber(numberOf(product._id))}</p>
                        <p className="font-display mt-1 text-2xl leading-none font-light">{product.name}</p>
                        <p className="mt-2 text-xs text-ivory/60">{size}</p>
                      </div>
                      <p className="text-sm tabular-nums">{formatINR(unitPrice * qty)}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center border border-ivory/20">
                        <button
                          type="button"
                          aria-label={`One less ${product.name} ${size}`}
                          onClick={() => setQty(product._id, size, qty - 1)}
                          className="grid size-9 place-items-center text-ivory/70 transition-colors hover:text-ivory"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm tabular-nums" aria-live="polite">
                          {qty}
                        </span>
                        <button
                          type="button"
                          aria-label={`One more ${product.name} ${size}`}
                          onClick={() => setQty(product._id, size, qty + 1)}
                          className="grid size-9 place-items-center text-ivory/70 transition-colors hover:text-ivory"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(product._id, size)}
                        className="label link-underline pb-0.5 text-taupe hover:text-ivory"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer data-bag-reveal className="border-t border-ivory/10 px-6 py-6 md:px-10 md:py-8">
              <div className="flex items-baseline justify-between">
                <p className="label text-taupe">Subtotal</p>
                <p className="font-display text-3xl tabular-nums">{formatINR(subtotal)}</p>
              </div>
              <p className="mt-2 text-xs text-ivory/50">Delivery {formatINR(DELIVERY_FEE)}, added at checkout.</p>
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="group relative mt-6 flex h-14 items-center justify-center overflow-hidden bg-ivory text-noir"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 translate-y-full bg-champagne transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:translate-y-0"
                />
                <span className="label relative">Proceed to Checkout</span>
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="label link-underline mx-auto mt-5 block pb-0.5 text-taupe hover:text-ivory"
              >
                Continue browsing
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
