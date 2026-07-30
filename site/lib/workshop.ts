import { cache } from "react";
import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { activeWorkshopQuery } from "@/lib/queries";

/* Types, the page-state machine, and the cached fetch for /workshops.

   Everything here is pure over strings. There is deliberately no Date
   formatting anywhere in this file or in any client component: the server would
   format in UTC and the browser in the visitor's locale, which is a hydration
   error that is invisible in development. Dates are authored in Sanity as the
   exact strings to display; the ISO values are only used server-side for
   search-engine event data. */

export type WorkshopState = "open" | "limited" | "sold-out" | "closed" | "next-cohort";

export type TrackEvent = "paid_cta_click" | "preview_cta_click" | "overflow_cta_click" | "video_play";

export type SanityImage = { url: string | null; alt?: string | null } | null;

export type Session = {
  label: string | null;
  dateDisplay: string | null;
  timeDisplay: string | null;
  durationDisplay: string | null;
  startsAt: string | null;
  endsAt: string | null;
  priceDisplay: string | null;
  priceAmount: number | null;
  currency: string | null;
  capacity: number | null;
  seatsRemainingBound: number | null;
  seatStatusAsOf: string | null;
  registrationUrl: string | null;
  soldOut: boolean | null;
};

export type PreviewSession = {
  dateDisplay: string | null;
  timeDisplay: string | null;
  priceLabel: string | null;
  startsAt: string | null;
  registrationUrl: string | null;
};

export type TruthItem = {
  label: string | null;
  status: "known" | "unclear" | "disputed" | null;
  note: string | null;
};

export type TitledItem = { title: string | null; description: string | null };
export type RoleFit = { role: string | null; reason: string | null };
export type AgendaItem = { time: string | null; title: string | null; description: string | null };
export type Stat = { value: string | null; label: string | null };
export type Faq = { question: string; answer: string };
export type Testimonial = {
  quote: string | null;
  name: string | null;
  role: string | null;
  company: string | null;
  photoUrl: string | null;
};

// Portable Text blocks. Shape is opaque here; RichText renders it.
export type PortableTextValue = unknown[] | null;

export type Workshop = {
  title: string | null;
  slug: string | null;
  state: WorkshopState | null;
  campaignTag: string | null;

  eyebrow: string | null;
  heroHeadline: string | null;
  heroHeadlineHighlight: string | null;
  heroSubhead: string | null;
  heroFinePrint: string | null;
  heroImage: SanityImage;
  heroInventoryItems: TruthItem[] | null;

  primarySession: Session | null;
  overflowSession: Session | null;
  revealOverflow: boolean | null;
  overflowHeadline: string | null;
  overflowBody: string | null;
  minimumThresholdNote: string | null;

  previewEyebrow: string | null;
  previewHeadline: string | null;
  previewBody: string | null;
  previewDisclaimer: string | null;
  previews: PreviewSession[] | null;

  videoUrl: string | null;
  videoTitle: string | null;
  videoDuration: string | null;
  videoCaption: string | null;
  videoPoster: SanityImage;

  problemEyebrow: string | null;
  problemHeadline: string | null;
  problemBody: PortableTextValue;
  problemPullQuote: string | null;
  whatYouDoEyebrow: string | null;
  whatYouDoHeadline: string | null;
  whatYouDoItems: TitledItem[] | null;
  outcomesEyebrow: string | null;
  outcomesHeadline: string | null;
  outcomes: TitledItem[] | null;

  audienceEyebrow: string | null;
  audienceHeadline: string | null;
  audienceIntro: string | null;
  audienceRoles: RoleFit[] | null;
  notForHeadline: string | null;
  notFor: string[] | null;

  formatEyebrow: string | null;
  formatHeadline: string | null;
  formatSummary: string | null;
  platformNote: string | null;
  agenda: AgendaItem[] | null;
  preWorkHeadline: string | null;
  preWorkBody: string | null;
  followUpHeadline: string | null;
  followUpBody: string | null;

  pricingEyebrow: string | null;
  pricingHeadline: string | null;
  seatRules: string[] | null;
  refundPolicy: string | null;

  assessmentCreditHeadline: string | null;
  assessmentCreditBody: string | null;
  assessmentCreditLinkLabel: string | null;
  assessmentCreditHref: string | null;

  bobEyebrow: string | null;
  bobHeadline: string | null;
  bobBody: PortableTextValue;
  bobStats: Stat[] | null;
  bobPhoto: SanityImage;
  testimonials: Testimonial[] | null;

  faqHeadline: string | null;
  faqs: Faq[] | null;

  finalBlockHeadline: string | null;
  finalBlockBody: string | null;
  closedMessage: string | null;
  nextCohortHeadline: string | null;
  nextCohortDateDisplay: string | null;
  nextCohortNotifyUrl: string | null;

  metaTitle: string | null;
  metaDescription: string | null;
  ogImageUrl: string | null;
  noIndex: boolean | null;
};

