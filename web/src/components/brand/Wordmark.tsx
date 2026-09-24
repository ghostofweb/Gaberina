import type { SVGProps } from "react";
import { WORDMARK_LETTERS, WORDMARK_VIEWBOX } from "./paths";

type Props = SVGProps<SVGSVGElement> & { title?: string };

/** The GABERINA wordmark. Each letter is its own <g data-letter> so it can be animated. */
export function Wordmark({ title = "Gaberina", ...props }: Props) {
  return (
    <svg viewBox={WORDMARK_VIEWBOX} fill="currentColor" role="img" aria-label={title} {...props}>
      {WORDMARK_LETTERS.map((letter, i) => (
        <g key={i} data-letter={letter.char}>
          {letter.paths.map((d, j) => (
            <path key={j} fillRule="evenodd" d={d} />
          ))}
        </g>
      ))}
    </svg>
  );
}
