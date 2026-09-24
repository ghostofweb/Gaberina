import { MONOGRAM_G, WORDMARK_LETTERS, WORDMARK_VIEWBOX } from "./paths";

/** Standalone SVG markup for image generation (ImageResponse renders these via data URIs). */
export function monogramSvg(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle cx="100" cy="100" r="88" fill="none" stroke="${color}" stroke-width="2.4"/><circle cx="100" cy="100" r="80" fill="none" stroke="${color}" stroke-width="1.1"/>${MONOGRAM_G.map((d) => `<path fill="${color}" fill-rule="evenodd" d="${d}"/>`).join("")}</svg>`;
}

export function wordmarkSvg(color: string) {
  const paths = WORDMARK_LETTERS.flatMap((l) => l.paths.map((d) => `<path fill-rule="evenodd" d="${d}"/>`)).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${WORDMARK_VIEWBOX}" fill="${color}">${paths}</svg>`;
}

export const svgDataUri = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