/* A call to action. The three shapes are distinct so a button can never end up
   rendered with no destination: "external" always carries an href, "fit-call"
   never does, and the view builder is what decides between them. */
export type Cta =
  | { kind: "external"; label: string; href: string; track: TrackEvent }
  | { kind: "internal"; label: string; href: string }
  | { kind: "fit-call"; label: string };

export type WorkshopView = {
  state: WorkshopState;
  heroBadge: string | null;
  seatLine: string | null;
  seatAsOf: string | null;
  primaryCta: Cta;
  showPreviews: boolean;
  showOverflow: boolean;
  overflowSeatLine: string | null;
  finalBlock: "register" | "overflow" | "fit-call" | "next-cohort";
};

/* The seat-display policy, enforced in code rather than by discipline.

   An exact remaining count is not representable: this returns either the
   capacity phrasing or a "fewer than N" bound. "Fewer than N" only becomes more
   true as people register, so it cannot be caught out; an exact count is false
   the moment one more person books, and false in the direction that costs
   credibility. Above 8 the bound is suppressed entirely, per the agreed rule
   that no number is shown until 8 or fewer remain. */
export function seatLineFor(s: Session | null): string | null {
  if (!s) return null;
  if (s.soldOut) return s.label ? `${s.label} is full` : "This session is full";
  const n = s.seatsRemainingBound;
  if (n == null || n > 8) {
    return s.capacity ? `Limited to ${s.capacity} participants` : null;
  }
  return `Fewer than ${n} seats remain`;
}

/* "2026-08-15" -> "15 August 2026". A pure string mapping, deliberately not a
   Date: Date formatting differs between the server and the visitor's browser,
   which is a hydration error. Unrecognised input is returned unchanged. */
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export function formatDateOnly(iso: string | null): string | null {
  if (!iso) return null;
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return iso;
  const month = MONTHS[Number(m[2]) - 1];
  if (!month) return iso;
  return `${Number(m[3])} ${month} ${m[1]}`;
}

const FIT_CALL: Cta = { kind: "fit-call", label: "Schedule a 30-Minute Fit Call" };

function reserveCta(s: Session | null, track: TrackEvent, labelPrefix: string): Cta | null {
  if (!s?.registrationUrl) return null;
  const price = s.priceDisplay ? ` — ${s.priceDisplay}` : "";
  return { kind: "external", label: `${labelPrefix}${price}`, href: s.registrationUrl, track };
}

/* Resolves everything the page varies by state, in one place, so a state switch
   cannot half-apply and leave a "sold out" badge above a live reserve button. */
