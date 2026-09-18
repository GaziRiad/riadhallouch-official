import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 3,
      description: "Verbatim, only quotes you have permission to publish. Keep it short — cards clamp at 4 lines.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "name",
      title: "Client name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Client role",
      type: "string",
      description: 'e.g. "Founder", "CTO".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    {
      title: "Sort order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "quote" },
  },
});
