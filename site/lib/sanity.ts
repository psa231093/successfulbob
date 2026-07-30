import { createClient } from "next-sanity";
import { createImageUrlBuilder as imageUrlBuilder } from "@sanity/image-url";
// SanityImageSource covers all valid input shapes for urlFor()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

/* Single source of truth for "is the CMS wired up?". This was copy-pasted in
   five places before /workshops added more; keep new callers pointed here. */
export const isSanityConfigured =
  Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your-project-id-here";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
