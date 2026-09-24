"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { categoryLabel, familiesOf, filterProducts, sortProducts, type CollectionState } from "@/lib/catalog";
import { Flip, gsap, MOTION_OK, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import type { Product } from "@/lib/types";
import { FilterBar } from "./FilterBar";
import { GridView } from "./GridView";
import { IndexView } from "./IndexView";

function toSearch(s: CollectionState) {
  const q = new URLSearchParams();
  if (s.category) q.set("category", s.category);
  if (s.families.length) q.set("family", s.families.join(","));
  if (s.sort !== "featured") q.set("sort", s.sort);
  if (s.view !== "grid") q.set("view", s.view);
  if (s.query) q.set("q", s.query);
  const str = q.toString();
  return str ? `?${str}` : window.location.pathname;
}

type Props = { products: Product[]; initial: CollectionState; focusSearch: boolean };

export function CollectionView({ products, initial, focusSearch }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const [state, setState] = useState<CollectionState>(initial);

  const familyOptions = useMemo(
    () => familiesOf(products, filterProducts(products, { ...state, families: [] })),
    [products, state],
  );
  const results = useMemo(() => sortProducts(filterProducts(products, state), state.sort), [products, state]);

  // Keep the URL shareable without a server round trip.
  useEffect(() => {
    window.history.replaceState(null, "", toSearch(state));
  }, [state]);

  /** Record positions before a change so the grid can glide into its new arrangement. */
  const update = (patch: Partial<CollectionState>) => {
    const items = root.current?.querySelectorAll("[data-grid-item]");
    flipState.current = items?.length ? Flip.getState(items) : null;
    // Flip lifts items out of flow while they travel; hold the height so the page can't collapse and jump.
    if (resultsRef.current) resultsRef.current.style.minHeight = `${resultsRef.current.offsetHeight}px`;
    setState((s) => ({ ...s, ...patch }));
  };

  // Intro: title lines rise, the rest fades up.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create("[data-collection-title]", {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => gsap.from(self.lines, { yPercent: 110, duration: 1.6, stagger: 0.1, delay: 0.2 }),
        });
        gsap.from("[data-collection-fade]", { autoAlpha: 0, y: 24, duration: 1.4, stagger: 0.08, delay: 0.6 });
        return () => split.revert();
      });
    },
    { scope: root },
  );

  // After each change: Flip persisting items, fade in new ones, re-measure scroll triggers.
  useGSAP(
    () => {
      const state = flipState.current;
      flipState.current = null;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const release = () => {
        if (resultsRef.current) resultsRef.current.style.minHeight = "";
        ScrollTrigger.refresh();
      };
      if (state && !reduce) {
        Flip.from(state, {
          targets: root.current?.querySelectorAll("[data-grid-item]"),
          duration: 0.9,
          ease: "expo.inOut",
          stagger: 0.02,
          absolute: true,
          prune: true,
          onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.04, delay: 0.2 }),
          onComplete: release,
        });
      } else {
        release();
      }
    },
    { scope: root, dependencies: [results, state.view] },
  );

  const toggleFamily = (f: string) =>
    update({ families: state.families.includes(f) ? state.families.filter((x) => x !== f) : [...state.families, f] });
  const reset = () => update({ category: null, families: [], query: "", sort: "featured" });

  const heading = state.category ? categoryLabel(state.category) : "The Collection";

  return (
    <div ref={root}>
      <section className="gutter pt-[calc(var(--header-h)+14vh)] pb-16 md:pb-20">
        <p data-collection-fade className="label text-taupe">
          <span className="text-champagne">—</span> Maison Gaberina
        </p>
        <div className="mt-6 flex items-start gap-3">
          <h1
            key={heading}
            data-collection-title
            className="font-display text-[clamp(3.5rem,11vw,11rem)] leading-[0.9] font-light tracking-[-0.02em]"
          >
            {heading}
          </h1>
          <span className="label mt-[0.6em] text-champagne tabular-nums md:text-sm" aria-label={`${results.length} compositions`}>
            ({results.length})
          </span>
        </div>
        <p data-collection-fade className="mt-8 max-w-md text-sm leading-relaxed text-ivory/70">
          Compositions for skin and memory — perfume oils that sit close, and parfums that travel. Refine by family, or
          simply wander.
        </p>
      </section>

      <FilterBar
        {...state}
        familyOptions={familyOptions}
        resultCount={results.length}
        autoFocusSearch={focusSearch}
        onCategory={(category) => update({ category })}
        onToggleFamily={toggleFamily}
        onSort={(sort) => update({ sort })}
        onView={(view) => update({ view })}
        onQuery={(query) => update({ query })}
        onReset={reset}
      />

      <section ref={resultsRef} className="gutter pt-16 pb-32 md:pt-20" aria-live="polite">
        {results.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-center">
            <p className="font-display text-5xl font-light">
              No composition <em>matches</em>
            </p>
            <p className="mt-4 text-sm text-ivory/60">Try fewer families, or a different note.</p>
            <button type="button" onClick={reset} className="label link-underline mt-10 pb-1">
              Clear all refinements
            </button>
          </div>
        ) : state.view === "grid" ? (
          <GridView products={results} />
        ) : (
          <IndexView products={results} />
        )}
      </section>
    </div>
  );
}
