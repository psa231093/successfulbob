"use client";

import { SectionLabel, AccentBar } from "@/components/Primitives";
import { AnimateIn } from "@/components/AnimateIn";
import TrackedCta from "@/components/TrackedCta";
import WorkshopHero from "./WorkshopHero";
import type { Workshop, WorkshopView } from "@/lib/workshop";

/* Section order and backgrounds live here. Backgrounds alternate
   white -> soft -> dark and never place two dark sections next to each other.
   The two conditional sections (second session, testimonials) are positioned so
   the sequence stays valid whether or not they render. */

export default function WorkshopsPage({ workshop, view }: { workshop: Workshop; view: WorkshopView }) {
  const w = workshop;

  return (
    <>
      <WorkshopHero w={w} view={view} />

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
