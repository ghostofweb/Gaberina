import type { SVGProps } from "react";
import { MONOGRAM_G } from "./paths";

/** The G monogram in its double ring. Rings carry data-ring so they can be drawn in. */
export function Monogram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Gaberina" {...props}>
      <circle data-ring cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeWidth="2.4" pathLength={1} />
      <circle data-ring cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1.1" pathLength={1} />
      <g data-glyph fill="currentColor">
        {MONOGRAM_G.map((d, i) => (
          <path key={i} fillRule="evenodd" d={d} />
        ))}
      </g>
    </svg>
  );
}
