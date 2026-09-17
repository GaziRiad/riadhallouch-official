# Riad Hallouch — Portfolio

Personal portfolio built with Next.js (App Router), TypeScript, Tailwind CSS, and GSAP. Single scrolling page positioned for two audiences: agencies/clients evaluating freelance work, and employers evaluating a full-time hire.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS v4**
- **GSAP** + `@gsap/react` (`ScrollTrigger`) for animation, **Lenis** for smooth scroll
- **react-hook-form** + **zod** for the contact form, **Resend** for email delivery
- Full file-based SEO: `sitemap.ts`, `robots.ts`, `manifest.ts`, dynamic OG image, JSON-LD

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

Everything below is placeholder content wired into real components — swap the data, not the markup.

| What | Where | Notes |
|---|---|---|
| Site URL, socials, email | `src/data/site.ts` | Set the real production `url` before deploying — it feeds metadata, sitemap, JSON-LD, and OG tags. |
| Upwork badge (Top Rated / Top Rated Plus / Rising Talent) | `src/data/stats.ts` | Confirm your current badge on your live profile. |
| Client reviews | `src/data/testimonials.ts` | Replace with real, verbatim Upwork review quotes you have permission to publish. |
| LinkedIn recommendations + connection count | `src/data/recommendations.ts` | Pull real recommendation text from your LinkedIn profile (with the author's OK to republish). |
| Project case studies | `src/data/projects.ts` | Replace names/links/metrics with your real projects; keep the problem → solution → outcome structure. |
| Skills | `src/data/skills.ts` | Adjust to match your actual stack. |
| Resume | `public/resume.pdf` | File doesn't exist yet — add it. The "Download resume" button in the closing CTA links to `/resume.pdf`. |
| Favicon | `src/app/icon.tsx`, `src/app/apple-icon.tsx` | Currently a generated "R" monogram. Replace with a real logomark if you have one. |
| JSON-LD review count | `src/components/seo/json-ld.tsx` | `reviewCount` currently mirrors "30+ projects" as a proxy — update if your real Upwork review count differs. |

## Contact form

`src/app/api/contact/route.ts` validates submissions with zod and sends email via [Resend](https://resend.com). Set `RESEND_API_KEY` in your environment (see `.env.example`). Without it, the form returns a clear "not configured yet" error instead of failing silently.

## Deploying

Any Next.js host works; Vercel requires zero config. Before going live:

1. Set `url` in `src/data/site.ts` to your real domain.
2. Add `RESEND_API_KEY` to your host's environment variables.
3. Add `public/resume.pdf`.
4. Replace the placeholder content listed above.
