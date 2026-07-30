import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/* Content Security Policy.

   Registration and payment need no exceptions here: visitors leave via a normal
   link, so no directive governs it. Only add hosts below if something is ever
   embedded or fetched from this origin.

   Note that 'unsafe-inline' is already present on script-src, so this header
   was never providing meaningful XSS protection. The host allowlist is still
   worth keeping tight, but nobody should assume it is doing more than it is. */
const csp = [
  "default-src 'self'",
  // googletagmanager serves gtag.js even for a plain GA4 id; snap.licdn is the
  // LinkedIn Insight loader. YouTube needs no script entry: the player runs
  // inside the iframe under YouTube's own policy, not ours.
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://snap.licdn.com${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  // Analytics and LinkedIn pixel fallbacks. No YouTube host: video posters come
  // from the CMS, so the thumbnail service is never contacted.
  // doubleclick + google.com/ccm are the conversion-linking endpoints GA4 uses
  // once ad consent is GRANTED — without them the exact visitors who accepted
  // cookies are the ones whose attribution pings get blocked.
  "img-src 'self' data: https://cdn.sanity.io https://www.googletagmanager.com https://www.google-analytics.com https://stats.g.doubleclick.net https://www.google.com https://px.ads.linkedin.com https://px4.ads.linkedin.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.sanity.io https://*.apicdn.sanity.io https://formspree.io https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://stats.g.doubleclick.net https://www.google.com https://px.ads.linkedin.com",
  // 'self' restored: a directive that is present does not fall back to
  // default-src, so its absence was silently blocking same-origin iframes.
  // Both YouTube hosts are listed because nocookie redirects to the main domain
  // for some videos, and the failure mode is a blank box.
  "frame-src 'self' https://calendar.google.com https://www.youtube-nocookie.com https://www.youtube.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        // The pre-relaunch site had its articles under /blog; Google still
        // indexes those URLs. Send them to the Insights section for good.
        source: "/blog/:path*",
        destination: "/insights",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
