/**
 * Adds the two detail-gallery screenshots to ONE already-published
 * project, named explicitly on the command line.
 *
 * Why this is separate from update-projects.mts: that script is
 * deliberately create-only, because a run that patched every entry once
 * rewrote copy and re-captured covers across the whole portfolio as a
 * side effect of adding a single unrelated case study. Nothing in it may
 * ever touch an existing document again. But a project created before
 * its detail shots existed still needs them, so this tool does that one
 * job under three hard constraints:
 *
 *   1. The slug is a required argument. There is no default, no env
 *      fallback and no "run for everything" mode, so it is structurally
 *      incapable of sweeping the dataset.
 *   2. It writes exactly one field, `detailImages`, on documents whose
 *      slug matches that argument. Every other field is left alone.
 *   3. It refuses to run if the slug doesn't resolve to exactly one
 *      project (plus its draft, if one exists).
 *
 * Usage: npx tsx scripts/add-detail-shots.mts <slug> <source> [<source>]
 * A <source> is one of:
 *   https://example.com/page          capture that page at the top
 *   https://example.com :: text="Plans"   capture the section that selector
 *                                     names, scrolled into view — the shot
 *                                     a one-page marketing site actually
 *                                     needs, since everything worth showing
 *                                     sits below the fold
 *   file:scripts/assets/<slug>/shot.png   upload as-is, no navigation, for
 *                                     anything behind a login
 * At most two sources are used — the schema caps the gallery at two.
 * Sources may also come from DETAIL_SHOT_SOURCES, one per line, which is
 * how CI passes them: a selector can contain spaces, so argv word-splitting
 * would tear it in half.
 *
 * Pass --dry-run to capture the shots without writing anything to Sanity.
 * In CI the captures are pushed to the shot-previews branch either way, so
 * the framing can be looked at before it goes live.
 *
 * Also runs in CI via workflow_dispatch (.github/workflows/add-detail-shots.yml),
 * which is the only way it ever fires: no push trigger, so it cannot run
 * as a side effect of committing something else.
 *
 * The capture settings below intentionally mirror update-projects.mts
 * (1920×1080, consent dismissal, settle delay) so shots added later match
 * the ones taken at creation. They're duplicated rather than shared
 * because update-projects.mts runs its own main() on import.
 */
import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

try {
  process.loadEnvFile(path.join(root, ".env.local"));
} catch {
  // Optional — in CI the values come from repo secrets instead.
}

const argv = process.argv.slice(2).filter((a) => a !== "--dry-run");
const dryRun = process.argv.includes("--dry-run");
const [slug, ...argvSources] = argv;
const envSources = (process.env.DETAIL_SHOT_SOURCES ?? "").split("\n");
const sources = [...argvSources, ...envSources].map((s) => s.trim()).filter(Boolean);

if (!slug || !sources.length) {
  console.error(
    "Usage: npx tsx scripts/add-detail-shots.mts <slug> <source> [<source>]\n" +
      '  <source> = a URL, "<url> :: <selector>", or file:scripts/assets/<slug>/shot.png\n' +
      "  (sources may also be passed one per line in DETAIL_SHOT_SOURCES)"
  );
  process.exit(1);
}

const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

// A dry run never writes, so it needs no credentials — which is what
// makes it usable as a quick "is this the right framing?" check.
if (!dryRun && (!projectId || !token)) {
  console.error("Missing SANITY_PROJECT_ID and/or SANITY_API_WRITE_TOKEN.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2026-02-01", useCdn: false });

const CONSENT_BUTTON_SELECTORS = [
  'button:has-text("Accept all")',
  'button:has-text("Accept All")',
  'button:has-text("Accept")',
  'button:has-text("I agree")',
  'button:has-text("Tout accepter")',
  'button:has-text("J\'accepte")',
  "#onetrust-accept-btn-handler",
];

async function dismissCookieConsent(page: import("playwright").Page) {
  for (const selector of CONSENT_BUTTON_SELECTORS) {
    try {
      const button = page.locator(selector).first();
      if (await button.isVisible({ timeout: 1000 })) {
        await button.click({ timeout: 1000 });
        return;
      }
    } catch {
      // Not present — try the next one.
    }
  }
}

// Landing the heading flush against the top edge reads as a cut-off
// page rather than a section, so back off by this much and let the shot
// breathe.
const SECTION_HEADROOM = 120;

