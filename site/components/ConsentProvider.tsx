"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

/* Consent state for the two tracking tags.

   Stored in localStorage rather than a cookie, so the consent mechanism itself
   does not set one. It can only be read after mount, so `ready` stays false
   during the server render and the first paint: anything that branches on the
   choice must wait for it, or the markup will not match and React will warn. */

export type ConsentChoice = "granted" | "denied";

type ConsentState = {
  choice: ConsentChoice | null;
  ready: boolean;
  accept: () => void;
  decline: () => void;
  reopen: () => void;
};

const STORAGE_KEY = "sb_consent";

const ConsentContext = createContext<ConsentState>({
  choice: null,
  ready: false,
  accept: () => {},
  decline: () => {},
  reopen: () => {},
});

function readStored(): ConsentChoice | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { choice?: string };
    return parsed.choice === "granted" || parsed.choice === "denied" ? parsed.choice : null;
  } catch {
    return null;
  }
}

function persist(choice: ConsentChoice) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: 1, choice, ts: Date.now() }));
  } catch {
    // Private browsing can refuse storage. The choice still applies for this
    // page view; it just will not be remembered.
  }
}

/* Consent Mode stops analytics cookies being used, but it does not remove ones
   already written. Someone who accepts and later declines would otherwise keep
   an identifying cookie until it expired, which is not what declining is
   understood to mean. Covers LinkedIn's first-party cookies (ln_or, li_fat_id)
   as well as Google's — LinkedIn has no consent mode, so cleanup is the only
   withdrawal mechanism it gets. */
function clearTrackingCookies() {
  if (typeof document === "undefined") return;
  const host = window.location.hostname;
  // Also try the dot-prefixed parent domain, which is where GA writes.
  const domains = [undefined, host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  document.cookie.split(";").forEach((entry) => {
    const name = entry.split("=")[0]?.trim();
    if (!name || !/^_ga|^_gid$|^_gcl|^ln_or$|^li_fat_id$/.test(name)) return;
    domains.forEach((d) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ""}`;
    });
  });
}

/* Consent Mode expects an update on the same gtag queue the defaults were set
   on. If the library has not loaded yet the call still queues, so ordering is
   safe either way. */
function updateGtagConsent(choice: ConsentChoice) {
  if (typeof window === "undefined") return;
  const granted = choice === "granted" ? "granted" : "denied";
  try {
    window.gtag?.("consent", "update", {
      ad_storage: granted,
      ad_user_data: granted,
      ad_personalization: granted,
      analytics_storage: granted,
    });
  } catch {
    // Never let a tag break the interaction.
  }
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readStored();
    setChoice(stored);
    setReady(true);
    if (stored) updateGtagConsent(stored);
  }, []);

  const accept = useCallback(() => {
    setChoice("granted");
    persist("granted");
    updateGtagConsent("granted");
  }, []);

  const decline = useCallback(() => {
    setChoice("denied");
    persist("denied");
    updateGtagConsent("denied");
    clearTrackingCookies();
    /* Withdrawing consent after the LinkedIn tag has loaded needs a reload:
       script tags are not unloaded when their component unmounts, so without
       this the tag keeps running until the next navigation — and the privacy
       page promises that declining means it is not loaded at all. The choice is
       already persisted, so the banner does not reappear. */
    if (typeof window !== "undefined" && window._linkedin_partner_id) {
      window.location.reload();
    }
  }, []);

  // Lets the footer link bring the banner back so a choice can be changed.
  const reopen = useCallback(() => {
    setChoice(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    updateGtagConsent("denied");
    // Matches what the page now says ("not made a choice yet"): no choice, no
    // identifying cookies sitting around from the earlier acceptance.
    clearTrackingCookies();
  }, []);

  return (
    <ConsentContext.Provider value={{ choice, ready, accept, decline, reopen }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  return useContext(ConsentContext);
}
