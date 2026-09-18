# Handoff: Riad Hallouch — personal portfolio website

## Overview

A single-page-led personal portfolio for **Riad Hallouch**, senior Next.js developer (AI integration, Sanity, MVP specialist). It serves two audiences at once: freelance clients / agencies evaluating him for paid work, and employers evaluating him for a full-time engineering role. The homepage leads with freelance language; the full-time pitch rides along in the availability line, the CV button, the LinkedIn panel, and the closing CTA.

Target stack, decided by the client: **Next.js (App Router) + TypeScript, Sanity CMS, GSAP for animation, deployed on Vercel**, with SEO treated as a first-class requirement (dynamic sitemap, robots, per-route metadata, JSON-LD, edge OG images).

## About the design files

`Portfolio Mockups.dc.html` in this bundle is a **design reference created in HTML** — a prototype showing intended look, layout, and motion. It is **not production code to copy**. Its markup uses inline styles and a streaming-component wrapper specific to the design tool; none of that should ship.

The task is to **recreate these designs in a fresh Next.js codebase** using that project's own conventions: React server components where possible, Tailwind (or CSS Modules — pick one and stay consistent), `next/font`, `next/image`, and GSAP in client islands. Where this README and the HTML disagree, the README wins.

Open the HTML file in a browser to see it. It is organised as stacked option cards:

- **`#2a` — the approved design.** Build this. It is the full assembled homepage.
- **`#1d`** — an alternative projects layout (3-up card grid) kept as a live option; not approved, but likely wanted later for the `/work` index page.
- **`#1a`, `#1b`, `#1c`, `#1e`** — earlier explorations, superseded. `#1c` (the "receipts" card) was explicitly rejected. Ignore them unless asked.
- **`#plan`** — the architecture / SEO / motion spec, summarised and expanded below.

## Fidelity

**High fidelity.** Colors, type sizes, weights, spacing, and radii in this README are final and should be matched closely. Two caveats:

1. **All content is placeholder** except the name, role description, and the Upwork/LinkedIn statistics. Project names, case-study copy, review quotes, client names, and the email address are dummies. Build the components; expect real content to arrive via Sanity.
2. **All imagery is a striped placeholder block** with a mono caption stating the intended dimensions. There are no real assets in this bundle.

The design was authored at a **1280px canvas**. Everything must reflow responsively — see *Responsive behavior*.

---

## Design tokens

### Color

| Token | Value | Use |
|---|---|---|
| `--bg` | `#faf8f4` | Primary page ground (warm off-white) |
| `--bg-alt` | `#f1eee7` | Alternate section ground (testimonials) |
| `--ink` | `#14130f` | Primary text; also the dark section ground and dark buttons |
| `--ink-70` | `rgba(20,19,15,.70)` | Emphasised secondary text |
| `--ink-66` | `rgba(20,19,15,.66)` | Hero lede paragraph |
| `--ink-64` | `rgba(20,19,15,.64)` | Case-study body copy |
| `--ink-62` | `rgba(20,19,15,.62)` | **Minimum** for small/mono labels on light ground (4.6:1) |
| `--ink-60` | `rgba(20,19,15,.60)` | Nav links, tech pills |
| `--ink-22` | `rgba(20,19,15,.22)` | Outline-button border |
| `--ink-16` | `rgba(20,19,15,.16)` | Tech-pill border |
| `--ink-12` | `rgba(20,19,15,.12)` | Stat-grid hairlines |
| `--ink-10` | `rgba(20,19,15,.10)` | Card borders, section dividers |
| `--ink-07` | `rgba(20,19,15,.07)` | Sticky-nav bottom border |
| `--paper` | `#faf8f4` | Text/buttons on dark ground |
| `--paper-80` | `rgba(250,248,244,.80)` | Body text on dark |
| `--paper-70` | `rgba(250,248,244,.70)` | Secondary text on dark |
| `--paper-58` | `rgba(250,248,244,.58)` | **Minimum** for small/mono labels on dark ground |
| `--paper-14` | `rgba(250,248,244,.14)` | Card borders on dark |
| `--paper-05` | `rgba(250,248,244,.05)` | Card fill on dark |
| `--accent` | `#00c08b` | Mint. **Decorative and on-dark only** — fills, arrows, dots, stars, slashes |
| `--accent-ink` | `#00694f` | Accent for *text on light grounds* (4.7:1). Never use `#00c08b` for text on `#faf8f4` — it fails contrast badly |
| `--accent-tint` | `#e4f7f0` | Accent chip background on light |

