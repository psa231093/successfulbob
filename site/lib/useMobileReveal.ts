"use client";

import { useState } from "react";

/* Backs the "show N, tap for more" pattern used for the agenda and the
   "who it's not for" list on mobile. All items stay in the DOM at all times,
   including before expansion, so nothing is hidden from search engines or
   from anyone without JavaScript, only hidden visually below the md
   breakpoint via CSS.

   Exposed as isMobileHidden(index) rather than a filtered array, because the
   agenda's connecting line between items needs to know not just "is this item
   hidden" but "does this item's line lead into a hidden item", which a
   filtered list can't express. */
export function useMobileReveal(total: number, initialVisible: number) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = total > initialVisible;
  const isMobileHidden = (index: number) => !expanded && index >= initialVisible;
  return {
    expanded,
    hasMore,
    isMobileHidden,
    toggle: () => setExpanded((e) => !e),
    remaining: Math.max(0, total - initialVisible),
  };
}
