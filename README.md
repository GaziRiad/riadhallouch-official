# Riad Hallouch — Portfolio

Personal portfolio built with Next.js (App Router), TypeScript, Tailwind CSS, and GSAP, implementing the approved design (`#2a`) from the `GaziRiad/riadhallouch-official` handoff repo. Editorial, warm-cream aesthetic (Instrument Serif + Geist + Geist Mono) positioned for two audiences at once: freelance clients/agencies and full-time employers.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS v4** — design tokens in `src/app/globals.css` mirror the handoff repo's color/spacing spec 1:1 (`--ink-62`, `--paper-58`, etc.)
- **GSAP** + `@gsap/react` (`ScrollTrigger`) for motion — no smooth-scroll hijacking (native scroll), `prefers-reduced-motion` disables every tween
- **react-hook-form** + **zod** for the contact form, **Resend** for email delivery, in-memory rate limiting
- Full file-based SEO: `sitemap.ts`, `robots.ts`, `manifest.ts`, dynamic OG image, JSON-LD (`Person` + `ProfessionalService`/`AggregateRating`)

## Routes

| Route | Purpose |
|---|---|
| `/` | Homepage — hero/masthead, floating Upwork rating widget, tech marquee, selected work (2 featured case studies), sliding testimonials, LinkedIn panel, closing CTA |
| `/work` | Full case-study grid (option `1d` from the handoff design) |
| `/work/[slug]` | Individual case study — **not explicitly designed** in the handoff; built as a simple, consistent page reusing the same tokens so `/work` cards don't link nowhere. Revisit once a real design exists. |
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
| Site URL, email, booking link, socials | `src/data/site.ts` | Set the real production `url` before deploying — it feeds metadata, sitemap, and JSON-LD. `bookingUrl` currently points at a placeholder Cal.com link. |
| Project case studies | `src/data/projects.ts` | All six are literal "Project name" placeholders per the design brief. Replace title/meta/body/stack/metrics; keep the constraint → decision → result shape of `body`. |
| Client reviews | `src/data/testimonials.ts` | Replace with real, verbatim Upwork review quotes you have permission to publish. Keep at least 6 so the marquee doesn't repeat too soon. |
| LinkedIn panel stats | `src/data/linkedin.ts` | Real recommendation count + follower count. |
| Resume / CV | `public/cv-riad-hallouch.pdf` | File doesn't exist yet — add it. Nav "CV" link and the hero "Download CV" button both point at `/cv-riad-hallouch.pdf`. |
| Favicon | `src/app/icon.tsx`, `src/app/apple-icon.tsx` | Currently a generated "R" monogram on `--ink`. Replace with a real logomark if you have one. |
| Headshot | LinkedIn panel in `src/components/sections/testimonials.tsx` | Currently a striped placeholder circle. |
| Project shots | `src/components/sections/work-row.tsx`, `src/app/work/page.tsx`, `src/app/work/[slug]/page.tsx` | Striped CSS placeholders. Swap for `next/image` at 1600×1000 (homepage rows) and 1200×900 (grid). |

The **AggregateRating** in JSON-LD ships with the real, verified figures from the brief (5.00 / 24 reviews) — do **not** add individual `Review` entries to structured data until the testimonial quotes above are real; shipping placeholder reviews as structured data is a genuine SEO/trust liability.

## Contact form

`src/app/api/contact/route.ts` validates submissions with zod, rate-limits by IP (`src/lib/rate-limit.ts` — in-memory, fine for a single instance; swap for Upstash/Redis if you scale past one region), and sends email via [Resend](https://resend.com). Set `RESEND_API_KEY` in your environment (see `.env.example`). Without it, the form returns a clear "not configured yet" error instead of failing silently.

## Booking

"Book a call" / "Start a project" / "Book a 20-min call" all open a lazy-loaded modal (`src/components/ui/booking-trigger.tsx`, code-split via `next/dynamic`) embedding `siteConfig.bookingUrl` in an iframe — nothing booking-related loads until the visitor actually clicks. Point `bookingUrl` at your real Cal.com (or other) link.

## Deploying

Any Next.js host works; Vercel requires zero config. Before going live:

1. Set `url` and `bookingUrl` in `src/data/site.ts` to your real domain/booking link.
2. Add `RESEND_API_KEY` to your host's environment variables.
3. Add `public/cv-riad-hallouch.pdf`.
4. Replace the placeholder content listed above.
