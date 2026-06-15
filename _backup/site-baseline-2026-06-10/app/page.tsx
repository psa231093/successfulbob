"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimateIn, Stagger, StaggerItem } from "@/components/AnimateIn";
import FAQSection from "@/components/FAQSection";
import ParticleCanvas from "@/components/ParticleCanvas";
import ProblemIllustration from "@/components/ProblemIllustration";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import WaysToWorkSection from "@/components/WaysToWorkSection";
import AboutBobSection from "@/components/AboutBobSection";
import WhoItsForSection from "@/components/WhoItsForSection";
import InsightsSection from "@/components/InsightsSection";

/* --- Primitives ------------------------------------------------ */

function CalendarIcon() {
  return (
    <svg
      className="fit-call-icon w-[17px] h-[17px] flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.2}
    >
      <rect x="3" y="4" width="18" height="18" rx="3" ry="3" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function GradientButtonInner({
  href,
  children,
  external,
  fitCall,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  fitCall?: boolean;
}) {
  const cls =
    "relative flex items-center justify-center px-7 py-3.5 rounded-lg text-[15px] font-semibold text-white overflow-hidden group w-full";

  const inner = (
    <>
      <span className="absolute inset-0 transition-opacity duration-300"
        style={{ background: "linear-gradient(135deg, #3f6bff 0%, #8b5cf6 100%)" }} />
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(135deg, #5580ff 0%, #a070ff 100%)" }} />
      <span className="relative z-10 flex items-center gap-2.5">
        {fitCall && <CalendarIcon />}
        {children}
      </span>
    </>
  );

  if (external)
    return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>;
  return <Link href={href} className={cls}>{inner}</Link>;
}

function GradientButton({
  href,
  children,
  external,
  fitCall,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  fitCall?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className="w-full sm:w-auto"
      style={{ borderRadius: 8 }}
    >
      <GradientButtonInner href={href} external={external} fitCall={fitCall}>
        {children}
      </GradientButtonInner>
    </motion.div>
  );
}

function GhostButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
      className="w-full sm:w-auto" style={{ borderRadius: 8 }}>
      <Link
        href={href}
        className="flex items-center justify-center w-full px-7 py-3.5 rounded-lg text-[15px] font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/[0.06] transition-all duration-200"
      >
        {children}
      </Link>
    </motion.div>
  );
}

function OutlineButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
      className="w-full sm:w-auto" style={{ borderRadius: 8 }}>
      <Link
        href={href}
        className="flex items-center justify-center w-full px-7 py-3.5 rounded-lg text-[15px] font-semibold text-[#3f6bff] border border-[#3f6bff]/30 hover:border-[#3f6bff]/60 hover:bg-[#3f6bff]/[0.05] transition-all duration-200"
      >
        {children}
      </Link>
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#3f6bff] mb-3">{children}</p>;
}

function AccentBar({ className }: { className?: string }) {
  return <div className={`w-10 h-[3px] rounded-full bg-gradient-to-r from-[#3f6bff] to-[#8b5cf6] mb-5 ${className ?? ""}`} />;
}

function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-4">
      <div className="mt-[3px] w-7 h-7 rounded-lg bg-gradient-to-br from-[#3f6bff]/15 to-[#8b5cf6]/15 flex items-center justify-center flex-shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-[#3f6bff]" />
      </div>
      <span className="text-[#526078] text-base md:text-[17px] leading-[1.75]">{children}</span>
    </li>
  );
}

/* --- Page ------------------------------------------------------ */

