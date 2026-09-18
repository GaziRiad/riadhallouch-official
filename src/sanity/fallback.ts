import type { Project, SiteSettings, Testimonial } from "./types";

// Bundled default content — used until a Sanity project is connected (see
// README), and as the seed data pushed into a fresh dataset by
// scripts/seed-sanity.mjs. Keep this as the one place placeholder copy
// lives; everything else should read through the fetchers in ./queries.

export const fallbackSiteSettings: SiteSettings = {
  name: "Riad Hallouch",
  role: "Senior Next.js Developer",
  tagline:
    "Senior Next.js developer. AI integration, Sanity, MVP specialist. I take products from blank repo to ranked and profitable.",
  description:
    "Portfolio of Riad Hallouch, a senior Next.js developer specializing in AI integration, Sanity, and MVP builds. 30+ projects delivered, 5.00 average rating, 24 five-star reviews, 100% job success on Upwork.",
  availabilityBadge: "Available for work",
  location: "Remote — GMT+1",
  email: "hello@riadhallouch.com",
  // TODO: replace with your production domain before deploying.
  url: "https://riadhallouch.com",
  keywords: [
    "Riad Hallouch",
    "Senior Next.js Developer",
    "Next.js Developer",
    "React Developer",
    "AI Integration Engineer",
    "Sanity CMS Developer",
    "Freelance Web Developer",
    "Upwork Top Rated Developer",
    "MVP Development",
    "Remote Software Engineer",
  ],
  // TODO: point this at your real Cal.com event — just the "username/event"
  // part (matches what Cal.com calls a calLink), not the full URL.
  calLink: "riadhallouch/20min",
  headshot: null,
  cvUrl: "/cv-riad-hallouch.pdf",
  links: {
    github: "https://github.com/riadhallouch",
    linkedin: "https://linkedin.com/in/riadhallouch",
    upwork: "https://www.upwork.com/freelancers/riadhallouch",
  },
  heroStats: [
    { label: "Projects delivered", value: 30, suffix: "+" },
    { label: "Average rating", value: 5, decimals: 2 },
    { label: "Five-star reviews", value: 24 },
    { label: "Job success", value: 100, suffix: "%", accent: true },
  ],
  widgetStats: {
    rating: "5.00",
    reviews: "24 · all 5★",
    jobSuccess: "100%",
    onTimeDelivery: "100%",
    shippedCaption: "Shipped",
    shippedValue: "30+ projects",
  },
  techStack: [
    "Next.js 15",
    "App Router",
    "TypeScript",
    "Sanity CMS",
    "OpenAI / Anthropic SDK",
    "Postgres",
    "GSAP",
    "Vercel",
  ],
  moneyLine: "$14.2k earned across 30+ Upwork contracts, all rated five stars.",
  linkedinPanel: {
    recommendations: 12,
    followers: "6.4k",
    blurb: "Managers and teammates I've shipped with have written it down. Employers read these first.",
    profileUrl: "https://linkedin.com/in/riadhallouch",
  },
  currentlyItems: [
    { label: "2 freelance slots open", accent: true },
    { label: "Open to full-time, remote", accent: true },
    { label: "GMT+1 · overlaps US mornings", accent: false },
  ],
};

