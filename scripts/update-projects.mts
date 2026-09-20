/**
 * Applies drafted case-study copy — and screenshots of the live site — to
 * project documents by slug, keyed in CASE_STUDIES below. Creates the
 * document if the slug doesn't exist yet (auto-assigning the next index
 * and sort order), otherwise patches the existing one — no manual Studio
 * step required either way.
 *
 * A screenshot entry can also be `{ file: "assets/<slug>/name.png" }`
 * instead of a URL, for pages the pipeline can't capture itself (an
 * admin dashboard, a logged-in account page). Drop the image under
 * scripts/assets/<slug>/ and it's uploaded as-is — no live navigation.
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
 * On an existing document, only patches the fields listed per project —
 * everything else (year, order, etc. if not listed) is left untouched.
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

/**
 * Either a live URL to capture with Playwright (the usual case), or a
 * `{ file }` pointing at an image already committed under
 * scripts/assets/<slug>/ — for pages the pipeline can't reach itself
 * (auth-gated admin/user panels, etc.). Drop the screenshot in that
 * folder, reference it here, and it's uploaded as-is, no capture step.
 */
type ScreenshotSource = string | { file: string };

type ScreenshotSpec = {
  /** Cover image (hero shot) — usually the live homepage. */
  cover: ScreenshotSource;
  /** Up to 2 sources for the case study's detail gallery. */
  details?: ScreenshotSource[];
};

type SanityImageRef = {
  _type: "image";
  asset: { _type: "reference"; _ref: string };
};

