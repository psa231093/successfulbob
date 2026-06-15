"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimateIn, Stagger, StaggerItem } from "@/components/AnimateIn";

const faqs = [
  {
    q: "What is a go to market strategy for startups?",
    a: "A go to market strategy for startups is the plan for how a company explains its product, reaches the right buyers, creates demand, supports sales, and turns early interest into repeatable revenue. For technical startups, the hard part is often translating product depth into buyer value. The product may be strong, but the company still needs a story, demo, messaging system, and field process that people beyond the founder can repeat.",
  },
  {
    q: "Why do technical startups struggle with go to market?",
    a: "Technical startups often struggle with go to market because the people who built the product understand too much. They know the problem, the architecture, the tradeoffs, and the reason the product exists. Buyers do not have all that context. If the company does not translate the technical value into the buyer's pain, workflow, risk, cost, or opportunity, the market may miss the point.",
  },
  {
    q: "What does a go to market consultant do?",
    a: "A go to market consultant helps a company figure out how to bring a product to market, explain its value, reach the right buyers, and improve sales or marketing execution. Some consultants focus on demand generation or sales process. Successfulbob is most useful when the product is technical and the company needs help turning product depth into a story buyers, sales teams, partners, and executives can understand and repeat.",
  },
  {
    q: "What does Production Ready mean for go to market?",
    a: "In software, production ready means something has been tested, hardened, and prepared for real-world use. In go to market, Production Ready means your story, demo flow, partner message, executive narrative, and field guidance are ready to survive real buyers, real partners, real sales calls, and real events. The idea is simple: your GTM should be as ready to scale as your product.",
  },
  {
    q: "When should a startup hire outside help for go to market strategy?",
    a: "A startup should consider outside help when the product is working, but the market story is not spreading clearly through sales, partners, demos, events, or executive conversations. If the founder is still the only person who can explain the value well, that is a warning sign. Outside help can be especially useful when the company needs a repeatable story before hiring more salespeople, expanding the channel, attending major events, or moving upmarket.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <AnimateIn>
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#3f6bff] mb-3">FAQ</p>
          <div className="w-10 h-[3px] rounded-full bg-gradient-to-r from-[#3f6bff] to-[#8b5cf6] mb-5" />
          <h2 className="text-3xl md:text-[40px] font-bold text-[#111827] mb-14 leading-[1.15]">
            Questions technical founders<br className="hidden md:block" /> and GTM leaders usually ask
          </h2>
        </AnimateIn>

        <Stagger stagger={0.07}>
          {faqs.map((faq, i) => (
            <StaggerItem key={i}>
              <div className="border-b border-[#e5e7eb] last:border-b-0">
                <button
                  className="flex items-start justify-between w-full text-left gap-4 py-6 group"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span
                    className={`text-[15px] font-semibold leading-snug transition-colors duration-200 ${
                      open === i ? "text-[#3f6bff]" : "text-[#111827] group-hover:text-[#3f6bff]"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex-shrink-0 mt-0.5"
                  >
                    <svg
                      className={`w-5 h-5 transition-colors duration-200 ${open === i ? "text-[#3f6bff]" : "text-[#9ca3af]"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-[#526078] text-[15px] leading-[1.8]">{faq.a}</p>
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
