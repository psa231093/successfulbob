import type { Metadata } from "next";
import { sanityClient } from "@/lib/sanity";
import { featuredPostQuery, allPostsQuery, allCategoriesQuery } from "@/lib/queries";
import InsightsPage, { type FeaturedPost, type InsightPost, type InsightCategory } from "./InsightsPage";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Insights | Technical GTM, Product Messaging, and Startup Go to Market Strategy" },
  description:
    "Insights from Successfulbob LLC on technical GTM, founder led sales, product messaging, partner enablement, demos, executive narrative, and go to market strategy for startups.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Insights | Technical GTM, Product Messaging, and Startup Go to Market Strategy",
    description:
      "Practical thinking on technical GTM, founder led sales, product messaging, demos, partner enablement, and executive narrative.",
    url: "/insights",
    images: ["/opengraph-image"],
  },
};

export default async function InsightsRoute() {
  const isSanityConfigured =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your-project-id-here";

  let featured: FeaturedPost | null = null;
  let posts: InsightPost[] = [];
  let categories: InsightCategory[] = [];

  if (isSanityConfigured) {
    [featured, posts, categories] = await Promise.all([
      sanityClient.fetch<FeaturedPost | null>(featuredPostQuery),
      sanityClient.fetch<InsightPost[]>(allPostsQuery),
      sanityClient.fetch<InsightCategory[]>(allCategoriesQuery),
    ]);
  }

  return (
    <InsightsPage
      featured={featured}
      posts={posts ?? []}
      categories={categories ?? []}
    />
  );
}