**Accessibility rule, non-negotiable:** small text (under 18px) must clear 4.5:1. That is why muted labels bottom out at `.62` on light and `.58` on dark. An earlier revision used `.38`–`.45` and failed; do not reintroduce lighter muted ink.

### Typography

Two families plus a mono, all Google Fonts, all self-hosted via `next/font/google`:

- **Display — `Instrument Serif`**, weight 400, roman + italic. Every heading and every large number.
- **UI — `Geist`**, weights 300 / 400 / 500 / 600. Body copy, nav, buttons.
- **Mono — `Geist Mono`**, weights 400 / 500. Labels, metadata, eyebrows, stat captions, pills, footer.

| Role | Spec |
|---|---|
| Hero masthead | Instrument Serif 400, 168px, line-height .86, letter-spacing −.04em. Second line italic, `margin-left: .06em` |
| Section heading | Instrument Serif 400, 46px, line-height 1.05, letter-spacing −.02em |
| CTA heading | Instrument Serif 400, 62px, line-height 1.02, letter-spacing −.025em |
| Case-study title | Instrument Serif 400, 38px, line-height 1.1, letter-spacing −.02em |
| Big stat (hero strip) | Instrument Serif 400, 44px, line-height 1 |
| Big stat (widget) | Instrument Serif 400, 62px, line-height .9, letter-spacing −.02em |
| Case-study metric | Instrument Serif 400, 26px, line-height 1 |
| Testimonial quote | Instrument Serif 400, 18px, line-height 1.5 |
| Hero lede | Geist 300, 18px, line-height 1.6 |
| Body / case-study copy | Geist 300, 16px, line-height 1.65 |
| Small body | Geist 300, 14px, line-height 1.55 |
| Nav link | Geist 400, 13px |
| Button label | Geist 500, 14px (nav button 12.5px) |
| Eyebrow / mono label | Geist Mono 400–500, 10.5–11.5px, letter-spacing .06–.08em, uppercase |
| Stat caption | Geist Mono 400, 10.5px, letter-spacing .06em, uppercase |
| Tech pill | Geist Mono 400, 11.5px |

Apply `text-wrap: pretty` to headings and paragraphs.

### Spacing, radius, shadow

- Horizontal page gutter: **44px** at 1280px.
- Section vertical padding: **88px** (work), **72px** (testimonials, hero top 54px), **96px** (CTA).
- Radii: `999px` pills/buttons · `14px` hero widget · `12px` "Currently" panel · `11px` small floating chip · `10px` testimonial + LinkedIn cards · `8px` grid cards · `4px` project images.
- Shadows: widget `0 26px 62px -20px rgba(20,19,15,.5)` · small chip `0 14px 34px -14px rgba(20,19,15,.3)` · grid card hover `0 20px 40px -18px rgba(20,19,15,.28)`.
- Grid hairlines are achieved with `gap: 1px` on a `rgba(20,19,15,.12)` background, not borders.

---

## Screens / views

### The approved homepage (`#2a`) — section by section

#### 1. Sticky nav

- **Purpose:** persistent access to the primary CTA.
- **Layout:** `position: sticky; top: 0`, `z-index: 40`. Flex, space-between. Padding `18px 44px`. Background `rgba(250,248,244,.86)` with `backdrop-filter: blur(14px)`. Bottom border `1px solid --ink-07`.
- **Left:** a 9px mint dot with `box-shadow: 0 0 0 4px rgba(0,192,139,.18)` (an availability indicator), then "Riad Hallouch" — Geist 500, 14px, letter-spacing −.01em.
- **Right:** links `Work · About · Writing · CV` (Geist 400 13px, `--ink-60`, 30px gap), then a pill button: `#14130f` fill, padding `9px 16px`, radius 999px, label "Book a call" in `--paper` 12.5px/500, followed by a `→` in `--accent`.
- **Behavior:** nav links are same-page anchors except CV (downloads `/cv-riad-hallouch.pdf`) and Writing (`/writing`). The CTA opens the booking route.

#### 2. Hero — masthead

