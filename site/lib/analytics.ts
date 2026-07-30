import type { TrackEvent } from "@/lib/workshop";

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
    dataLayer?: unknown[];
    _linkedin_partner_id?: string;
    _linkedin_data_partner_ids?: string[];
  }
}

/* Fires a GA4 event if analytics is present. A no-op otherwise, so nothing
   throws in preview deployments where the measurement id is unset, and a
   blocked or failed tag can never break a call to action.

   Only four events exist. Each has exactly one call site so the numbers stay
   interpretable. */
export function track(event: TrackEvent, params?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", event, params ?? {});
  } catch {
    // Measurement is never worth breaking an interaction for.
  }
}
