import type { LegalDoc } from "@/content/legal";

/** Long-form layout for policy pages: large title, sticky contents on desktop, readable measure. */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <section className="gutter pt-[calc(var(--header-h)+12vh)] pb-32">
      <p className="label text-taupe">
        <span className="text-champagne">—</span> {doc.eyebrow}
      </p>
      <h1 className="font-display mt-6 text-[clamp(3.5rem,9vw,9rem)] leading-[0.9] font-light">{doc.title}</h1>
      <p className="mt-8 max-w-xl text-sm leading-relaxed text-ivory/70">{doc.intro}</p>

      {doc.draft && (
        <p role="note" className="mt-10 max-w-xl border-l border-champagne pl-4 text-sm text-ivory/80">
          Draft wording — to be reviewed and replaced with the Maison&apos;s final policy before launch.
        </p>
      )}

      <div className="mt-20 grid gap-16 md:grid-cols-12">
        <nav aria-label="Contents" className="md:col-span-3">
          <ol className="space-y-3 md:sticky md:top-[calc(var(--header-h)+2rem)]">
            {doc.sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="label link-underline pb-0.5 text-taupe hover:text-ivory">
                  <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>&nbsp;&nbsp;{s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="max-w-2xl md:col-span-8 md:col-start-5">
          {doc.sections.map((s, i) => (
            <article key={s.id} id={s.id} className="scroll-mt-[calc(var(--header-h)+2rem)] border-t border-ivory/10 py-12 first:border-t-0 first:pt-0">
              <p className="label text-champagne tabular-nums">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="font-display mt-3 text-4xl leading-none font-light">{s.heading}</h2>
              {s.body.map((p, j) => (
                <p key={j} className="mt-6 text-[0.95rem] leading-[1.8] text-ivory/75">
                  {p}
                </p>
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
