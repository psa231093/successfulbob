import { defineField, defineType } from "sanity";

/* The reusable workshop content type. One document per workshop; the one that
   is live is chosen by the Workshop Settings singleton, not by a flag here.

   Unlike post/author/category this type uses `groups` (tabs). Sixty-odd fields
   in one flat column is unusable. Groups are per-type, so this has no effect on
   the existing schemas. */

const richText = {
  type: "array" as const,
  of: [
    {
      type: "block" as const,
      styles: [{ title: "Normal", value: "normal" }],
      lists: [{ title: "Bullet", value: "bullet" }],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          {
            name: "link", type: "object", title: "Link",
            fields: [{ name: "href", type: "url", title: "URL" }],
          },
        ],
      },
    },
  ],
};

export default defineType({
  name: "workshop",
  title: "Workshop",
  type: "document",
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "hero", title: "Hero" },
    { name: "sessions", title: "Sessions" },
    { name: "previews", title: "Previews" },
    { name: "video", title: "Video" },
    { name: "content", title: "Content" },
    { name: "audience", title: "Audience" },
    { name: "logistics", title: "Format" },
    { name: "pricing", title: "Pricing" },
    { name: "credit", title: "Credit" },
    { name: "proof", title: "Credibility" },
    { name: "faqs", title: "FAQs" },
    { name: "closing", title: "Closing" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    /* -- Identity -- */
    defineField({ name: "title", title: "Workshop Title", type: "string", group: "identity", validation: (R) => R.required() }),
    defineField({ name: "slug", title: "Slug", description: "Not used in the URL today (the page lives at /workshops), but kept so an archive can be added later without a migration.", type: "slug", options: { source: "title", maxLength: 96 }, group: "identity", validation: (R) => R.required() }),
    defineField({
      name: "state", title: "Page State", type: "string", group: "identity",
      description: "Drives the hero badge, the seat line, the main button, and the block at the bottom of the page.",
      options: {
        layout: "radio",
        list: [
          { title: "Open — selling normally", value: "open" },
          { title: "Limited — showing a seat count", value: "limited" },
          { title: "Sold out — main session full", value: "sold-out" },
          { title: "Closed — no future date announced", value: "closed" },
          { title: "Next cohort — a future date is announced", value: "next-cohort" },
        ],
      },
      initialValue: "open",
      validation: (R) => R.required(),
    }),
    defineField({ name: "campaignTag", title: "Default campaign tag", description: 'Used as utm_source on registration links when a visitor arrives untagged, e.g. "site".', type: "string", initialValue: "site", group: "identity" }),

    /* -- Hero -- */
    defineField({ name: "eyebrow", title: "Eyebrow", description: "Small label above the headline.", type: "string", group: "hero" }),
    defineField({ name: "heroHeadline", title: "Headline", type: "string", group: "hero", validation: (R) => R.required() }),
    defineField({ name: "heroHeadlineHighlight", title: "Headline highlight", description: "The part of the headline shown in the blue-to-purple gradient. Must appear in the headline above, or it is ignored.", type: "string", group: "hero" }),
    defineField({ name: "heroSubhead", title: "Subhead", type: "text", rows: 3, group: "hero", validation: (R) => R.required() }),
    defineField({ name: "heroFinePrint", title: "Fine print", description: "Small line under the buttons.", type: "string", group: "hero" }),
    defineField({
      name: "heroImage", title: "Hero image (optional)", description: "Optional backdrop. The hero is designed to work without it.", type: "image", options: { hotspot: true }, group: "hero",
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({
      name: "heroInventoryItems", title: "Truth inventory panel", type: "array", group: "hero",
      description: "The audit panel beside the headline. Each row is a claim about a product, marked as known, unclear, or disputed. Leave empty to show a plain session summary instead.",
      of: [{
        type: "object", name: "truthItem", title: "Claim",
        fields: [
          defineField({ name: "label", title: "Claim", type: "string", validation: (R) => R.required() }),
          defineField({
            name: "status", title: "Status", type: "string", validation: (R) => R.required(),
            options: { layout: "radio", list: [{ title: "Known", value: "known" }, { title: "Unclear", value: "unclear" }, { title: "Disputed", value: "disputed" }] },
            initialValue: "unclear",
          }),
          defineField({ name: "note", title: "Note on hover", type: "string" }),
        ],
        preview: { select: { title: "label", subtitle: "status" } },
      }],
      validation: (R) => R.max(9),
    }),

    /* -- Sessions -- */
    defineField({ name: "primarySession", title: "Main session", type: "workshopSession", group: "sessions", validation: (R) => R.required() }),
    defineField({ name: "overflowSession", title: "Second session (optional)", description: "A separate, later session at a different price. Hidden from the page until you tick the box below.", type: "workshopSession", group: "sessions" }),
    defineField({
      name: "revealOverflow", title: "Show the second session on the page",
      description: "Tick this when roughly 3 seats remain on the main session. Revealing it early gives the second session time to fill while the first still looks scarce. Deliberately independent of the page state, so the main session can still read as open.",
      type: "boolean", initialValue: false, group: "sessions",
    }),
    defineField({ name: "overflowHeadline", title: "Second session headline", type: "string", group: "sessions" }),
    defineField({ name: "overflowBody", title: "Second session body", type: "text", rows: 3, group: "sessions" }),
    defineField({
      name: "minimumThresholdNote", title: "Minimum-participants promise", type: "text", rows: 4, group: "sessions",
      description: "Shown to buyers as a commitment, so it has to match what you will actually do. State the minimum, that they are charged at booking, that they are refunded in full if it is not reached, and the date you decide by. The decision is manual, so put that date in your own calendar too. Required whenever a second session exists.",
      validation: (R) => R.custom((note, ctx) => {
        const doc = ctx.document as { overflowSession?: unknown } | undefined;
        if (doc?.overflowSession && !note) return "A second session is set up, so this promise must be filled in. It appears on the page as a commitment to buyers.";
        return true;
      }),
    }),

    /* -- Previews -- */
    defineField({ name: "previewEyebrow", title: "Eyebrow", type: "string", group: "previews" }),
    defineField({ name: "previewHeadline", title: "Headline", type: "string", group: "previews" }),
    defineField({ name: "previewBody", title: "Body", type: "text", rows: 3, group: "previews" }),
    defineField({
      name: "previews", title: "Preview sessions", type: "array", group: "previews",
      of: [{
        type: "object", name: "previewSession", title: "Preview",
        fields: [
          defineField({ name: "dateDisplay", title: "Date (as shown)", type: "string", validation: (R) => R.required() }),
          defineField({ name: "timeDisplay", title: "Time (as shown)", type: "string" }),
          defineField({ name: "priceLabel", title: "Price label", type: "string", initialValue: "Free" }),
          defineField({ name: "startsAt", title: "Starts at (not shown)", type: "datetime" }),
          defineField({ name: "registrationUrl", title: "Registration URL", type: "url", validation: (R) => R.required().uri({ scheme: ["https"] }) }),
        ],
        preview: { select: { title: "dateDisplay", subtitle: "timeDisplay" } },
      }],
      validation: (R) => R.max(4),
    }),
    defineField({ name: "previewDisclaimer", title: "Disclaimer", description: "e.g. that a preview does not hold a seat.", type: "text", rows: 2, group: "previews" }),

    /* -- Video -- */
    defineField({ name: "videoUrl", title: "YouTube URL", description: "Paste the normal watch link. Leave blank and the whole video section disappears.", type: "url", group: "video" }),
    defineField({ name: "videoTitle", title: "Video title", type: "string", group: "video" }),
    defineField({ name: "videoDuration", title: "Duration label", description: 'e.g. "2 min".', type: "string", group: "video" }),
    defineField({ name: "videoCaption", title: "Caption below the video", type: "string", group: "video" }),
    defineField({
      name: "videoPoster", title: "Poster image", description: "Shown before someone presses play. Keeps the page fast and on-brand.", type: "image", options: { hotspot: true }, group: "video",
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),

    /* -- Content -- */
    defineField({ name: "problemEyebrow", title: "Problem eyebrow", type: "string", group: "content" }),
    defineField({ name: "problemHeadline", title: "Problem headline", type: "string", group: "content" }),
    defineField({ name: "problemBody", title: "Problem body", ...richText, group: "content" }),
    defineField({ name: "problemPullQuote", title: "Pull quote", type: "text", rows: 2, group: "content" }),
    defineField({ name: "whatYouDoEyebrow", title: "What you will do — eyebrow", type: "string", group: "content" }),
    defineField({ name: "whatYouDoHeadline", title: "What you will do — headline", type: "string", group: "content" }),
    defineField({
      name: "whatYouDoItems", title: "What you will do", type: "array", group: "content",
      of: [{
        type: "object", name: "doItem",
        fields: [
          defineField({ name: "title", title: "Title", type: "string", validation: (R) => R.required() }),
          defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
        ],
        preview: { select: { title: "title" } },
      }],
    }),
    defineField({ name: "outcomesEyebrow", title: "What you leave with — eyebrow", type: "string", group: "content" }),
    defineField({ name: "outcomesHeadline", title: "What you leave with — headline", type: "string", group: "content" }),
    defineField({
      name: "outcomes", title: "What you leave with", type: "array", group: "content",
      of: [{
        type: "object", name: "outcomeItem",
        fields: [
          defineField({ name: "title", title: "Title", type: "string", validation: (R) => R.required() }),
          defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
        ],
        preview: { select: { title: "title" } },
      }],
    }),

    /* -- Audience -- */
    defineField({ name: "audienceEyebrow", title: "Eyebrow", type: "string", group: "audience" }),
    defineField({ name: "audienceHeadline", title: "Headline", type: "string", group: "audience" }),
    defineField({ name: "audienceIntro", title: "Intro", type: "text", rows: 3, group: "audience" }),
    defineField({
      name: "audienceRoles", title: "Why each role attends", type: "array", group: "audience",
      of: [{
        type: "object", name: "roleFit",
        fields: [
          defineField({ name: "role", title: "Role", type: "string", validation: (R) => R.required() }),
          defineField({ name: "reason", title: "Why they attend", type: "text", rows: 2, validation: (R) => R.required() }),
        ],
        preview: { select: { title: "role", subtitle: "reason" } },
      }],
    }),
    defineField({ name: "notForHeadline", title: "Who it is not for — headline", type: "string", group: "audience" }),
    defineField({ name: "notFor", title: "Who it is not for", type: "array", of: [{ type: "string" }], group: "audience" }),

    /* -- Format -- */
    defineField({ name: "formatEyebrow", title: "Eyebrow", type: "string", group: "logistics" }),
    defineField({ name: "formatHeadline", title: "Headline", type: "string", group: "logistics" }),
    defineField({ name: "formatSummary", title: "Summary", type: "text", rows: 3, group: "logistics" }),
    defineField({ name: "platformNote", title: "Platform note", description: 'e.g. "Live and interactive on Zoom".', type: "string", group: "logistics" }),
    defineField({
      name: "agenda", title: "Agenda", type: "array", group: "logistics",
      of: [{
        type: "object", name: "agendaItem",
        fields: [
          defineField({ name: "time", title: "Time", description: 'Optional, e.g. "First 30 minutes".', type: "string" }),
          defineField({ name: "title", title: "Title", type: "string", validation: (R) => R.required() }),
          defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
        ],
        preview: { select: { title: "title", subtitle: "time" } },
      }],
    }),
    defineField({ name: "preWorkHeadline", title: "Pre-work headline", type: "string", group: "logistics" }),
    defineField({ name: "preWorkBody", title: "Pre-work body", description: "Explain how pre-work is sent out and how participants return it.", type: "text", rows: 4, group: "logistics" }),
    defineField({ name: "followUpHeadline", title: "Follow-up headline", type: "string", group: "logistics" }),
    defineField({ name: "followUpBody", title: "Follow-up body", description: "Do NOT put the booking link here. It is sent privately after the session, so a public link would let non-participants book.", type: "text", rows: 4, group: "logistics" }),

    /* -- Pricing -- */
    defineField({ name: "pricingEyebrow", title: "Eyebrow", type: "string", group: "pricing" }),
    defineField({ name: "pricingHeadline", title: "Headline", type: "string", group: "pricing" }),
    defineField({ name: "seatRules", title: "Seat rules", description: "One per line. Substitutions are handled as refund and repurchase, so avoid the word transferable.", type: "array", of: [{ type: "string" }], group: "pricing" }),
    defineField({ name: "refundPolicy", title: "Refund policy", type: "text", rows: 3, group: "pricing", validation: (R) => R.required() }),

    /* -- Credit -- */
    defineField({ name: "assessmentCreditHeadline", title: "Headline", type: "string", group: "credit" }),
    defineField({ name: "assessmentCreditBody", title: "Body", description: "Include whether fees from several colleagues combine, and the booking window.", type: "text", rows: 4, group: "credit" }),
    defineField({ name: "assessmentCreditLinkLabel", title: "Link label", type: "string", initialValue: "See the Assessment", group: "credit" }),
    defineField({ name: "assessmentCreditHref", title: "Link target", type: "string", initialValue: "/production-ready#assessment", group: "credit" }),

    /* -- Credibility -- */
    defineField({ name: "bobEyebrow", title: "Eyebrow", type: "string", group: "proof" }),
    defineField({ name: "bobHeadline", title: "Headline", type: "string", group: "proof" }),
    defineField({ name: "bobBody", title: "Body", ...richText, group: "proof" }),
    defineField({
      name: "bobStats", title: "Stats", type: "array", group: "proof",
      of: [{
        type: "object", name: "statItem",
        fields: [
          defineField({ name: "value", title: "Value", type: "string", validation: (R) => R.required() }),
          defineField({ name: "label", title: "Label", type: "string", validation: (R) => R.required() }),
        ],
        preview: { select: { title: "value", subtitle: "label" } },
      }],
      validation: (R) => R.max(3),
    }),
    defineField({
      name: "bobPhoto", title: "Photo", type: "image", options: { hotspot: true }, group: "proof",
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({
      name: "testimonials", title: "Testimonials", description: "The section stays hidden until there is at least one.", type: "array", group: "proof",
      of: [{
        type: "object", name: "testimonial",
        fields: [
          defineField({ name: "quote", title: "Quote", type: "text", rows: 3, validation: (R) => R.required() }),
          defineField({ name: "name", title: "Name", type: "string", validation: (R) => R.required() }),
          defineField({ name: "role", title: "Role", type: "string" }),
          defineField({ name: "company", title: "Company", type: "string" }),
          defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
        ],
        preview: { select: { title: "name", subtitle: "company", media: "photo" } },
      }],
    }),

    /* -- FAQs -- */
    defineField({ name: "faqHeadline", title: "Headline", type: "string", initialValue: "Common questions", group: "faqs" }),
    defineField({
      name: "faqs", title: "FAQs", type: "array", group: "faqs",
      of: [{
        type: "object", name: "faqItem", title: "FAQ",
        fields: [
          defineField({ name: "question", title: "Question", type: "string", validation: (R) => R.required() }),
          defineField({ name: "answer", title: "Answer", type: "text", rows: 3, validation: (R) => R.required() }),
        ],
        preview: { select: { title: "question" } },
      }],
    }),

    /* -- Closing -- */
    defineField({ name: "finalBlockHeadline", title: "Final block headline", type: "string", group: "closing" }),
    defineField({ name: "finalBlockBody", title: "Final block body", type: "text", rows: 3, group: "closing" }),
    defineField({ name: "closedMessage", title: "Closed message", description: 'Shown when the page state is "closed".', type: "text", rows: 3, group: "closing" }),
    defineField({ name: "nextCohortHeadline", title: "Next cohort headline", type: "string", group: "closing" }),
    defineField({ name: "nextCohortDateDisplay", title: "Next cohort date (as shown)", type: "string", group: "closing" }),
    defineField({ name: "nextCohortNotifyUrl", title: "Notify-me URL", description: "Optional. Without it the button falls back to the fit-call scheduler.", type: "url", group: "closing" }),

    /* -- SEO -- */
    defineField({ name: "metaTitle", title: "Meta title", type: "string", group: "seo", validation: (R) => R.required() }),
    defineField({ name: "metaDescription", title: "Meta description", type: "text", rows: 3, group: "seo", validation: (R) => R.required().max(300) }),
    defineField({ name: "ogImage", title: "Social preview image", type: "image", options: { hotspot: true }, group: "seo" }),
    defineField({ name: "noIndex", title: "Hide from search engines", type: "boolean", initialValue: false, group: "seo" }),
  ],

  /* Stops the combination that produces a "Registration closed" badge above a
     button pointing nowhere. */
  validation: (R) => R.custom((doc) => {
    const d = doc as { state?: string; nextCohortDateDisplay?: string } | undefined;
    if (d?.state === "next-cohort" && !d?.nextCohortDateDisplay) {
      return 'The page state is "Next cohort", so a date must be filled in on the Closing tab. Use "Closed" instead if no date is announced yet.';
    }
    return true;
  }),

  preview: {
    select: { title: "title", state: "state", date: "primarySession.dateDisplay" },
    prepare(sel) {
      return { title: sel.title, subtitle: [sel.state, sel.date].filter(Boolean).join(" — ") };
    },
  },
});
