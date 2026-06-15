import type { Metadata } from "next";
import AdvisoryWork from "./AdvisoryWork";

export const metadata: Metadata = {
  title: { absolute: "Advisory Work | Go to Market Consultant for Technical Startups" },
  description:
    "Successfulbob advisory work gives technical startups access to Bob Hart's guidance on technical GTM, messaging, demos, partner strategy, executive narrative, and go to market decisions.",
  alternates: { canonical: "/advisory-work" },
  openGraph: {
    title: "Advisory Work | Go to Market Consultant for Technical Startups",
    description:
      "Senior technical GTM advice without a full buildout: messaging, demos, partner strategy, executive narrative, and GTM decisions.",
    url: "/advisory-work",
    images: ["/opengraph-image"],
  },
};

export default function AdvisoryWorkRoute() {
  return <AdvisoryWork />;
}