- **Purpose:** state who he is at a scale that reads as confidence, and put verified social proof in the same viewport.
- **Layout:** `position: relative; overflow: hidden`, padding `54px 44px 0`, ground `--bg`.
- **Top row:** flex space-between. Left: "Portfolio — 2026", mono 11.5px uppercase `--ink-62`. Right: "Available for work", mono 11.5px uppercase `--accent-ink`.
- **Masthead:** `<h1>` with `margin-top: 30px`, `z-index: 2`. Two lines — "Riad" / "Hallouch", the second in italic. 168px at 1280px canvas; treat as fluid, roughly `clamp(56px, 13vw, 168px)`.
- **Floating widget** (see its own section below) is absolutely positioned over the masthead's right side.
- **Lede row:** flex, space-between, `align-items: flex-end`, `margin-top: 44px`, `padding-bottom: 40px`, bottom border `1px solid rgba(20,19,15,.14)`.
  - Left: the lede paragraph, `max-width: 40ch`, Geist 300 18px/1.6 `--ink-66`: *"Senior Next.js developer. AI integration, Sanity, MVP specialist. I take products from blank repo to ranked and profitable."*
  - Right: two buttons, 12px gap. Primary — `#14130f` fill, radius 999px, padding `15px 26px`, "Start a project" + mint `→`. Secondary — transparent, `1px solid --ink-22`, same padding, "Download CV".
- **Stat strip:** 4-column grid, `gap: 1px` on `--ink-12` ground so hairlines show between cells. Each cell `--bg`, padding `24px 0 34px` (subsequent cells add `padding-left: 24px`). Values in Instrument Serif 44px; captions in mono 10.5px uppercase `--ink-62`.
  - `30+` Projects delivered · `5.00` Average rating · `24` Five-star reviews · `100%` Job success (this last value in `--accent-ink`).

> **Deliberate content decision — do not undo it.** An earlier version put **"$14,200+"** in the hero as the largest element on the page. The client rejected that as boastful. The dollar figure now appears **exactly once**, as a quiet 15px line under the testimonials. Keep the hero focused on rating, volume, and reliability.

#### 3. The floating widget

The signature element. A dark card that overlaps the masthead and breaks the section's grid.

- **Container:** `position: absolute; right: 44px; top: 132px; width: 300px; z-index: 3`.
- **Card:** `#14130f`, radius 14px, padding 22px, shadow `0 26px 62px -20px rgba(20,19,15,.5)`.
- **Contents, top to bottom:**
  1. Header row — "Client rating" (mono 10.5px uppercase `--paper-58`) and "Upwork" (mono 10.5px `--accent`).
  2. `5.00` in Instrument Serif 62px `--paper`, with `/ 5.00` in mono 13px `--paper-58` baseline-offset by `padding-bottom: 9px`.
  3. `★★★★★` — mono 16px, `--accent`, `letter-spacing: .16em`.
  4. Three label/value rows (11px gap): Reviews → `24 · all 5★`; Job success → `100%`; On-time delivery → `100%`. Labels mono 12px `--paper-58`, values mono 12px/500 `--paper`.
- **Secondary chip:** absolutely positioned `left: -34px; bottom: -24px`, so it hangs off the card's corner. `--bg` fill, `1px solid --ink-10`, radius 11px, padding `11px 15px`, shadow `0 14px 34px -14px rgba(20,19,15,.3)`. Contents: "Shipped" (mono 10px uppercase `--ink-62`) over "30+ projects" (Instrument Serif 26px).
- **Motion:** the card floats on an infinite yoyo — translateY 0 → −10px, rotate −2.4° → −1.4°, 7s `ease-in-out`. The chip runs an offset counter-float — translateY 0 → −8px, rotate 3° → 2°, 8.5s. In production, drive both with GSAP yoyo tweens rather than CSS keyframes so they can be paused and scroll-parallaxed.
- **Star rendering:** the HTML uses `★` glyphs. In production use an inline SVG star component so the mark is consistent across platforms, and give the group `role="img"` with `aria-label="Rated 5.00 out of 5"`.
- **Responsive:** below ~1024px the widget stops being absolute. It becomes a normal block below the masthead, full-width up to 360px, with the chip inline beside it and no rotation.

#### 4. Tech marquee

- Full-bleed `#14130f` band, `padding: 16px 0`, `overflow: hidden`.
- A flex track at `width: 200%` containing **two identical halves**, each `width: 50%; flex: none`, translating `0 → −50%` over 26s linear, infinite. The duplicate half is what makes the loop seamless — keep it.
- Items: mono 13px `--paper-58`, `white-space: nowrap`, 40px gap, separated by mint `/` glyphs.
- Content: `Next.js 15 · App Router · TypeScript · Sanity CMS · OpenAI / Anthropic SDK · Postgres · GSAP · Vercel`.
- **Production:** rebuild as a GSAP x-loop with velocity-linked speed on scroll; pause on hover and when offscreen. Mark the duplicated half `aria-hidden="true"`.

