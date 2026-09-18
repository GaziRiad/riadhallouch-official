import type { MetadataRoute } from "next";
import { getSiteSettings, getAllProjects } from "@/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [settings, projects] = await Promise.all([getSiteSettings(), getAllProjects()]);

  return [
    { url: settings.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${settings.url}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((project) => ({
      url: `${settings.url}/work/${project.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    { url: `${settings.url}/writing`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: `${settings.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  ];
}
