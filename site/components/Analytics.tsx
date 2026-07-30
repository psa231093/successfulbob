"use client";

import Script from "next/script";
import { useConsent } from "@/components/ConsentProvider";

/* The two tracking tags, and the consent posture around them.

   GA4 loads immediately but with Consent Mode v2 defaults set to denied, so it
   sends cookieless pings and sets no _ga cookie until someone accepts. That
   still measures the four events in modelled form for the majority who never
   touch the banner.

   The LinkedIn Insight Tag has no consent-mode equivalent, so the only correct
   gate is not mounting it at all until the visitor accepts.

   Ordering matters: the defaults have to be defined before gtag.js loads, or
   the library ignores them. beforeInteractive guarantees that. */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const LINKEDIN_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;

export default function Analytics() {
  const { choice, ready } = useConsent();

  return (
    <>
      {GA_ID && (
        <>
          <Script id="consent-defaults" strategy="beforeInteractive">
            {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
gtag('consent','default',{
  ad_storage:'denied',
  ad_user_data:'denied',
  ad_personalization:'denied',
  analytics_storage:'denied',
  functionality_storage:'granted',
  security_storage:'granted',
  wait_for_update:500
});
gtag('js', new Date());`}
          </Script>

          <Script
            id="ga-lib"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />

          <Script id="ga-config" strategy="afterInteractive">
            {`gtag('config','${GA_ID}');`}
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
