"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GhostButtonInline } from "@/components/Primitives";
import TrackedCta from "@/components/TrackedCta";
import type { TruthItem, Workshop, WorkshopView } from "@/lib/workshop";

/* The hero: an asymmetric split with the copy on the left and a live audit
   panel on the right.

   The panel is the workshop's own subject matter rather than a decorative
   graphic. Every row starts as "unclear" and resolves into its authored status,
   and it deliberately ends unresolved, with ambers and reds still sitting
   there. That is the opposite beat to the Production Ready hero, whose panel
   converges to green: this page is meant to indict, that one to reassure. */

const STATUS = {
  known: {
    label: "Known",
    color: "#34d399",
    ring: "rgba(52,211,153,0.35)",
    bg: "rgba(52,211,153,0.10)",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    ),
  },
  unclear: {
    label: "Unclear",
    color: "#fbbf24",
    ring: "rgba(251,191,36,0.35)",
    bg: "rgba(251,191,36,0.10)",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.5 9a3.5 3.5 0 115 3.2c-.9.5-1.5 1.3-1.5 2.3v.5M12 18.5h.01" />
    ),
  },
  disputed: {
    label: "Disputed",
    color: "#f87171",
    ring: "rgba(248,113,113,0.35)",
    bg: "rgba(248,113,113,0.10)",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 7l10 10M17 7L7 17" />
    ),
  },
} as const;

type Status = keyof typeof STATUS;

function normalise(items: TruthItem[] | null | undefined) {
  return (items ?? [])
    .filter((i) => i?.label)
    .map((i) => ({
      label: i.label as string,
      status: (i.status && i.status in STATUS ? i.status : "unclear") as Status,
      note: i.note ?? null,
    }));
}

