export type Recommendation = {
  name: string;
  role: string;
  company: string;
  quote: string;
};

// PLACEHOLDER CONTENT — pull real recommendation text from your LinkedIn
// profile (with the author's permission to republish) and swap these in.
export const linkedinRecommendations: Recommendation[] = [
  {
    name: "Amine K.",
    role: "Engineering Manager",
    company: "Client Company",
    quote:
      "Riad is the rare freelancer who thinks like a full-time team member — he asks the right architectural questions before building, not after.",
  },
  {
    name: "Sarah T.",
    role: "Product Lead",
    company: "Client Company",
    quote:
      "We brought him in for a two-week sprint and extended the engagement three times. Consistently delivered ahead of schedule with clean, documented code.",
  },
];

export const linkedinStats = {
  // TODO: update with your real LinkedIn profile numbers.
  connections: "500+",
  recommendations: linkedinRecommendations.length,
  profileUrl: "https://linkedin.com/in/riadhallouch",
};