type ProjectPatch = {
  title?: string;
  meta?: string;
  gridCategory?: string;
  /** Only used if the slug doesn't exist yet and this creates a new document. */
  year?: string;
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
  /** Optional local video file (e.g. "scripts/assets/<slug>/demo.mp4"), uploaded as a Sanity file asset and rendered as a native, click-to-play video on the case study page. */
  videoFile?: string;
  /** Optional featured pull-quote shown at the end of the case study page (not the homepage testimonials marquee). */
  testimonialQuote?: string;
  testimonialName?: string;
  testimonialRole?: string;
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
  // Researched via scripts/detect-stack.mts (this sandbox can't reach the
  // site directly) — Next.js + Tailwind confirmed by class-name density,
  // Vercel confirmed via response headers, no CMS fingerprint matched.
  // Year defaults to the current year in update-projects.mts since it
  // isn't independently verifiable from the live site.
  stratalytic: {
    title: "Stratalytic",
    meta: "AI consultancy website · Solo build",
    gridCategory: "Web · AI Consultancy",
    summary:
      "Bilingual marketing site for a Dutch data science and AI consultancy — built solo on Next.js, structured around proving ROI before a prospect ever talks to sales.",
    body: "Stratalytic is a Netherlands-based data science and AI consultancy that builds forecasting models, workflow automation, and the data infrastructure underneath both for SMEs — with a distinctive angle: they combine implementation with WBSO and other Dutch R&D subsidy programs to cut a client's net cost. I built their site solo, end to end, in Next.js on Vercel: a Dutch/English site with a repeatable case-study template, a booking flow that skips the usual contact form, and content built around how the business actually sells — proof before a proposal.",
    narrativeProblem:
      "An AI consultancy selling forecasting and automation work has a narrower credibility problem than most B2B sites: the visitor is often technical enough to be skeptical of vague AI claims. Stratalytic's actual differentiator — a free scoping call that ends in real numbers, and stacking government subsidies to lower the net price — needed to read clearly in Dutch and English both, not as a site with a translation bolted onto one 'real' language.",
    narrativeApproach:
      "I built the Dutch and English versions as equal, first-class routes in the same Next.js codebase rather than a translated layer sitting on top of one primary site. The case studies — a car-parts retailer's quote-prediction model, a manufacturer's demand forecasting, a retailer's personalization engine, among others — follow one repeatable template: client and sector up top, the problem stated plainly, the technical approach as numbered steps, then a results grid with a client quote. A new client win goes in without redesigning a page each time. The site also skips the usual contact-form funnel: the primary path from almost any page is straight into booking a 30-minute call, matching how Stratalytic actually wants to sell — a real conversation, not a form sitting in a queue.",
    narrativeResult:
      "Both language versions run from one Next.js codebase on Vercel, with case-study and service pages statically generated for fast loads. The homepage leads with real client numbers — €778K saved, 28% higher conversion, 84% quote-prediction accuracy — directly into the booking flow, and the case-study template has already absorbed five client wins across automotive, retail, manufacturing, and travel without a single one-off page build.",
    stack: ["Next.js", "Tailwind CSS", "Vercel"],
    liveUrl: "https://stratalytic.nl/",
    onHomepage: true,
    featured: false,
    screenshots: {
      cover: "https://stratalytic.nl/",
      details: ["https://stratalytic.nl/cases/retailer-personalization", "https://stratalytic.nl/subsidie-wbso"],
    },
  },
  // Researched via scripts/detect-stack.mts — Next.js + Tailwind + Vercel
  // confirmed the same way as the others, and this one also turned up a
  // genuine Sanity fingerprint (cdn.sanity.io as an asset host on every
  // page checked), unlike Stratalytic where nothing matched. Year taken
  // from the site's own footer copyright ("2025 © All rights reserved"),
  // not defaulted.
  tujikuze: {
    title: "Tujikuze",
    meta: "Ethical fashion production site · Solo build",
    gridCategory: "Web · Ethical Fashion",
    year: "2025",
    summary:
      "A B2B production and impact site for a Kenyan artisan fashion collective — built to land global brand partnerships, backed by a Sanity-managed case-study system for stories like a Karl Lagerfeld collaboration.",
    body: "Tujikuze is a Kenyan social enterprise — a partnership of four local companies working with artisan groups across the country — that produces bags, accessories, and craft techniques (beadwork, crochet, macramé, metal engraving) for fashion brands, under the umbrella of the UN's Ethical Fashion Initiative. I built their site solo in Next.js with Tailwind CSS, wired to Sanity so their team can add new case studies and materials without a developer. The site's job is straightforward: convince a brand's sourcing team that Tujikuze can deliver artisanal work at real production scale, then prove it with case studies.",
    narrativeProblem:
      "Tujikuze's pitch is unusual for a production partner: purpose-driven manufacturing at real commercial scale, not a boutique craft shop. That needed a site carrying two audiences at once — brand sourcing teams evaluating capacity, materials, and reliability, and a general audience reading the impact story — without the craft-and-impact side undercutting the 'we can actually deliver at scale' side. It also needed a way to keep adding case studies — a Karl Lagerfeld collaboration, a 105,000-unit order for an Italian retailer, their own in-house brand launch — without a rebuild each time one landed.",
    narrativeApproach:
      "I structured the site around what a sourcing team checks first — the offer (materials, techniques, production capabilities) and the impact story — before getting to case studies and resources. Content lives in Sanity: case studies, materials, and the resources section are all editable without touching code, which matters here specifically because the case-study list is the site's strongest sales asset and needed to grow on Tujikuze's own timeline, not a dev team's. Built in Next.js with Tailwind CSS, deployed on Vercel.",
    narrativeResult:
      "The site runs a growing case-study library — from a 105,000-unit beaded-tassel order for Conad Nord Ovest to a Karl Lagerfeld x Amber Valletta capsule collaboration — alongside Tujikuze's own product brand, Hands Of Fashion, all content-managed rather than hardcoded. A new client win or brand launch goes into Sanity, not into a code review.",
    stack: ["Next.js", "Tailwind CSS", "Sanity"],
    liveUrl: "https://tujikuze.com/",
    onHomepage: true,
    featured: false,
    screenshots: {
      cover: "https://tujikuze.com/",
      details: [
        "https://tujikuze.com/ressources/karl-lagerfeld-x-amber-valletta-ss-2025-produced-with-efi",
        "https://tujikuze.com/ressources/launching-hands-of-fashion-a-brand-by-the-artisans-of-the-ethical-fashion-initiative",
      ],
    },
  },
  // Researched via scripts/detect-stack.mts — Next.js confirmed, Tailwind
  // confirmed by class-name density (37.4%), Vercel confirmed via the
  // x-vercel-id response header (Cloudflare sits in front as DNS/CDN, not
  // the host), no CMS fingerprint matched — content is served by a custom
  // admin system, not a headless CMS. Year from the site's own footer
  // copyright ("© 2026 PRIMEPC"). The admin "Control Center" and customer
  // account screenshots came from Riad directly (auth-gated, the pipeline
  // can't log in) as local files under scripts/assets/primepc/ — see the
  // `{ file }` screenshot source below. Deliberately no metrics field:
  // the admin dashboard shows a small, early order volume (mostly
  // cancelled/failed test orders), so there's no verified result number
  // worth putting on the case study yet.
  primepc: {
    title: "PrimePC",
    meta: "E-commerce platform · Solo build",
    gridCategory: "Web · E-commerce",
    year: "2026",
    summary:
      "A custom-built e-commerce platform for an Algerian laptop and gaming-gear retailer — storefront, cash-on-delivery checkout, and a self-built admin system to run inventory, orders, and sales, all in one Next.js codebase.",
    body: "PrimePC is an Algerian e-commerce retailer selling laptops — mostly refurbished business-grade Lenovo, HP, and Dell models — plus gaming and accessory gear, shipping nationwide with cash-on-delivery. I built the platform end to end in Next.js with Tailwind CSS on Vercel: the storefront, cart, wishlist, and customer accounts, plus a custom admin system — no Shopify, no WooCommerce, no third-party CMS underneath any of it. Inventory, orders, and site content are all managed through an admin dashboard built specifically for how this store actually runs.",
    narrativeProblem:
      "Algerian e-commerce runs on different rules than a typical Shopify build: cash-on-delivery is the default, so trust is built by letting people inspect a product before they pay rather than by a checkout page; delivery splits between paid home delivery and a free 'Stop Desk' pickup point; and the core inventory — refurbished corporate laptops bought and resold at a markup — turns over fast enough that stock status has to be accurate in real time. None of the off-the-shelf platforms map cleanly onto that without expensive workarounds, and PrimePC needed something that could run the actual business day to day, not just display a catalog.",
    narrativeApproach:
      "I built the storefront and a full admin system from scratch in one Next.js codebase rather than layering custom logic on top of Shopify or WooCommerce. The storefront handles category browsing (gaming, professional, student laptops, accessories), stock-aware add-to-cart, wishlist, and a checkout built around cash-on-delivery rather than a card-first flow. The admin side — a 'Control Center' — is the part that actually runs the business: live stock and order counts, a 30-day sales and revenue overview, an order-status breakdown (confirmed, shipped, delivered, cancelled), and product-level conversion tracking from views through cart adds to checkout starts, so PrimePC can see which listings are actually converting, not just which ones get clicks.",
    narrativeResult:
      "PrimePC runs as a single Next.js codebase on Vercel with no third-party e-commerce platform underneath it — storefront, cash-on-delivery checkout, customer accounts, and a self-built admin dashboard giving full visibility into stock, orders, and per-product conversion, all in one system built and controlled end to end.",
    stack: ["Next.js", "Tailwind CSS", "Vercel"],
    liveUrl: "https://primepcdz.com/",
    onHomepage: true,
    featured: false,
    screenshots: {
      cover: "https://primepcdz.com/",
      details: [{ file: "scripts/assets/primepc/admin-control-center.webp" }, { file: "scripts/assets/primepc/account-details.png" }],
    },
  },
  // Researched via scripts/detect-stack.mts — Next.js confirmed (framework
  // signal + x-powered-by: Next.js header), Tailwind confirmed by class-name
  // density (44.6% homepage, up to 62.4% on /success-stories), no CMS
  // fingerprint on the homepage. Unlike the Vercel-hosted projects, response
  // headers show `server: nginx` behind a Plesk panel and no external
  // script/asset hosts at all — this one is self-hosted, not on a managed
  // platform, with no third-party CDN or analytics layered on top. (One
  // exception: /success-stories alone does turn up a Sanity fingerprint —
  // that section is CMS-backed while the rest of the site is static. Not
  // reflected in `stack` below since it isn't the site-wide story.)
  // No year given (nothing in the captured page text pins one down) — left
  // to default to the current year, same as Stratalytic. No metrics field:
  // the real numbers on the site (1k+ users, 15k+ cameras, 2B images/min)
  // are Holocrow's own platform stats, not results of this build — kept in
  // the narrative prose instead of the stat-block field, so they don't read
  // as achievements of the case study itself. Cover is the live homepage —
  // genuinely the "Beyond Watching" hero Riad asked to use as the main shot,
  // confirmed as the first thing in the page's own DOM order via
  // detect-stack's text dump, so the pipeline's top-of-page capture gets it
  // without needing a supplied file. /solutions and /success-stories were
  // verified live (two guessed slugs, /how-it-works and /about-us, both
  // 404'd and were dropped) before being used as detail shots.
  holocrow: {
    title: "Holocrow",
    meta: "AI computer vision website · Solo build",
    gridCategory: "Web · Computer Vision",
    summary:
      "Marketing site for an AI computer-vision platform that plugs into a facility's existing CCTV cameras — turning camera feeds into retail analytics, safety alerts, and security detection across four verticals, no new hardware required.",
    body: "Holocrow is a computer-vision company building deep-learning models that turn a facility's existing CCTV feeds into structured data — visitor counts, PPE compliance, restricted-area breaches, stock levels, and more — across four verticals: Retail & FMCG, Operational Excellence, Workplace Safety, and Security. I built their marketing site solo in Next.js with Tailwind CSS, self-hosted on their own server rather than a managed platform. The job was making a genuinely wide product — dozens of distinct detection features spanning four industries — read clearly to four different kinds of buyers on one homepage.",
    narrativeProblem:
      "Holocrow's product covers an unusually wide feature surface: visitor counting and heatmaps for retail, PPE and machine-interaction monitoring for workplace safety, facial recognition and crowd analysis for security, stock and packaging checks for operations — all running on cameras a customer already owns. A retail buyer and a safety officer are looking for completely different things on the same homepage, and 'plug into your existing CCTV, no new hardware' is the kind of claim that needs to read as credible and specific, not like marketing shorthand for something more complicated to actually set up.",
    narrativeApproach:
      "I organized the site around Holocrow's own four verticals — Retail & FMCG, Operational Excellence, Workplace Safety, Security — each with its own feature breakdown, rather than blending everything into one generic capabilities list. The 'how it works' section stays to three concrete steps (connect your cameras, pick what to track, get alerts) to keep the actual mechanics in front of the pitch instead of buried under it. Built in Next.js with Tailwind CSS, self-hosted on Holocrow's own infrastructure rather than a managed platform like Vercel, with no third-party CDN or analytics layered on top.",
    narrativeResult:
      "Holocrow's site runs as a self-hosted Next.js build serving four distinct buyer journeys from one homepage, backed by a real success-stories library — a nationwide wildfire-detection network for Turkey's Directorate of Forestry, smart-city monitoring across Istanbul's 100,000+ municipal cameras, a 1,100-camera freezer-cabinet tracker feeding straight into Unilever's ERP, and a 4,275-camera planogram-validation rollout for Vodafone, among others. It leads with the company's own scale — 1,000+ active users, 15,000+ connected cameras, 2 billion images processed per minute — real numbers from Holocrow's deployed platform, not from this build.",
    stack: ["Next.js", "Tailwind CSS"],
    liveUrl: "https://holocrow.com/",
    onHomepage: true,
    featured: false,
    screenshots: {
      cover: "https://holocrow.com/",
      details: ["https://holocrow.com/solutions", "https://holocrow.com/success-stories"],
    },
  },
  // Researched via scripts/detect-stack.mts — no framework fingerprint
  // matched (not Next.js/Nuxt/Gatsby/etc.) and the Tailwind heuristic came
  // back at 0%, so this is described honestly as a hand-built HTML/CSS/JS
  // site rather than guessing a framework. Hosted on Netlify (server
  // header), Google Analytics via GTM, one script loaded from unpkg.com.
  // Year "2024" from the site's own footer copyright. This was one of
  // Riad's earliest client projects — Camille designed it herself (she's a
  // product designer) and Riad built it; she's been a repeat client since,
  // which the copy mentions directly since Riad asked for it explicitly.
  // Her testimonial (the one about this project specifically, not her
  // more general LinkedIn recommendation) goes in the new testimonial*
  // fields, which render as a featured pull-quote at the end of the case
  // study page — see project.ts / work/[slug]/page.tsx. /about and
  // /portfolio verified live (rich content on both — /portfolio even
  // lists her own real case studies with real results) before use as
  // detail shots; /contact was too sparse to bother with, and the
  // schema only fits two anyway.
  "camille-brunette": {
    title: "Camille Brunette",
    meta: "Design portfolio website · Solo build",
    gridCategory: "Web · Portfolio",
    year: "2024",
    summary:
      "A personal portfolio site for a London-based product designer, built pixel-accurate to her own UX/UI designs — one of my very first client projects, and the start of a working relationship that's continued for years since.",
    body: "Camille Brunette is a London-based product designer — she designs the case studies, brand work, and UI shown on her own portfolio; I built the site that presents it. This was one of the very first client projects I ever took on, hand-built in HTML, CSS, and JavaScript and deployed on Netlify — no framework overhead needed for a fast, focused portfolio site. Camille has been a repeat client ever since, and this project is where that relationship started.",
    narrativeProblem:
      "A product designer's portfolio has a specific bar to clear: the person hiring you can see the design skill directly in the mockups, so any gap between the design file and the live site reads immediately as a competence problem, not just a rough edge. Camille needed her case studies, brand and agency history, and personal introduction built exactly as designed — not 'close enough' — on a site fast and simple enough not to get in the way of the work it's showcasing.",
    narrativeApproach:
      "I built the site by hand in HTML, CSS, and JavaScript rather than reaching for a framework the project didn't need, matching Camille's designs closely enough that nothing needed a second pass — attention to spacing, type, and layout across the homepage, case studies, and about and contact pages. Deployed on Netlify with Google Analytics wired in, it stayed simple to maintain and fast to load, which mattered more here than any component architecture would have.",
    narrativeResult:
      "The site shipped matching Camille's own designs closely — exactly the bar a product designer's portfolio needs to clear. It was also where a longer working relationship started: Camille was one of the very first clients to trust me with a project, and she's returned for multiple projects since.",
    stack: ["HTML", "CSS", "JavaScript", "Netlify"],
    liveUrl: "https://camille-brunette.com/",
    onHomepage: true,
    featured: false,
    testimonialQuote:
      "Riad was an excellent developer for my website. His attention to detail was perfect, matching my designs very accurately. He met all of my requirements and was very easy to communicate with. He completed the project on time. I would absolutely recommend Riad and I can't wait to start another project with him. Thanks Riad!",
    testimonialName: "Camille Brunette",
    testimonialRole: "Product Design Lead",
    screenshots: {
      cover: "https://camille-brunette.com/",
      details: ["https://camille-brunette.com/about", "https://camille-brunette.com/portfolio"],
    },
  },
  // Researched two ways, since there's no live production domain — Riad
  // doesn't know if the client is still running this build, only that an
  // old Vercel preview deployment still happens to be up:
  //  1. scripts/detect-stack.mts against https://daas-xvf4.vercel.app/ —
  //     Next.js confirmed, Tailwind confirmed (56% density), and a genuine
  //     Sanity fingerprint (cdn.sanity.io asset host) — so contrary to
  //     what Riad remembered, this preview does have real images.
  //  2. scripts/detect-stack.mts against the LinkedIn post Riad linked —
  //     worked without hitting a login wall (public post view) and
  //     returned Riad's own post text: design by Olfa Farhat (same
  //     designer credited on Wimbee), Riad's role was implementation.
  //  3. Follow-up web research on decolonizing.ps and theafricainstitute.org
  //     (the program's own subpages) corrected two things the LinkedIn
  //     post alone didn't make clear: DAAS is initiated and led by DAAR —
  //     architects Sandi Hilal and Alessandro Petti — run in collaboration
  //     with the Sharjah Architecture Triennial, not simply a program
  //     "under" the Triennial; and Olfa Farhat, beyond designing the site,
  //     is herself listed as one of the program's own 2025 Sharjah
  //     participants (a conversation host in the Site in Conversations
  //     public programme).
  // liveUrl deliberately omitted — the Vercel preview isn't a production
  // domain and Riad doesn't know the current live status, so no "Visit
  // live site" button rather than pointing at something that might be
  // stale or gone. Year "2025" from the site's own "2025" edition badge,
  // consistent with the LinkedIn post's "9mo" timestamp against today's
  // date. No video yet — set videoFile to a local path under
  // scripts/assets/daas/ once the actual video file is available, same
  // pattern as PrimePC's local screenshots.
  daas: {
    title: "DAAS",
    meta: "Architecture research platform · Build & implementation",
    gridCategory: "Web · Architecture",
    year: "2025",
    summary:
      "A research platform for DAAS, the Decolonizing Architecture Art Studies program DAAR (Sandi Hilal and Alessandro Petti) runs with the Sharjah Architecture Triennial — designed by Olfa Farhat, built by me to make a dense, multi-city body of architectural research fast and easy to actually navigate.",
    body: "DAAS (Decolonizing Architecture Art Studies) is a research and education program initiated by DAAR — architects Sandi Hilal and Alessandro Petti — and run in collaboration with the Sharjah Architecture Triennial, one of the most prominent architecture and urbanism platforms across the Middle East, North and East Africa, and Asia. I built the platform in Next.js with Tailwind CSS and Sanity, working from Olfa Farhat's design and concept — Olfa is also one of the program's own 2025 Sharjah participants. My job was turning a genuinely complex body of work — open calls, city-specific editions like Daas In Cairo and Daas In Sharjah, participant profiles, public programming — into something people could explore without getting lost.",
    narrativeProblem:
      "Architectural research platforms tend to bury the work: dense text, inconsistent navigation, no clear path through years of programming spread across multiple cities and editions. DAAS needed the opposite — information legible at a glance, a way to move through participants, editions, and public programs without friction, and a build that held up to the program's own design standards rather than reading like an academic afterthought.",
    narrativeApproach:
      "Olfa Farhat led the design and conception — herself one of the program's 2025 Sharjah participants; I built it in Next.js with Tailwind CSS, wired to Sanity so the program's team can manage editions, participants, and programming without needing a developer for every update. The build prioritized exactly what the brief called for: information easy to understand at a glance, navigation without friction, and an experience fast and clean enough to match the Triennial's own identity rather than compete with it.",
    narrativeResult:
      "The site organizes DAAS's programming — open calls like Daas In Cairo, city editions like Daas In Sharjah: Site In Conversations — into something genuinely navigable, for a program where the research and the participants are the point and the site's only job is to get out of the way.",
    stack: ["Next.js", "Tailwind CSS", "Sanity", "Vercel"],
    onHomepage: true,
    featured: false,
    screenshots: {
      cover: "https://daas-xvf4.vercel.app/",
    },
  },
};

