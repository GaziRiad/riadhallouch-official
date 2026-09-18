export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2026-02-01";

// Everything falls back to bundled placeholder content until these are
// set (see README for setup steps), so the site never ships a blank page
// just because Sanity hasn't been connected yet.
export const isSanityConfigured = Boolean(projectId);
