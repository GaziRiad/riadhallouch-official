/**
 * Applies drafted case-study copy — and screenshots of the live site — to
 * existing project documents by slug. Claude fills in CASE_STUDIES below
 * (one entry per project, keyed by the slug already created in the
 * Studio); running this applies it, no manual Studio editing needed.
 *
 * Usage: npm run update:projects
 * Requires SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_WRITE_TOKEN in
 * env (.env.local is loaded automatically) — the same ones seed-sanity.mts
 * uses. Screenshot capture needs Playwright's Chromium installed locally
 * (`npx playwright install chromium`) — if it isn't, text fields still
 * get applied and only the screenshot step is skipped, with a warning.
 *
 * This also runs in CI (see .github/workflows/update-sanity-content.yml)
 * on every push that touches this file, using a Playwright container
 * that already has the browser installed — so once the
 * SANITY_API_WRITE_TOKEN secret is set on the repo, this never needs to
 * be run by hand again.
 *
 * Only patches the fields listed per project; everything else on the
 * document (year, order, etc. if not listed) is left untouched. Refuses
 * to run for a slug that doesn't already exist as a project — create the
 * document in the Studio first, then run this to fill it in.
 */
import { createClient } from "@sanity/client";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

try {
  process.loadEnvFile(path.join(root, ".env.local"));
} catch {
  // .env.local is optional — env vars may already be set in the shell
  // (e.g. GitHub Actions secrets).
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

type ScreenshotSpec = {
  /** URL for the case study's cover image (hero shot). */
  cover: string;
  /** Up to 2 URLs for the case study's detail gallery. */
  details?: string[];
};

type SanityImageRef = {
  _type: "image";
  asset: { _type: "reference"; _ref: string };
};

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
  /** Explicit [] clears stale placeholder metrics rather than leaving them untouched. */
  metrics?: { value: string; label: string }[];
  liveUrl?: string;
  onHomepage?: boolean;
  featured?: boolean;
  screenshots?: ScreenshotSpec;
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
    // No verified performance/result numbers for this one yet — clearing
    // it explicitly rather than leaving it untouched, since the document
    // was duplicated from a seeded placeholder that had "28 days" / "$0"
    // sitting in this field.
    metrics: [],
    liveUrl: "https://www.wimbeetech.com/",
    onHomepage: true,
    featured: false,
    screenshots: {
      cover: "https://www.wimbeetech.com/",
      details: ["https://www.wimbeetech.com/boosters/profilink-en", "https://www.wimbeetech.com/contactUs"],
    },
  },
};

async function captureScreenshot(url: string): Promise<Buffer | null> {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    // networkidle only means requests have settled — it says nothing about
    // CSS/JS entrance animations (fade-ins, hero reveals) still running,
    // which is why an earlier capture came back with a blank hero. Give
    // those a moment to finish before taking the shot.
    await page.waitForTimeout(2500);
    return await page.screenshot({ type: "png" });
  } finally {
    await browser.close();
  }
}

async function resolveScreenshots(spec: ScreenshotSpec) {
  let browserAvailable = true;
  const tryCapture = async (url: string) => {
    if (!browserAvailable) return null;
    try {
      return await captureScreenshot(url);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (/executable doesn't exist|browserType\.launch/i.test(message)) {
        browserAvailable = false;
        console.warn(
          "  ! Playwright's Chromium isn't installed locally (run `npx playwright install chromium`) — skipping screenshots."
        );
      } else {
        console.warn(`  ! Failed to screenshot ${url}: ${message}`);
      }
      return null;
    }
  };

  const uploadIfCaptured = async (url: string): Promise<SanityImageRef | null> => {
    const buffer = await tryCapture(url);
    if (!buffer) return null;
    const asset = await client.assets.upload("image", buffer, {
      filename: `${new URL(url).hostname}-${Date.now()}.png`,
    });
    return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  };

  console.log(`  Capturing cover screenshot (${spec.cover})...`);
  const coverImage = await uploadIfCaptured(spec.cover);

  const detailImages: SanityImageRef[] = [];
  for (const url of spec.details?.slice(0, 2) ?? []) {
    console.log(`  Capturing detail screenshot (${url})...`);
    const image = await uploadIfCaptured(url);
    if (image) detailImages.push(image);
  }

  return { coverImage, detailImages };
}

const baseId = (id: string) => (id.startsWith("drafts.") ? id.slice("drafts.".length) : id);

async function main() {
  const slugs = Object.keys(CASE_STUDIES);
  if (!slugs.length) {
    console.log("CASE_STUDIES is empty — nothing to do.");
    return;
  }

  for (const slug of slugs) {
    // Fetch every matching _id, not just the first: a document can exist
    // as a published copy, a draft copy, or both — and Sanity's editor
    // always shows the draft over the published version when a draft
    // exists. Patching only the published id (as this used to do) left
    // Studio showing a stale draft with the old content, even though the
    // write itself "succeeded".
    const ids = await client.fetch<string[]>(`*[_type == "project" && slug.current == $slug]._id`, {
      slug,
    });

    if (!ids.length) {
      console.error(
        `✗ No project with slug "${slug}" found — create it in the Studio first (Projects → Create → set the slug), then re-run.`
      );
      continue;
    }

    const baseIds = [...new Set(ids.map(baseId))];
    if (baseIds.length > 1) {
      console.warn(
        `  ! Found ${baseIds.length} different documents with slug "${slug}" (not just a draft/published pair of the same one) — updating all of them. You likely have a duplicate to delete in the Studio.`
      );
    }

    const { screenshots, ...textFields } = CASE_STUDIES[slug];
    const patch: Record<string, unknown> = { ...textFields };

    if (screenshots) {
      console.log(`Capturing screenshots for "${slug}"...`);
      const { coverImage, detailImages } = await resolveScreenshots(screenshots);
      if (coverImage) patch.coverImage = coverImage;
      if (detailImages.length) patch.detailImages = detailImages;
    }

    for (const bid of baseIds) {
      // Patch whichever of the draft/published pair actually exist.
      const patched: string[] = [];
      for (const candidateId of [bid, `drafts.${bid}`]) {
        if (!ids.includes(candidateId)) continue;
        await client.patch(candidateId).set(patch).commit();
        patched.push(candidateId.startsWith("drafts.") ? "draft" : "published");
      }
      console.log(`✓ Updated "${slug}" (${bid}) — wrote: ${patched.join(" + ")}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
