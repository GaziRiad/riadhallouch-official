export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

// PLACEHOLDER CONTENT — replace with real, verbatim review quotes you have
// permission to publish. The design shows 24 total reviews; keep at least
// 6 distinct entries here so the sliding marquee doesn't repeat too soon.
export const testimonials: Testimonial[] = [
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

export const moneyLine = "$14.2k earned across 30+ Upwork contracts, all rated five stars.";
