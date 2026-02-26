import type { MetadataRoute } from "next";

import { cases } from "@/lib/cases";
import { siteConfig } from "@/lib/constants";
import { locales } from "@/lib/i18n";
import { getAllPostSlugs } from "@/lib/mdx";

const staticRoutes = [
  "",
  "/templates",
  "/hizmetler",
  "/isler",
  "/blog",
  "/ben-kimim",
  "/iletisim",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostSlugs();
  const now = new Date();

  const basePages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticRoutes.map((route): MetadataRoute.Sitemap[number] => ({
      url: `${siteConfig.url}/${locale}${route}`,
      lastModified: now,
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : 0.8,
    })),
  );

  const casePages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    cases.map((item): MetadataRoute.Sitemap[number] => ({
      url: `${siteConfig.url}/${locale}/isler/${item.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  );

  const blogPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    posts.map((slug): MetadataRoute.Sitemap[number] => ({
      url: `${siteConfig.url}/${locale}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  );

  return [...basePages, ...casePages, ...blogPages];
}
