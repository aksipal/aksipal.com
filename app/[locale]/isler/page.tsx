import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContactCta } from "@/components/sections/contact-cta";
import { CaseGrid } from "@/components/sections/case-grid";
import { seoKeywordsTr } from "@/lib/constants";
import { isLocale, withLocale } from "@/lib/i18n";
import { absoluteUrl, createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  return createPageMetadata({
    locale,
    pathname: "/isler",
    title:
      locale === "tr"
        ? "Referans Projeler — Kurumsal Web Sitesi Örnekleri | Aksipal"
        : "Case Studies & Client Websites | Aksipal",
    description:
      locale === "tr"
        ? "Aksipal referansları: lojistik, enerji, sağlık, teknoloji ve daha fazlası. Yayında olan kurumsal web siteleri, problem-çözüm-stack ve ölçülebilir metriklerle."
        : "Aksipal case studies: logistics, energy, health, tech and more. Live corporate websites with problem, solution, stack and measurable metrics.",
    keywords:
      locale === "tr"
        ? [
            ...seoKeywordsTr,
            "kurumsal web sitesi referans",
            "web sitesi yaptırma örnekleri",
            "portfolio Ankara",
          ]
        : undefined,
  });
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: locale === "tr" ? "Ana Sayfa" : "Home", url: absoluteUrl(`/${locale}`) },
    { name: locale === "tr" ? "Referans Projeler" : "Case Studies", url: absoluteUrl(`/${locale}/isler`) },
  ]);

  return (
    <>
      <section className="section-shell pt-16">
        <nav aria-label="Breadcrumb" className="mb-3 text-sm text-zinc-500">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href={withLocale(locale, "/")} className="hover:text-zinc-300">
                {locale === "tr" ? "Ana Sayfa" : "Home"}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-zinc-300">
              {locale === "tr" ? "Referans Projeler" : "Case Studies"}
            </li>
          </ol>
        </nav>
        <div className="max-w-2xl space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {locale === "tr"
              ? "Referans Projeler — Kurumsal Web Sitesi Örnekleri"
              : "Case Studies — Corporate Website Examples"}
          </h1>
          <p className="text-zinc-400">
            {locale === "tr"
              ? "Web sitesi yaptırma örnekleri: lojistik, enerji, sağlık, teknoloji, mekanik tesisat ve dernek projelerimiz. Her vakada problem, çözüm, kullanılan teknoloji stack'i ve ölçülebilir sonuçlar — tüm linkler yayında olan canlı projelere gider."
              : "Real client websites — logistics, energy, health, tech, mechanical and association projects. Every case includes problem, solution, tech stack and measurable outcomes — every link points to a live project."}
          </p>
        </div>
      </section>
      <CaseGrid locale={locale} />
      <ContactCta locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
