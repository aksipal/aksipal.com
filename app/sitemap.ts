import type { MetadataRoute } from "next";

import { cases } from "@/lib/cases";
import { siteConfig } from "@/lib/constants";
import { defaultLocale, locales } from "@/lib/i18n";
import { getAllPostSlugs } from "@/lib/mdx";
import { templates } from "@/lib/templates";

const staticRoutes: { path: string; freq: "weekly" | "monthly" | "yearly"; priority: number }[] = [
  { path: "", freq: "weekly", priority: 1.0 },
  { path: "/templates", freq: "weekly", priority: 0.9 },
  { path: "/hizmetler", freq: "weekly", priority: 0.9 },
  { path: "/isler", freq: "weekly", priority: 0.9 },
  { path: "/iletisim", freq: "monthly", priority: 0.85 },
  { path: "/blog", freq: "weekly", priority: 0.8 },
  { path: "/hakkimda", freq: "monthly", priority: 0.7 },
  { path: "/gizlilik-politikasi", freq: "yearly", priority: 0.3 },
  { path: "/kvkk-aydinlatma", freq: "yearly", priority: 0.3 },
  { path: "/cerez-politikasi", freq: "yearly", priority: 0.3 },
];

function languagesFor(path: string): Record<string, string> {
  const langs: Record<string, string> = {};
  for (const l of locales) {
    langs[l] = `${siteConfig.url}/${l}${path}`;
  }
  langs["x-default"] = `${siteConfig.url}/${defaultLocale}${path}`;
  return langs;
}

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
        languages: languagesFor(route.path),
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
        languages: languagesFor(`/isler/${item.slug}`),
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
        languages: languagesFor(`/templates/${tpl.slug}`),
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
        languages: languagesFor(`/blog/${slug}`),
      },
    })),
  );

  return [...basePages, ...casePages, ...templatePages, ...blogPages];
}
