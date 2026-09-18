import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  // Singleton — the Studio structure pins exactly one of these and hides
  // the "create new" action, so there is only ever one document of this type.
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Role / title",
      type: "string",
      description: 'e.g. "Senior Next.js Developer"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Hero tagline",
      type: "text",
      rows: 3,
      description: "The one-liner under your name in the hero section.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "SEO description",
      type: "text",
      rows: 3,
      description: "Used for meta description, Open Graph, and Twitter cards.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "availabilityBadge",
      title: "Availability badge",
      type: "string",
      description: 'Small label in the top-right of the hero, e.g. "Available for work".',
      initialValue: "Available for work",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Contact email",
      type: "string",
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: "url",
      title: "Production URL",
      type: "url",
      description: "Your live domain, e.g. https://riadhallouch.com — used for SEO and sitemap.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "keywords",
      title: "SEO keywords",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "calLink",
      title: "Cal.com link",
      type: "string",
      description: 'Just the "username/event" part, e.g. "riadhallouch/20min".',
    }),
    defineField({
      name: "headshot",
      title: "Headshot photo",
      type: "image",
      options: { hotspot: true },
      description: "Used in the closing CTA and testimonials panel. Falls back to a bundled photo if empty.",
    }),
    defineField({
      name: "cvFile",
      title: "CV / résumé (PDF)",
      type: "file",
      options: { accept: "application/pdf" },
      description: "Falls back to a bundled PDF if empty.",
    }),
    defineField({
      name: "links",
      title: "Social & profile links",
      type: "object",
      fields: [
        defineField({ name: "github", title: "GitHub", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
        defineField({ name: "upwork", title: "Upwork", type: "url" }),
      ],
    }),
    defineField({
      name: "heroStats",
      title: "Hero stat strip",
      type: "array",
      description: "The 4-column stat grid under the hero tagline.",
      of: [
        defineField({
          name: "stat",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "value", title: "Value", type: "number", validation: (r) => r.required() }),
            defineField({ name: "prefix", title: "Prefix", type: "string" }),
            defineField({ name: "suffix", title: "Suffix", type: "string", description: 'e.g. "+" or "%"' }),
            defineField({
              name: "decimals",
              title: "Decimal places",
              type: "number",
              initialValue: 0,
            }),
            defineField({ name: "accent", title: "Accent color", type: "boolean", initialValue: false }),
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        }),
      ],
      validation: (r) => r.max(4),
    }),
    defineField({
      name: "widgetStats",
      title: "Floating rating widget",
      type: "object",
      description: 'The dark "Client rating" card that floats over the hero.',
      fields: [
        defineField({ name: "rating", title: "Rating", type: "string", initialValue: "5.00" }),
        defineField({ name: "reviews", title: "Reviews line", type: "string", description: 'e.g. "24 · all 5★"' }),
        defineField({ name: "jobSuccess", title: "Job success", type: "string", initialValue: "100%" }),
        defineField({ name: "onTimeDelivery", title: "On-time delivery", type: "string", initialValue: "100%" }),
        defineField({ name: "shippedCaption", title: "Shipped caption", type: "string", initialValue: "Shipped" }),
        defineField({ name: "shippedValue", title: "Shipped value", type: "string", description: 'e.g. "30+ projects"' }),
      ],
    }),
    defineField({
      name: "techStack",
      title: "Tech marquee items",
      type: "array",
      of: [{ type: "string" }],
      description: "Scrolling band of technologies below the hero.",
    }),
    defineField({
      name: "moneyLine",
      title: "Testimonials money line",
      type: "string",
      description: 'e.g. "$14.2k earned across 30+ Upwork contracts, all rated five stars."',
    }),
    defineField({
      name: "linkedinPanel",
      title: "LinkedIn panel",
      type: "object",
      fields: [
        defineField({ name: "recommendations", title: "Recommendations count", type: "number" }),
        defineField({ name: "followers", title: "Followers", type: "string", description: 'e.g. "6.4k"' }),
        defineField({ name: "blurb", title: "Blurb", type: "text", rows: 2 }),
        defineField({ name: "profileUrl", title: "Profile URL", type: "url" }),
      ],
    }),
    defineField({
      name: "currentlyItems",
      title: '"Currently" panel items',
      type: "array",
      description: "The small status list in the closing CTA panel.",
      of: [
        defineField({
          name: "item",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "accent", title: "Accent dot", type: "boolean", initialValue: false }),
          ],
          preview: { select: { title: "label" } },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