// Common cookie-consent button labels. Some sites gate hero content
// (analytics-dependent widgets, embedded video, occasionally the whole
// layout) behind consent, or the banner's own overlay blocks the shot —
// dismissing it before capturing avoids both.
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
      // Selector not present/visible — try the next one.
    }
  }
}

async function captureScreenshot(url: string): Promise<Buffer | null> {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });

    await dismissCookieConsent(page);

    // Nudge-scroll to trigger any entrance animation gated on a scroll
    // event rather than initial-viewport visibility, then settle back at
    // the top before the shot.
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(400);
    await page.mouse.wheel(0, -300);

    // networkidle only means requests have settled — it says nothing about
    // CSS/JS entrance animations (fade-ins, hero reveals) still running,
    // which is why an earlier capture came back with a blank hero. Give
    // those a moment to finish before taking the shot.
    await page.waitForTimeout(4000);
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

  const uploadLocalFile = async (relPath: string): Promise<SanityImageRef | null> => {
    const absPath = path.resolve(root, relPath);
    let buffer: Buffer;
    try {
      buffer = fs.readFileSync(absPath);
    } catch {
      console.warn(`  ! Local screenshot not found: ${relPath}`);
      return null;
    }
    const asset = await client.assets.upload("image", buffer, { filename: path.basename(relPath) });
    return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  };

  const uploadCaptured = async (url: string): Promise<SanityImageRef | null> => {
    const buffer = await tryCapture(url);
    if (!buffer) return null;
    const asset = await client.assets.upload("image", buffer, {
      filename: `${new URL(url).hostname}-${Date.now()}.png`,
    });
    return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  };

  const resolveOne = (source: ScreenshotSource) =>
    typeof source === "string" ? uploadCaptured(source) : uploadLocalFile(source.file);
  const describe = (source: ScreenshotSource) => (typeof source === "string" ? source : source.file);
  const verb = (source: ScreenshotSource) => (typeof source === "string" ? "Capturing" : "Uploading local");

  console.log(`  ${verb(spec.cover)} cover screenshot (${describe(spec.cover)})...`);
  const coverImage = await resolveOne(spec.cover);

  const detailImages: SanityImageRef[] = [];
  for (const source of spec.details?.slice(0, 2) ?? []) {
    console.log(`  ${verb(source)} detail screenshot (${describe(source)})...`);
    const image = await resolveOne(source);
    if (image) detailImages.push(image);
  }

  return { coverImage, detailImages };
}

