import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/sanity/queries";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await getSiteSettings();
  return {
    name: `${settings.name} — ${settings.role}`,
    short_name: settings.name,
    description: settings.description,
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f4",
    theme_color: "#faf8f4",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
