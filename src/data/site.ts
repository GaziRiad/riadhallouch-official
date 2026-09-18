export const siteConfig = {
  name: "Riad Hallouch",
  role: "Senior Next.js Developer",
  tagline:
    "Senior Next.js developer. AI integration, Sanity, MVP specialist. I take products from blank repo to ranked and profitable.",
  description:
    "Portfolio of Riad Hallouch, a senior Next.js developer specializing in AI integration, Sanity, and MVP builds. 30+ projects delivered, 5.00 average rating, 24 five-star reviews, 100% job success on Upwork.",
  location: "Remote — GMT+1",
  email: "hello@riadhallouch.com",
  // TODO: replace with your production domain before deploying.
  url: "https://riadhallouch.com",
  ogImage: "/opengraph-image",
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
  links: {
    github: "https://github.com/riadhallouch",
    linkedin: "https://linkedin.com/in/riadhallouch",
    upwork: "https://www.upwork.com/freelancers/riadhallouch",
    cv: "/cv-riad-hallouch.pdf",
  },
} as const;

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Writing", href: "/writing" },
];
