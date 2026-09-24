/** Fine line drawings for the three note tiers. Every stroke uses pathLength=1 so it can be drawn in. */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 0.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
  pathLength: 1,
};

export function Bergamot(props: React.SVGProps<SVGSVGElement>) {
  // A halved citrus: rind, pith ring and segments, with a leaf.
  const segments = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2;
    return `M100 100 L${(100 + Math.cos(a) * 52).toFixed(1)} ${(100 + Math.sin(a) * 52).toFixed(1)}`;
  });
  return (
    <svg viewBox="0 0 200 200" {...props}>
      <circle cx="100" cy="100" r="66" {...stroke} />
      <circle cx="100" cy="100" r="58" {...stroke} />
      <circle cx="100" cy="100" r="6" {...stroke} />
      {segments.map((d, i) => (
        <path key={i} d={d} {...stroke} />
      ))}
      <path d="M150 52 C 168 22, 196 18, 198 14 C 190 40, 176 58, 150 52 Z" {...stroke} />
      <path d="M150 52 C 170 38, 184 26, 198 14" {...stroke} />
    </svg>
  );
}

export function Rose(props: React.SVGProps<SVGSVGElement>) {
  // A rose seen from above, drawn as nested, offset petals.
  const petals = [
    "M100 92 C 108 86, 116 96, 108 104 C 100 112, 88 104, 92 94 C 95 88, 104 88, 106 94",
    "M100 78 C 122 72, 132 96, 118 112 C 104 128, 78 118, 78 100 C 78 84, 92 76, 104 80",
    "M96 62 C 130 54, 150 88, 138 116 C 126 142, 88 146, 70 126 C 52 106, 60 72, 90 64",
    "M92 44 C 142 34, 172 80, 158 124 C 146 160, 94 172, 62 148 C 30 124, 34 70, 72 52",
    "M84 30 C 150 16, 196 76, 176 132 C 160 178, 96 196, 54 168 C 12 140, 14 70, 58 42",
  ];
  return (
    <svg viewBox="0 0 200 200" {...props}>
      {petals.map((d, i) => (
        <path key={i} d={d} {...stroke} />
      ))}
    </svg>
  );
}

export function Oud(props: React.SVGProps<SVGSVGElement>) {
  // A sliver of agarwood with its resin grain, and smoke rising from it.
  const grain = [
    "M40 170 C 70 160, 120 168, 160 150",
    "M46 178 C 80 170, 126 176, 164 160",
    "M58 186 C 92 180, 130 184, 162 172",
  ];
  const smoke = [
    "M100 146 C 86 126, 116 112, 100 92 C 84 72, 118 58, 104 36 C 96 24, 104 14, 112 8",
    "M112 148 C 132 130, 110 116, 126 98 C 142 80, 120 66, 134 48",
    "M88 150 C 70 136, 82 120, 72 104",
  ];
  return (
    <svg viewBox="0 0 200 200" {...props}>
      <path d="M30 168 C 60 150, 130 160, 172 140 L 176 158 C 140 186, 70 196, 34 186 Z" {...stroke} />
      {grain.map((d, i) => (
        <path key={`g${i}`} d={d} {...stroke} />
      ))}
      {smoke.map((d, i) => (
        <path key={`s${i}`} d={d} {...stroke} />
      ))}
    </svg>
  );
}