const VIDEO_CONTENT_TYPES: Record<string, string> = {
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
  ".webm": "video/webm",
  ".m4v": "video/x-m4v",
};

type SanityFileRef = {
  _type: "file";
  asset: { _type: "reference"; _ref: string };
};

async function uploadLocalVideo(relPath: string): Promise<SanityFileRef | null> {
  const absPath = path.resolve(root, relPath);
  let buffer: Buffer;
  try {
    buffer = fs.readFileSync(absPath);
  } catch {
    console.warn(`  ! Video file not found: ${relPath}`);
    return null;
  }
  const contentType = VIDEO_CONTENT_TYPES[path.extname(relPath).toLowerCase()] ?? "video/mp4";
  console.log(`  Uploading video (${relPath}, ${(buffer.length / 1024 / 1024).toFixed(1)} MB)...`);
  const asset = await client.assets.upload("file", buffer, { filename: path.basename(relPath), contentType });
  return { _type: "file", asset: { _type: "reference", _ref: asset._id } };
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

    const { screenshots, year, videoFile, ...textFields } = CASE_STUDIES[slug];
    const patch: Record<string, unknown> = { ...textFields };

    if (screenshots) {
      console.log(`Capturing screenshots for "${slug}"...`);
      const { coverImage, detailImages } = await resolveScreenshots(screenshots);
      if (coverImage) patch.coverImage = coverImage;
      if (detailImages.length) patch.detailImages = detailImages;
    }

    if (videoFile) {
      const video = await uploadLocalVideo(videoFile);
      if (video) patch.video = video;
    }

    if (!ids.length) {
      // No document with this slug anywhere — create one instead of
      // requiring it to already exist in the Studio.
      if (!textFields.title) {
        console.error(`✗ "${slug}" has no existing document and no title in CASE_STUDIES — skipping.`);
        continue;
      }
      const [maxOrder, count] = await Promise.all([
        client.fetch<number | null>(`math::max(*[_type == "project"].order)`),
        client.fetch<number>(`count(*[_type == "project"])`),
      ]);
      const order = (maxOrder ?? -1) + 1;
      const index = String(count + 1).padStart(2, "0");
      const created = await client.create({
        _type: "project",
        slug: { _type: "slug", current: slug },
        index,
        year: year ?? String(new Date().getFullYear()),
        order,
        ...patch,
      });
      console.log(`✓ Created "${slug}" (${created._id}) — index ${index}, order ${order}`);
      continue;
    }

    const baseIds = [...new Set(ids.map(baseId))];
    if (baseIds.length > 1) {
      console.warn(
        `  ! Found ${baseIds.length} different documents with slug "${slug}" (not just a draft/published pair of the same one) — updating all of them. You likely have a duplicate to delete in the Studio.`
      );
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
