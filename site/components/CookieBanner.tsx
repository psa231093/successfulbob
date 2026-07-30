"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useConsent } from "@/components/ConsentProvider";

/* Renders nothing until the stored choice has been read, because that read can
   only happen after mount. Branching on it during the first render would make
   the server and client markup disagree.

   There is deliberately no exit animation. AnimatePresence keeps the leaving
   element in the DOM until its animation completes, and it keeps rendering it
   with the props it had when it was removed, so it cannot be told to stop
   accepting clicks on the way out. An invisible fixed element then goes on
   swallowing clicks across the bottom of the viewport, which is exactly where
   the closing calls to action sit. Unmounting on click removes the whole
   problem, and a banner that disappears the instant you answer it feels better
   than one that fades. */

export default function CookieBanner() {
  const { choice, ready, accept, decline } = useConsent();

  if (!ready || choice !== null) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-5"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
    >
      <div
        className="max-w-4xl mx-auto rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
        style={{
          background: "rgba(6,17,38,0.97)",
          border: "1px solid rgba(63,107,255,0.28)",
          boxShadow: "0 20px 60px rgba(2,8,23,0.5)",
        }}
      >
        <p className="text-[14px] leading-[1.65] text-white/70 flex-1">
          We use analytics to understand how people find this site, and advertising cookies only if
          you accept. You can change this at any time.{" "}
          <Link
            href="/privacy"
            className="text-[#9db4ff] underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            Privacy policy
          </Link>
        </p>

        <div className="flex gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={decline}
            className="px-5 py-2.5 rounded-lg text-[14px] font-semibold text-white/70 border border-white/20 hover:border-white/40 hover:text-white transition-colors duration-200"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={accept}
            className="px-5 py-2.5 rounded-lg text-[14px] font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)" }}
          >
            Accept
          </button>
        </div>
      </div>
    </motion.div>
  );
}
