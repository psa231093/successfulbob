"use client";

const cx = 400, cy = 248;
const svgW = 800, svgH = 496;

const nodes = [
  { id: "01", title: "Technical GTM Gap Map",             desc: "Where the story breaks across buyers, demos, and field conversations.",     sx: 304, sy: 89,  px: "38%", py: "18%" },
  { id: "02", title: "Product-to-Value Messaging Matrix", desc: "Features connected to buyer pains, proof points, and business outcomes.",    sx: 496, sy: 89,  px: "62%", py: "18%" },
  { id: "03", title: "Executive Narrative System",        desc: "Company story for board members, strategic partners, and enterprise buyers.", sx: 616, sy: 248, px: "77%", py: "50%" },
  { id: "04", title: "Demo & Conversation Architecture",  desc: "Structure for demos that guide buyers toward a reason to care and act.",     sx: 496, sy: 407, px: "62%", py: "82%" },
  { id: "05", title: "Partner Enablement Strategy",       desc: "Repeatable partner story, readiness path, and enablement journey.",          sx: 304, sy: 407, px: "38%", py: "82%" },
  { id: "06", title: "Event & Speaking Readiness",        desc: "Messaging and conversation guidance for events, webinars, and briefings.",    sx: 184, sy: 248, px: "23%", py: "50%" },
];

export default function ProductionReadyCreatesVisual() {
  return (
    <div className="w-full rounded-2xl overflow-hidden" style={{ background: "#08112b" }}>
      {/* Mobile: numbered list */}
      <div className="md:hidden px-6 pt-7 pb-6">
        <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/30 mb-5">What it creates</p>
        <div className="space-y-4">
          {nodes.map((n) => (
            <div key={n.id} className="flex items-start gap-3">
              <span
                className="text-[11px] font-bold tabular-nums flex-shrink-0 mt-0.5"
                style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                {n.id}
              </span>
              <div>
                <p className="text-white text-[13px] font-semibold leading-snug">{n.title}</p>
                <p className="text-white/45 text-[11px] leading-relaxed mt-0.5">{n.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 pt-4 text-[12px] italic text-white/30 border-t border-white/[0.08]">
          This isn&apos;t a list of deliverables. It&apos;s a connected system.
        </p>
      </div>

      {/* Desktop: radial hub-and-spoke */}
      <div className="hidden md:block relative w-full" style={{ paddingBottom: `${(svgH / svgW) * 100}%` }}>
        {/* Dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* SVG: glows, lines, center circle */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 ${svgW} ${svgH}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="pr-center-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3f6bff" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#3f6bff" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="pr-ring" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3f6bff" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>

          {/* Ambient glow at center */}
          <circle cx={cx} cy={cy} r="160" fill="url(#pr-center-glow)" />

          {/* Connector lines */}
          {nodes.map((n) => (
            <line
              key={n.id}
              x1={cx} y1={cy}
              x2={n.sx} y2={n.sy}
              stroke="rgba(63,107,255,0.28)"
              strokeWidth="1.2"
              strokeDasharray="5 5"
            />
          ))}

          {/* Center outer gradient ring */}
          <circle cx={cx} cy={cy} r="72" fill="none" stroke="url(#pr-ring)" strokeWidth="1.5" opacity="0.6" />
          {/* Center fill */}
          <circle cx={cx} cy={cy} r="70" fill="#0c1640" />

          {/* Node halos */}
          {nodes.map((n) => (
            <circle key={n.id} cx={n.sx} cy={n.sy} r="22" fill="rgba(63,107,255,0.08)" stroke="rgba(63,107,255,0.3)" strokeWidth="1" />
          ))}
        </svg>

        {/* Center label */}
        <div
          className="absolute flex flex-col items-center justify-center text-center"
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 10 }}
        >
          <p className="text-[9px] font-bold tracking-[0.22em] uppercase text-white/35 leading-none mb-1.5">Production</p>
          <p
            className="text-[16px] font-black tracking-tight leading-none"
            style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            READY
          </p>
        </div>

        {/* Node labels — positioned at same % as SVG coords */}
        {nodes.map((n) => {
          const isLeft = n.sx < cx;
          const isRight = n.sx > cx;
          const isTop = n.sy < cy;

          return (
            <div
              key={n.id}
              className="absolute"
              style={{
                left: n.px,
                top: n.py,
                transform: "translate(-50%, -50%)",
                zIndex: 10,
                width: 148,
              }}
            >
              <div
                className="rounded-xl p-3 text-center"
                style={{
                  background: "rgba(13,26,66,0.95)",
                  border: "1px solid rgba(63,107,255,0.25)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <p
                  className="text-[10px] font-bold mb-1"
                  style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  {n.id}
                </p>
                <p className="text-white text-[11px] font-semibold leading-snug">{n.title}</p>
              </div>
            </div>
          );
        })}

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 text-center pb-4" style={{ zIndex: 10 }}>
          <p className="text-white/30 text-[11px] italic">
            This isn&apos;t a list of deliverables. It&apos;s a connected system.{" "}
            <span
              className="not-italic font-semibold"
              style={{ background: "linear-gradient(90deg, #3f6bff, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              Together, these six outputs create alignment, clarity, and momentum.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
