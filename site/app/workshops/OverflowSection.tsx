"use client";

import { PointerGlow } from "@/components/Primitives";
import { AnimateIn } from "@/components/AnimateIn";
import TrackedCta from "@/components/TrackedCta";
import type { Workshop, WorkshopView } from "@/lib/workshop";

/* The second session. Rendered only when it has been revealed in the CMS, which
   is a switch of its own rather than a consequence of the page state, so it can
   go up while the first session still reads as open and nearly full.

   The minimum-participants promise is shown prominently rather than buried:
   people are charged at booking, so the refund commitment has to be visible
   before the button, not after it. */

export default function OverflowSection({ w, view }: { w: Workshop; view: WorkshopView }) {
  const s = w.overflowSession;
  if (!view.showOverflow || !s) return null;

  const cta = view.primaryCta.kind === "external" && view.primaryCta.track === "overflow_cta_click"
    ? view.primaryCta
    : s.registrationUrl
      ? ({ kind: "external", label: `Reserve My Seat — ${s.priceDisplay ?? ""}`.trim(), href: s.registrationUrl, track: "overflow_cta_click" } as const)
      : null;

  const facts = [
    s.dateDisplay,
    s.timeDisplay,
    s.durationDisplay,
    s.priceDisplay,
    s.capacity ? `${s.capacity} seats` : null,
  ].filter(Boolean) as string[];

  return (
    <section className="py-20 md:py-28 bg-[#0B1734] text-white">
      <div className="max-w-4xl mx-auto px-6">
        <AnimateIn>
          <div
            className="relative rounded-2xl p-8 md:p-10 overflow-hidden"
            style={{
              background: "rgba(6,17,38,0.6)",
              border: "1px solid rgba(63,107,255,0.28)",
              boxShadow: "0 24px 60px rgba(2,8,23,0.35)",
            }}
          >
            <PointerGlow color="139,92,246" strength={0.14} />

            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#9db4ff] mb-3">
              {s.label ?? "Second session"}
            </p>

            <h2 className="text-[26px] md:text-[34px] font-bold leading-[1.2] tracking-[-0.01em] mb-4">
              {w.overflowHeadline ?? "A second session"}
            </h2>

            {w.overflowBody && (
              <p className="text-[16px] text-white/60 leading-[1.7] mb-6 max-w-2xl">{w.overflowBody}</p>
            )}

            {facts.length > 0 && (
              <ul className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-6 text-[14px] text-white/50">
                {facts.map((f, i) => (
                  <li key={f} className="flex items-center gap-3">
                    <span>{f}</span>
                    {i < facts.length - 1 && (
                      <span aria-hidden="true" className="hidden sm:inline text-white/20">
                        /
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {w.minimumThresholdNote && (
              <div
                className="rounded-xl p-4 md:p-5 mb-7"
                style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.22)" }}
              >
                <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#fbbf24] mb-2">
                  Before you book
                </p>
                <p className="text-[14.5px] leading-[1.7] text-white/70">{w.minimumThresholdNote}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              {cta && <TrackedCta cta={cta} />}
            </div>

            {view.overflowSeatLine && (
              <p className="mt-5 text-[13px] text-white/40">{view.overflowSeatLine}</p>
            )}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
