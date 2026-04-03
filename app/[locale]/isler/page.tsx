import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactCta } from "@/components/sections/contact-cta";
import { CaseGrid } from "@/components/sections/case-grid";
import { seoKeywordsTr } from "@/lib/constants";
import { isLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

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
    title: locale === "tr" ? "Referans Projeler | Kurumsal Web Sitesi Örnekleri" : "Case Studies & Client Websites",
    description:
      locale === "tr"
        ? "Türkiye’de web sitesi yaptırma örnekleri: lojistik, enerji, sağlık ve daha fazlası. Gerçek projeler, teknik stack ve sonuç odaklı metrikler."
        : "Real client websites and case studies—logistics, energy, health and more—with stack and metrics.",
    keywords: locale === "tr" ? [...seoKeywordsTr, "referans", "portfolio"] : undefined,
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

  return (
    <>
      <section className="section-shell pt-16">
        <div className="max-w-2xl space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {locale === "tr"
              ? "Referans Projeler — Kurumsal Web Sitesi Örnekleri"
              : "Case Studies — Corporate Website Examples"}
          </h1>
          <p className="text-zinc-400">
            {locale === "tr"
              ? "Web sitesi yaptırma örnekleri: lojistik, enerji, sağlık, teknoloji ve daha fazlası. Her projede problem, çözüm, teknoloji stack ve ölçülebilir sonuçlar."
              : "Real client websites with problem, solution, tech stack and measurable outcomes across logistics, energy, health and more."}
          </p>
        </div>
      </section>
      <CaseGrid locale={locale} />
      <ContactCta locale={locale} />
    </>
  );
}
