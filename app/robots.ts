import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/_next/", "/ben-kimim"]; // ben-kimim 301 ile hakkimda'ya gider

  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: ["/"],
        disallow,
      },
      {
        userAgent: "Bingbot",
        allow: ["/"],
        disallow,
      },
      {
        userAgent: "*",
        allow: ["/"],
        disallow,
      },
      // Bilinen agresif AI scraperları için (opsiyonel, yorumda)
      // İleride gerekirse buraya CCBot / GPTBot / ClaudeBot kuralları eklenebilir.
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
