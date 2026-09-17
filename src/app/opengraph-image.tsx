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
          background: "#07070b",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(124,111,255,0.35), transparent 45%), radial-gradient(circle at 85% 85%, rgba(253,186,43,0.25), transparent 45%)",
          color: "#f5f5f7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#34d399" }} />
          <span style={{ fontSize: 22, color: "#9a9aa8", letterSpacing: 2 }}>
            AVAILABLE FOR FREELANCE &amp; FULL-TIME ROLES
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>{siteConfig.name}</span>
          <span style={{ fontSize: 34, color: "#c9c4ff", marginTop: 12 }}>{siteConfig.role}</span>
        </div>

        <div style={{ display: "flex", gap: 56 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 40, fontWeight: 700 }}>$14K+</span>
            <span style={{ fontSize: 20, color: "#9a9aa8" }}>Earned on Upwork</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 40, fontWeight: 700 }}>30+</span>
            <span style={{ fontSize: 20, color: "#9a9aa8" }}>Projects delivered</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 40, fontWeight: 700 }}>5.0/5</span>
            <span style={{ fontSize: 20, color: "#9a9aa8" }}>Average rating</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
