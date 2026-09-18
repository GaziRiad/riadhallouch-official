# Riad Hallouch — Portfolio

Personal portfolio built with Next.js (App Router), TypeScript, Tailwind CSS, and GSAP, implementing the approved design (`#2a`) from the `GaziRiad/riadhallouch-official` handoff repo. Editorial, warm-cream aesthetic (Instrument Serif + Geist + Geist Mono) positioned for two audiences at once: freelance clients/agencies and full-time employers.

Content is managed in **Sanity** — see [Content — editing via Sanity](#content--editing-via-sanity) below.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS v4** — design tokens in `src/app/globals.css` mirror the handoff repo's color/spacing spec 1:1 (`--ink-62`, `--paper-58`, etc.); content is capped at `max-w-[1440px]` and centered
- **GSAP** + `@gsap/react` (`ScrollTrigger`) for motion — no smooth-scroll hijacking (native scroll), `prefers-reduced-motion` disables every tween
- **Sanity** (standalone Studio in `studio/`, `next-sanity` client in the app) — every content field on the site, editable without a deploy
- **Cal.com embed** (`@calcom/embed-react`) for booking — lazy-loaded on first click, never in the initial bundle (`src/lib/cal.ts`)
- **react-hook-form** + **zod** for the contact form, **Web3Forms** for email delivery, in-memory rate limiting
- Full file-based SEO: `sitemap.ts`, `robots.ts`, `manifest.ts`, dynamic OG image, JSON-LD (`Person` + `ProfessionalService`/`AggregateRating`) — all sourced from Sanity

## Routes

| Route | Purpose |
|---|---|
| `/` | Homepage — hero/masthead, floating Upwork rating widget, tech marquee, selected work (featured case studies), sliding testimonials, LinkedIn panel, closing CTA |
| `/work` | Full case-study grid |
| `/work/[slug]` | Individual case study — structured multi-section template (overview facts, problem/approach/result narrative, gallery, metrics, closing CTA) |
| `/writing` | Stub ("coming soon") — keeps the nav link and sitemap entry from dangling |
| `/contact` | Full intake form: required name/email/message, honeypot, server-side rate limiting, inline errors, pending + success states |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Without Sanity connected yet, the site renders bundled placeholder content (see below) instead of a blank page — you can develop against it immediately.

```bash
npm run lint    # eslint
npm run build   # typecheck + production build
```

## Content — editing via Sanity

Nearly everything on the site is a Sanity field: name/role/tagline/bio, SEO description and keywords, hero stats, the floating rating widget, the tech marquee, every project (title, images, narrative, metrics, tech stack), testimonials, the LinkedIn panel, the "Currently" availability list, your CV file, and your headshot photo. The only thing that stays in code is the top nav's labels/links (`src/data/nav.ts`) — they're tied to section anchors in the page layout, so editing them safely means touching the component too.

The Studio is a **standalone app** in `studio/` (not embedded in the Next.js app) — this is Sanity's current recommendation: it runs on Vite (`sanity dev`/`sanity build`), which is far faster than compiling it through Next, and it can auto-update independently of the website's deploys.

### One-time setup

1. **Create a Sanity project** — go to [sanity.io/manage](https://www.sanity.io/manage) → Create project (free tier is enough). Note the **Project ID** it gives you; use dataset name `production`.
2. **Configure the Studio:**
   ```bash
   cd studio
   cp .env.example .env
   # fill in SANITY_STUDIO_PROJECT_ID from step 1
   npm install
   npm run dev
   ```
   Opens the Studio at [http://localhost:3333](http://localhost:3333).
3. **Configure the Next.js app** — in the repo root, add to `.env.local` (see `.env.example`):
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=<your project id>
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
4. **Allow the app to talk to Sanity (CORS):**
   ```bash
   cd studio
   npx sanity cors add http://localhost:3000 --credentials
   # repeat with your production URL once you have one
   ```
5. **Seed starter content** (optional, but saves you re-typing six placeholder projects by hand) — from the repo root:
   ```bash
   # In .env.local, also set (get a token from sanity.io/manage → API → Tokens, "Editor" permission):
   # SANITY_API_WRITE_TOKEN=...
   npm run seed:sanity
   ```
   This pushes the same placeholder copy the site ships with by default, plus uploads the bundled headshot and CV as real Sanity assets, so the Studio opens with something to edit instead of a blank slate. It refuses to run against a dataset that already has content unless you pass `--force`.
6. Restart `npm run dev` in the app root. The site now reads from Sanity.

### Day to day

- Edit content at `http://localhost:3333` (or wherever you deploy the Studio — see below). Changes appear on the site within 60 seconds (time-based revalidation); no redeploy needed.
- **Site settings** is a singleton — pinned at the top of the Studio's document list, one document for the whole site's global content (stats, links, tech stack, etc).
- **Projects** and **Testimonials** are ordinary documents — use the `order` field to control display order; `onHomepage` / `featured` flags control where a project appears.
- Images: upload directly in the Studio, with hotspot cropping. `next/image` resolves them through `cdn.sanity.io` automatically.

### Deploying the Studio

The Studio needs its own hosting, separate from the Next.js app on Vercel:

```bash
cd studio
npm run deploy
```

This publishes it for free to `https://<your-project-name>.sanity.studio` via Sanity's own hosting — no extra Vercel project needed. Add that URL to CORS origins too if you also want to edit from there in the browser (it works by default since it's a Sanity-hosted origin).

### If you'd rather not use Sanity

Leave `NEXT_PUBLIC_SANITY_PROJECT_ID` unset — the site falls back to the bundled placeholder content in `src/sanity/fallback.ts` and never crashes. You can hand-edit that file directly instead of connecting a CMS, though you'll lose the "edit without a deploy" benefit.

The **AggregateRating** in JSON-LD is sourced from the "Average rating" / "Five-star reviews" hero stats — do **not** add individual `Review` entries to structured data until your testimonial quotes are real, verbatim, and you have permission to publish them; shipping fake reviews as structured data is a genuine SEO/trust liability.

## Contact form

`src/app/api/contact/route.ts` validates submissions with zod, rate-limits by IP (`src/lib/rate-limit.ts` — in-memory, fine for a single instance; swap for Upstash/Redis if you scale past one region), and sends email via [Web3Forms](https://web3forms.com) (server-side, so the access key never ships to the client). Set `WEB3FORMS_ACCESS_KEY` in your environment (see `.env.example`). Without it, the form returns a clear "not configured yet" error instead of failing silently.

## Booking

"Book a call" / "Start a project" / "Book a 20-min call" all call `openBooking(calLink)` (`src/lib/cal.ts`), which dynamically imports `@calcom/embed-react` on first click and opens Cal.com's own modal — nothing Cal.com-related loads until the visitor actually clicks. The `calLink` (your Cal.com username/event) is a Sanity field on Site settings.

## Deploying

Any Next.js host works; this project deploys to Vercel (`vercel.json` pins `"framework": "nextjs"` explicitly — if a deploy ever fails with an output-directory error, check Vercel dashboard → Project Settings → General → Build & Output Settings for a stale manual override). Before going live:

1. Complete the Sanity one-time setup above, and set the real production `url` on Site settings — it feeds metadata, sitemap, and JSON-LD.
2. Add `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `WEB3FORMS_ACCESS_KEY` to your host's environment variables. Never add `SANITY_API_WRITE_TOKEN` there — it's only needed locally, once, for the seed script.
3. Deploy the Studio (`cd studio && npm run deploy`) and add your production domain to Sanity's CORS origins.
