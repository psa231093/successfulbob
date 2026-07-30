"use client";

import FAQAccordion, { type FaqItem } from "@/components/FAQAccordion";

/* Thin wrapper kept so the article route's import path is unchanged. The
   accordion itself now lives in components/FAQAccordion so the workshop page
   and the articles cannot drift apart. */

export default function ArticleClientShell({ faqs }: { faqs: FaqItem[] }) {
  return <FAQAccordion faqs={faqs} eyebrow="FAQ" headline="Common questions" background="soft" />;
}
