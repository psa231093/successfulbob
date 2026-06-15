"use client";

import { MotionConfig } from "framer-motion";

/* Makes every framer-motion animation in the tree respect the user's
   OS-level "reduce motion" preference (transforms are skipped,
   opacity fades are kept). */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
