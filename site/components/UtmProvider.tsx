"use client";

import { createContext, useContext, useEffect, useState } from "react";

/* Captures the campaign tag from the landing URL and keeps it for the session,
   so an outbound registration link can carry it.

   Read from window.location in an effect rather than with useSearchParams: that
   hook opts the whole route out of static rendering, which would discard the
   caching this page depends on. The cost is that the tag is absent during the
   first paint, which is fine because the link renders with its plain URL and
   the effect completes long before anyone can click.

   Stored in sessionStorage so a visitor who lands on the homepage from an ad
   and then navigates to the workshop still carries the tag. */

const UtmContext = createContext<string | null>(null);

const STORAGE_KEY = "sb_utm_source";
// Anything outside this is discarded rather than forwarded to a third party.
const SAFE_VALUE = /^[A-Za-z0-9_.-]{1,64}$/;

export function UtmProvider({ children }: { children: React.ReactNode }) {
  const [utmSource, setUtmSource] = useState<string | null>(null);

  useEffect(() => {
    let incoming: string | null = null;
    try {
      incoming = new URLSearchParams(window.location.search).get("utm_source");
    } catch {
      incoming = null;
    }

    const clean = incoming && SAFE_VALUE.test(incoming) ? incoming : null;

    try {
      if (clean) {
        sessionStorage.setItem(STORAGE_KEY, clean);
        setUtmSource(clean);
      } else {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        setUtmSource(stored && SAFE_VALUE.test(stored) ? stored : null);
      }
    } catch {
      // Private browsing can throw on storage access; the tag is optional.
      setUtmSource(clean);
    }
  }, []);

  return <UtmContext.Provider value={utmSource}>{children}</UtmContext.Provider>;
}

export function useUtmSource(): string | null {
  return useContext(UtmContext);
}
