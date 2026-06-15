import type { Metadata } from "next";
import ProductionReadyPage from "./ProductionReadyPage";

export const metadata: Metadata = {
  title: { absolute: "Production Ready | Technical Go to Market Framework for Startups" },
  description:
    "Production Ready helps technical startups turn founder knowledge and product depth into a repeatable go to market story, demo flow, partner narrative, and executive message.",
  alternates: { canonical: "/production-ready" },
  openGraph: {
    title: "Production Ready | Technical Go to Market Framework for Startups",
    description:
      "Make your GTM as production-ready as your product: gap map, messaging matrix, demo architecture, partner strategy, and executive narrative.",
    url: "/production-ready",
    images: ["/opengraph-image"],
  },
};

export default function ProductionReadyRoute() {
  return <ProductionReadyPage />;
}
