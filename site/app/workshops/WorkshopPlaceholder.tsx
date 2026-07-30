"use client";

import { motion } from "framer-motion";
import { FitCallButton, GhostButtonInline } from "@/components/Primitives";

/* Shown when the CMS is unreachable or no workshop is selected in Workshop
   Settings. Deliberately a real page, not a 404, so the URL keeps working while
   between cohorts. */

export default function WorkshopPlaceholder() {
  return (
    <section className="relative bg-[#061126] text-white min-h-[70vh] flex items-center py-28 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.5] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage: "radial-gradient(ellipse 60% 70% at 50% 40%, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 70% at 50% 40%, black 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -top-20 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(63,107,255,0.12) 0%, transparent 65%)" }}
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#9db4ff] mb-4"
        >
          Workshops
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[32px] md:text-[46px] font-bold leading-[1.1] tracking-[-0.02em] mb-6"
        >
          The next working session is{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg, #3f6bff 0%, #8b5cf6 100%)" }}
          >
            being scheduled.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="text-[16px] md:text-[17px] text-white/60 leading-[1.7] mb-9 max-w-xl mx-auto"
        >
          Live sessions for technical founders, product leaders, and GTM leaders. Get in touch and
          you will hear about the next cohort before it opens.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <FitCallButton fitCall>Schedule a 30-Minute Fit Call</FitCallButton>
          <GhostButtonInline href="/production-ready">Explore Production Ready</GhostButtonInline>
        </motion.div>
      </div>
    </section>
  );
}
