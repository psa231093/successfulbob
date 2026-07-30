import type { Session, Workshop, WorkshopView } from "@/lib/workshop";

/* Structured data for the workshop page.

   Built server-side only. The past-date guard is the one place a Date is used
   anywhere in this feature, and it must stay on the server: comparing dates in
   a client component would render differently there than here.

   The site already publishes an organisation and person graph in the root
   layout, so events reference those by id rather than repeating them. */

const SITE_URL = "https://successfulbob.com";
const ORG_ID = `${SITE_URL}/#organization`;
const PERSON_ID = `${SITE_URL}/#person`;

type Availability = "InStock" | "LimitedAvailability" | "SoldOut";

function availabilityFor(state: WorkshopView["state"], soldOut: boolean | null): Availability {
  if (soldOut) return "SoldOut";
  switch (state) {
    case "limited":
      return "LimitedAvailability";
    case "sold-out":
    case "closed":
      return "SoldOut";
    default:
      return "InStock";
  }
}

function isUpcoming(startsAt: string | null | undefined, now: Date): boolean {
  if (!startsAt) return false;
  const t = Date.parse(startsAt);
  return Number.isFinite(t) && t > now.getTime();
}

function eventFor({
  id,
  name,
  description,
  session,
  availability,
  image,
}: {
  id: string;
  name: string;
  description: string;
  session: { startsAt: string | null; endsAt: string | null; registrationUrl: string | null; priceAmount: number | null; currency: string | null; capacity: number | null };
  availability: Availability;
  image: string;
}) {
  return {
    "@type": "EducationEvent",
    "@id": id,
    name,
    ...(description ? { description } : {}),
    startDate: session.startsAt,
    ...(session.endsAt ? { endDate: session.endsAt } : {}),
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "VirtualLocation",
      url: session.registrationUrl ?? `${SITE_URL}/workshops`,
    },
    organizer: { "@id": ORG_ID },
    performer: { "@id": PERSON_ID },
    image: [image],
    ...(session.capacity ? { maximumAttendeeCapacity: session.capacity } : {}),
    ...(session.registrationUrl
      ? {
          offers: {
            "@type": "Offer",
            price: session.priceAmount ?? 0,
            priceCurrency: session.currency ?? "USD",
            url: session.registrationUrl,
            availability: `https://schema.org/${availability}`,
          },
        }
      : {}),
  };
}

export function buildWorkshopJsonLd(w: Workshop, view: WorkshopView, now: Date = new Date()) {
  const graph: Record<string, unknown>[] = [];
  const image = w.ogImageUrl ?? `${SITE_URL}/opengraph-image`;
  const description = w.metaDescription ?? w.heroSubhead ?? "";
  const title = w.title ?? "Workshop";

  const primary = w.primarySession;

  // In next-cohort, registration is not open: the page offers "notify me", so
  // publishing an InStock event with a registration URL would advertise
  // something the page itself does not sell.
  const registrationOpen = view.state !== "next-cohort";

  // Only publish an event that has not happened yet. Otherwise a closed page
  // goes on advertising a finished workshop. Self-corrects on revalidation, so
  // this can be up to an hour stale, which is acceptable.
  if (registrationOpen && primary && isUpcoming(primary.startsAt, now)) {
    graph.push(
      eventFor({
        id: `${SITE_URL}/workshops#event-primary`,
        name: primary.label ? `${title}: ${primary.label}` : title,
        description,
        session: primary as Session,
        availability: availabilityFor(view.state, primary.soldOut),
        image,
      })
    );
  }

  // The second session is published only when the page is actually showing it.
  // Advertising a hidden event would leak it before the client wants it seen,
  // and it would not match what a visitor finds on the page.
  const overflow = w.overflowSession;
  if (view.showOverflow && overflow && isUpcoming(overflow.startsAt, now)) {
    graph.push(
      eventFor({
        id: `${SITE_URL}/workshops#event-overflow`,
        name: overflow.label ? `${title}: ${overflow.label}` : `${title} (second session)`,
        description,
        session: overflow as Session,
        availability: availabilityFor("open", overflow.soldOut),
        image,
      })
    );
  }

  // Free previews are real, dated, registerable sessions.
  if (view.showPreviews) {
    (w.previews ?? []).forEach((p, i) => {
      if (!isUpcoming(p.startsAt, now) || !p.registrationUrl) return;
      graph.push(
        eventFor({
          id: `${SITE_URL}/workshops#event-preview-${i + 1}`,
          name: `${title}: free preview`,
          description: w.previewBody ?? description,
          session: {
            startsAt: p.startsAt,
            endsAt: null,
            registrationUrl: p.registrationUrl,
            priceAmount: 0,
            currency: "USD",
            capacity: null,
          },
          availability: "InStock",
          image,
        })
      );
    });
  }

  if (w.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${SITE_URL}/workshops#faq`,
      mainEntity: w.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  if (graph.length === 0) return null;

  return { "@context": "https://schema.org", "@graph": graph };
}