#### 5. Selected work — editorial rows

The approved treatment. Padding `88px 44px`, ground `--bg`.

- **Header row:** "Selected work" (46px serif) and "2023 — 2026" (mono 11.5px uppercase `--ink-62`), baseline-aligned, `margin-bottom: 52px`.
- **Each row:** flex, `gap: 44px`, divider `1px solid --ink-10` below. **Rows alternate direction** — row 1 image-left, row 2 `flex-direction: row-reverse`. Row 1 has `padding-bottom: 44px`; row 2 `padding: 44px 0`.
- **Image side:** `flex: 0 0 560px`, `aspect-ratio: 16/10`, radius 4px, `1px solid rgba(20,19,15,.09)`. Placeholder is `repeating-linear-gradient(135deg, #e9e5dc 0 7px, #f2efe8 7px 14px)` with a centred mono caption "PROJECT SHOT — 1600×1000". Replace with `next/image`, AVIF, explicit `sizes`.
- **Text side:** `flex: 1`, column.
  - Meta row: index `01` (mono 12px `--ink-62`) + category/duration "AI product · 6 weeks" (mono 11px/500 uppercase `--accent-ink`).
  - Title 38px serif, `margin-top: 16px`.
  - Body Geist 300 16px/1.65 `--ink-64`, `max-width: 46ch`.
  - Tech pills: flex wrap, 8px gap, `margin-top: 22px`. Each `padding: 6px 12px`, radius 999px, `1px solid --ink-16`, mono 11.5px `--ink-60`.
  - Metrics row pinned to the bottom with `margin-top: auto; padding-top: 26px`, 34px gap. Each: value 26px serif over a mono 10.5px uppercase `--ink-62` caption. Row 1: `+180%` Organic traffic · `0.4s` LCP · `100` Lighthouse SEO. Row 2: `28 days` Idea to launch · `$0` Infra cost at launch.
- **Footer of the section:** `padding-top: 38px`, flex space-between. Left: "Eight more case studies, including three under NDA." (Geist 300 17px `--ink-60`). Right: outline pill "All work" + `--accent-ink` arrow, linking `/work`.
- **Alternative layout available:** option `#1d` in the HTML is a 3-up card grid (radius 8px, `aspect-ratio: 4/3` images, one card inverted to `#14130f` to break the rhythm, hover lift `translateY(-3px)` + shadow over `.3s`). Not approved for the homepage; use it for the `/work` index.

#### 6. Social proof — sliding testimonials

Ground `--bg-alt` (`#f1eee7`), `padding: 72px 0`, `overflow: hidden`. Heading has its own `0 44px` gutter; the slider is full-bleed.

- **Heading:** "Twenty-four reviews. All five stars." — 46px serif, `margin-bottom: 38px`.
- **Slider:** same duplicated-halves technique as the marquee, but 20px gap and a **42s** loop. Each half holds three equal cards (`flex: 1`).
- **Card:** `--bg` fill, `1px solid --ink-10`, radius 10px, padding 26px. Contents: `★★★★★` (mono 13px `--accent-ink`, letter-spacing .14em) → quote (Instrument Serif 18px/1.5 `--ink`, curly quotes) → attribution (`margin-top: 20px`, mono 11px `--ink-62`, format "Client name · Role").
- **Production:** pause on hover and on focus-within; make cards keyboard-reachable; expose the full review list in the DOM (good for SEO) and let the animation only affect presentation.
- **The one money line**, `margin-top: 26px`, in the 44px gutter, flex space-between: left "$14.2k earned across 30+ Upwork contracts, all rated five stars." (Geist 300 15px `--ink-62`); right an outline pill "Verify on Upwork" + `--accent-ink` `↗`, `padding: 11px 20px`. This pairing of claim and verification link is the point — keep them adjacent.
- **LinkedIn panel**, `margin-top: 28px`: `--bg` card, radius 10px, `1px solid --ink-10`, `padding: 26px 28px`, flex with 24px gap.
  - 64px circular headshot placeholder (striped, mono "HEADSHOT" caption).
  - Middle: a 16px `#14130f` rounded square containing "in" (Geist 600 9px `--paper`) beside "12 recommendations · 6.4k followers" (Geist 500 12.5px); below, "Managers and teammates I've shipped with have written it down. Employers read these first." (Geist 300 14px/1.55 `--ink-62`).
  - Right: dark pill "Read them ↗".
  - **Note:** the "in" mark is a stand-in. Use the official LinkedIn brand asset, or plain text, per LinkedIn's brand guidelines.

