import type { SanityImageSource } from "@sanity/image-url";

export type SanityImage = SanityImageSource & { asset?: { _ref: string } };

export type HeroStat = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  accent?: boolean;
};

export type WidgetStats = {
  rating: string;
  reviews: string;
  jobSuccess: string;
  onTimeDelivery: string;
  shippedCaption: string;
  shippedValue: string;
};

export type LinkedinPanel = {
  recommendations: number;
  followers: string;
  blurb: string;
  profileUrl: string;
};

export type CurrentlyItem = {
  label: string;
  accent?: boolean;
};

export type SiteSettings = {
  name: string;
  role: string;
  tagline: string;
  description: string;
  availabilityBadge: string;
  location: string;
  email: string;
  url: string;
  keywords: string[];
  calLink: string;
  headshot: SanityImage | null;
  cvUrl: string;
  links: {
    github: string;
    linkedin: string;
    upwork: string;
  };
  heroStats: HeroStat[];
  widgetStats: WidgetStats;
  techStack: string[];
  moneyLine: string;
  linkedinPanel: LinkedinPanel;
  currentlyItems: CurrentlyItem[];
};

export type ProjectMetric = { value: string; label: string };

export type Project = {
  slug: string;
  index: string;
  title: string;
  meta: string;
  gridCategory: string;
  year: string;
  summary: string;
  body: string;
  coverImage: SanityImage | null;
  detailImages: SanityImage[];
  narrativeProblem: string;
  narrativeApproach: string;
  narrativeResult: string;
  stack: string[];
  metrics: ProjectMetric[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  onHomepage?: boolean;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};
