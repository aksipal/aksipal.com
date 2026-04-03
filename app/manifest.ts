import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  /* favicon.png 32x32; manifest'te yanlış sizes (192/512) Chrome uyarısı verir */
  return {
    name: siteConfig.legalName,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/tr",
    display: "standalone",
    background_color: "#09090d",
    theme_color: "#09090d",
    icons: [{ src: "/favicon.png", sizes: "32x32", type: "image/png", purpose: "any" }],
    lang: "tr",
    categories: ["business", "web", "design"],
  };
}
