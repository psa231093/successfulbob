import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "blurb",
      title: "Blurb",
      description: "One or two sentence description shown on the Insights page.",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "topics",
      title: "Topics",
      description: "3 representative questions/topics shown on the Insights category card.",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      description: "Lower numbers appear first on the Insights page.",
      type: "number",
      initialValue: 99,
    }),
  ],
  preview: {
    select: { title: "title" },
  },
  orderings: [
    {
      title: "Sort Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
