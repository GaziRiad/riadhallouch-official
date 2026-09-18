export type Stat = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  accent?: boolean;
};

// Verified figures per the design brief — do not round these differently
// across the site (hero strip, widget, and JSON-LD must all agree).
export const heroStats: Stat[] = [
  { label: "Projects delivered", value: 30, suffix: "+" },
  { label: "Average rating", value: 5, decimals: 2 },
  { label: "Five-star reviews", value: 24 },
  { label: "Job success", value: 100, suffix: "%", accent: true },
];

export const widgetStats = {
  rating: "5.00",
  reviews: "24 · all 5★",
  jobSuccess: "100%",
  onTimeDelivery: "100%",
  shippedCaption: "Shipped",
  shippedValue: "30+ projects",
};

export const techStack = [
  "Next.js 15",
  "App Router",
  "TypeScript",
  "Sanity CMS",
  "OpenAI / Anthropic SDK",
  "Postgres",
  "GSAP",
  "Vercel",
];