#### 7. Closing CTA

- Ground `#14130f`, `padding: 96px 44px`, flex, `align-items: flex-end`, space-between, 48px gap.
- **Left:** "Tell me what you're building." — 62px serif `--paper`, `max-width: 22ch`. Then "Freelance projects and full-time roles both welcome. A short note about scope and timeline is enough to start." (Geist 300 17px/1.6 `--paper-70`, `max-width: 44ch`). Then, `margin-top: 34px`: a `--paper`-filled pill "Book a 20-min call" with `--accent-ink` arrow, and the email in mono 13px `--paper-70`.
- **Right — "Currently" panel:** `flex: 0 0 260px`, `--paper-05` fill, `1px solid --paper-14`, radius 12px, padding 24px. Heading "Currently" (mono 10.5px uppercase `--paper-58`), then three dotted rows (11px gap, Geist 400 13px `--paper-80`): "2 freelance slots open" (mint dot), "Open to full-time, remote" (mint dot), "GMT+1 · overlaps US mornings" (`rgba(250,248,244,.35)` dot).
- This panel is the main place the employer audience is addressed directly. It should be CMS-editable — it is the thing most likely to go stale.

#### 8. Footer

- `padding: 26px 44px`, ground `--bg`, top border `1px solid rgba(20,19,15,.09)`, flex space-between.
- Left: "© 2026 Riad Hallouch" (mono 11.5px `--ink-62`). Right: `GitHub · LinkedIn · Upwork · RSS`, 22px gap, same type.
- Make the year dynamic. RSS links `/feed.xml` (only once `/writing` exists).

---

## Interactions & behavior

### Motion spec (GSAP)

| Element | Animation |
|---|---|
| Hero masthead | `SplitText` per-line mask reveal, 0.9s, stagger 0.08, `power3.out` |
| Floating widget | Infinite yoyo float (see §3) plus a subtle scroll parallax |
| Stat strip | `ScrollTrigger`-gated count-up on 30+ / 5.00 / 24 / 100%, 1.4s, **once only** |
| Work rows | Image `clip-path` reveal with scale 1.06 → 1; copy rises 24px |
| Marquees | Seamless x-loop, velocity-linked speed on scroll, pause on hover and offscreen |
| Grid cards (`#1d`) | Hover `translateY(-3px)` + shadow, `.3s` |
| Route changes | View Transitions API, GSAP fallback |

**Non-negotiables:**

1. **All content renders in HTML before JS runs.** No opacity-0-until-hydrated. If GSAP fails to load, the page is fully readable — this protects both crawlability and perceived speed.
2. **`prefers-reduced-motion: reduce` disables every tween**, including the marquees and the widget float. Provide a static end state.
3. **`gsap.context()` in every effect**, with cleanup on unmount. Register plugins once in a client provider.
4. **No smooth-scroll hijacking.** It hurts UX and crawlability. The client's brief asked for great animation; that means reveals and the floating widget, not scroll takeover.

### Other behavior

- Nav CTA and both "Book a call" buttons open the booking flow (Cal.com embed assumed — lazy-load it; do not let it into the initial bundle).
- "Verify on Upwork", "Read them", and social links are external — `target="_blank" rel="noopener"`.
- "Download CV" serves a static PDF from `/public`.
- Contact form (on `/contact`) needs: required name / email / message, email format validation, honeypot field, server-side rate limiting, inline field errors, a pending button state, and a success state that replaces the form.
- Hover states: buttons darken/lift slightly; nav and footer links go to full `--ink`; pills gain a `--ink-22` border.
- Focus: every interactive element needs a visible focus ring — 2px `--accent-ink` outline with 2px offset. The design does not show this; add it.

### Responsive behavior

Designed at 1280px. Breakpoint guidance:

- **≥1280px:** as documented. Cap content at ~1280px and centre.
- **1024–1279px:** gutters to 32px; masthead scales fluidly; work-row images shrink from `0 0 560px` to `1 1 50%`.
- **768–1023px:** widget de-absolutes into the flow (see §3); stat strip to 2×2; work rows stack (image above text, no alternation); testimonial cards to ~320px fixed width with the track still scrolling; CTA stacks with the "Currently" panel full-width below.
- **<768px:** single column, 20px gutters; masthead ~56–72px; section headings ~32px; section padding to 56px; stat strip to 2×2 with 36px values; nav collapses to the wordmark plus the CTA pill, other links into a sheet. **Every tap target ≥44px.**

