"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

const featured = {
  tag: "Founder GTM",
  title: "When does founder-led sales stop scaling?",
  excerpt:
    "There's a moment in every technical company's growth when the founder can't be in every room. Recognizing that moment — before it becomes a crisis — is one of the most important calls a founding team makes.",
  href: "/insights/founder-led-sales",
};

const articles = [
  {
    tag: "Product Marketing",
    title: "How do you turn technical features into business value?",
    href: "/insights/features-to-value",
  },
  {
    tag: "GTM Strategy",
    title: "What is a go-to-market strategy for startups?",
    href: "/insights/gtm-strategy",
  },
  {
    tag: "Demo",
    title: "How do you stop a demo from becoming a feature tour?",
    href: "/insights/demo-structure",
  },
];

const tagColors: Record<string, string> = {
  "Founder GTM": "#3f6bff",
  "Product Marketing": "#8b5cf6",
  "GTM Strategy": "#3f6bff",
  "Demo": "#8b5cf6",
};

export default function InsightsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredArticle, setHoveredArticle] = useState<number | null>(null);
  const [featuredHovered, setFeaturedHovered] = useState(false);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 bg-[#061126] overflow-hidden"
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Glow */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(63,107,255,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(139,92,246,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#3f6bff] mb-3">
              Insights
            </p>
            <div className="w-10 h-[3px] rounded-full bg-gradient-to-r from-[#3f6bff] to-[#8b5cf6] mb-5" />
            <h2 className="text-3xl md:text-[40px] font-bold text-white leading-[1.15] tracking-[-0.01em] max-w-lg">
              Practical thinking for technical companies scaling GTM.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex-shrink-0"
          >
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-white/50 hover:text-white transition-colors duration-200 group"
            >
              Read all Insights
              <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Content: featured + article list */}
        <div className="grid md:grid-cols-[1fr_380px] gap-5">

          {/* Featured article */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setFeaturedHovered(true)}
            onMouseLeave={() => setFeaturedHovered(false)}
          >
            <Link href={featured.href} className="block h-full rounded-2xl overflow-hidden relative group"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: featuredHovered
                  ? "1px solid rgba(63,107,255,0.35)"
                  : "1px solid rgba(255,255,255,0.07)",
                boxShadow: featuredHovered
                  ? "0 20px 60px rgba(63,107,255,0.12)"
                  : "none",
                transition: "all 0.3s ease",
              }}
            >
              {/* Top gradient bar */}
              <div
                className="h-[3px]"
                style={{ background: "linear-gradient(90deg, #3f6bff, #8b5cf6)" }}
              />

              <div className="p-8 md:p-10 flex flex-col h-full">
                {/* Decorative number */}
                <div
                  className="text-[96px] md:text-[120px] font-black leading-none select-none mb-2 -mt-2"
                  style={{
                    background: "linear-gradient(135deg, #3f6bff, #8b5cf6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    opacity: featuredHovered ? 0.22 : 0.05,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  01
                </div>

                {/* Tag */}
                <span
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.12em] uppercase mb-4"
                  style={{ color: tagColors[featured.tag] }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: tagColors[featured.tag] }} />
                  {featured.tag}
                </span>

                {/* Title */}
                <h3
                  className="text-[22px] md:text-[26px] font-bold leading-[1.25] tracking-[-0.01em] mb-5 transition-colors duration-200"
                  style={{ color: featuredHovered ? "#ffffff" : "rgba(255,255,255,0.88)" }}
                >
                  {featured.title}
                </h3>

                {/* Excerpt */}
                <p className="text-white/45 text-[14px] md:text-[15px] leading-[1.75] flex-1 mb-8">
                  {featured.excerpt}
                </p>

                {/* CTA */}
                <div
                  className="inline-flex items-center gap-2 text-[13px] font-semibold transition-all duration-200 group"
                  style={{ color: featuredHovered ? "#7b9fff" : "rgba(255,255,255,0.4)" }}
                >
                  Read article
                  <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Article list */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: "rgba(255,255,255,0.018)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="px-7 py-5 border-b border-white/[0.06]">
              <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-white/25">
                More from the archive
              </p>
            </div>

            <div className="flex flex-col flex-1">
              {articles.map((article, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setHoveredArticle(i)}
                  onMouseLeave={() => setHoveredArticle(null)}
                >
                  <Link
                    href={article.href}
                    className="flex flex-col gap-2 px-7 py-6 relative transition-colors duration-150"
                    style={{
                      background: hoveredArticle === i ? "rgba(63,107,255,0.045)" : "transparent",
                      borderBottom: i < articles.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    }}
                  >
                    {/* Hover left accent */}
                    <motion.div
                      className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full"
                      animate={{
                        opacity: hoveredArticle === i ? 1 : 0,
                        background: "linear-gradient(to bottom, #3f6bff, #8b5cf6)",
                      }}
                      transition={{ duration: 0.15 }}
                    />

                    {/* Article number + tag row */}
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[10px] font-bold tracking-[0.12em] uppercase transition-colors duration-150"
                        style={{ color: hoveredArticle === i ? tagColors[article.tag] : "rgba(255,255,255,0.25)" }}
                      >
                        {article.tag}
                      </span>
                      <span className="text-[10px] tabular-nums text-white/20">
                        0{i + 2}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-[14px] font-semibold leading-snug transition-colors duration-150"
                      style={{ color: hoveredArticle === i ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.6)" }}
                    >
                      {article.title}
                    </h3>

                    {/* Arrow hint */}
                    <motion.div
                      animate={{
                        opacity: hoveredArticle === i ? 1 : 0,
                        x: hoveredArticle === i ? 0 : -8,
                      }}
                      transition={{ duration: 0.15 }}
                    >
                      <svg className="w-3.5 h-3.5 text-[#3f6bff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer CTA */}
            <div
              className="px-7 py-5 mt-auto"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-[12px] font-semibold text-white/35 hover:text-white/70 transition-colors duration-200 group"
              >
                Browse all articles
                <svg className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
