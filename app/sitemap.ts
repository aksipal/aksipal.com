import type { MetadataRoute } from "next";

import { cases } from "@/lib/cases";
import { siteConfig } from "@/lib/constants";
import { locales } from "@/lib/i18n";
import { getAllPostSlugs } from "@/lib/mdx";
import { templates } from "@/lib/templates";

const staticRoutes: { path: string; freq: "weekly" | "monthly"; priority: number }[] = [
  { path: "", freq: "weekly", priority: 1.0 },
  { path: "/templates", freq: "weekly", priority: 0.9 },
  { path: "/hizmetler", freq: "weekly", priority: 0.9 },
  { path: "/isler", freq: "weekly", priority: 0.9 },
  { path: "/blog", freq: "weekly", priority: 0.8 },
  { path: "/hakkimda", freq: "monthly", priority: 0.7 },
  { path: "/iletisim", freq: "monthly", priority: 0.8 },
  { path: "/gizlilik-politikasi", freq: "monthly", priority: 0.3 },
  { path: "/kvkk-aydinlatma", freq: "monthly", priority: 0.3 },
  { path: "/cerez-politikasi", freq: "monthly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostSlugs();
  const now = new Date();

  const basePages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticRoutes.map((route): MetadataRoute.Sitemap[number] => ({
      url: `${siteConfig.url}/${locale}${route.path}`,
      lastModified: now,
      changeFrequency: route.freq,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteConfig.url}/${l}${route.path}`]),
        ),
      },
    })),
  );

  const casePages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    cases.map((item): MetadataRoute.Sitemap[number] => ({
      url: `${siteConfig.url}/${locale}/isler/${item.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteConfig.url}/${l}/isler/${item.slug}`]),
        ),
      },
    })),
  );

  const templatePages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    templates.map((tpl): MetadataRoute.Sitemap[number] => ({
      url: `${siteConfig.url}/${locale}/templates/${tpl.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteConfig.url}/${l}/templates/${tpl.slug}`]),
        ),
      },
    })),
  );

  const blogPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    posts.map((slug): MetadataRoute.Sitemap[number] => ({
      url: `${siteConfig.url}/${locale}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteConfig.url}/${l}/blog/${slug}`]),
        ),
      },
    })),
  );

  return [...basePages, ...casePages, ...templatePages, ...blogPages];
}
