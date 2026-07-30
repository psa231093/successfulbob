"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel, AccentBar } from "@/components/Primitives";
import { AnimateIn, Stagger, StaggerItem } from "@/components/AnimateIn";

/* Shared FAQ accordion.

   The markup is lifted from the article version so the two render identically.
   Adds the aria wiring that was missing there: each panel has an id, each
   button points at it with aria-controls, and questions are headings so the
   list is navigable by structure rather than only by eye. */

export type FaqItem = { question: string; answer: string };

export default function FAQAccordion({
  faqs,
  eyebrow = "FAQ",
  headline = "Common questions",
  background = "soft",
  className,
}: {
  faqs: FaqItem[];
  eyebrow?: string;
  headline?: string;
  background?: "soft" | "white";
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const uid = useId();

  if (!faqs?.length) return null;

  const bg = background === "white" ? "bg-white" : "bg-[#f5f7fb]";

  return (
    <section className={`py-20 md:py-28 ${bg} ${className ?? ""}`}>
      <div className="max-w-3xl mx-auto px-6">
        <AnimateIn>
          <SectionLabel>{eyebrow}</SectionLabel>
          <AccentBar />
          <h2 className="text-[26px] md:text-[34px] font-bold text-[#111827] mb-12 leading-[1.2] tracking-[-0.01em]">
            {headline}
          </h2>
        </AnimateIn>

        <Stagger stagger={0.06}>
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            const panelId = `${uid}-faq-panel-${i}`;
            const buttonId = `${uid}-faq-button-${i}`;
            return (
              <StaggerItem key={faq.question}>
                <div className="border-b border-[#e5e7eb] last:border-b-0">
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex items-start justify-between w-full text-left gap-4 py-6 group"
                    >
                      <span
                        className={`text-[15px] font-semibold leading-snug transition-colors duration-200 ${
                          isOpen ? "text-[#3f6bff]" : "text-[#111827] group-hover:text-[#3f6bff]"
                        }`}
                      >
                        {faq.question}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="flex-shrink-0 mt-0.5"
                      >
                        <svg
                          className={`w-5 h-5 transition-colors duration-200 ${
                            isOpen ? "text-[#3f6bff]" : "text-[#9ca3af]"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-[#526078] text-[15px] leading-[1.8]">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
