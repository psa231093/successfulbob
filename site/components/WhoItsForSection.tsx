"use client";

import { motion, useInView } from "framer-motion";
import ChallengesVisual from "@/components/ChallengesVisual";
import { useRef, useState } from "react";

const signals = [
  {
    n: "01",
    text: "The founder is still pulled into too many strategic sales calls.",
    category: "Scale",
  },
  {
    n: "02",
    text: "Demos are technically accurate but feel like feature tours.",
    category: "Demo",
  },
  {
    n: "03",
    text: "Sales, product, marketing, partners, and executives explain the company differently.",
    category: "Alignment",
  },
  {
    n: "04",
    text: "Buyers understand the category, but not why your company wins.",
    category: "Positioning",
  },
  {
    n: "05",
    text: "Partner interest exists, but partner repeatability does not.",
    category: "Channel",
  },
  {
    n: "06",
    text: "Events, webinars, launches, or executive conversations are coming up and the message needs to be sharper.",
    category: "Growth",
  },
];


function SignalCard({
  item,
  index,
  inView,
}: {
  item: (typeof signals)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-xl p-5 cursor-default flex flex-col gap-3 transition-all duration-200"
      style={{
        background: hovered ? "#ffffff" : "#fafbfc",
        border: hovered ? "1px solid rgba(63,107,255,0.25)" : "1px solid #e8eaf0",
        boxShadow: hovered
          ? "0 8px 24px rgba(63,107,255,0.09), 0 2px 8px rgba(0,0,0,0.04)"
          : "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      {/* Top row: number + category */}
      <div className="flex items-center justify-between">
        <span
          className="text-[11px] font-bold tabular-nums transition-colors duration-200"
          style={{ color: hovered ? "#3f6bff" : "#c8cdd8" }}
        >
          {item.n}
        </span>
        <span
          className="text-[10px] font-semibold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full transition-all duration-200"
          style={{
            color: hovered ? "#3f6bff" : "#a0aec0",
            background: hovered ? "rgba(63,107,255,0.08)" : "rgba(0,0,0,0.03)",
            border: hovered ? "1px solid rgba(63,107,255,0.2)" : "1px solid transparent",
          }}
        >
          {item.category}
        </span>
      </div>

      {/* Signal text */}
      <p
        className="text-[14px] md:text-[15px] font-semibold leading-[1.55] transition-colors duration-200"
        style={{ color: hovered ? "#111827" : "#374151" }}
      >
        {item.text}
      </p>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
        animate={{
          opacity: hovered ? 1 : 0,
          background: "linear-gradient(90deg, #3f6bff, #8b5cf6)",
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}

export default function WhoItsForSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#f8f9fc" }}
    >
      {/* Faint diagonal lines texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(63,107,255,0.03) 0px, rgba(63,107,255,0.03) 1px, transparent 1px, transparent 40px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#3f6bff] mb-3">
              Who This Is For
            </p>
            <div className="w-10 h-[3px] rounded-full bg-gradient-to-r from-[#3f6bff] to-[#8b5cf6] mb-5" />
            <h2 className="text-3xl md:text-[40px] font-bold text-[#111827] leading-[1.15] tracking-[-0.01em]">
              Built for technical companies whose product is strong, but the story is not carrying enough weight.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-end"
          >
            <p className="text-[#526078] text-base md:text-[17px] leading-[1.8]">
              If any of the signals below feel familiar, that's the gap Production Ready is designed to close.
            </p>
          </motion.div>
        </div>

        {/* Signal cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
          {signals.map((s, i) => (
            <SignalCard key={s.n} item={s} index={i} inView={inView} />
          ))}
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <ChallengesVisual />
        </motion.div>
      </div>
    </section>
  );
}
