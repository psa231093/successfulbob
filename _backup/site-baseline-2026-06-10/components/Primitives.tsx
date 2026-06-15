"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/* -- Calendar icon (animated via .fit-call-icon) -- */

export function CalendarIcon() {
  return (
    <svg className="fit-call-icon w-[17px] h-[17px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
      <rect x="3" y="4" width="18" height="18" rx="3" ry="3" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

/* -- Gradient CTA button (primary) -- */

export function GradientButton({
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
    "relative flex items-center justify-center w-full px-7 py-3.5 rounded-lg text-[15px] font-semibold text-white overflow-hidden group";
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
  return (
    <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
      className="w-full sm:w-auto" style={{ borderRadius: 8 }}>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
      ) : (
        <Link href={href} className={cls}>{inner}</Link>
      )}
    </motion.div>
  );
}

/* -- Ghost button (for dark backgrounds) -- */

export function GhostButton({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const cls =
    "flex items-center justify-center w-full px-7 py-3.5 rounded-lg text-[15px] font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/[0.06] transition-all duration-200";
  return (
    <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
      className="w-full sm:w-auto" style={{ borderRadius: 8 }}>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
      ) : (
        <Link href={href} className={cls}>{children}</Link>
      )}
    </motion.div>
  );
}

/* -- Outline button (blue, for light backgrounds) -- */

export function OutlineButton({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const cls =
    "flex items-center justify-center w-full px-6 py-3 rounded-lg text-[14px] font-semibold text-[#3f6bff] border border-[#3f6bff]/30 hover:border-[#3f6bff]/60 hover:bg-[#3f6bff]/[0.05] transition-all duration-200";
  return (
    <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
      className="w-full" style={{ borderRadius: 8 }}>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
      ) : (
        <Link href={href} className={cls}>{children}</Link>
      )}
    </motion.div>
  );
}

/* -- Ghost outline button that hugs content on desktop (dark bg) -- */

export function GhostButtonInline({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const cls =
    "flex items-center justify-center w-full sm:w-auto px-7 py-3.5 rounded-lg text-[15px] font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/[0.06] transition-all duration-200";
  return (
    <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
      className="w-full sm:w-auto inline-block" style={{ borderRadius: 8 }}>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
      ) : (
        <Link href={href} className={cls}>{children}</Link>
      )}
    </motion.div>
  );
}

/* -- Eyebrow label -- */

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#3f6bff] mb-3">{children}</p>;
}

/* -- Gradient accent bar -- */

export function AccentBar({ className }: { className?: string }) {
  return <div className={`w-10 h-[3px] rounded-full bg-gradient-to-r from-[#3f6bff] to-[#8b5cf6] mb-5 ${className ?? ""}`} />;
}

/* -- Decorative section numeral (top-right watermark) -- */

export function Numeral({ n, dark }: { n: string; dark?: boolean }) {
  return (
    <div className="absolute top-0 right-0 text-[160px] font-bold leading-none pointer-events-none select-none"
      style={{ color: dark ? "rgba(255,255,255,0.03)" : "rgba(63,107,255,0.05)", lineHeight: 0.9 }}>
      {n}
    </div>
  );
}
