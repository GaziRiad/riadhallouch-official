import { getSiteSettings } from "@/sanity/queries";

export async function JsonLd() {
  const settings = await getSiteSettings();
  const rating = settings.heroStats.find((s) => s.label === "Average rating");
  const reviews = settings.heroStats.find((s) => s.label === "Five-star reviews");

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: settings.name,
    url: settings.url,
    image: `${settings.url}/apple-icon`,
    jobTitle: settings.role,
    description: settings.description,
    email: `mailto:${settings.email}`,
    sameAs: [settings.links.linkedin, settings.links.github, settings.links.upwork],
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "AI Integration",
      "Sanity CMS",
      "MVP Development",
    ],
  };

  // Individual Review entries are deliberately omitted here: shipping fake
  // or unverified reviews in structured data is a real SEO/trust liability.
  // Add `review` items once you have real, verbatim quotes to publish.
  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${settings.name} — Freelance Software Engineering`,
    url: settings.url,
    priceRange: "$$",
    areaServed: "Worldwide",
    aggregateRating: rating
      ? {
          "@type": "AggregateRating",
          ratingValue: rating.value.toFixed(rating.decimals ?? 0),
          reviewCount: reviews?.value ?? 0,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalService) }}
      />
    </>
  );
}