Nothing may use fixed heights on text-bearing boxes, and nothing may overflow horizontally at any width.

---

## State management

The homepage is almost entirely static. What needs client state:

- `prefersReducedMotion` — read once in the motion provider, gates every timeline.
- Marquee/slider paused state — on hover, focus-within, and `IntersectionObserver` offscreen.
- Count-up "already fired" flag per stat group.
- Mobile nav open/closed.
- Booking embed loaded/not (lazy).
- Contact form: `idle | submitting | success | error` plus per-field errors.

Everything else is server-rendered. Content comes from Sanity at build time with ISR; no client fetching on the homepage.

---

## Suggested architecture

```
app/
  layout.tsx            root metadata, next/font, JSON-LD, GSAP provider
  page.tsx              home (static)
  work/
    page.tsx            index — use the #1d grid
    [slug]/page.tsx     case study, ISR
  hire-me/page.tsx      full-time pitch + CV
  about/page.tsx
  writing/
    page.tsx
    [slug]/page.tsx
  contact/page.tsx
  sitemap.ts            dynamic, slugs + lastModified from Sanity
  robots.ts
  opengraph-image.tsx   edge-rendered
  manifest.ts
  not-found.tsx
  api/contact/route.ts  Resend + honeypot + rate limit
lib/
  sanity/{client,queries,image}.ts
  seo.ts                metadata factory
  schema.ts             JSON-LD builders
components/
  motion/               GSAP provider + hooks (useReveal, useCountUp, useMarquee)
  sections/             Nav, Hero, RatingWidget, TechMarquee, SelectedWork,
                        Testimonials, LinkedInPanel, CTA, Footer
  ui/                   Button, Pill, StatCell, Placeholder
public/
  cv-riad-hallouch.pdf
  favicon.ico, icon.svg, apple-icon.png
```

### SEO requirements (a hard part of the brief)

- **Metadata:** per-route `generateMetadata`; `metadataBase` set so canonicals resolve; unique titles ~55 chars and descriptions ~150 chars; `alternates` ready for hreflang if FR/AR are added later.
- **Structured data:** `Person` + `WebSite` on root; `BreadcrumbList` on nested routes; `CreativeWork` per case study; `AggregateRating` on the reviews section — **only with the real Upwork figures**, never the placeholders; `FAQPage` if an FAQ is added.
- **Crawl:** dynamic `sitemap.ts` with `lastModified` from Sanity; `robots.ts` allowing all and pointing at the sitemap; no orphan pages — the homepage links to every case study.
- **Performance budget:** LCP < 1.2s, CLS 0, < 120kb gzipped JS on the homepage. Static render everything; GSAP only in client islands; `next/font` self-hosted with `display: swap`; `next/image` with AVIF and explicit `sizes`.
- **Social:** edge OG image per route; Twitter `summary_large_image`; `/feed.xml` once writing exists.
- **Semantics:** one `<h1>` per page (the masthead); sections in real `<section>` elements with accessible names; reviews as a `<ul>`; the `↗` and `→` glyphs are decorative — `aria-hidden`, with real link text.

---

## Assets

**None are included.** All imagery in the prototype is a striped CSS placeholder with the intended dimensions in its caption. Still needed from the client:

| Asset | Spec | Used in |
|---|---|---|
| Project shots | 1600×1000 (16:10), ≥2 for the homepage | Selected work |
| Project shots (grid) | 1200×900 (4:3) | `/work` index, option `#1d` |
| Headshot | square, ≥256px | LinkedIn panel |
| CV | PDF | `/public/cv-riad-hallouch.pdf` |
| Favicon / icon / apple-icon | ico + svg + 180×180 png | root |
| Upwork profile screenshot | optional; only if a visual proof block is wanted later | — |

Fonts come from Google Fonts (Instrument Serif, Geist, Geist Mono) — load via `next/font/google`, not a CDN `<link>`.

Real content still needed: project names and case-study copy, three-plus verbatim review quotes with client names and roles, the real LinkedIn recommendation count and follower count, and the actual contact email (`hello@riadhallouch.com` is a placeholder).

---

## Files

- `Portfolio Mockups.dc.html` — the design reference. Build option `#2a`; `#1d` is the approved-for-later `/work` grid; `#plan` holds the original architecture notes; other options are superseded.
