import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Bot, ExternalLink, Lock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cases } from "@/lib/cases";
import { siteConfig } from "@/lib/constants";
import { isLocale, locales, withLocale } from "@/lib/i18n";
import { absoluteUrl, createPageMetadata, getBreadcrumbJsonLd, getCaseStudyJsonLd } from "@/lib/seo";

type PageParams = {
  locale: string;
  slug: string;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    cases.map((item) => ({
      locale,
      slug: item.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  const found = cases.find((item) => item.slug === slug);
  if (!found) {
    return {};
  }

  return createPageMetadata({
    locale,
    pathname: `/isler/${slug}`,
    title: `${found.title} | Aksipal Web Studio`,
    description: found.summary,
    image: found.image,
    keywords: found.seoKeywords,
  });
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const found = cases.find((item) => item.slug === slug);
  if (!found) {
    notFound();
  }

  const caseStudyJsonLd = getCaseStudyJsonLd({
    title: found.title,
    description: found.summary,
    pathname: `/isler/${slug}`,
    locale,
    image: found.image,
  });

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: locale === "tr" ? "Ana Sayfa" : "Home", url: absoluteUrl(`/${locale}`) },
    { name: locale === "tr" ? "Referans Projeler" : "Case Studies", url: absoluteUrl(`/${locale}/isler`) },
    { name: found.title, url: absoluteUrl(`/${locale}/isler/${slug}`) },
  ]);

  return (
    <section className="section-shell pt-16">
      <nav aria-label="Breadcrumb" className="mb-2 text-sm text-zinc-500">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href={withLocale(locale, "/")} className="hover:text-zinc-300">
              {locale === "tr" ? "Ana Sayfa" : "Home"}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href={withLocale(locale, "/isler")} className="hover:text-zinc-300">
              {locale === "tr" ? "Referans Projeler" : "Case Studies"}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-zinc-300">{found.title}</li>
        </ol>
      </nav>

      <article className="glass-card mt-6 overflow-hidden">
        {found.image ? (
          <Image
            src={found.image}
            alt={`${found.title} — ${found.sector} referans projesi | Aksipal Web Studio`}
            width={1200}
            height={700}
            className="h-64 w-full object-cover sm:h-80"
          />
        ) : (
          <div className="relative flex h-64 w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_25%_25%,rgba(124,255,146,0.18),transparent_55%),radial-gradient(circle_at_75%_75%,rgba(132,100,255,0.22),transparent_55%),linear-gradient(180deg,#0a0a14_0%,#101019_100%)] sm:h-80">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:28px_28px]" aria-hidden />
            <div className="relative flex flex-col items-center gap-3 text-center">
              <Bot className="size-12 text-[var(--accent)]" aria-hidden />
              <p className="text-xl font-semibold tracking-tight text-[#E9DFFF]">
                {found.visualTag ?? found.sector}
              </p>
              {found.confidential ? (
                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-zinc-400">
                  <Lock className="size-3.5" aria-hidden />
                  {locale === "tr"
                    ? "Müşteri gizli — yazılı izin gerekiyor"
                    : "Confidential client — written consent required"}
                </span>
              ) : null}
            </div>
          </div>
        )}
        <div className="space-y-8 p-6 sm:p-8">
          <header className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <Badge>{found.sector}</Badge>
              {found.demoUrl ? (
                <Button asChild variant="outline" size="sm">
                  <a
                    href={found.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5"
                  >
                    <ExternalLink className="size-3.5" />
                    {locale === "tr" ? "Canlı Demo" : "View Demo"}
                  </a>
                </Button>
              ) : null}
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white">{found.title}</h1>
            <p className="max-w-2xl text-zinc-400">{found.summary}</p>
          </header>

          <div className="grid gap-6 lg:grid-cols-2">
            <section>
              <h2 className="text-xl font-semibold text-zinc-100">
                {locale === "tr" ? "Problem" : "Problem"}
              </h2>
              <p className="mt-3 leading-7 text-zinc-300">{found.problem}</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-zinc-100">
                {locale === "tr" ? "Çözüm" : "Solution"}
              </h2>
              <p className="mt-3 leading-7 text-zinc-300">{found.solution}</p>
            </section>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <section>
              <h3 className="text-lg font-semibold text-zinc-100">Stack</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {found.stack.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-zinc-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h3 className="text-lg font-semibold text-zinc-100">
                {locale === "tr" ? "Metrikler" : "Metrics"}
              </h3>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {found.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-[10px] uppercase tracking-[0.08em] text-zinc-500">
                      {metric.label}
                    </p>
                    <p className="text-sm font-semibold text-zinc-100">{metric.value}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </section>
  );
}