export default function HomePage() {
  return (
    <>
      {/* -- HERO ----------------------------------------------- */}
      <section className="relative bg-[#061126] text-white pt-28 pb-32 md:pt-40 md:pb-44 overflow-hidden">
        {/* Particle network canvas */}
        <ParticleCanvas />

        {/* Glow orbs — behind content, above canvas */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[900px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(63,107,255,0.12) 0%, transparent 65%)" }} />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.09) 0%, transparent 70%)" }} />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8b5cf6] mb-7"
          >
            Go to Market Strategy for Technical Startups
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[38px] md:text-[64px] font-bold leading-[1.08] tracking-[-0.02em] mb-8"
          >
            Make your technical story<br className="hidden md:block" /> easier to{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #3f6bff 0%, #8b5cf6 100%)" }}
            >
              understand, sell,
            </span>
            <br className="hidden md:block" /> and scale.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3 mb-10"
          >
            <p className="text-[17px] md:text-[19px] text-white/65 max-w-2xl mx-auto leading-[1.7]">
              You built something real. The problem is that too much of the market may still need you in the room to understand why it matters.
            </p>
            <p className="text-[15px] md:text-[17px] text-white/45 max-w-xl mx-auto leading-[1.7]">
              Successfulbob LLC turns product depth into a story buyers, sales teams, partners, and executives can understand, trust, and repeat.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <GradientButton href="#fit-call" fitCall>Schedule a 30-Minute Fit Call</GradientButton>
            <GhostButton href="/production-ready">Explore Production Ready</GhostButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.52 }}
            className="mt-7 text-[13px] text-white/30 max-w-md mx-auto"
          >
            Not sure where to start? A short fit call can usually tell us whether you need Production Ready, advisory work, or just a sharper next step.
          </motion.p>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #061126)" }} />
      </section>

      {/* -- PROBLEM -------------------------------------------- */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

            {/* Left: copy */}
            <div>
              <AnimateIn>
                <SectionLabel>The Problem</SectionLabel>
                <AccentBar />
                <h2 className="text-3xl md:text-[40px] font-bold text-[#111827] mb-8 leading-[1.15] tracking-[-0.01em]">
                  The product may be strong. The translation may not be.
                </h2>
              </AnimateIn>

              <Stagger className="space-y-5" stagger={0.1} delay={0.1}>
                {[
                  "A lot of technical companies do not have a product problem. They have a translation problem.",
                  "The founder understands the problem. The engineers understand what was built. The earliest customers may even understand the value because they lived the pain.",
                  "But the next buyer, seller, partner, investor, or executive does not have all that context. They are not filling in the same blanks. They are deciding whether to keep listening.",
                  "That attention is a currency. Every feature you explain spends some of it. If the story is not connected to the pain they feel, the job they need done, or the outcome they are trying to create, they will quietly move on.",
                ].map((p, i) => (
                  <StaggerItem key={i}>
                    <p className="text-[#526078] text-base md:text-[17px] leading-[1.8]">{p}</p>
                  </StaggerItem>
                ))}
              </Stagger>

              <AnimateIn delay={0.4} className="mt-10">
                <div className="relative pl-6 py-4 border-l-[3px] border-[#3f6bff]">
                  <div className="absolute -left-[3px] top-0 w-[3px] h-full bg-gradient-to-b from-[#3f6bff] to-[#8b5cf6]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3f6bff]/[0.04] to-transparent rounded-r-lg" />
                  <p className="relative text-[17px] font-semibold text-[#111827] italic leading-relaxed">
                    If the story only works when the founder explains it, it is not ready to scale.
                  </p>
                </div>
              </AnimateIn>
            </div>

            {/* Right: illustration */}
            <AnimateIn delay={0.2} className="hidden md:flex items-center justify-center">
              <ProblemIllustration />
            </AnimateIn>

          </div>
        </div>
      </section>

      {/* -- WHAT WE DO ----------------------------------------- */}
      <WhatWeDoSection />

      {/* -- WAYS TO WORK TOGETHER ------------------------------ */}
      <WaysToWorkSection />

      {/* -- PRODUCTION READY DARK ------------------------------ */}
      <section className="relative py-24 md:py-32 bg-[#061126] text-white overflow-hidden">
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.13) 0%, transparent 70%)" }} />
        <div className="absolute left-0 bottom-0 w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(63,107,255,0.08) 0%, transparent 70%)" }} />

        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <AnimateIn>
            <SectionLabel>Production Ready</SectionLabel>
            <AccentBar />
            <h2 className="text-3xl md:text-[42px] font-bold mb-8 leading-[1.15] tracking-[-0.01em]">
              Your product may be production-ready.<br className="hidden md:block" /> Is your GTM?
            </h2>
            <div className="space-y-4 text-white/60 text-base md:text-[17px] leading-[1.8] mb-10">
              <p>Software teams do not move code into production just because it works once. They test it, harden it, document it, and make sure it can survive real users, real workflows, and real consequences.</p>
              <p>Your go to market story deserves the same discipline.</p>
              <p>Production Ready is built for companies that already have evidence their product works and now need the market, field, partners, and executives to understand why it matters.</p>
            </div>
            <GradientButton href="/production-ready">Make GTM Production Ready</GradientButton>
          </AnimateIn>

          {/* Checklist card */}
          <AnimateIn delay={0.2}>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-8"
              style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.07)" }}>
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/35 mb-7">
                Questions Production Ready helps answer
              </p>
              <Stagger className="space-y-5" stagger={0.07} delay={0.3}>
                {[
                  "Can someone besides the founder explain the value?",
                  "Can sales tell the story without turning it into a feature list?",
                  "Can partners understand, trust, and repeat it?",
                  "Can executives see why this matters now?",
                  "Can the demo guide buyers toward value instead of wandering through screens?",
                  "Can the team learn from the market and improve the story over time?",
                ].map((q) => (
                  <StaggerItem key={q}>
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 w-5 h-5 rounded-full border border-[#3f6bff]/50 bg-[#3f6bff]/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 text-[#3f6bff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white/65 text-[14px] leading-relaxed">{q}</span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* -- WHY BOB -------------------------------------------- */}
      <AboutBobSection />

      {/* -- AUDIENCE ------------------------------------------- */}
      <WhoItsForSection />

      {/* -- INSIGHTS PREVIEW ----------------------------------- */}
      <InsightsSection />

      {/* -- FAQ ------------------------------------------------ */}
      <FAQSection />

      {/* -- FINAL CTA ------------------------------------------ */}
      <section id="fit-call" className="relative py-24 md:py-36 bg-[#061126] text-white overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #061126 0%, #0d1a3a 50%, #061126 100%)" }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 0%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 0%, transparent 100%)",
          }}
        />
        <div className="absolute top-1/2 left-2/3 -translate-y-1/2 w-[500px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.15) 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 right-2/3 -translate-y-1/2 w-[400px] h-[300px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(63,107,255,0.10) 0%, transparent 70%)" }} />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <AnimateIn>
            <SectionLabel>Get Started</SectionLabel>
            <h2 className="text-3xl md:text-[48px] font-bold mb-6 leading-[1.1] tracking-[-0.02em]">
              The world may need your solution.<br className="hidden md:block" />{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #3f6bff, #8b5cf6)" }}>
                They still need to understand it.
              </span>
            </h2>
          </AnimateIn>

          <AnimateIn delay={0.15}>
            <p className="text-white/60 text-[17px] leading-[1.75] mb-3 max-w-xl mx-auto">
              If your product is strong but the story is not yet easy for the market, field, partners, or executives to carry, that is fixable.
            </p>
            <p className="text-white/45 text-[15px] leading-[1.75] mb-12 max-w-lg mx-auto">
              Schedule a 30-minute fit call and we can talk through where the story is breaking, whether Production Ready makes sense, or whether a lighter advisory path is the better next step.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.25} className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <GradientButton href="https://calendly.com/bob-successfulbob" external fitCall>
              Schedule a 30-Minute Fit Call
            </GradientButton>
            <GhostButton href="mailto:bob@successfulbob.com">
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
