"use client";

import { useState, useEffect } from "react";
import ProductionReadyCreatesVisual from "@/components/ProductionReadyCreatesVisual";
import { motion, AnimatePresence } from "framer-motion";
import { AnimateIn, Stagger, StaggerItem } from "@/components/AnimateIn";
import {
  GradientButton,
  GhostButton,
  OutlineButton,
  SectionLabel,
  AccentBar,
  Numeral,
  PointerGlow,
} from "@/components/Primitives";
import { useCalendarModal } from "@/components/CalendarModal";

/* --- Hero readiness panel (signature interactive element) ------ */

const READINESS_CHECKS = [
  { label: "Market story", sub: "Anyone can explain the value" },
  { label: "Demo flow", sub: "Guides buyers to a reason to care" },
  { label: "Sales narrative", sub: "Not a feature tour" },
  { label: "Partner message", sub: "Repeatable without the founder" },
  { label: "Executive narrative", sub: "Why this matters now" },
];

function ReadinessPanel() {
  const [ready, setReady] = useState<boolean[]>(READINESS_CHECKS.map(() => false));

  useEffect(() => {
    const timers = READINESS_CHECKS.map((_, i) =>
      setTimeout(() => {
        setReady((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 700 + i * 420)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const readyCount = ready.filter(Boolean).length;
  const pct = Math.round((readyCount / READINESS_CHECKS.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, x: 24 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[440px]"
    >
      <div className="absolute -inset-6 rounded-[2rem] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 60% 30%, rgba(63,107,255,0.18) 0%, transparent 70%)" }} />

      <div className="relative rounded-3xl p-6 md:p-7 backdrop-blur-md"
        style={{
          background: "rgba(11,23,52,0.82)",
          border: "1px solid rgba(63,107,255,0.22)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 30px 70px rgba(0,0,0,0.45)",
        }}>

        {/* Header: window dots + label */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.14)" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.14)" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.14)" }} />
          </div>
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/45">GTM readiness</p>
        </div>

        {/* Progress meter */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] text-white/45">Deploying your story</span>
          <motion.span
            key={pct}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            className="text-[13px] font-bold bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg, #3f6bff, #8b5cf6)" }}>
            {pct}%
          </motion.span>
        </div>
        <div className="h-2 rounded-full mb-6 overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #3f6bff, #8b5cf6)" }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Checks */}
        <div className="space-y-2.5">
          {READINESS_CHECKS.map((c, i) => {
            const isReady = ready[i];
            return (
              <div
                key={c.label}
                className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-colors duration-300"
                style={{
                  background: isReady ? "rgba(34,197,94,0.08)" : "rgba(255,255,255,0.02)",
                  border: isReady ? "1px solid rgba(34,197,94,0.25)" : "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isReady ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 18 }}
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(34,197,94,0.9)" }}
                    >
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="spin"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 rounded-full flex-shrink-0"
                      style={{ border: "2px solid rgba(255,255,255,0.15)", borderTopColor: "rgba(63,107,255,0.7)" }}
                    />
                  )}
                </AnimatePresence>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-semibold text-white leading-tight">{c.label}</p>
                  <p className="text-[11.5px] text-white/40 leading-tight mt-0.5 truncate">{c.sub}</p>
                </div>
                <span className={`text-[11px] font-semibold flex-shrink-0 transition-colors duration-300 ${isReady ? "text-[#5fd38a]" : "text-white/30"}`}>
                  {isReady ? "Ready" : "Building"}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-5 pt-4 flex items-center gap-2.5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }} />
          <p className="text-[12px] text-white/40">Make your GTM as ready to scale as your product.</p>
        </div>
      </div>
    </motion.div>
  );
}

/* --- Section data ---------------------------------------------- */

const READINESS_QUESTIONS = [
  "Can someone besides the founder explain the value clearly?",
  "Can the demo guide buyers toward a business reason to care?",
  "Can sales explain the product without turning it into a feature tour?",
  "Can partners understand the story well enough to repeat it?",
  "Can executives see why this matters now?",
  "Can the market understand what problem you solve before their attention runs out?",
];

const FIT_SIGNALS = [
  "The founder is still pulled into too many strategic sales calls.",
  "Demos are accurate, but feel like tours of the product instead of a story about the buyer's pain.",
  "Sales, product, marketing, partners, and executives explain the company differently.",
  "Buyers understand the category, but not why your company wins.",
  "Technical features are strong, but the business value is not landing consistently.",
  "Partner interest exists, but partner repeatability does not.",
  "Events, webinars, or executive conversations are coming up and the message needs to be sharper.",
  "You're preparing for larger customers, a funding round, strategic partners, or a more serious field push.",
];

const DELIVERABLES = [
  { t: "Technical GTM Gap Map", d: "A clear view of where the current story is breaking across buyers, demos, field conversations, partner messaging, executive narrative, and event readiness." },
  { t: "Product-to-Value Messaging Matrix", d: "A practical framework that connects features to buyer pains, proof points, business outcomes, objections, and urgency." },
  { t: "Executive Narrative System", d: "A company-level story for executives, board members, strategic partners, and enterprise buyers. Why this matters, why now, why you." },
  { t: "Production Ready Roadmap", d: "A prioritized path for adoption, enablement rollout, field testing, feedback loops, and ownership transfer." },
  { t: "Demo & Conversation Architecture", d: "A structure for what to show, what to say, why it matters, and how to tailor the conversation by audience without a museum tour of every feature." },
  { t: "Partner Enablement Strategy", d: "A repeatable partner story, enablement journey, readiness criteria, and direction so partners can understand, trust, and carry the message." },
  { t: "Event & Speaking Readiness", d: "Messaging and conversation guidance for webinars, conferences, field events, executive briefings, and customer meetings where the story has to work quickly." },
];

const PRICING = [
  {
    name: "Production Ready Assessment",
    price: "$20k",
    unit: "",
    fit: "Companies that want to validate the problem, scope, and path before committing to a larger engagement.",
    does: "A diagnostic that reviews the current story, demo, buyer value, partner readiness, executive narrative, and field repeatability. The fee is credited toward Foundation or Transformation if signed within 30 days.",
    cta: "Start with the Assessment",
    featured: false,
  },
  {
    name: "Production Ready Foundation",
    price: "$195k",
    unit: "",
    fit: "Companies that need the technical GTM system built and can handle internal execution, enablement rollout, and adoption.",
    does: "Builds the strategy, messaging architecture, demo structure, partner direction, event readiness, and Production Ready roadmap.",
    cta: "Discuss Foundation",
    featured: true,
  },
  {
    name: "Production Ready Transformation",
    price: "$350k",
    unit: "",
    fit: "Companies that need the system built, taught, tested, and carried into live market execution.",
    does: "Includes Foundation and adds live training, field application, feedback capture, narrative refinement, and internal owner handoff.",
    cta: "Discuss Transformation",
    featured: false,
  },
];

const ASSESSMENT_INCLUDES = [
  "Current-state review of product narrative, sales story, partner story, demo/event readiness, and executive buyer clarity",
  "Stakeholder interviews with selected leadership, sales, product, marketing, partner, or field participants",
  "Technical GTM gap map",
  "Production readiness scorecard",
  "Recommended roadmap and engagement path",
];

const ASSESSMENT_IS_NOT = [
  "A full messaging rewrite",
  "A full partner program build",
  "A content production engagement",
  "A substitute for Foundation or Transformation",
];


const OUTCOMES = [
  { t: "Market clarity", d: "We can explain what we do, why it matters, who cares, and why buyers should act now." },
  { t: "Field confidence", d: "Sales, SE, PMM, partner, and executive teams are working from the same story." },
  { t: "Partner repeatability", d: "Partners have a clearer narrative, enablement structure, and readiness path they can use to create momentum." },
  { t: "Executive buyer trust", d: "Technical depth is translated into business outcomes, urgency, risk, cost, agility, security, and enterprise relevance." },
  { t: "Team ownership", d: "The company has a system it can keep using, improving, and teaching without needing Bob in every meeting forever." },
];

const PR_FAQS = [
  {
    q: "What does Production Ready mean for go to market?",
    a: "In software, production ready means something has been tested, hardened, and prepared for real-world use. In go to market, Production Ready means your story, demo flow, partner message, executive narrative, and field guidance are ready to survive real buyers, real partners, real sales calls, and real events. The idea is simple: your GTM should be as ready to scale as your product.",
  },
  {
    q: "What is included in the Production Ready Assessment?",
    a: "The Production Ready Assessment is a $20k diagnostic that reviews your current product narrative, sales story, partner story, demo and event readiness, and executive buyer clarity. It includes stakeholder conversations, a technical GTM gap map, a production readiness scorecard, and a recommended path. The Assessment fee is credited toward Foundation or Transformation if a full engagement is signed within 30 days of assessment delivery.",
  },
  {
    q: "How should we think about the cost of Production Ready?",
    a: "Production Ready should be evaluated against the cost of unclear GTM. If a technical company is losing enterprise opportunities, confusing buyers, underusing partners, running weak demos, or pulling the founder into too many strategic sales conversations, that cost can add up quickly. The right question is not just \"What does this cost?\" It is \"What is unclear messaging, inconsistent field execution, and slow buyer understanding already costing us?\"",
  },
  {
    q: "How do I know if my company needs Foundation or Transformation?",
    a: "Foundation is usually the right fit if you need the system built and have internal teams that can handle rollout, production, and adoption. Transformation is usually the better fit if you need the system built, taught, tested, refined, and transferred through live training or field application. The Assessment is designed to help make that decision clearer.",
  },
  {
    q: "What is a product messaging framework?",
    a: "A product messaging framework is a structured way to connect what a product does to what buyers care about. For technical companies, that usually means translating features into pains, proof points, business outcomes, objections, and role-specific value. A good framework helps sales, marketing, product, partners, and executives tell a more consistent story.",
  },
  {
    q: "How do technical companies turn product features into business value?",
    a: "Technical companies turn product features into business value by asking who cares, what pain the feature relieves, what risk or cost it reduces, what workflow it improves, and what outcome changes because the feature exists. The feature is still important, but the buyer usually acts on the business impact, not the engineering achievement alone.",
  },
  {
    q: "Is Production Ready only for companies with partners or channel sales?",
    a: "No. Production Ready can help companies with direct sales, founder led sales, product-led motions, partners, field events, or executive selling. Partner enablement is one important part of the framework, but the larger goal is to make the technical story easier for the right people to understand, trust, and repeat.",
  },
  {
    q: "Is Production Ready right for very early startups?",
    a: "It depends on how early. Production Ready is usually best for companies that already have evidence the product works and some commercial validation. If the product is still not ready for customers, or the market is too small to justify the investment, a lighter advisory path may make more sense.",
  },
];

/* --- Page ------------------------------------------------------ */

export default function ProductionReadyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { openModal } = useCalendarModal();

  return (
    <>
      {/* -- HERO -- split: headline + readiness status panel -- */}
      <section className="relative bg-[#061126] text-white pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.6] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            maskImage: "radial-gradient(ellipse 70% 80% at 78% 35%, black 0%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 80% at 78% 35%, black 0%, transparent 70%)",
          }} />
        <div className="absolute -top-24 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(63,107,255,0.13) 0%, transparent 65%)" }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.10) 0%, transparent 70%)" }} />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-14 md:gap-12 items-center">

            {/* Text column */}
            <div className="text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full mb-7"
                style={{ background: "rgba(63,107,255,0.10)", border: "1px solid rgba(63,107,255,0.22)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }} />
                <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#9db4ff]">The Flagship Framework</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-[33px] md:text-[52px] font-bold leading-[1.08] tracking-[-0.02em] mb-6"
              >
                Make your GTM as{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #3f6bff 0%, #8b5cf6 100%)" }}>
                  production-ready as your product.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="text-[16px] md:text-[18px] text-white/65 max-w-xl md:max-w-none mx-auto leading-[1.7] mb-5"
              >
                Your product may be tested, proven, and ready for real customers. But is the story ready? Is the demo ready? Are sales, partners, executives, and the field ready to explain why it matters without pulling the founder into every room?
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-[14px] md:text-[15px] text-white/45 max-w-xl md:max-w-none mx-auto leading-[1.7] mb-9"
              >
                Production Ready turns product depth into a repeatable market story the whole company can understand, sell, demo, and carry.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
              >
                <GradientButton onClick={openModal} fitCall>
                  Schedule a 30-Minute Fit Call
                </GradientButton>
                <GhostButton href="#assessment">Start with the Assessment</GhostButton>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="mt-6 text-[13px] text-white/35 max-w-md mx-auto md:mx-0"
              >
                The Production Ready Assessment is a $20k diagnostic that helps determine whether Assessment, Foundation, Transformation, Advisory, or a lighter path is the right next step.
              </motion.p>
            </div>

            {/* Readiness panel */}
            <div className="flex justify-center md:justify-end">
              <ReadinessPanel />
            </div>

          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #061126)" }} />
      </section>

      {/* -- WHAT PRODUCTION READY MEANS (01) -- */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <Numeral n="01" />
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 md:gap-16 items-center">
          <AnimateIn>
            <SectionLabel>What Production Ready means</SectionLabel>
            <AccentBar />
            <h2 className="text-3xl md:text-[42px] font-bold text-[#111827] mb-7 leading-[1.15] tracking-[-0.01em]">
              Production ready should not stop at the product.
            </h2>
            <div className="space-y-4 text-[#526078] text-base md:text-[17px] leading-[1.8]">
              <p>Software teams do not move code into production just because it worked once. They test it, harden it, document it, and make sure it can be supported, repeated, measured, and trusted in the real world.</p>
              <p>Your go to market story deserves the same standard. If someone besides the founder cannot explain the value clearly, the company probably does not have a product problem. It has a translation and repeatability problem.</p>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.15}>
            <div className="rounded-2xl border border-[#e5e7eb] bg-[#f5f7fb] p-8">
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#3f6bff] mb-6">
                Questions to ask before you scale
              </p>
              <Stagger className="space-y-5" stagger={0.07} delay={0.2}>
                {READINESS_QUESTIONS.map((q) => (
                  <StaggerItem key={q}>
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 w-5 h-5 rounded-full border border-[#3f6bff]/40 bg-[#3f6bff]/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 text-[#3f6bff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[#526078] text-[14px] md:text-[15px] leading-relaxed">{q}</span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* -- WHO IT'S FOR (02) -- */}
      <section className="relative py-24 md:py-32 bg-[#0b1433] overflow-hidden">
        <Numeral n="02" dark />
        <div className="relative max-w-6xl mx-auto px-6">
          <AnimateIn className="max-w-3xl mb-14">
            <SectionLabel>Who Production Ready is for</SectionLabel>
            <AccentBar />
            <h2 className="text-3xl md:text-[42px] font-bold text-white mb-5 leading-[1.15] tracking-[-0.01em]">
              Built for technical startups whose product is ahead of their market story.
            </h2>
            <p className="text-white/60 text-base md:text-[17px] leading-[1.8]">
              You have built something real, but the market is not yet understanding it quickly enough. Production Ready may be a fit if these sound familiar.
            </p>
          </AnimateIn>

          <Stagger className="grid sm:grid-cols-2 gap-4 mb-10" stagger={0.06}>
            {FIT_SIGNALS.map((s, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="group h-full flex items-start gap-4 rounded-2xl p-5 bg-[#0d1a42] border border-white/10 transition-shadow duration-200 hover:shadow-[0_12px_30px_rgba(63,107,255,0.15)]"
                >
                  <span className="text-[13px] font-bold bg-clip-text text-transparent mt-0.5 flex-shrink-0 w-7"
                    style={{ backgroundImage: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white/65 text-[15px] leading-[1.65]">{s}</span>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>

          <AnimateIn delay={0.1}>
            <div className="rounded-2xl p-6 md:p-7 border border-dashed border-white/20 bg-white/[0.03]">
              <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-white/30 mb-2">Probably too early</p>
              <p className="text-[14px] md:text-[15px] text-white/50 leading-[1.7]">
                You are probably too early for the full Production Ready path if the product is not commercially validated, there are no real customer signals yet, or the market opportunity cannot justify the investment. That does not mean there is no way to help. The first step may be Advisory, a smaller review, or free resources first.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* -- WHAT IT CREATES (03) -- */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <Numeral n="03" />
        <div className="relative max-w-6xl mx-auto px-6">
          <AnimateIn className="max-w-3xl mb-14">
            <SectionLabel>What Production Ready creates</SectionLabel>
            <AccentBar />
            <h2 className="text-3xl md:text-[42px] font-bold text-[#111827] mb-5 leading-[1.15] tracking-[-0.01em]">
              The system behind the story.
            </h2>
            <p className="text-[#526078] text-base md:text-[17px] leading-[1.8]">
              Production Ready creates the pieces your team needs to explain, sell, demo, and improve the story without depending on one person to translate it every time.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.1} className="mb-8">
            <ProductionReadyCreatesVisual />
          </AnimateIn>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            {DELIVERABLES.slice(0, 2).map((d, i) => (
              <AnimateIn key={i} delay={0.05 * i} className="h-full">
                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}
                  className="group h-full rounded-2xl p-6 bg-white border border-[#e5e7eb] shadow-sm transition-shadow duration-200 hover:shadow-[0_12px_30px_rgba(63,107,255,0.10)]">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "linear-gradient(135deg, rgba(63,107,255,0.12), rgba(139,92,246,0.12))" }}>
                    <span className="text-[13px] font-bold bg-clip-text text-transparent"
                      style={{ backgroundImage: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-[16px] font-semibold text-[#111827] mb-2 leading-snug group-hover:text-[#3f6bff] transition-colors duration-200">{d.t}</h3>
                  <p className="text-[#526078] text-[14px] leading-[1.65]">{d.d}</p>
                </motion.div>
              </AnimateIn>
            ))}
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            {DELIVERABLES.slice(2, 5).map((d, i) => (
              <AnimateIn key={i} delay={0.05 * i} className="h-full">
                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}
                  className="group h-full rounded-2xl p-6 bg-white border border-[#e5e7eb] shadow-sm transition-shadow duration-200 hover:shadow-[0_12px_30px_rgba(63,107,255,0.10)]">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "linear-gradient(135deg, rgba(63,107,255,0.12), rgba(139,92,246,0.12))" }}>
                    <span className="text-[13px] font-bold bg-clip-text text-transparent"
                      style={{ backgroundImage: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }}>
                      {String(i + 3).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-[16px] font-semibold text-[#111827] mb-2 leading-snug group-hover:text-[#3f6bff] transition-colors duration-200">{d.t}</h3>
                  <p className="text-[#526078] text-[14px] leading-[1.65]">{d.d}</p>
                </motion.div>
              </AnimateIn>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {DELIVERABLES.slice(5, 7).map((d, i) => (
              <AnimateIn key={i} delay={0.05 * i} className="h-full">
                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}
                  className="group h-full rounded-2xl p-6 bg-white border border-[#e5e7eb] shadow-sm transition-shadow duration-200 hover:shadow-[0_12px_30px_rgba(63,107,255,0.10)]">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "linear-gradient(135deg, rgba(63,107,255,0.12), rgba(139,92,246,0.12))" }}>
                    <span className="text-[13px] font-bold bg-clip-text text-transparent"
                      style={{ backgroundImage: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }}>
                      {String(i + 6).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-[16px] font-semibold text-[#111827] mb-2 leading-snug group-hover:text-[#3f6bff] transition-colors duration-200">{d.t}</h3>
                  <p className="text-[#526078] text-[14px] leading-[1.65]">{d.d}</p>
                </motion.div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* -- ENGAGEMENT PATHS (pricing) -- */}
      <section className="relative py-24 md:py-32 bg-[#0b1433] overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <AnimateIn className="max-w-3xl mb-6 md:text-center md:mx-auto">
            <div className="md:flex md:flex-col md:items-center">
              <SectionLabel>Engagement paths</SectionLabel>
              <AccentBar className="md:mx-auto" />
              <h2 className="text-3xl md:text-[42px] font-bold text-white mb-5 leading-[1.15] tracking-[-0.01em]">
                Three objective-based ways to engage.
              </h2>
              <p className="text-white/60 text-base md:text-[17px] leading-[1.8]">
                Production Ready is not sold as open-ended access to time. The work is tied to objective deliverables, readiness milestones, and the level of transfer your team needs.
              </p>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.1} className="max-w-3xl mx-auto mb-12">
            <div className="rounded-2xl px-6 py-5 bg-[#0d1a42] border border-white/10">
              <p className="text-[14px] md:text-[15px] text-white/55 leading-[1.7]">
                <span className="font-semibold text-white/85">Evaluate the price against the value of the problem.</span> One clearer enterprise opportunity, one better-converting event, one activated strategic partner, one stronger funding narrative, or one sales team that can explain the product without the founder in every room can easily change the math. If the product is strong and the market is real, unclear GTM is expensive.
              </p>
            </div>
          </AnimateIn>

          <Stagger className="grid md:grid-cols-3 gap-6 items-stretch" stagger={0.1}>
            {PRICING.map((p) => (
              <StaggerItem key={p.name} className="h-full">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="relative h-full flex flex-col rounded-2xl p-7 transition-shadow duration-200"
                  style={
                    p.featured
                      ? { background: "#061126", border: "1px solid rgba(63,107,255,0.4)", boxShadow: "0 20px 50px rgba(63,107,255,0.18)" }
                      : { background: "white", border: "1px solid #e5e7eb" }
                  }
                >
                  <PointerGlow
                    color={p.featured ? "139,92,246" : "63,107,255"}
                    strength={p.featured ? 0.16 : 0.07}
                  />
                  {p.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.12em] uppercase text-white"
                      style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }}>
                      Most chosen
                    </div>
                  )}

                  <h3 className={`text-[18px] font-bold mb-3 leading-tight ${p.featured ? "text-white" : "text-[#111827]"}`}>{p.name}</h3>

                  <div className="flex items-baseline gap-1 mb-5 pb-5"
                    style={{ borderBottom: p.featured ? "1px solid rgba(255,255,255,0.1)" : "1px solid #e5e7eb" }}>
                    <span className="text-[38px] font-bold bg-clip-text text-transparent leading-none"
                      style={{ backgroundImage: "linear-gradient(90deg, #3f6bff, #8b5cf6)" }}>{p.price}</span>
                    <span className={`text-[15px] ${p.featured ? "text-white/45" : "text-[#9ca3af]"}`}>{p.unit}</span>
                  </div>

                  <div className="mb-5">
                    <p className={`text-[11px] font-semibold tracking-[0.1em] uppercase mb-1.5 ${p.featured ? "text-[#9db4ff]" : "text-[#3f6bff]"}`}>Best fit</p>
                    <p className={`text-[13.5px] leading-[1.6] ${p.featured ? "text-white/60" : "text-[#526078]"}`}>{p.fit}</p>
                  </div>

                  <div className="mb-6">
                    <p className={`text-[11px] font-semibold tracking-[0.1em] uppercase mb-1.5 ${p.featured ? "text-[#9db4ff]" : "text-[#3f6bff]"}`}>What it does</p>
                    <p className={`text-[13.5px] leading-[1.6] ${p.featured ? "text-white/60" : "text-[#526078]"}`}>{p.does}</p>
                  </div>

                  <div className="mt-auto">
                    {p.featured ? (
                      <GradientButton onClick={openModal}>{p.cta}</GradientButton>
                    ) : (
                      <OutlineButton onClick={openModal}>{p.cta}</OutlineButton>
                    )}
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* -- ASSESSMENT DETAIL (05) -- */}
      <section id="assessment" className="relative py-24 md:py-32 bg-[#f5f7fb] overflow-hidden scroll-mt-24">
        <Numeral n="05" />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-14 md:gap-16">
            <AnimateIn>
              <SectionLabel>Start with the Assessment</SectionLabel>
              <AccentBar />
              <h2 className="text-3xl md:text-[40px] font-bold text-[#111827] mb-6 leading-[1.15] tracking-[-0.01em]">
                When the problem is real, but the path is not obvious.
              </h2>
              <p className="text-[#526078] text-base md:text-[17px] leading-[1.8] mb-6">
                The Assessment answers a practical question: is this a technical GTM problem worth prioritizing right now? It reviews the current story, demo, buyer value, partner readiness, executive narrative, and field repeatability to identify the right next step.
              </p>
              <Stagger className="space-y-3" stagger={0.06}>
                {[
                  "Where the story is clear",
                  "Where the buyer is being asked to do too much translation",
                  "Which audiences are not being served well",
                  "Whether the demo supports business urgency or just product validity",
                  "Whether the partner story is repeatable",
                  "Whether you need Foundation, Transformation, advisory, or a different next step",
                ].map((item) => (
                  <StaggerItem key={item}>
                    <div className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }} />
                      <span className="text-[#526078] text-[15px] leading-[1.7]">{item}</span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </AnimateIn>

            <div className="space-y-5">
              <AnimateIn delay={0.1}>
                <div className="rounded-2xl p-7 bg-white border border-[#e5e7eb]">
                  <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#3f6bff] mb-5">Assessment includes</p>
                  <div className="space-y-3.5">
                    {ASSESSMENT_INCLUDES.map((item) => (
                      <div key={item} className="flex items-start gap-3.5">
                        <span className="mt-0.5 w-5 h-5 rounded-full border border-[#3f6bff]/40 bg-[#3f6bff]/10 flex items-center justify-center flex-shrink-0">
                          <svg className="w-2.5 h-2.5 text-[#3f6bff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-[#526078] text-[14px] leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateIn>
              <AnimateIn delay={0.18}>
                <div className="rounded-2xl p-7 bg-white border border-[#e5e7eb]">
                  <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#9ca3af] mb-5">Assessment is not</p>
                  <div className="space-y-3.5">
                    {ASSESSMENT_IS_NOT.map((item) => (
                      <div key={item} className="flex items-center gap-3.5">
                        <span className="w-5 h-5 rounded-full border border-[#9ca3af]/30 flex items-center justify-center flex-shrink-0">
                          <svg className="w-2.5 h-2.5 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </span>
                        <span className="text-[#526078] text-[14px] leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 pt-4 text-[13px] text-[#526078] leading-relaxed" style={{ borderTop: "1px solid #e5e7eb" }}>
                    The $20k fee is credited toward Foundation or Transformation if signed within 30 days of delivery.
                  </p>
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {/* -- WHAT IT'S NOT (06) -- */}
      <section className="relative py-24 md:py-32 bg-[#0b1433] overflow-hidden">
        <Numeral n="06" dark />
        <div className="relative max-w-6xl mx-auto px-6">
          <AnimateIn className="max-w-3xl mb-12">
            <SectionLabel>What Production Ready is not</SectionLabel>
            <AccentBar />
            <h2 className="text-3xl md:text-[42px] font-bold text-white mb-5 leading-[1.15] tracking-[-0.01em]">
              Production Ready is not a content factory.
            </h2>
          </AnimateIn>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <AnimateIn>
              <div className="rounded-2xl p-7 border border-white/10 bg-[#0d1a42] h-full">
                <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#3f6bff] mb-5">Production Ready is</p>
                <div className="space-y-3">
                  {[
                    "GTM system design",
                    "Product-to-value translation",
                    "Messaging architecture",
                    "Demo and conversation structure",
                    "Partner repeatability",
                    "Executive narrative",
                    "Event and field readiness",
                    "Internal transfer so the team can carry the story",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 w-5 h-5 rounded-full border border-[#3f6bff]/40 bg-[#3f6bff]/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 text-[#3f6bff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-white/65 text-[14px] leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.1}>
              <div className="rounded-2xl p-7 border border-white/10 bg-[#0d1a42] h-full">
                <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/30 mb-5">Production Ready is not</p>
                <div className="space-y-3">
                  {[
                    "Unlimited deck writing",
                    "Blog writing",
                    "Social campaigns",
                    "Graphic design",
                    "Video editing",
                    "SDR work",
                    "Sales quota ownership",
                    "Media buying",
                    "Event logistics",
                    "Partner portal administration",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </span>
                      <span className="text-white/50 text-[14px] leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </div>

          <AnimateIn delay={0.2}>
            <p className="text-[15px] text-white/50 leading-[1.7]">
              The goal is to build the system your team can use, not create another dependency.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* -- EXPECTED OUTCOMES (07) -- */}
      <section className="relative py-24 md:py-32 bg-[#f5f7fb] overflow-hidden">
        <Numeral n="07" />
        <div className="relative max-w-6xl mx-auto px-6">
          <AnimateIn className="max-w-3xl mb-14">
            <SectionLabel>Expected outcomes</SectionLabel>
            <AccentBar />
            <h2 className="text-3xl md:text-[42px] font-bold text-[#111827] mb-5 leading-[1.15] tracking-[-0.01em]">
              What should be different after Production Ready?
            </h2>
            <p className="text-[#526078] text-base md:text-[17px] leading-[1.8]">
              The company should be able to explain its product more clearly, train others more consistently, and carry the story into real market conversations with less dependence on the founder. The goal is for the team to be able to say:
            </p>
          </AnimateIn>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            {OUTCOMES.slice(0, 2).map((o, i) => (
              <AnimateIn key={i} delay={0.05 * i} className="h-full">
                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}
                  className="group h-full rounded-2xl p-7 border border-[#e5e7eb] bg-white shadow-sm transition-shadow duration-200 hover:shadow-[0_12px_30px_rgba(63,107,255,0.10)]">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "linear-gradient(135deg, rgba(63,107,255,0.12), rgba(139,92,246,0.12))" }}>
                    <svg className="w-5 h-5 text-[#3f6bff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-[17px] font-bold text-[#111827] mb-2">{o.t}</h3>
                  <p className="text-[#526078] text-[14px] leading-[1.65]">"{o.d}"</p>
                </motion.div>
              </AnimateIn>
            ))}
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {OUTCOMES.slice(2, 5).map((o, i) => (
              <AnimateIn key={i} delay={0.05 * i} className="h-full">
                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}
                  className="group h-full rounded-2xl p-7 border border-[#e5e7eb] bg-white shadow-sm transition-shadow duration-200 hover:shadow-[0_12px_30px_rgba(63,107,255,0.10)]">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "linear-gradient(135deg, rgba(63,107,255,0.12), rgba(139,92,246,0.12))" }}>
                    <svg className="w-5 h-5 text-[#3f6bff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-[17px] font-bold text-[#111827] mb-2">{o.t}</h3>
                  <p className="text-[#526078] text-[14px] leading-[1.65]">"{o.d}"</p>
                </motion.div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* -- FAQ -- */}
      <section className="py-24 md:py-32 bg-[#0b1433]">
        <div className="max-w-3xl mx-auto px-6">
          <AnimateIn>
            <SectionLabel>Production Ready questions</SectionLabel>
            <AccentBar />
            <h2 className="text-3xl md:text-[40px] font-bold text-white mb-14 leading-[1.15]">
              Questions teams usually ask
            </h2>
          </AnimateIn>

          <Stagger stagger={0.07}>
            {PR_FAQS.map((faq, i) => (
              <StaggerItem key={i}>
                <div className="border-b border-white/10 last:border-b-0">
                  <button
                    className="flex items-start justify-between w-full text-left gap-4 py-6 group"
                    aria-expanded={openFaq === i}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className={`text-[15px] font-semibold leading-snug transition-colors duration-200 ${openFaq === i ? "text-[#3f6bff]" : "text-white group-hover:text-[#3f6bff]"}`}>
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="flex-shrink-0 mt-0.5"
                    >
                      <svg className={`w-5 h-5 transition-colors duration-200 ${openFaq === i ? "text-[#3f6bff]" : "text-white/30"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                        <p className="pb-6 text-white/60 text-[15px] leading-[1.8]">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* -- FINAL CTA -- */}
      <section className="relative py-24 md:py-36 bg-[#061126] text-white overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #061126 0%, #0d1a3a 50%, #061126 100%)" }} />
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 0%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 0%, transparent 100%)",
          }} />
        <div className="absolute top-1/2 left-2/3 -translate-y-1/2 w-[500px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.15) 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 right-2/3 -translate-y-1/2 w-[400px] h-[300px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(63,107,255,0.10) 0%, transparent 70%)" }} />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <AnimateIn>
            <SectionLabel>Get Started</SectionLabel>
            <h2 className="text-3xl md:text-[48px] font-bold mb-6 leading-[1.1] tracking-[-0.02em]">
              Ready to make the story{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #3f6bff, #8b5cf6)" }}>
                as strong as the product?
              </span>
            </h2>
          </AnimateIn>

          <AnimateIn delay={0.15}>
            <p className="text-white/60 text-[17px] leading-[1.75] mb-12 max-w-xl mx-auto">
              If your product is working but the market still needs too much help understanding why it matters, Production Ready may be the right next step. Schedule a 30-minute fit call and we can talk through whether the Assessment, Foundation, Transformation, or a lighter advisory path makes the most sense.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.25} className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <GradientButton onClick={openModal} fitCall>
              Schedule a 30-Minute Fit Call
            </GradientButton>
            <GhostButton href="mailto:bob@successfulbob.com" external>
              Email Bob Directly
            </GhostButton>
          </AnimateIn>

          <AnimateIn delay={0.35}>
            <p className="text-[13px] text-white/30">
              Prefer email? Reach me directly at{" "}
              <a href="mailto:bob@successfulbob.com" className="text-white/50 hover:text-white transition-colors underline underline-offset-2">
                bob@successfulbob.com
              </a>
            </p>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