async function captureScreenshot(url: string, selector?: string): Promise<Buffer> {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    await dismissCookieConsent(page);
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(400);
    await page.mouse.wheel(0, -300);
    // networkidle says requests settled, not that entrance animations
    // finished — without this the hero comes back mid-fade or blank.
    await page.waitForTimeout(4000);

    if (selector) {
      const target = page.locator(selector).first();
      await target.waitFor({ state: "attached", timeout: 15000 });

      // Driven with real wheel events rather than scrollIntoView, because
      // a page can move its content with a transform while leaving
      // window.scrollY pinned at 0 — amuse.so does exactly that, and every
      // programmatic scroll against it silently no-ops, yielding a second
      // copy of the hero. A wheel event is what such a library listens
      // for, so it is the one instruction that works on both kinds of
      // page. Step toward the target and re-measure rather than computing
      // one jump, since smooth scrolling lands where it likes.
      let top = await target.evaluate((el) => el.getBoundingClientRect().top);
      for (let step = 0; step < 40 && Math.abs(top - SECTION_HEADROOM) > 12; step++) {
        const delta = top - SECTION_HEADROOM;
        await page.mouse.wheel(0, Math.max(-800, Math.min(800, delta)));
        await page.waitForTimeout(150);
        top = await target.evaluate((el) => el.getBoundingClientRect().top);
      }

      // Sections below the fold usually animate in on scroll, so this
      // wait is not optional the way the one above is.
      await page.waitForTimeout(2500);
      const settled = await target.evaluate((el) => Math.round(el.getBoundingClientRect().top));
      console.log(`    section heading settled ${settled}px from the top of the shot`);
      if (Math.abs(settled - SECTION_HEADROOM) > 200) {
        console.warn("    ! that is far from where it was aimed — check the capture before publishing.");
      }
    }

    return await page.screenshot({ type: "png" });
  } finally {
    await browser.close();
  }
}

type SanityImageRef = { _type: "image"; asset: { _type: "reference"; _ref: string } };

// A screenshot pipeline reports success the same way whether it caught the
// section or a blank mid-animation frame, so every capture is also written
// to disk when DETAIL_SHOT_OUTPUT_DIR is set. CI commits that directory to
// the shot-previews branch, which makes the result reviewable instead of
// merely green.
const outputDir = process.env.DETAIL_SHOT_OUTPUT_DIR;

function keepCopy(buffer: Buffer, name: string) {
  if (!outputDir) return;
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, name), buffer);
}

async function resolveSource(source: string): Promise<SanityImageRef> {
  if (source.startsWith("file:")) {
    const relPath = source.slice("file:".length);
    console.log(`  Uploading local file (${relPath})...`);
    const buffer = fs.readFileSync(path.resolve(root, relPath));
    const asset = await client.assets.upload("image", buffer, { filename: path.basename(relPath) });
    return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  }
  const [url, selector] = source.split(/\s*::\s*/, 2);
  console.log(`  Capturing (${url}${selector ? ` at ${selector}` : ""})...`);
  const buffer = await captureScreenshot(url, selector);
  const filename = `${new URL(url).hostname}-${Date.now()}.png`;
  keepCopy(buffer, filename);
  const asset = await client.assets.upload("image", buffer, { filename });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function main() {
  const ids = await client.fetch<string[]>(`*[_type == "project" && slug.current == $slug]._id`, {
    slug,
  });
  if (!ids.length) {
    console.error(`✗ No project with slug "${slug}". Nothing written.`);
    process.exit(1);
  }
  // A published doc and its draft share a slug; anything beyond that pair
  // means the slug is ambiguous and this shouldn't guess which to write.
  const published = ids.filter((id) => !id.startsWith("drafts."));
  if (published.length > 1) {
    console.error(`✗ Slug "${slug}" matches ${published.length} published documents. Nothing written.`);
    process.exit(1);
  }

  // The schema caps the gallery at two; extra arguments are dropped here
  // rather than rejected by Sanity after the uploads already happened.
  const wanted = sources.slice(0, 2);
  if (sources.length > wanted.length) {
    console.warn(`! ${sources.length} sources given, using the first ${wanted.length} (schema max).`);
  }

  if (dryRun) {
    console.log(`Dry run — capturing ${wanted.length} shot(s) for "${slug}", writing nothing:`);
    for (const source of wanted) {
      const [url, selector] = source.split(/\s*::\s*/, 2);
      if (source.startsWith("file:")) {
        console.log(`  (local file ${source.slice(5)} — nothing to capture)`);
        continue;
      }
      console.log(`  Capturing (${url}${selector ? ` at ${selector}` : ""})...`);
      const shot = await captureScreenshot(url, selector);
      keepCopy(shot, `${new URL(url).hostname}-${Date.now()}.png`);
    }
    console.log("Dry run complete. No document was touched.");
    return;
  }

  console.log(`Adding ${wanted.length} detail shot(s) to "${slug}":`);
  const detailImages: SanityImageRef[] = [];
  for (const source of wanted) {
    detailImages.push(await resolveSource(source));
  }

  for (const id of ids) {
    await client.patch(id).set({ detailImages }).commit();
    console.log(`✓ Set detailImages on ${id} (no other field touched).`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
