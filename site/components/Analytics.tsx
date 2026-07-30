"use client";

import Script from "next/script";
import { useConsent } from "@/components/ConsentProvider";

/* The two tracking tags, and the consent posture around them.

   GA4 loads immediately but with Consent Mode v2 defaults set to denied, so it
   sends cookieless pings and sets no _ga cookie until someone accepts. That
   still measures the four events in modelled form for the majority who never
   touch the banner.

   The denied defaults themselves are set by an inline script in the root
   layout, which runs during document parse. That ordering is the load-bearing
   part: a default set after gtag.js processes the queue is ignored. This
   component only loads the library and issues the config call, both of which
   run after hydration and therefore after the bootstrap.

   The LinkedIn Insight Tag has no consent-mode equivalent, so the only correct
   gate is not mounting it at all until the visitor accepts. */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const LINKEDIN_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;

export default function Analytics() {
  const { choice, ready } = useConsent();

  return (
    <>
      {GA_ID && (
        <>
          <Script
            id="ga-lib"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script id="ga-config" strategy="afterInteractive">
            {`window.gtag&&gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}

      {/* Only mounted once consent is known and granted. */}
      {LINKEDIN_ID && ready && choice === "granted" && (
        <>
          <Script id="li-setup" strategy="afterInteractive">
            {`window._linkedin_partner_id='${LINKEDIN_ID}';
window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];
window._linkedin_data_partner_ids.push('${LINKEDIN_ID}');`}
          </Script>
          <Script
            id="li-insight"
            strategy="afterInteractive"
            src="https://snap.licdn.com/li.lms-analytics/insight.min.js"
          />
        </>
      )}
    </>
  );
}
