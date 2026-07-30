import type { Metadata } from "next";
import { getActiveWorkshop, buildWorkshopView } from "@/lib/workshop";
import { buildWorkshopJsonLd } from "@/lib/workshopJsonLd";
import WorkshopsPage from "./WorkshopsPage";
import WorkshopPlaceholder from "./WorkshopPlaceholder";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const w = await getActiveWorkshop();

  if (!w) {
    return {
      title: { absolute: "Workshops | Successfulbob" },
      description: "Live working sessions for technical founders and product leaders.",
      alternates: { canonical: "/workshops" },
      robots: { index: false, follow: true },
    };
  }

  const title = w.metaTitle ?? `${w.title} | Successfulbob`;
  const description = w.metaDescription ?? "";
  const image = w.ogImageUrl ?? "/opengraph-image";

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: "/workshops" },
    robots: w.noIndex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: "/workshops",
      images: [image],
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function WorkshopsRoute() {
  const workshop = await getActiveWorkshop();

  // No CMS, or nothing selected in Workshop Settings. Renders a real page
  // rather than a 404: this URL is linked from the nav, and a 404 there would
  // throw away whatever ranking the page has accumulated.
  if (!workshop) return <WorkshopPlaceholder />;

  const view = buildWorkshopView(workshop);
  const jsonLd = buildWorkshopJsonLd(workshop, view);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <WorkshopsPage workshop={workshop} view={view} />
    </>
  );
}
