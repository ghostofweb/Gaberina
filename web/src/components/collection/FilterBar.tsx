"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/components/providers/SmoothScroll";
import { CATEGORY_LABELS, SORTS, type CollectionView, type SortValue } from "@/lib/catalog";
import { gsap, useGSAP } from "@/lib/gsap";

type View = CollectionView;

type Props = {
  category: string | null;
  families: string[];
  familyOptions: { name: string; count: number }[];
  sort: SortValue;
  view: View;
  query: string;
  autoFocusSearch: boolean;
  onCategory: (c: string | null) => void;
  onToggleFamily: (f: string) => void;
  onSort: (s: SortValue) => void;
  onView: (v: View) => void;
  onQuery: (q: string) => void;
  onReset: () => void;
};

const CATEGORIES: { value: string | null; label: string }[] = [
  { value: null, label: "All" },
  ...Object.entries(CATEGORY_LABELS).map(([value, label]) => ({ value, label })),
];

function CategoryTabs({ category, onCategory }: Pick<Props, "category" | "onCategory">) {
  const root = useRef<HTMLDivElement>(null);

  // The champagne underline slides to the active tab.
  useGSAP(
    () => {
      const active = root.current?.querySelector<HTMLElement>("[aria-pressed='true']");
      if (!active) return;
      gsap.to("[data-tab-line]", {
        x: active.offsetLeft,
        width: active.offsetWidth,
        duration: 0.8,
        ease: "expo.out",
      });
    },
    { scope: root, dependencies: [category] },
  );

  return (
    <div ref={root} role="group" aria-label="Category" className="relative flex gap-7">
      {CATEGORIES.map((c) => (
        <button
          key={c.label}
          type="button"
          aria-pressed={category === c.value}
          onClick={() => onCategory(c.value)}
          className={`label pb-2 transition-colors duration-500 ${category === c.value ? "text-ivory" : "text-taupe hover:text-ivory"}`}
        >
          {c.label}
        </button>
      ))}
      <span data-tab-line aria-hidden className="absolute bottom-0 left-0 h-px w-0 bg-champagne" />
    </div>
  );
}

function FamilyChips({ families, familyOptions, onToggleFamily }: Pick<Props, "families" | "familyOptions" | "onToggleFamily">) {
  return (
    <div role="group" aria-label="Scent family" className="flex flex-wrap gap-2">
      {familyOptions.map((f) => {
        const on = families.includes(f.name);
        const empty = f.count === 0 && !on;
        return (
          <button
            key={f.name}
            type="button"
            aria-pressed={on}
            disabled={empty}
            onClick={() => onToggleFamily(f.name)}
            className={`rounded-full border px-4 py-2 text-xs tracking-wide transition-[color,background-color,border-color,opacity] duration-500 ${
              on
                ? "border-ivory bg-ivory text-noir"
                : empty
                  ? "border-ivory/10 text-ivory/30"
                  : "border-ivory/20 text-ivory/80 hover:border-ivory/60"
            }`}
          >
            {f.name} <span className={on ? "text-noir/50" : "text-taupe"}>{f.count}</span>
          </button>
        );
      })}
    </div>
  );
}

