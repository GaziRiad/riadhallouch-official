export const siteConfig = {
  name: "Riad Hallouch",
  role: "Full-Stack Software Engineer",
  roles: [
    "Full-Stack Software Engineer",
    "Freelance Web Developer",
    "ERP & Automation Specialist",
    "React / Next.js Engineer",
  ],
  tagline:
    "I build fast, reliable web products for startups, agencies, and clients who need software that actually ships.",
  description:
    "Portfolio of Riad Hallouch, a full-stack software engineer specializing in React, Next.js, and business-workflow automation. Top Rated on Upwork with $14K+ earned across 30+ delivered projects and a 5.0 rating.",
  location: "Algeria (Remote, UTC+1)",
  email: "riadhallouch447@gmail.com",
  // TODO: replace with your production domain before deploying.
  url: "https://riadhallouch.com",
  ogImage: "/opengraph-image",
  keywords: [
    "Riad Hallouch",
    "Full-Stack Software Engineer",
    "Next.js Developer",
    "React Developer",
    "Freelance Web Developer",
    "Upwork Top Rated Developer",
    "ERP Automation Engineer",
    "JavaScript Engineer",
    "Web Application Developer",
    "Remote Software Engineer",
  ],
  links: {
    github: "https://github.com/riadhallouch",
    linkedin: "https://linkedin.com/in/riadhallouch",
    upwork: "https://www.upwork.com/freelancers/riadhallouch",
    twitter: "https://x.com/riadhallouch",
    resume: "/resume.pdf",
  },
} as const;

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "Upwork", href: "#upwork" },
  { label: "Skills", href: "#skills" },
  { label: "Reviews", href: "#reviews" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
