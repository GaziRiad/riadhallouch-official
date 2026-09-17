export type Project = {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  outcome: string;
  stack: string[];
  type: "Freelance / Upwork" | "Product Build" | "Confidential Client";
  year: string;
  href?: string;
  repoHref?: string;
  featured?: boolean;
};

// PLACEHOLDER CONTENT — swap in your real case studies, links, and metrics.
// Keep the problem/solution/outcome structure: it's what makes this read as
// engineering work instead of a portfolio gallery.
export const projects: Project[] = [
  {
    slug: "erp-workflow-automation",
    title: "ERP Inventory & Workflow Automation Platform",
    summary:
      "Custom ERP module that replaced manual spreadsheet tracking with automated stock, order, and approval workflows.",
    problem:
      "Client's operations team was reconciling inventory and purchase approvals across five spreadsheets, causing weekly reporting errors.",
    solution:
      "Built a role-based workflow engine on top of their existing ERP with automated approval chains, low-stock triggers, and a real-time dashboard.",
    outcome: "Cut manual reconciliation time by ~70% and eliminated duplicate-order errors.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Docker"],
    type: "Freelance / Upwork",
    year: "2024",
    featured: true,
  },
  {
    slug: "multi-vendor-marketplace",
    title: "Multi-Vendor E-Commerce Platform",
    summary:
      "Marketplace web app supporting independent vendor storefronts, order routing, and payout tracking.",
    problem:
      "Client needed a marketplace MVP fast, with vendor onboarding and commission logic that off-the-shelf platforms didn't support.",
    solution:
      "Delivered a Next.js storefront with a headless commerce backend, vendor dashboards, and automated payout calculations.",
    outcome: "Shipped MVP in under 8 weeks; onboarded first vendor cohort at launch.",
    stack: ["Next.js", "TypeScript", "Stripe Connect", "MongoDB"],
    type: "Freelance / Upwork",
    year: "2024",
    featured: true,
  },
  {
    slug: "public-services-portal",
    title: "Public Services Request Portal",
    summary:
      "Citizen-facing portal for submitting and tracking service requests, built for a government-affiliated client.",
    problem:
      "Requests were processed manually via email and physical forms, with no status visibility for citizens or staff.",
    solution:
      "Built a secure request portal with status tracking, document uploads, and an internal staff review queue.",
    outcome: "Digitized the intake process end-to-end; details under NDA.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Role-based Auth"],
    type: "Confidential Client",
    year: "2023",
    featured: true,
  },
  {
    slug: "booking-scheduling-saas",
    title: "Booking & Scheduling SaaS",
    summary: "Multi-timezone scheduling product with calendar sync, reminders, and team availability rules.",
    problem: "Client's existing scheduler couldn't handle overlapping team availability across time zones.",
    solution: "Rebuilt the scheduling engine with conflict detection, calendar-provider sync, and automated reminders.",
    outcome: "Reduced double-booking incidents to near zero post-launch.",
    stack: ["React", "Next.js", "Node.js", "Redis"],
    type: "Freelance / Upwork",
    year: "2023",
  },
  {
    slug: "realtime-analytics-dashboard",
    title: "Real-Time Analytics Dashboard",
    summary: "Internal analytics dashboard streaming operational metrics for a distributed sales team.",
    problem: "Leadership had no real-time visibility into sales pipeline health across regional teams.",
    solution: "Built a live dashboard with websocket-driven updates, drill-down filtering, and exportable reports.",
    outcome: "Became the team's daily standup reference within the first month.",
    stack: ["React", "Node.js", "WebSockets", "PostgreSQL"],
    type: "Product Build",
    year: "2023",
  },
];
