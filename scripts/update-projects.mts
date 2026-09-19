/**
 * Applies drafted case-study copy to existing project documents by slug.
 * Claude fills in CASE_STUDIES below (one entry per project, keyed by the
 * slug you already created in the Studio) and you just run this — no
 * copy-pasting into 15 fields by hand.
 *
 * Usage: npm run update:projects
 * Requires SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_WRITE_TOKEN in
 * env (.env.local is loaded automatically) — the same ones seed-sanity.mts
 * uses.
 *
 * Only patches the fields listed per project; everything else on the
 * document (images, year, order, etc. if not listed) is left untouched.
 * Refuses to run for a slug that doesn't already exist as a project —
 * create the document in the Studio first, then run this to fill it in.
 */
import { createClient } from "@sanity/client";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

try {
  process.loadEnvFile(path.join(root, ".env.local"));
} catch {
  // .env.local is optional — env vars may already be set in the shell.
}

const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing SANITY_PROJECT_ID (or NEXT_PUBLIC_SANITY_PROJECT_ID) and/or SANITY_API_WRITE_TOKEN.\n" +
      "Set them in .env.local, then re-run: npm run update:projects"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-02-01",
  useCdn: false,
});

type ProjectPatch = {
  title?: string;
  meta?: string;
  gridCategory?: string;
  summary?: string;
  body?: string;
  narrativeProblem?: string;
  narrativeApproach?: string;
  narrativeResult?: string;
  stack?: string[];
  liveUrl?: string;
  onHomepage?: boolean;
  featured?: boolean;
};

// Add one entry per project as Claude drafts the copy — key is the slug
// you already created in the Studio.
const CASE_STUDIES: Record<string, ProjectPatch> = {
  wimbeetech: {
    title: "Wimbee",
    meta: "Corporate website · 8–10 weeks",
    gridCategory: "Web · Corporate",
    summary:
      "Full website rebuild for a Paris-based data & AI consultancy — from design handoff to a fast, content-managed Next.js site their team runs day to day.",
    body: "Wimbee is a data, AI, and digital-transformation consultancy operating across France, Tunisia, Poland, and Spain. I built their corporate website end to end in Next.js with Tailwind CSS for the front end, wired to Sanity as a headless CMS so their own team can publish and update content without touching code. The visual design was a close collaboration with designer Olfa Farhat.",
    narrativeProblem:
      "Wimbee needed a site that matched the seriousness of their work — enterprise data, AI, and governance consulting spanning four countries and several distinct products — without turning every content update into a developer request. That meant a build that looked and performed like a company operating at that level, but stayed editable by a non-technical marketing team.",
    narrativeApproach:
      "Olfa led the visual direction; I translated that into a responsive, componentized Next.js build and owned everything on the engineering side — the Sanity content schema, page performance, SEO structure, and deployment. Content that changes often (services, case studies, team, product pages) lives in Sanity so it's editable without a code deploy; the parts that shouldn't move — layout, navigation logic, design system — stayed in code. The project ran about 8–10 weeks from kickoff to launch.",
    narrativeResult:
      "Wimbee launched with a site that reflects the technical credibility of their consulting work: statically generated pages for fast loads, a CMS their team actually uses to keep content current, and a component system built to extend as they add new products and case studies.",
    stack: ["Next.js", "Tailwind CSS", "Sanity"],
    liveUrl: "https://www.wimbeetech.com/",
    onHomepage: true,
    featured: false,
  },
};

async function main() {
  const slugs = Object.keys(CASE_STUDIES);
  if (!slugs.length) {
    console.log("CASE_STUDIES is empty — nothing to do.");
    return;
  }

  for (const slug of slugs) {
    const id = await client.fetch<string | null>(
      `*[_type == "project" && slug.current == $slug][0]._id`,
      { slug }
    );

    if (!id) {
      console.error(
        `✗ No project with slug "${slug}" found — create it in the Studio first (Projects → Create → set the slug), then re-run.`
      );
      continue;
    }

    await client.patch(id).set(CASE_STUDIES[slug]).commit();
    console.log(`✓ Updated "${slug}" (${id})`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
