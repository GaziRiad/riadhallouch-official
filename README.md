# Riad Hallouch — Portfolio

Personal portfolio built with Next.js (App Router), TypeScript, Tailwind CSS, and GSAP, implementing the approved design (`#2a`) from the `GaziRiad/riadhallouch-official` handoff repo. Editorial, warm-cream aesthetic (Instrument Serif + Geist + Geist Mono) positioned for two audiences at once: freelance clients/agencies and full-time employers.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS v4** — design tokens in `src/app/globals.css` mirror the handoff repo's color/spacing spec 1:1 (`--ink-62`, `--paper-58`, etc.); content is capped at `max-w-[1280px]` and centered per the brief's responsive guidance
- **GSAP** + `@gsap/react` (`ScrollTrigger`) for motion — no smooth-scroll hijacking (native scroll), `prefers-reduced-motion` disables every tween
- **Cal.com embed** (`@calcom/embed-react`) for booking — lazy-loaded on first click, never in the initial bundle (`src/lib/cal.ts`)
- **react-hook-form** + **zod** for the contact form, **Web3Forms** for email delivery, in-memory rate limiting
- Full file-based SEO: `sitemap.ts`, `robots.ts`, `manifest.ts`, dynamic OG image, JSON-LD (`Person` + `ProfessionalService`/`AggregateRating`)

## Routes

| Route | Purpose |
|---|---|
| `/` | Homepage — hero/masthead, floating Upwork rating widget, tech marquee, selected work (2 featured case studies), sliding testimonials, LinkedIn panel, closing CTA |
| `/work` | Full case-study grid (option `1d` from the handoff design) |
| `/work/[slug]` | Individual case study — **not explicitly designed** in the handoff; built as a structured multi-section template (overview facts, problem/approach/result narrative, gallery, metrics, closing CTA) reusing the same tokens. Sections use generic placeholder copy/images by design — real per-project content is meant to arrive via Sanity later. |
| `/writing` | Stub ("coming soon") — keeps the nav link and sitemap entry from dangling. Replace with real posts + `/feed.xml` before linking RSS to it from the footer. |
| `/contact` | Full intake form: required name/email/message, honeypot, server-side rate limiting, inline errors, pending + success states |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint    # eslint
npm run build   # typecheck + production build
```

## Content you need to replace before launch

Everything below is placeholder content wired into real components, per the handoff brief — swap the data, not the markup.

| What | Where | Notes |
|---|---|---|
| Site URL, email, socials | `src/data/site.ts` | Set the real production `url` before deploying — it feeds metadata, sitemap, and JSON-LD. |
| Cal.com link | `src/data/site.ts` (`calLink`) | Currently `riadhallouch/20min` — a placeholder. Set it to your real Cal.com username/event. |
| Project case studies | `src/data/projects.ts` | All six are literal "Project name" placeholders per the design brief. Replace title/meta/body/stack/metrics; keep the constraint → decision → result shape of `body`. Case-study page narrative sections (problem/approach/result) live in `src/app/work/[slug]/page.tsx` — currently shared generic copy across all projects. |
| Client reviews | `src/data/testimonials.ts` | Replace with real, verbatim Upwork review quotes you have permission to publish. Keep at least 6 so the marquee doesn't repeat too soon. |
| LinkedIn panel stats | `src/data/linkedin.ts` | Real recommendation count + follower count. |
| Resume / CV | `public/cv-riad-hallouch.pdf` | ✅ Real file in place. Nav "CV" link and the hero "Download CV" button both point at `/cv-riad-hallouch.pdf`. |
| Headshot | `public/images/riad.jpg` | ✅ Real photo in place, used in the LinkedIn panel and the case-study closing CTA. Swap the file (or adjust `objectPosition`) if you want a different crop. |
| Favicon | `src/app/icon.tsx`, `src/app/apple-icon.tsx` | Currently a generated "R" monogram on `--ink`. Replace with a real logomark if you have one. |
| Project shots | `src/components/sections/work-row.tsx`, `src/app/work/page.tsx`, `src/app/work/[slug]/page.tsx` | Striped CSS placeholders. Swap for `next/image` at 1600×1000 (homepage rows), 1200×900 (grid), 1920×1080 (case study cover), 1200×900 (case study gallery). |

The **AggregateRating** in JSON-LD ships with the real, verified figures from the brief (5.00 / 24 reviews) — do **not** add individual `Review` entries to structured data until the testimonial quotes above are real; shipping placeholder reviews as structured data is a genuine SEO/trust liability.

## Contact form

`src/app/api/contact/route.ts` validates submissions with zod, rate-limits by IP (`src/lib/rate-limit.ts` — in-memory, fine for a single instance; swap for Upstash/Redis if you scale past one region), and sends email via [Web3Forms](https://web3forms.com) (server-side, so the access key never ships to the client). Set `WEB3FORMS_ACCESS_KEY` in your environment (see `.env.example`). Without it, the form returns a clear "not configured yet" error instead of failing silently.

This sandbox's network egress is allowlisted and doesn't include `api.web3forms.com`, so the integration is implemented and reaches a real HTTP response from here, but a live send couldn't be confirmed end-to-end from this session — test it on the actual deployment.

## Booking

"Book a call" / "Start a project" / "Book a 20-min call" all call `openBooking()` (`src/lib/cal.ts`), which dynamically imports `@calcom/embed-react` on first click and opens Cal.com's own modal for `siteConfig.calLink` — nothing Cal.com-related loads until the visitor actually clicks.

## Deploying

Any Next.js host works; this project deploys to Vercel (`vercel.json` pins `"framework": "nextjs"` explicitly — if a deploy ever fails with an output-directory error, check Vercel dashboard → Project Settings → General → Build & Output Settings for a stale manual override). Before going live:

1. Set `url` in `src/data/site.ts` to your real domain, and `calLink` to your real Cal.com event.
2. Add `WEB3FORMS_ACCESS_KEY` to your host's environment variables.
3. Replace the placeholder content listed above.
