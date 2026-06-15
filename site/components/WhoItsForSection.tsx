"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const signals = [
  {
    n: "01",
    text: "The founder is still pulled into too many strategic sales calls",
    category: "Scale",
  },
  {
    n: "02",
    text: "Demos are technically accurate but feel like feature tours",
    category: "Demo",
  },
  {
    n: "03",
    text: "Sales, partners, product, and executives explain the company differently",
    category: "Alignment",
  },
  {
    n: "04",
    text: "Buyers understand the category, but not why your company wins",
    category: "Positioning",
  },
  {
    n: "05",
    text: "Your partner motion needs better messaging, enablement, or certification structure",
    category: "Channel",
  },
  {
    n: "06",
    text: "You are preparing for bigger events, larger buyers, strategic partners, or a funding round",
    category: "Growth",
  },
];

const notFit = [
  "The product is not yet commercially validated",
  "The market is too small to justify the investment",
  "What you need is high-volume content production",
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
              Built for technical companies whose product is strong — but the story isn't carrying enough weight.
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

        {/* Main grid: signals + not-a-fit */}
        <div className="grid md:grid-cols-[1fr_320px] gap-6 items-start">
          {/* Signal cards grid */}
          <div className="grid sm:grid-cols-2 gap-3">
            {signals.map((s, i) => (
              <SignalCard key={s.n} item={s} index={i} inView={inView} />
            ))}
          </div>

          {/* Not a fit — dark card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "#061126",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            }}
          >
            {/* Top bar */}
            <div
              className="h-[3px]"
              style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))" }}
            />
            <div className="p-7">
              <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-white/30 mb-6">
                Probably not the right fit if…
              </p>
              <div className="space-y-5">
                {notFit.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 8 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-3"
                  >
                    {/* Pulsing dot indicator */}
                    <div className="mt-1.5 flex-shrink-0 relative flex items-center justify-center" style={{ width: 20, height: 20 }}>
                      {/* Expanding pulse ring */}
                      <motion.span
                        className="absolute rounded-full"
                        style={{
                          width: 12,
                          height: 12,
                          border: "1.5px solid rgba(255,255,255,0.35)",
                        }}
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{
                          duration: 2.2,
                          delay: i * 0.75,
                          repeat: Infinity,
                          ease: "easeOut",
                          repeatDelay: 0.4,
                        }}
                      />
                      {/* Static ring */}
                      <span
                        className="absolute rounded-full"
                        style={{ width: 14, height: 14, border: "1px solid rgba(255,255,255,0.12)" }}
                      />
                      {/* Core dot */}
                      <span
                        className="rounded-full relative z-10"
                        style={{ width: 6, height: 6, background: "rgba(255,255,255,0.35)" }}
                      />
                    </div>
                    <p className="text-white/45 text-[13px] leading-[1.65]">{item}</p>
                  </motion.div>
                ))}
              </div>

              <div
                className="mt-7 pt-6"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
              >
                <p className="text-white/30 text-[12px] leading-relaxed mb-5">
                  That doesn't mean there's no way to help. It means we should be honest about the right next step.
                </p>
                <a
                  href="#fit-call"
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#3f6bff] hover:text-[#7b9fff] transition-colors duration-200 group"
                >
                  Schedule a Fit Call
                  <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
