"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel, AccentBar } from "@/components/Primitives";
import { AnimateIn, Stagger, StaggerItem } from "@/components/AnimateIn";

type FaqItem = { question: string; answer: string };

export default function ArticleClientShell({ faqs }: { faqs: FaqItem[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 bg-[#f5f7fb]">
      <div className="max-w-3xl mx-auto px-6">
        <AnimateIn>
          <SectionLabel>FAQ</SectionLabel>
          <AccentBar />
          <h2 className="text-[26px] md:text-[34px] font-bold text-[#111827] mb-12 leading-[1.2] tracking-[-0.01em]">
            Common questions
          </h2>
        </AnimateIn>

        <Stagger stagger={0.06}>
          {faqs.map((faq, i) => (
            <StaggerItem key={i}>
              <div className="border-b border-[#e5e7eb] last:border-b-0">
                <button
                  className="flex items-start justify-between w-full text-left gap-4 py-6 group"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className={`text-[15px] font-semibold leading-snug transition-colors duration-200 ${openFaq === i ? "text-[#3f6bff]" : "text-[#111827] group-hover:text-[#3f6bff]"}`}>
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex-shrink-0 mt-0.5"
                  >
                    <svg className={`w-5 h-5 transition-colors duration-200 ${openFaq === i ? "text-[#3f6bff]" : "text-[#9ca3af]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
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
          ))}
        </Stagger>
      </div>
    </section>
  );
}
