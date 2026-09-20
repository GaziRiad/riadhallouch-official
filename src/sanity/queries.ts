import { cache } from "react";
import { sanityFetch } from "./client";
import { fallbackProjects, fallbackSiteSettings, fallbackTestimonials } from "./fallback";
import type { Project, SiteSettings, Testimonial } from "./types";

// coalesce(...) guards optional scalar fields the same way: GROQ returns
// null (not the value simply being absent) for a field left blank in an
// explicit {} projection, and "${null}" stringifies to the literal text
// "null" wherever it lands in a template literal.
const SITE_SETTINGS_QUERY = /* groq */ `
  *[_type == "siteSettings"][0]{
    name, role, tagline, description, availabilityBadge, location, email, url,
    keywords, calLink, headshot, links,
    "cvUrl": select(defined(cvFile.asset) => cvFile.asset->url, null),
    heroStats[]{
      label, value,
      "prefix": coalesce(prefix, ""),
      "suffix": coalesce(suffix, ""),
      "decimals": coalesce(decimals, 0),
      "accent": coalesce(accent, false)
    },
    widgetStats, techStack, moneyLine, linkedinPanel,
    currentlyItems[]{label, "accent": coalesce(accent, false)}
  }
`;

// coalesce(...) guards against optional array fields left empty in the
// Studio — Sanity returns null (not []) for an unset array, which would
// otherwise crash every .map()/.length call downstream.
const PROJECT_FIELDS = /* groq */ `
  "slug": slug.current, index, title, meta, gridCategory, year, summary, body,
  coverImage, "detailImages": coalesce(detailImages, []),
  "videoUrl": video.asset->url,
  narrativeProblem, narrativeApproach, narrativeResult,
  "stack": coalesce(stack, []), "metrics": coalesce(metrics, []),
  liveUrl, repoUrl, featured, onHomepage,
  testimonialQuote, testimonialName, testimonialRole
`;

const ALL_PROJECTS_QUERY = /* groq */ `
  *[_type == "project"] | order(order asc) { ${PROJECT_FIELDS} }
`;

const HOMEPAGE_PROJECTS_QUERY = /* groq */ `
  *[_type == "project" && onHomepage == true] | order(order asc) { ${PROJECT_FIELDS} }
`;

const PROJECT_BY_SLUG_QUERY = /* groq */ `
  *[_type == "project" && slug.current == $slug][0] { ${PROJECT_FIELDS} }
`;

const PROJECT_SLUGS_QUERY = /* groq */ `
  *[_type == "project" && defined(slug.current)]{ "slug": slug.current }
`;

const TESTIMONIALS_QUERY = /* groq */ `
  *[_type == "testimonial"] | order(order asc) { quote, name, role }
`;

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const data = await sanityFetch<Partial<SiteSettings>>(SITE_SETTINGS_QUERY);
  if (!data) return fallbackSiteSettings;
  return {
    ...fallbackSiteSettings,
    ...data,
    links: { ...fallbackSiteSettings.links, ...data.links },
    widgetStats: { ...fallbackSiteSettings.widgetStats, ...data.widgetStats },
    linkedinPanel: { ...fallbackSiteSettings.linkedinPanel, ...data.linkedinPanel },
    cvUrl: data.cvUrl || fallbackSiteSettings.cvUrl,
    heroStats: data.heroStats?.length ? data.heroStats : fallbackSiteSettings.heroStats,
    techStack: data.techStack?.length ? data.techStack : fallbackSiteSettings.techStack,
    keywords: data.keywords?.length ? data.keywords : fallbackSiteSettings.keywords,
    currentlyItems: data.currentlyItems?.length
      ? data.currentlyItems
      : fallbackSiteSettings.currentlyItems,
  };
});

export const getAllProjects = cache(async (): Promise<Project[]> => {
  const data = await sanityFetch<Project[]>(ALL_PROJECTS_QUERY);
  return data?.length ? data : fallbackProjects;
});

export const getHomepageProjects = cache(async (): Promise<Project[]> => {
  const data = await sanityFetch<Project[]>(HOMEPAGE_PROJECTS_QUERY);
  return data?.length ? data : fallbackProjects.filter((p) => p.onHomepage);
});

export const getProjectBySlug = cache(async (slug: string): Promise<Project | null> => {
  const data = await sanityFetch<Project>(PROJECT_BY_SLUG_QUERY, { slug });
  return data || fallbackProjects.find((p) => p.slug === slug) || null;
});

export const getProjectSlugs = cache(async (): Promise<string[]> => {
  const data = await sanityFetch<{ slug: string }[]>(PROJECT_SLUGS_QUERY, {}, { revalidate: 3600 });
  const slugs = data?.map((p) => p.slug);
  return slugs?.length ? slugs : fallbackProjects.map((p) => p.slug);
});

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  const data = await sanityFetch<Testimonial[]>(TESTIMONIALS_QUERY);
  return data?.length ? data : fallbackTestimonials;
});
