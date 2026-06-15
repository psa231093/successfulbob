import type { Metadata } from "next";
import InsightsPage from "./InsightsPage";

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

export default function InsightsRoute() {
  return <InsightsPage />;
}
