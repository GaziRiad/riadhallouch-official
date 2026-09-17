export type Testimonial = {
  name: string;
  role: string;
  source: "Upwork" | "LinkedIn" | "Direct Client";
  rating: number;
  quote: string;
};

// PLACEHOLDER CONTENT — replace with real, verbatim review quotes you have
// permission to publish. Keep attribution accurate (name/role can be
// shortened, e.g. "Client, E-Commerce Startup", if you prefer not to use
// full names).
export const testimonials: Testimonial[] = [
  {
    name: "J. Whitfield",
    role: "Founder, E-Commerce Startup",
    source: "Upwork",
    rating: 5,
    quote:
      "Riad rebuilt our checkout flow in a fraction of the time we budgeted and caught two edge cases our previous developer missed entirely. Communication was excellent throughout.",
  },
  {
    name: "M. Andersson",
    role: "Operations Lead, Logistics Client",
    source: "Upwork",
    rating: 5,
    quote:
      "We handed him a messy set of requirements for our internal ERP workflow and he came back with a scoped plan before writing a line of code. That alone told us we'd hired the right person.",
  },
  {
    name: "S. Okafor",
    role: "CTO, SaaS Startup",
    source: "Upwork",
    rating: 5,
    quote:
      "Fast, precise, and proactive about flagging technical debt before it became a problem. This is the kind of engineer you want owning a feature end to end.",
  },
  {
    name: "L. Bergman",
    role: "Product Manager",
    source: "LinkedIn",
    rating: 5,
    quote:
      "One of the most reliable contractors we've worked with. Deadlines were never a question mark, and the code quality made our internal team's review process painless.",
  },
];
