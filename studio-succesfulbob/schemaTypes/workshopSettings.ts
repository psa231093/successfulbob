import { defineField, defineType } from "sanity";

/* Singleton. Points at whichever workshop the /workshops page should show.

   A pointer rather than an "is active" tick box on each workshop: two documents
   can both be ticked, and the page would then pick one arbitrarily with no
   visible cause. A pointer has no ambiguous state. Date-based selection was
   also rejected because it cannot express "closed" or "next cohort".

   The Studio structure pins this to a single document and removes the duplicate
   and delete actions, so a second copy can't be created. */

export default defineType({
  name: "workshopSettings",
  title: "Workshop Settings",
  type: "document",
  fields: [
    defineField({
      name: "activeWorkshop",
      title: "Live workshop",
      description: "The workshop currently shown at /workshops. Change this to switch the page to a different workshop.",
      type: "reference",
      to: [{ type: "workshop" }],
      validation: (R) => R.required(),
    }),
  ],
  preview: {
    select: { title: "activeWorkshop.title", state: "activeWorkshop.state" },
    prepare(sel) {
      return {
        title: sel.title ? `Live: ${sel.title}` : "No workshop selected",
        subtitle: sel.state ? `State: ${sel.state}` : "Pick a workshop to publish the page",
      };
    },
  },
});