function TruthInventoryPanel({ items }: { items: ReturnType<typeof normalise> }) {
  const reduceMotion = useReducedMotion();
  /* Rows begin neutral and resolve one at a time. The initial state must be 0
     unconditionally: useReducedMotion() is null on the server but reads the
     media query on the first client render, so seeding the state from it makes
     the server and client render different text for reduced-motion visitors,
     which is a hydration error. The effect below resolves everything in one
     step for them instead — one repaint after mount, no animation. */
  const [resolved, setResolved] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setResolved(items.length);
      return;
    }
    setResolved(0);
    const timers = items.map((_, i) =>
      setTimeout(() => setResolved((r) => Math.max(r, i + 1)), 420 + i * 90)
    );
    return () => timers.forEach(clearTimeout);
  }, [items, reduceMotion]);

  const tally = items.slice(0, resolved).reduce(
    (acc, i) => ({ ...acc, [i.status]: acc[i.status] + 1 }),
    { known: 0, unclear: 0, disputed: 0 } as Record<Status, number>
  );

  return (
    <div
      className="relative w-full max-w-[420px] rounded-2xl p-6 md:p-7"
      style={{
        background: "rgba(11,23,52,0.72)",
        border: "1px solid rgba(63,107,255,0.22)",
        boxShadow: "0 24px 60px rgba(2,8,23,0.45)",
      }}
    >
      <div className="flex items-baseline justify-between mb-5">
        <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#9db4ff]">
          Product truth inventory
        </p>
        <div className="flex items-center gap-2.5 text-[11px] tabular-nums">
          {(["known", "unclear", "disputed"] as const).map((k) => (
            <span key={k} className="flex items-center gap-1" style={{ color: STATUS[k].color }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: STATUS[k].color }} />
              {tally[k]}
            </span>
          ))}
        </div>
      </div>

      <ul className="space-y-1">
        {items.map((item, i) => {
          const isResolved = i < resolved;
          const s = STATUS[isResolved ? item.status : "unclear"];
          return (
            <li key={item.label}>
              <motion.div
                initial={false}
                animate={{ opacity: isResolved ? 1 : 0.45 }}
                transition={{ duration: reduceMotion ? 0 : 0.35 }}
                className="group relative flex items-start gap-3 rounded-lg px-2.5 py-2.5 -mx-2.5 transition-colors duration-200 hover:bg-white/[0.04]"
              >
                <span
                  className="flex-shrink-0 mt-[1px] flex items-center justify-center w-[18px] h-[18px] rounded-full transition-colors duration-300"
                  style={{ background: s.bg, border: `1px solid ${s.ring}` }}
                >
                  <svg
                    className="w-[11px] h-[11px]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke={isResolved ? s.color : "rgba(255,255,255,0.5)"}
                  >
                    {s.icon}
                  </svg>
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-[13.5px] leading-[1.45] text-white/80">{item.label}</span>
                  {item.note && (
                    <span className="block max-h-0 overflow-hidden opacity-0 text-[12.5px] leading-[1.5] text-white/45 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-1">
                      {item.note}
                    </span>
                  )}
                </span>

                <span
                  className="flex-shrink-0 text-[10px] font-semibold tracking-[0.08em] uppercase mt-[3px] transition-colors duration-300"
                  style={{ color: isResolved ? s.color : "rgba(255,255,255,0.35)" }}
                >
                  {s.label}
                </span>
              </motion.div>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 pt-4 text-[12.5px] leading-[1.6] text-white/40 border-t border-white/[0.08]">
        Most companies cannot fill this in without arguing. That argument is the workshop.
      </p>
    </div>
  );
}

/* Shown when no inventory rows are authored, so the hero never renders empty
   and the page does not depend on a hero image existing. */
function SessionFactsPanel({ w }: { w: Workshop }) {
  const s = w.primarySession;
  if (!s) return null;
  const rows = [
    ["Date", s.dateDisplay],
    ["Time", s.timeDisplay],
    ["Duration", s.durationDisplay],
    ["Price", s.priceDisplay],
    ["Seats", s.capacity ? `${s.capacity} participants` : null],
  ].filter(([, v]) => Boolean(v)) as [string, string][];

  return (
    <div
      className="relative w-full max-w-[420px] rounded-2xl p-6 md:p-7"
      style={{
        background: "rgba(11,23,52,0.72)",
        border: "1px solid rgba(63,107,255,0.22)",
        boxShadow: "0 24px 60px rgba(2,8,23,0.45)",
      }}
    >
      <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#9db4ff] mb-5">
        The session
      </p>
      <dl className="space-y-3">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-4">
            <dt className="text-[12.5px] text-white/40">{k}</dt>
            <dd className="text-[13.5px] text-white/80 text-right">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function WorkshopHero({ w, view }: { w: Workshop; view: WorkshopView }) {
  // Memoised so the panel's timer effect (keyed on this array) does not restart
  // the whole resolve animation if a parent ever re-renders the hero.
  const items = useMemo(() => normalise(w.heroInventoryItems), [w.heroInventoryItems]);

  /* When the main session is full and the second one is what the button sells,
     the fact rail describes the second session. Otherwise the hero shows one
     session's date and price above a button that reserves a different one. */
  const factSession =
    view.state === "sold-out" && view.showOverflow ? w.overflowSession : w.primarySession;

  const facts = [
    factSession?.dateDisplay,
    factSession?.timeDisplay,
    factSession?.durationDisplay,
    factSession?.priceDisplay,
    factSession?.capacity ? `${factSession.capacity} seats` : null,
  ].filter(Boolean) as string[];

  // Split the headline so only the authored phrase carries the gradient.
  const headline = w.heroHeadline ?? "";
  const highlight = w.heroHeadlineHighlight?.trim();
  const at = highlight ? headline.indexOf(highlight) : -1;
  const head = at >= 0 ? headline.slice(0, at) : headline;
  const mid = at >= 0 ? headline.slice(at, at + (highlight?.length ?? 0)) : "";
  const tail = at >= 0 ? headline.slice(at + (highlight?.length ?? 0)) : "";

  return (
    <section className="relative bg-[#061126] text-white pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.6] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage: "radial-gradient(ellipse 70% 80% at 78% 35%, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 80% at 78% 35%, black 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -top-24 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(63,107,255,0.13) 0%, transparent 65%)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.10) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-12 items-center">
          <div className="text-center md:text-left">
            {view.heroBadge && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full mb-7"
                style={{ background: "rgba(63,107,255,0.10)", border: "1px solid rgba(63,107,255,0.22)" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }}
                />
                <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#9db4ff]">
                  {view.heroBadge}
                </span>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[33px] md:text-[52px] font-bold leading-[1.08] tracking-[-0.02em] mb-6"
            >
              {head}
              {mid && (
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #3f6bff 0%, #8b5cf6 100%)" }}
                >
                  {mid}
                </span>
              )}
              {tail}
            </motion.h1>

            {w.heroSubhead && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="text-[16px] md:text-[18px] text-white/65 leading-[1.7] mb-7"
              >
                {w.heroSubhead}
              </motion.p>
            )}

            {facts.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap justify-center md:justify-start items-center gap-x-3 gap-y-1.5 mb-8 text-[14px] text-white/50"
              >
                {facts.map((f, i) => (
                  // Separator trails its item rather than leading the next one,
                  // so a wrap never starts a line with a divider. Hidden on
                  // mobile, where the list wraps onto several lines anyway.
                  <li key={f} className="flex items-center gap-3">
                    <span>{f}</span>
                    {i < facts.length - 1 && (
                      <span aria-hidden="true" className="hidden sm:inline text-white/20">
                        /
                      </span>
                    )}
                  </li>
                ))}
              </motion.ul>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
            >
              <TrackedCta cta={view.primaryCta} fitCallIcon={view.primaryCta.kind === "fit-call"} />
              {view.showPreviews && (
                <GhostButtonInline href="#previews">See a free preview</GhostButtonInline>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-6 space-y-1"
            >
              {view.seatLine && (
                <p className="text-[13px] text-white/40">
                  {view.seatLine}
                  {view.seatAsOf ? ` (as of ${view.seatAsOf})` : ""}
                </p>
              )}
              {w.heroFinePrint && <p className="text-[13px] text-white/35">{w.heroFinePrint}</p>}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center md:justify-end"
          >
            {items.length > 0 ? <TruthInventoryPanel items={items} /> : <SessionFactsPanel w={w} />}
          </motion.div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #061126)" }}
      />
    </section>
  );
}
