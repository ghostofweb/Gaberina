import { ImageResponse } from "next/og";
import { monogramSvg, svgDataUri } from "@/components/brand/svg-strings";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0c0b0a" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={svgDataUri(monogramSvg("#ede6da"))} width={132} height={132} alt="" />
      </div>
    ),
    size,
  );
}
