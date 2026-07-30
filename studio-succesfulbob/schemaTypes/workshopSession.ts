import { defineField, defineType } from "sanity";

/* One session of a workshop. Used twice on the workshop document (the primary
   cohort and the optional overflow session), so the ~14 fields can't drift
   apart the way two inlined copies would.

   Display strings vs machine values: dateDisplay/timeDisplay/priceDisplay are
   what the page renders, typed by hand. startsAt/endsAt/priceAmount are never
   shown; they exist only for search-engine event data. Formatting a date in the
   browser would render differently on the server and cause a hydration error,
   which is why the displayed values are authored, not computed. */

export default defineType({
  name: "workshopSession",
  title: "Session",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", description: 'Short name for this session, e.g. "Founding cohort".', type: "string", validation: (R) => R.required() }),

    defineField({ name: "dateDisplay", title: "Date (as shown)", description: 'Typed exactly as it should appear, e.g. "Thursday, 24 September 2026".', type: "string", validation: (R) => R.required() }),
    defineField({ name: "timeDisplay", title: "Time (as shown)", description: 'e.g. "12:30 to 3:30 PM ET / 9:30 AM to 12:30 PM PT". Typed by hand so every visitor sees the same string.', type: "string", validation: (R) => R.required() }),
    defineField({ name: "durationDisplay", title: "Duration (as shown)", type: "string", initialValue: "3 hours" }),

    defineField({ name: "startsAt", title: "Starts at (not shown)", description: "Used only for search-engine event listings. Not displayed anywhere on the page.", type: "datetime", validation: (R) => R.required() }),
    defineField({ name: "endsAt", title: "Ends at (not shown)", description: "Used only for search-engine event listings.", type: "datetime" }),

    defineField({ name: "priceDisplay", title: "Price (as shown)", description: 'e.g. "$950".', type: "string", validation: (R) => R.required() }),
    defineField({
      name: "priceAmount", title: "Price (number, not shown)", description: "The same price as a plain number, e.g. 950. Used for search-engine listings only.",
      // The cross-check is a warning, not an error: it exists to catch the two
      // fields drifting apart, and a heuristic must never block publishing.
      // It compares the FIRST number in the display ("$950.00 early bird" ->
      // 950) rather than every digit, so cents and secondary numbers in the
      // text do not false-positive.
      type: "number", validation: (R) => [
        R.required().min(0),
        R.custom((amount, ctx) => {
          const display = (ctx.parent as { priceDisplay?: string } | undefined)?.priceDisplay;
          if (amount == null || !display) return true;
          const token = display.match(/\d[\d,]*(?:\.\d+)?/)?.[0];
          if (!token) return true;
          const shown = parseFloat(token.replace(/,/g, ""));
          return shown === amount ? true : `This does not match the displayed price "${display}". Update both or the price shown to search engines will be wrong.`;
        }).warning(),
      ],
    }),
    defineField({ name: "currency", title: "Currency", type: "string", initialValue: "USD" }),

    defineField({ name: "capacity", title: "Capacity", description: "Total seats, e.g. 12.", type: "number", validation: (R) => R.required().min(1) }),
    defineField({
      name: "seatsRemainingBound", title: "Seats remaining (upper bound)",
      description: 'Leave blank until 8 or fewer seats are left. Then set it to a number the truth can only fall below, and the page shows "Fewer than N seats remain". Only ever revise this DOWN.',
      type: "number", validation: (R) => R.min(1),
    }),
    defineField({ name: "seatStatusAsOf", title: "Seat count as of", description: 'Shown beside the seat line as "as of ...". Update it whenever you change the number above.', type: "date" }),

    defineField({ name: "registrationUrl", title: "Registration URL", description: "The Luma event link for this session.", type: "url", validation: (R) => R.required().uri({ scheme: ["https"] }) }),
    defineField({ name: "soldOut", title: "Sold out", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: { title: "label", subtitle: "dateDisplay" },
  },
});
