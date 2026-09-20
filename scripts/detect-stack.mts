/**
 * One-off research tool: loads a URL with Playwright and reports concrete
 * technical signals (response headers, framework fingerprints, CDN/asset
 * hosts, fonts, analytics) so Claude can write an accurate stack for a
 * case study instead of guessing. Read-only — touches nothing in Sanity.
 *
 * Usage: npx tsx scripts/detect-stack.mts <url> [<url> ...]
 * Also runs in CI via workflow_dispatch (see
 * .github/workflows/detect-stack.yml) since this sandbox's own network
 * can't reach arbitrary external sites.
 */
import { chromium } from "playwright";

const FRAMEWORK_SIGNALS: { name: string; test: (html: string, scripts: string[]) => boolean }[] = [
  { name: "Next.js", test: (html, scripts) => /__NEXT_DATA__|id="__next"/.test(html) || scripts.some((s) => s.includes("/_next/static/")) },
  { name: "Nuxt", test: (html) => /__NUXT__|window\.__nuxt/.test(html) },
  { name: "Gatsby", test: (html) => /id="___gatsby"/.test(html) },
  { name: "Remix", test: (html) => /__remixContext/.test(html) },
  { name: "Astro", test: (html) => /astro-island|data-astro-cid/.test(html) },
  { name: "SvelteKit", test: (html, scripts) => scripts.some((s) => s.includes("/_app/immutable/")) },
  { name: "WordPress", test: (html, scripts) => /wp-content|wp-json|name="generator" content="WordPress/.test(html) || scripts.some((s) => s.includes("wp-content")) },
  { name: "Webflow", test: (html) => /data-wf-site|data-wf-page|webflow\.js/.test(html) },
  { name: "Shopify", test: (html, scripts) => /Shopify\.shop|cdn\.shopify\.com/.test(html) || scripts.some((s) => s.includes("cdn.shopify.com")) },
  { name: "Squarespace", test: (html) => /squarespace-cdn\.com|data-sqs-/.test(html) },
  { name: "Wix", test: (html, scripts) => scripts.some((s) => s.includes("wixstatic.com")) },
  { name: "Framer", test: (html) => /framerusercontent\.com|data-framer-/.test(html) },
  { name: "Vue (no meta-framework detected)", test: (html) => /data-v-[0-9a-f]{6,}/.test(html) },
  { name: "React (no meta-framework detected)", test: (html) => /data-reactroot|data-reactid/.test(html) },
];

const CMS_SIGNALS: { name: string; test: (html: string, scripts: string[]) => boolean }[] = [
  { name: "Sanity", test: (html, scripts) => scripts.some((s) => s.includes("cdn.sanity.io")) || html.includes("cdn.sanity.io") },
  { name: "Contentful", test: (html, scripts) => scripts.some((s) => s.includes("images.ctfassets.net")) },
  { name: "Prismic", test: (html, scripts) => scripts.some((s) => s.includes("images.prismic.io")) },
  { name: "Strapi", test: (html) => /strapi/i.test(html) },
];

const ANALYTICS_SIGNALS: { name: string; test: (scripts: string[]) => boolean }[] = [
  { name: "Google Analytics / GA4", test: (scripts) => scripts.some((s) => s.includes("googletagmanager.com/gtag") || s.includes("google-analytics.com")) },
  { name: "Google Tag Manager", test: (scripts) => scripts.some((s) => s.includes("googletagmanager.com/gtm.js")) },
  { name: "Meta Pixel", test: (scripts) => scripts.some((s) => s.includes("connect.facebook.net")) },
  { name: "Plausible", test: (scripts) => scripts.some((s) => s.includes("plausible.io")) },
  { name: "Vercel Analytics", test: (scripts) => scripts.some((s) => s.includes("/_vercel/insights")) },
  { name: "LinkedIn Insight Tag", test: (scripts) => scripts.some((s) => s.includes("snap.licdn.com")) },
];

async function inspect(url: string) {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    const responseHeaders: Record<string, string> = {};
    page.on("response", (res) => {
      if (res.url() === url || res.url() === url.replace(/\/$/, "")) {
        Object.assign(responseHeaders, res.headers());
      }
    });

    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });

    const html = await page.content();
    const scripts = await page.$$eval("script[src], link[href]", (els) =>
      els.map((el) => el.getAttribute("src") || el.getAttribute("href") || "")
    );
    // Tailwind fingerprint: sample every class attribute on the page and
    // check what fraction of individual class tokens look like Tailwind
    // utilities (spacing/flex/color-scale/breakpoint-prefixed patterns).
    // A single match proves nothing (plenty of hand-rolled CSS uses
    // "flex"), so this only counts as a signal above a density threshold.
    const classTokens = await page.$$eval("[class]", (els) =>
      els.flatMap((el) => el.className.toString().split(/\s+/).filter(Boolean))
    );
    const tailwindUtilityPattern =
      /^(sm|md|lg|xl|2xl|hover|focus|dark|group-hover):.+|^(flex|grid|hidden|block|inline-flex)$|^(px|py|pt|pb|pl|pr|mx|my|mt|mb|ml|mr|gap|space-x|space-y)-\d+(\.\d+)?$|^(text|bg|border|ring)-(\w+-)?(50|100|200|300|400|500|600|700|800|900|950)$|^(rounded|shadow)(-\w+)?$|^w-(full|screen|\d+|\[.+\])$|^(items|justify)-(start|end|center|between|around)$/;
    const tailwindHits = classTokens.filter((t) => tailwindUtilityPattern.test(t));
    const tailwindDensity = classTokens.length ? tailwindHits.length / classTokens.length : 0;
    const fontLinks = await page.$$eval('link[href*="font"]', (els) =>
      els.map((el) => el.getAttribute("href") || "")
    );
    const title = await page.title();
    const metaGenerator = await page
      .locator('meta[name="generator"]')
      .getAttribute("content")
      .catch(() => null);
    const metaDescription = await page
      .locator('meta[name="description"]')
      .getAttribute("content")
      .catch(() => null);
    const visibleText = await page.evaluate(() => document.body.innerText);

    console.log(`\n=== ${url} ===`);
    console.log(`Title: ${title}`);
    if (metaDescription) console.log(`Meta description: ${metaDescription}`);
    if (metaGenerator) console.log(`<meta name="generator">: ${metaGenerator}`);

    console.log("\nVisible page text (for content research):");
    console.log(
      visibleText
        .replace(/\n{3,}/g, "\n\n")
        .trim()
        .slice(0, 6000)
    );

    console.log("\nFramework signals found:");
    const frameworkHits = FRAMEWORK_SIGNALS.filter((f) => f.test(html, scripts));
    console.log(frameworkHits.length ? frameworkHits.map((f) => `  - ${f.name}`).join("\n") : "  (none matched)");

    console.log("\nTailwind CSS heuristic:");
    console.log(
      `  ${classTokens.length} class tokens sampled, ${tailwindHits.length} look like Tailwind utilities (${(tailwindDensity * 100).toFixed(1)}%)`
    );
    console.log(
      `  ${tailwindDensity > 0.3 ? "Likely Tailwind" : tailwindDensity > 0.1 ? "Possibly Tailwind (low confidence)" : "Probably not Tailwind, or utilities are minified/renamed"}`
    );

    console.log("\nCMS signals found:");
    const cmsHits = CMS_SIGNALS.filter((f) => f.test(html, scripts));
    console.log(cmsHits.length ? cmsHits.map((f) => `  - ${f.name}`).join("\n") : "  (none matched)");

    console.log("\nAnalytics/marketing tags found:");
    const analyticsHits = ANALYTICS_SIGNALS.filter((f) => f.test(scripts));
    console.log(analyticsHits.length ? analyticsHits.map((f) => `  - ${f.name}`).join("\n") : "  (none matched)");

    console.log("\nFonts loaded via <link>:");
    console.log(fontLinks.length ? fontLinks.map((f) => `  - ${f}`).join("\n") : "  (none via <link> — may be self-hosted/CSS @font-face)");

    console.log("\nRelevant response headers:");
    for (const key of ["server", "x-powered-by", "x-vercel-id", "x-vercel-cache", "x-nf-request-id", "cf-ray", "via"]) {
      if (responseHeaders[key]) console.log(`  ${key}: ${responseHeaders[key]}`);
    }

    console.log("\nDistinct script/asset hosts:");
    const hosts = new Set(
      scripts
        .filter((s) => s.startsWith("http"))
        .map((s) => {
          try {
            return new URL(s).hostname;
          } catch {
            return null;
          }
        })
        .filter((h): h is string => Boolean(h))
    );
    console.log([...hosts].map((h) => `  - ${h}`).join("\n") || "  (none external)");
  } finally {
    await browser.close();
  }
}

async function main() {
  const urls = process.argv.slice(2);
  if (!urls.length) {
    console.error("Usage: npx tsx scripts/detect-stack.mts <url> [<url> ...]");
    process.exit(1);
  }
  for (const url of urls) {
    await inspect(url);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