export function buildWorkshopView(w: Workshop): WorkshopView {
  const primary = w.primarySession;
  const overflow = w.overflowSession;

  /* The session's own Sold out switch wins over a stale page state. Without
     this, ticking Sold out on the session while the state still says open
     renders "This session is full" directly above a live reserve button, which
     is the exact contradiction this module exists to prevent. Closed and
     next-cohort are respected as-is: both already suppress the reserve CTA. */
  let state: WorkshopState = w.state ?? "open";
  if (primary?.soldOut && (state === "open" || state === "limited")) {
    state = "sold-out";
  }

  // The second session is revealed by its own switch rather than by the state,
  // so it can be shown before the first is completely full.
  const showOverflow = Boolean(w.revealOverflow && overflow?.registrationUrl);

  const primaryReserve = reserveCta(primary, "paid_cta_click", "Reserve My Seat");
  const overflowReserve = reserveCta(overflow, "overflow_cta_click", "Reserve My Seat");

  switch (state) {
    case "sold-out": {
      // Falls back to the fit call when no second session is set up. A missing
      // overflow must never produce a button with nowhere to go.
      const cta = showOverflow ? overflowReserve : null;
      return {
        state,
        heroBadge: primary?.label ? `${primary.label} is full` : "Sold out",
        seatLine: primary?.label ? `${primary.label} is full` : "This session is full",
        seatAsOf: null,
        primaryCta: cta ?? FIT_CALL,
        showPreviews: true,
        showOverflow,
        overflowSeatLine: showOverflow ? seatLineFor(overflow) : null,
        finalBlock: cta ? "overflow" : "fit-call",
      };
    }

    case "closed":
      return {
        state,
        heroBadge: "Registration closed",
        seatLine: null,
        seatAsOf: null,
        primaryCta: FIT_CALL,
        showPreviews: false,
        showOverflow: false,
        overflowSeatLine: null,
        finalBlock: "fit-call",
      };

    case "next-cohort":
      return {
        state,
        heroBadge: w.nextCohortDateDisplay ? `Next cohort: ${w.nextCohortDateDisplay}` : "Next cohort",
        seatLine: null,
        seatAsOf: null,
        primaryCta: w.nextCohortNotifyUrl
          ? { kind: "external", label: "Notify Me", href: w.nextCohortNotifyUrl, track: "paid_cta_click" }
          : FIT_CALL,
        showPreviews: false,
        showOverflow: false,
        overflowSeatLine: null,
        finalBlock: "next-cohort",
      };

    case "limited": {
      const line = seatLineFor(primary);
      return {
        state,
        heroBadge: line,
        seatLine: line,
        seatAsOf: formatDateOnly(primary?.seatStatusAsOf ?? null),
        primaryCta: primaryReserve ?? FIT_CALL,
        showPreviews: true,
        showOverflow,
        overflowSeatLine: showOverflow ? seatLineFor(overflow) : null,
        finalBlock: primaryReserve ? "register" : "fit-call",
      };
    }

    case "open":
    default: {
      // A bound low enough to display carries its freshness date in any state,
      // not only in "limited" — the editor maintains one, so show it.
      const bound = primary?.seatsRemainingBound;
      const showAsOf = bound != null && bound <= 8;
      return {
        state: "open",
        heroBadge: [primary?.label, primary?.dateDisplay].filter(Boolean).join(" · ") || null,
        seatLine: seatLineFor(primary),
        seatAsOf: showAsOf ? formatDateOnly(primary?.seatStatusAsOf ?? null) : null,
        primaryCta: primaryReserve ?? FIT_CALL,
        showPreviews: true,
        showOverflow,
        overflowSeatLine: showOverflow ? seatLineFor(overflow) : null,
        finalBlock: primaryReserve ? "register" : "fit-call",
      };
    }
  }
}

/* Accepts the watch, share and embed URL forms. Returns null for anything that
   isn't a plausible id, which hides the video section entirely rather than
   rendering a broken player. */
export function youTubeIdFrom(url: string | null | undefined): string | null {
  if (!url) return null;
  const patterns = [
    /[?&]v=([A-Za-z0-9_-]{11})(?:[&#]|$)/,
    /youtu\.be\/([A-Za-z0-9_-]{11})(?:[?#/]|$)/,
    /\/embed\/([A-Za-z0-9_-]{11})(?:[?#/]|$)/,
    /\/shorts\/([A-Za-z0-9_-]{11})(?:[?#/]|$)/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  return null;
}

/* Appends the campaign tag to an outbound registration link.

   Only utm_source is set: it is the one campaign field the registration
   platform retains per registrant, so everything worth knowing has to be
   encoded into that single value. Restricted to luma.com so a link pasted to
   any other destination never leaks a campaign tag. */
export function withCampaign(url: string, source: string | null | undefined): string {
  if (!source) return url;
  try {
    const u = new URL(url);
    // Both hosts Luma issues: luma.com today, lu.ma historically (still live
    // and still what their app copies in some places). Missing either silently
    // drops the only attribution channel that survives into registrations.
    if (!/(^|\.)(luma\.com|lu\.ma)$/i.test(u.hostname)) return url;
    u.searchParams.set("utm_source", source);
    return u.toString();
  } catch {
    return url;
  }
}

/* generateMetadata and the page body both need the workshop; React's cache
   collapses them into a single query per render. */
export const getActiveWorkshop = cache(async (): Promise<Workshop | null> => {
  if (!isSanityConfigured) return null;
  try {
    return await sanityClient.fetch<Workshop | null>(activeWorkshopQuery);
  } catch {
    // A CMS outage should degrade to the placeholder, not take the route down.
    return null;
  }
});
