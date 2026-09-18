export type ProjectMetric = { value: string; label: string };

export type Project = {
  slug: string;
  index: string;
  title: string;
  meta: string; // "AI product · 6 weeks" style meta for the homepage rows
  gridCategory: string; // short badge for the /work grid, e.g. "AI · SaaS"
  year: string;
  summary: string; // one-liner for the /work grid card
  body: string; // paragraph for the homepage editorial row
  stack: string[];
  metrics: ProjectMetric[];
  featured?: boolean; // dark card treatment in the /work grid
  onHomepage?: boolean;
};

// PLACEHOLDER CONTENT — every project below is a dummy per the design
// brief. Replace title/meta/body/stack/metrics with real case studies;
// keep the problem → decision → result shape of `body`.
export const projects: Project[] = [
  {
    slug: "project-one",
    index: "01",
    title: "Project name",
    meta: "AI product · 6 weeks",
    gridCategory: "AI · SaaS",
    year: "2026",
    summary: "One line on what it does and the result it drove.",
    body: "One paragraph on the problem, what you built, and the outcome. Swap this for real copy — the layout holds two to four lines comfortably.",
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
    stack: ["Next.js", "Postgres", "GSAP"],
    metrics: [],
  },
];

export const homepageProjects = projects.filter((p) => p.onHomepage);
