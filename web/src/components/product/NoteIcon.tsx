import type { SVGProps } from "react";

/** Fine line icons for fragrance notes, matched by keyword. Same drawing style as home/NoteIllustrations. */

type Family = "citrus" | "floral" | "wood" | "amber" | "spice" | "musk" | "fruit" | "aquatic" | "leather" | "drop";

const KEYWORDS: [Family, string[]][] = [
  ["citrus", ["bergamot", "lemon", "orange", "citrus", "lime", "grapefruit", "mandarin", "yuzu"]],
  ["floral", ["rose", "jasmine", "orchid", "lily", "blossom", "violet", "lotus", "iris", "tuberose", "neroli", "peony", "floral"]],
  ["wood", ["oud", "sandalwood", "cedar", "vetiver", "patchouli", "driftwood", "wood", "agarwood"]],
  ["amber", ["amber", "vanilla", "tobacco", "resin", "benzoin", "tonka", "incense", "myrrh"]],
  ["spice", ["cinnamon", "clove", "pepper", "spice", "cardamom", "saffron", "nutmeg"]],
  ["musk", ["musk"]],
  ["fruit", ["coconut", "pineapple", "mango", "berry", "peach", "apple", "pear", "fig", "plum"]],
  ["aquatic", ["sea", "salt", "aquatic", "marine", "ocean", "water", "ozonic"]],
  ["leather", ["leather", "suede"]],
];

export function noteFamily(note: string): Family {
  const n = note.toLowerCase();
  return KEYWORDS.find(([, words]) => words.some((w) => n.includes(w)))?.[0] ?? "drop";
}

const s = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

const DRAWINGS: Record<Family, React.ReactNode> = {
  citrus: (
    <>
      <circle cx="32" cy="34" r="20" {...s} />
      <circle cx="32" cy="34" r="16" {...s} />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <path
          key={a}
          d={`M32 34 L${(32 + Math.cos((a * Math.PI) / 180) * 15).toFixed(1)} ${(34 + Math.sin((a * Math.PI) / 180) * 15).toFixed(1)}`}
          {...s}
        />
      ))}
      <path d="M44 16 C 50 8, 58 8, 60 6 C 58 14, 52 18, 44 16 Z" {...s} />
    </>
  ),
  floral: (
    <>
      <path d="M32 30 C 36 27, 39 32, 35 35 C 31 38, 26 34, 29 30" {...s} />
      <path d="M31 22 C 41 19, 45 30, 40 38 C 35 45, 24 43, 22 35 C 20 27, 26 22, 33 23" {...s} />
      <path d="M29 14 C 45 9, 55 26, 49 40 C 43 53, 22 54, 15 42 C 9 30, 16 16, 27 14" {...s} />
      <path d="M32 54 L 32 62 M32 58 C 26 56, 22 58, 20 62" {...s} />
    </>
  ),
  wood: (
    <>
      <path d="M8 44 C 20 36, 44 40, 58 30 L 60 38 C 46 50, 22 54, 10 52 Z" {...s} />
      <path d="M14 47 C 26 42, 42 45, 56 36" {...s} />
      <path d="M30 36 C 25 29, 35 24, 30 17 C 26 11, 33 7, 31 2" {...s} />
      <path d="M38 34 C 44 28, 37 23, 42 16" {...s} />
    </>
  ),
  amber: (
    <>
      <path d="M32 6 C 22 22, 16 30, 16 40 C 16 50, 23 58, 32 58 C 41 58, 48 50, 48 40 C 48 30, 42 22, 32 6 Z" {...s} />
      <path d="M24 42 C 24 48, 28 52, 33 52" {...s} />
    </>
  ),
  spice: (
    <>
      <path d="M32 8 L 36 24 L 52 20 L 40 32 L 52 44 L 36 40 L 32 56 L 28 40 L 12 44 L 24 32 L 12 20 L 28 24 Z" {...s} />
      <circle cx="32" cy="32" r="4" {...s} />
    </>
  ),
  musk: (
    <>
      <circle cx="32" cy="32" r="22" {...s} strokeDasharray="1 4" />
      <circle cx="32" cy="32" r="14" {...s} />
      <circle cx="32" cy="32" r="5" {...s} />
    </>
  ),
  fruit: (
    <>
      <path d="M32 18 C 20 12, 10 22, 12 36 C 14 50, 26 58, 32 54 C 38 58, 50 50, 52 36 C 54 22, 44 12, 32 18 Z" {...s} />
      <path d="M32 18 C 32 12, 34 8, 38 5 M34 12 C 40 8, 46 10, 48 14 C 42 16, 37 15, 34 12" {...s} />
    </>
  ),
  aquatic: (
    <>
      <path d="M6 26 C 14 20, 22 32, 32 26 C 42 20, 50 32, 58 26" {...s} />
      <path d="M6 36 C 14 30, 22 42, 32 36 C 42 30, 50 42, 58 36" {...s} />
      <path d="M6 46 C 14 40, 22 52, 32 46 C 42 40, 50 52, 58 46" {...s} />
    </>
  ),
  leather: (
    <>
      <path d="M14 10 L 50 10 L 54 54 L 10 54 Z" {...s} />
      <path d="M18 16 L 46 16 L 49 48 L 15 48 Z" {...s} strokeDasharray="2 3" />
    </>
  ),
  drop: (
    <path d="M32 8 C 24 22, 18 30, 18 40 C 18 49, 24 56, 32 56 C 40 56, 46 49, 46 40 C 46 30, 40 22, 32 8 Z" {...s} />
  ),
};

export function NoteIcon({ note, ...props }: { note: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden {...props}>
      {DRAWINGS[noteFamily(note)]}
    </svg>
  );
}
