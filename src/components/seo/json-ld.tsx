import { siteConfig } from "@/data/site";

export function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}/apple-icon`,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    email: `mailto:${siteConfig.email}`,
    sameAs: [siteConfig.links.linkedin, siteConfig.links.github, siteConfig.links.upwork],
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "AI Integration",
      "Sanity CMS",
      "MVP Development",
    ],
  };

  // Real, verified figures per the design brief (30+ projects, 5.00 rating,
  // 24 five-star reviews). Individual Review entries are deliberately
  // omitted: the testimonial quotes in src/data/testimonials.ts are
  // placeholder copy, and shipping fake reviews in structured data is a
  // real SEO/trust liability — add `review` items only once you have real,
  // verbatim quotes to publish.
  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${siteConfig.name} — Freelance Software Engineering`,
    url: siteConfig.url,
    priceRange: "$$",
    areaServed: "Worldwide",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.00",
      reviewCount: 24,
      bestRating: 5,
      worstRating: 1,
    },
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
