/**
 * One-time bootstrap: pushes the site's bundled placeholder content (see
 * src/sanity/fallback.ts) into a fresh Sanity dataset, plus the bundled
 * headshot photo and CV, so the Studio opens with something to edit
 * instead of a blank slate.
 *
 * Usage: npm run seed:sanity
 * Requires SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_WRITE_TOKEN in
 * env (a local .env.local is fine — this script loads it itself). Get a
 * write token from https://www.sanity.io/manage → API → Tokens.
 *
 * Safe to re-run: refuses to touch a dataset that already has content
 * unless you pass --force.
 */
import { createClient } from "@sanity/client";
import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fallbackProjects, fallbackSiteSettings, fallbackTestimonials } from "../src/sanity/fallback";

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
const force = process.argv.includes("--force");

if (!projectId || !token) {
  console.error(
    "Missing SANITY_PROJECT_ID (or NEXT_PUBLIC_SANITY_PROJECT_ID) and/or SANITY_API_WRITE_TOKEN.\n" +
      "Set them in .env.local, then re-run: npm run seed:sanity"
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

async function main() {
  const existing = await client.fetch<number>(
    `count(*[_type in ["siteSettings", "project", "testimonial"]])`
  );
  if (existing > 0 && !force) {
    console.error(
      `Dataset "${dataset}" already has ${existing} document(s) of these types. ` +
        `Re-run with --force to seed anyway (this will not delete anything, but may create duplicates).`
    );
    process.exit(1);
  }

  console.log("Uploading headshot photo...");
  const headshotPath = path.join(root, "public/images/riad.jpg");
  const headshotAsset = existsSync(headshotPath)
    ? await client.assets.upload("image", createReadStream(headshotPath), { filename: "riad.jpg" })
    : null;

  console.log("Uploading CV PDF...");
  const cvPath = path.join(root, "public/cv-riad-hallouch.pdf");
  const cvAsset = existsSync(cvPath)
    ? await client.assets.upload("file", createReadStream(cvPath), {
        filename: "cv-riad-hallouch.pdf",
        contentType: "application/pdf",
      })
    : null;

  console.log("Writing site settings...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    ...fallbackSiteSettings,
    // cvUrl is resolved from cvFile at query time — drop it, it's not a schema field.
    cvUrl: undefined,
    headshot: headshotAsset
      ? { _type: "image", asset: { _type: "reference", _ref: headshotAsset._id } }
      : undefined,
    cvFile: cvAsset ? { _type: "file", asset: { _type: "reference", _ref: cvAsset._id } } : undefined,
  });

  console.log(`Writing ${fallbackProjects.length} projects...`);
  for (const [i, project] of fallbackProjects.entries()) {
    await client.create({
      _type: "project",
      title: project.title,
      slug: { _type: "slug", current: project.slug },
      index: project.index,
      meta: project.meta,
      gridCategory: project.gridCategory,
      year: project.year,
      summary: project.summary,
      body: project.body,
      narrativeProblem: project.narrativeProblem,
      narrativeApproach: project.narrativeApproach,
      narrativeResult: project.narrativeResult,
      stack: project.stack,
      metrics: project.metrics,
      featured: project.featured ?? false,
      onHomepage: project.onHomepage ?? false,
      order: i,
    });
  }

  console.log(`Writing ${fallbackTestimonials.length} testimonials...`);
  for (const [i, t] of fallbackTestimonials.entries()) {
    await client.create({
      _type: "testimonial",
      quote: t.quote,
      name: t.name,
      role: t.role,
      order: i,
    });
  }

  console.log("\nDone. Open the Studio and replace the placeholder copy with the real thing.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
