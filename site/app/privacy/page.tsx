import type { Metadata } from "next";
import PrivacyPage from "./PrivacyPage";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | Successfulbob" },
  description:
    "What Successfulbob LLC collects when you visit successfulbob.com, get in touch, or register for a workshop, and how it is used.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Privacy Policy | Successfulbob",
    description: "What we collect, why, and the third-party services involved.",
    url: "/privacy",
    images: ["/opengraph-image"],
  },
};

export default function PrivacyRoute() {
  return <PrivacyPage />;
}
