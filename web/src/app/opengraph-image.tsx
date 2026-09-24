import { ImageResponse } from "next/og";
import { monogramSvg, svgDataUri, wordmarkSvg } from "@/components/brand/svg-strings";

export const alt = "Gaberina — Maison de Parfum";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 56,
          background: "radial-gradient(70% 80% at 50% 40%, #2a2016 0%, #0c0b0a 70%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={svgDataUri(monogramSvg("#c6a15b"))} width={120} height={120} alt="" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={svgDataUri(wordmarkSvg("#ede6da"))} width={760} height={130} alt="" />
        <div style={{ color: "#8e867b", fontSize: 22, letterSpacing: 8, textTransform: "uppercase" }}>Maison de Parfum</div>
      </div>
    ),
    size,
  );
}
