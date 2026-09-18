import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#faf8f4",
          color: "#14130f",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#00c08b" }} />
          <span
            style={{
              fontSize: 20,
              color: "#00694f",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Available for work
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 96, fontWeight: 700, lineHeight: 1 }}>{siteConfig.name}</span>
          <span style={{ fontSize: 32, color: "rgba(20,19,15,.66)", marginTop: 16, fontWeight: 300 }}>
            {siteConfig.role}
          </span>
        </div>

        <div style={{ display: "flex", gap: 56 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 40, fontWeight: 700 }}>30+</span>
            <span style={{ fontSize: 18, color: "rgba(20,19,15,.62)" }}>Projects delivered</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 40, fontWeight: 700 }}>5.00</span>
            <span style={{ fontSize: 18, color: "rgba(20,19,15,.62)" }}>Average rating</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 40, fontWeight: 700, color: "#00694f" }}>100%</span>
            <span style={{ fontSize: 18, color: "rgba(20,19,15,.62)" }}>Job success</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
