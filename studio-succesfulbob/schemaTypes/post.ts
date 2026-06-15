import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", title: "URL Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (R) => R.required() }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "isFeatured", title: "Featured Post", description: "Pin this article to the featured slot on the Insights page.", type: "boolean", initialValue: false }),
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "category" }] }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "excerpt", title: "Excerpt", description: "Used as the meta description and card blurb.", type: "text", rows: 3, validation: (R) => R.max(300) }),
    defineField({
      name: "featuredImage", title: "Featured Image", type: "image", options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string", validation: (R) => R.required() })],
    }),
    defineField({ name: "openGraphTitle", title: "OG Title Override", description: "Overrides the page title in social previews. Leave blank to use the post title.", type: "string" }),
    defineField({ name: "openGraphDescription", title: "OG Description Override", description: "Overrides the excerpt in social previews.", type: "text", rows: 2 }),
    defineField({ name: "openGraphImage", title: "OG Image Override", description: "Overrides the featured image in social previews.", type: "image", options: { hotspot: true } }),
    defineField({
      name: "body", title: "Article Body", type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link", type: "object", title: "Link",
                fields: [
                  { name: "href", type: "url", title: "URL" },
                  { name: "blank", type: "boolean", title: "Open in new tab", initialValue: false },
                ],
              },
            ],
          },
        },
        {
          type: "image", options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alt Text" }),
            defineField({ name: "caption", type: "string", title: "Caption" }),
          ],
        },
      ],
    }),
    defineField({
      name: "faqs", title: "FAQs", description: "Optional FAQ accordion at the bottom of the article.", type: "array",
      of: [{
        type: "object", name: "faqItem", title: "FAQ",
        fields: [
          defineField({ name: "question", title: "Question", type: "string" }),
          defineField({ name: "answer", title: "Answer", type: "text", rows: 3 }),
        ],
        preview: { select: { title: "question" } },
      }],
    }),
    defineField({ name: "relatedPosts", title: "Related Posts", type: "array", of: [{ type: "reference", to: [{ type: "post" }] }], validation: (R) => R.max(3) }),
  ],
  preview: {
    select: { title: "title", author: "author.name", media: "featuredImage" },
    prepare(sel) { return { title: sel.title, subtitle: sel.author, media: sel.media }; },
  },
  orderings: [{ title: "Published Date, New → Old", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
});
