import { siteConfig } from "@/data/site";
import { testimonials } from "@/data/testimonials";

export function JsonLd() {
  const averageRating =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

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
    knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "ERP Automation", "Workflow Automation"],
  };

  // NOTE: `reviewCount` mirrors the "30+ projects delivered" figure as a
  // reasonable proxy. Update it if your real Upwork review count differs.
  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${siteConfig.name} — Freelance Software Engineering`,
    url: siteConfig.url,
    priceRange: "$$",
    areaServed: "Worldwide",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating.toFixed(1),
      reviewCount: 30,
      bestRating: 5,
      worstRating: 1,
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewRating: { "@type": "Rating", ratingValue: t.rating, bestRating: 5 },
      reviewBody: t.quote,
    })),
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
