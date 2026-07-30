"use client";

import { SectionLabel, AccentBar } from "@/components/Primitives";
import { AnimateIn } from "@/components/AnimateIn";
import TrackedCta from "@/components/TrackedCta";
import type { Workshop, WorkshopView } from "@/lib/workshop";

/* Section order and backgrounds live here. Backgrounds alternate
   white -> soft -> dark and never place two dark sections next to each other.
   The two conditional sections (second session, testimonials) are positioned so
   the sequence stays valid whether or not they render. */

export default function WorkshopsPage({ workshop, view }: { workshop: Workshop; view: WorkshopView }) {
  const w = workshop;
  const primary = w.primarySession;

  return (
    <>
      {/* -- HERO (dark) -- */}
      <section className="relative bg-[#061126] text-white pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.6] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            maskImage: "radial-gradient(ellipse 70% 80% at 75% 35%, black 0%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 80% at 75% 35%, black 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6">
          {view.heroBadge && (
            <div
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full mb-7"
              style={{ background: "rgba(63,107,255,0.10)", border: "1px solid rgba(63,107,255,0.22)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }}
              />
              <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#9db4ff]">
                {view.heroBadge}
              </span>
            </div>
          )}

          <h1 className="text-[33px] md:text-[52px] font-bold leading-[1.08] tracking-[-0.02em] mb-6 max-w-3xl">
            {w.heroHeadline}
          </h1>

          {w.heroSubhead && (
            <p className="text-[16px] md:text-[18px] text-white/65 leading-[1.7] mb-8 max-w-2xl">
              {w.heroSubhead}
            </p>
          )}

          {primary && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8 text-[14px] text-white/50">
              {[primary.dateDisplay, primary.timeDisplay, primary.durationDisplay, primary.priceDisplay]
                .filter(Boolean)
                .map((fact, i) => (
                  <span key={i} className="flex items-center gap-4">
                    {i > 0 && <span className="text-white/20">|</span>}
                    {fact}
                  </span>
                ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <TrackedCta cta={view.primaryCta} fitCallIcon={view.primaryCta.kind === "fit-call"} />
          </div>

          {view.seatLine && (
            <p className="mt-6 text-[13px] text-white/40">
              {view.seatLine}
              {view.seatAsOf ? ` (as of ${view.seatAsOf})` : ""}
            </p>
          )}
          {w.heroFinePrint && <p className="mt-2 text-[13px] text-white/35">{w.heroFinePrint}</p>}
        </div>
      </section>

      {/* -- Temporary state readout. Replaced by the real sections in the next
             stage; here so every state can be walked and checked. -- */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <AnimateIn>
            <SectionLabel>Build in progress</SectionLabel>
            <AccentBar />
            <h2 className="text-[26px] md:text-[34px] font-bold text-[#111827] mb-6 leading-[1.2]">
              Sections land in the next stage
            </h2>
          </AnimateIn>
          <dl className="text-[14px] text-[#526078] space-y-2">
            {[
              ["State", view.state],
              ["Final block", view.finalBlock],
              ["Primary CTA", `${view.primaryCta.kind}: ${view.primaryCta.label}`],
              ["Seat line", view.seatLine ?? "(none)"],
              ["Previews shown", String(view.showPreviews)],
              ["Second session shown", String(view.showOverflow)],
              ["Second session seats", view.overflowSeatLine ?? "(none)"],
              ["FAQs", String(w.faqs?.length ?? 0)],
              ["Testimonials", String(w.testimonials?.length ?? 0)],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-3">
                <dt className="font-semibold text-[#111827] min-w-[180px]">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* -- FINAL BLOCK (dark) -- */}
      <section className="py-20 md:py-28 bg-[#061126] text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-[28px] md:text-[38px] font-bold leading-[1.15] tracking-[-0.01em] mb-5">
            {view.finalBlock === "next-cohort"
              ? w.nextCohortHeadline ?? "The next cohort"
              : view.finalBlock === "fit-call"
                ? w.closedMessage ?? "Registration is closed"
                : w.finalBlockHeadline ?? "Reserve your seat"}
          </h2>
          {w.finalBlockBody && view.finalBlock !== "fit-call" && (
            <p className="text-[16px] text-white/60 leading-[1.7] mb-8 max-w-xl mx-auto">{w.finalBlockBody}</p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TrackedCta cta={view.primaryCta} fitCallIcon={view.primaryCta.kind === "fit-call"} />
          </div>
        </div>
      </section>
    </>
  );
}
