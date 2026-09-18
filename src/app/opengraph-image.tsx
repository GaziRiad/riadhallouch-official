import { ImageResponse } from "next/og";
import { getSiteSettings } from "@/sanity/queries";
import { fallbackSiteSettings } from "@/sanity/fallback";

export const alt = `${fallbackSiteSettings.name} — ${fallbackSiteSettings.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function formatStat(stat?: { value: number; prefix?: string; suffix?: string; decimals?: number }) {
  if (!stat) return "";
  return `${stat.prefix ?? ""}${stat.value.toFixed(stat.decimals ?? 0)}${stat.suffix ?? ""}`;
}

export default async function Image() {
  const settings = await getSiteSettings();
  const [first, second, , fourth] = settings.heroStats;

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
            {settings.availabilityBadge}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 96, fontWeight: 700, lineHeight: 1 }}>{settings.name}</span>
          <span style={{ fontSize: 32, color: "rgba(20,19,15,.66)", marginTop: 16, fontWeight: 300 }}>
            {settings.role}
          </span>
        </div>

        <div style={{ display: "flex", gap: 56 }}>
          {first ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 40, fontWeight: 700 }}>{formatStat(first)}</span>
              <span style={{ fontSize: 18, color: "rgba(20,19,15,.62)" }}>{first.label}</span>
            </div>
          ) : null}
          {second ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 40, fontWeight: 700 }}>{formatStat(second)}</span>
              <span style={{ fontSize: 18, color: "rgba(20,19,15,.62)" }}>{second.label}</span>
            </div>
          ) : null}
          {fourth ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 40, fontWeight: 700, color: "#00694f" }}>{formatStat(fourth)}</span>
              <span style={{ fontSize: 18, color: "rgba(20,19,15,.62)" }}>{fourth.label}</span>
            </div>
          ) : null}
        </div>
      </div>
    ),
    { ...size }
  );
}