function SortMenu({ sort, onSort }: Pick<Props, "sort" | "onSort">) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !root.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", close);
    };
  }, [open]);

  const current = SORTS.find((s) => s.value === sort) ?? SORTS[0];
  return (
    <div ref={root} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="label flex items-center gap-2 text-ivory"
      >
        <span className="text-taupe">Sort</span> {current.label}
        <span aria-hidden className={`transition-transform duration-500 ${open ? "rotate-180" : ""}`}>
          ↓
        </span>
      </button>
      {open && (
        <ul role="listbox" aria-label="Sort by" className="absolute right-0 z-20 mt-4 w-60 border border-ivory/10 bg-smoke py-2">
          {SORTS.map((s) => (
            <li key={s.value}>
              <button
                type="button"
                role="option"
                aria-selected={s.value === sort}
                onClick={() => {
                  onSort(s.value);
                  setOpen(false);
                }}
                className={`w-full px-5 py-3 text-left text-sm transition-colors hover:bg-ivory/5 ${
                  s.value === sort ? "text-champagne" : "text-ivory/80"
                }`}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SearchField({ query, onQuery, autoFocus }: { query: string; onQuery: (q: string) => void; autoFocus: boolean }) {
  const [open, setOpen] = useState(autoFocus || query.length > 0);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && autoFocus) input.current?.focus({ preventScroll: true });
  }, [open, autoFocus]);

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label={open ? "Close search" : "Search the collection"}
        onClick={() => {
          setOpen((v) => !v);
          if (open) onQuery("");
          else requestAnimationFrame(() => input.current?.focus());
        }}
        className="text-ivory"
      >
        <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.1">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m15.5 15.5 5 5" />
        </svg>
      </button>
      <input
        ref={input}
        type="search"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        placeholder="Name, family or note"
        aria-label="Search the collection"
        tabIndex={open ? 0 : -1}
        className={`border-b border-ivory/25 bg-transparent py-1 text-sm text-ivory outline-none focus-visible:outline-none transition-[width,opacity] duration-700 ease-[var(--ease-luxe)] placeholder:text-taupe focus:border-ivory ${
          open ? "w-28 opacity-100 sm:w-44 md:w-56" : "pointer-events-none w-0 opacity-0"
        }`}
      />
    </div>
  );
}

function ViewToggle({ view, onView }: Pick<Props, "view" | "onView">) {
  return (
    <div role="group" aria-label="View" className="flex items-center gap-4">
      {(["grid", "index"] as const).map((v) => (
        <button
          key={v}
          type="button"
          aria-pressed={view === v}
          onClick={() => onView(v)}
          className={`label transition-colors duration-500 ${view === v ? "text-ivory" : "text-taupe hover:text-ivory"}`}
        >
          {v === "grid" ? "Grid" : "Index"}
        </button>
      ))}
    </div>
  );
}

/** Mobile: every refinement lives in a bottom sheet. */
function RefineSheet(props: Props & { open: boolean; onClose: () => void; resultCount: number }) {
  const root = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      if (props.open) {
        gsap.set(root.current, { visibility: "visible" });
        gsap.to("[data-sheet-scrim]", { autoAlpha: 1, duration: 0.5 });
        gsap.fromTo("[data-sheet]", { yPercent: 100 }, { yPercent: 0, duration: 0.9, ease: "expo.out" });
      } else if (root.current?.style.visibility === "visible") {
        gsap.to("[data-sheet-scrim]", { autoAlpha: 0, duration: 0.4 });
        gsap.to("[data-sheet]", {
          yPercent: 100,
          duration: 0.6,
          ease: "expo.in",
          onComplete: () => void gsap.set(root.current, { visibility: "hidden" }),
        });
      }
    },
    { scope: root, dependencies: [props.open] },
  );

  useEffect(() => {
    if (!props.open) return;
    lenis?.stop();
    return () => lenis?.start();
  }, [props.open, lenis]);

  return (
    <div ref={root} className="invisible fixed inset-0 z-[55] md:hidden" aria-hidden={!props.open}>
      <button
        type="button"
        data-sheet-scrim
        tabIndex={-1}
        aria-label="Close"
        onClick={props.onClose}
        className="absolute inset-0 bg-noir/70 opacity-0"
      />
      <div
        data-sheet
        data-lenis-prevent
        role="dialog"
        aria-modal="true"
        aria-label="Refine"
        className="absolute inset-x-0 bottom-0 max-h-[85svh] overflow-y-auto bg-smoke px-6 pt-6 pb-8"
      >
        <div className="flex items-center justify-between">
          <p className="label">Refine</p>
          <button type="button" onClick={props.onReset} className="label text-taupe">
            Reset
          </button>
        </div>
        <div className="mt-8 space-y-8">
          <CategoryTabs category={props.category} onCategory={props.onCategory} />
          <div>
            <p className="label mb-4 text-taupe">Scent family</p>
            <FamilyChips families={props.families} familyOptions={props.familyOptions} onToggleFamily={props.onToggleFamily} />
          </div>
          <div>
            <p className="label mb-4 text-taupe">Sort</p>
            <div className="flex flex-col items-start gap-3">
              {SORTS.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  aria-pressed={s.value === props.sort}
                  onClick={() => props.onSort(s.value)}
                  className={`text-sm ${s.value === props.sort ? "text-champagne" : "text-ivory/80"}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button type="button" onClick={props.onClose} className="label mt-10 h-14 w-full bg-ivory text-noir">
          Show {props.resultCount} {props.resultCount === 1 ? "composition" : "compositions"}
        </button>
      </div>
    </div>
  );
}

export function FilterBar(props: Props & { resultCount: number }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const activeCount = (props.category ? 1 : 0) + props.families.length;

  return (
    <>
      <div className="sticky top-[var(--header-h)] z-20 border-y border-ivory/10 bg-noir/80 backdrop-blur-xl">
        {/* Desktop */}
        <div className="gutter hidden flex-col gap-5 py-5 md:flex">
          <div className="flex items-center justify-between gap-8">
            <CategoryTabs category={props.category} onCategory={props.onCategory} />
            <div className="flex items-center gap-10">
              <SearchField query={props.query} onQuery={props.onQuery} autoFocus={props.autoFocusSearch} />
              <SortMenu sort={props.sort} onSort={props.onSort} />
              <span aria-hidden className="h-4 w-px bg-ivory/15" />
              <ViewToggle view={props.view} onView={props.onView} />
            </div>
          </div>
          <FamilyChips families={props.families} familyOptions={props.familyOptions} onToggleFamily={props.onToggleFamily} />
        </div>

        {/* Mobile */}
        <div className="gutter flex items-center justify-between gap-4 py-4 md:hidden">
          <button type="button" onClick={() => setSheetOpen(true)} className="label text-ivory">
            Refine{activeCount > 0 && <span className="text-champagne"> ({activeCount})</span>}
          </button>
          <SearchField query={props.query} onQuery={props.onQuery} autoFocus={props.autoFocusSearch} />
          <ViewToggle view={props.view} onView={props.onView} />
        </div>
      </div>
      <RefineSheet {...props} open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </>
  );
}