// PLACEHOLDER CONTENT — every project below is a dummy per the design
// brief. Replace via Sanity Studio with real case studies; keep the
// problem → decision → result shape of the narrative fields.
export const fallbackProjects: Project[] = [
  {
    slug: "project-one",
    index: "01",
    title: "Project name",
    meta: "AI product · 6 weeks",
    gridCategory: "AI · SaaS",
    year: "2026",
    summary: "One line on what it does and the result it drove.",
    body: "One paragraph on the problem, what you built, and the outcome. Swap this for real copy — the layout holds two to four lines comfortably.",
    coverImage: null,
    detailImages: [],
    narrativeProblem:
      "Describe the situation before this project started — the specific constraint, deadline, or broken workflow that made the work necessary. Two to three sentences is usually enough.",
    narrativeApproach:
      "Walk through the key decisions: what you built, what you deliberately left out, and why. This is the section technical stakeholders read closely.",
    narrativeResult:
      "State the outcome in concrete terms — what changed, what it's worth to the client, and what happened after launch. Pair this with the metrics below.",
    stack: ["Next.js", "Sanity", "OpenAI", "Vercel"],
    metrics: [
      { value: "+180%", label: "Organic traffic" },
      { value: "0.4s", label: "LCP" },
      { value: "100", label: "Lighthouse SEO" },
    ],
    onHomepage: true,
  },
  {
    slug: "project-two",
    index: "02",
    title: "Project name",
    meta: "MVP · 4 weeks",
    gridCategory: "MVP",
    year: "2025",
    summary: "One line on what it does and the result it drove.",
    body: "Second case study. Keep the pattern: constraint, decision, result. Clients skim for the result; engineers read for the decision.",
    coverImage: null,
    detailImages: [],
    narrativeProblem:
      "Describe the situation before this project started — the specific constraint, deadline, or broken workflow that made the work necessary. Two to three sentences is usually enough.",
    narrativeApproach:
      "Walk through the key decisions: what you built, what you deliberately left out, and why. This is the section technical stakeholders read closely.",
    narrativeResult:
      "State the outcome in concrete terms — what changed, what it's worth to the client, and what happened after launch. Pair this with the metrics below.",
    stack: ["Next.js", "Postgres", "Stripe"],
    metrics: [
      { value: "28 days", label: "Idea to launch" },
      { value: "$0", label: "Infra cost at launch" },
    ],
    onHomepage: true,
  },
  {
    slug: "project-three",
    index: "03",
    title: "Project name",
    meta: "Featured · 3 weeks",
    gridCategory: "Featured",
    year: "2026",
    summary: "One card per row can carry the dark treatment to break the rhythm.",
    body: "Third case study — reserved for the /work grid's featured dark card.",
    coverImage: null,
    detailImages: [],
    narrativeProblem:
      "Describe the situation before this project started — the specific constraint, deadline, or broken workflow that made the work necessary. Two to three sentences is usually enough.",
    narrativeApproach:
      "Walk through the key decisions: what you built, what you deliberately left out, and why. This is the section technical stakeholders read closely.",
    narrativeResult:
      "State the outcome in concrete terms — what changed, what it's worth to the client, and what happened after launch. Pair this with the metrics below.",
    stack: ["Next.js", "OpenAI"],
    metrics: [],
    featured: true,
  },
  {
    slug: "project-four",
    index: "04",
    title: "Project name",
    meta: "Internal tool · 2 weeks",
    gridCategory: "Automation",
    year: "2025",
    summary: "One line on what it does and the result it drove.",
    body: "Fourth case study placeholder for the /work grid.",
    coverImage: null,
    detailImages: [],
    narrativeProblem:
      "Describe the situation before this project started — the specific constraint, deadline, or broken workflow that made the work necessary. Two to three sentences is usually enough.",
    narrativeApproach:
      "Walk through the key decisions: what you built, what you deliberately left out, and why. This is the section technical stakeholders read closely.",
    narrativeResult:
      "State the outcome in concrete terms — what changed, what it's worth to the client, and what happened after launch. Pair this with the metrics below.",
    stack: ["Next.js", "Postgres"],
    metrics: [],
  },
  {
    slug: "project-five",
    index: "05",
    title: "Project name",
    meta: "E-commerce · 5 weeks",
    gridCategory: "Commerce",
    year: "2024",
    summary: "One line on what it does and the result it drove.",
    body: "Fifth case study placeholder for the /work grid.",
    coverImage: null,
    detailImages: [],
    narrativeProblem:
      "Describe the situation before this project started — the specific constraint, deadline, or broken workflow that made the work necessary. Two to three sentences is usually enough.",
    narrativeApproach:
      "Walk through the key decisions: what you built, what you deliberately left out, and why. This is the section technical stakeholders read closely.",
    narrativeResult:
      "State the outcome in concrete terms — what changed, what it's worth to the client, and what happened after launch. Pair this with the metrics below.",
    stack: ["Next.js", "Stripe", "Sanity"],
    metrics: [],
  },
  {
    slug: "project-six",
    index: "06",
    title: "Project name",
    meta: "SaaS dashboard · 6 weeks",
    gridCategory: "SaaS",
    year: "2024",
    summary: "One line on what it does and the result it drove.",
    body: "Sixth case study placeholder for the /work grid.",
    coverImage: null,
    detailImages: [],
    narrativeProblem:
      "Describe the situation before this project started — the specific constraint, deadline, or broken workflow that made the work necessary. Two to three sentences is usually enough.",
    narrativeApproach:
      "Walk through the key decisions: what you built, what you deliberately left out, and why. This is the section technical stakeholders read closely.",
    narrativeResult:
      "State the outcome in concrete terms — what changed, what it's worth to the client, and what happened after launch. Pair this with the metrics below.",
    stack: ["Next.js", "Postgres", "GSAP"],
    metrics: [],
  },
];

// PLACEHOLDER CONTENT — replace with real, verbatim review quotes you have
// permission to publish via Sanity Studio.
export const fallbackTestimonials: Testimonial[] = [
  { quote: "Review text one. Verbatim from the client.", name: "Client name", role: "Founder" },
  {
    quote: "Review text two. Keep them short enough to read at a glance.",
    name: "Client name",
    role: "CTO",
  },
  { quote: "Review text three.", name: "Client name", role: "Agency lead" },
  { quote: "Review text four. Another verbatim quote goes here.", name: "Client name", role: "Founder" },
  { quote: "Review text five.", name: "Client name", role: "Product Lead" },
  { quote: "Review text six.", name: "Client name", role: "Operations" },
];
