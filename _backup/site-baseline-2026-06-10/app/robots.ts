import type { MetadataRoute } from "next";

const SITE_URL = "https://successfulbob.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/vault",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
