import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ContactCta } from "@/components/sections/contact-cta";
import { TemplateGallery } from "@/components/templates/template-gallery";
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
    pathname: "/templates",
    title:
      locale === "tr"
        ? "Hazır Web Sitesi Şablonları — Sektöre Özel | Aksipal"
        : "Industry Website Templates | Aksipal",
    description:
      locale === "tr"
        ? "Berber, kuaför, klinik, lojistik, oto yıkama, danışmanlık ve daha fazlası için hazır web sitesi şablonları. 2-5 günde yayın, sözleşmeli teslim, KVKK uyumlu."
        : "Industry website templates — barber, salon, clinic, logistics, car wash, consultancy and more. Live in 2-5 days, contracted delivery, KVKK aware.",
    keywords:
      locale === "tr"
        ? [
            ...seoKeywordsTr,
            "hazır web sitesi",
            "berber web sitesi",
            "kuaför web sitesi",
            "klinik web sitesi",
            "restoran web sitesi",
          ]
        : undefined,
  });
}

export default async function TemplatesPage({
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
    { name: locale === "tr" ? "Şablonlar" : "Templates", url: absoluteUrl(`/${locale}/templates`) },
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
              {locale === "tr" ? "Şablonlar" : "Templates"}
            </li>
          </ol>
        </nav>
        <div className="mb-8 max-w-2xl space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {locale === "tr"
              ? "Hazır Web Sitesi Şablonları — Sektöre Özel"
              : "Website Templates by Industry"}
          </h1>
          <p className="text-zinc-400">
            {locale === "tr"
              ? "Web sitesi yaptırmak isteyen KOBİ'ler için sektöre özel hazır paketler: berber & kuaför, klinik, lojistik & taşımacılık, oto yıkama, danışmanlık, enerji, inşaat, spor salonu, butik, startup. 2-5 günde yayın, sözleşmeli teslim, sabit fiyat. Sektörünüzü filtreleyin, demoları inceleyin, hızlı teklif alın."
              : "Industry-specific templates for SMBs: barber & salon, clinic, logistics & transport, car wash, consultancy, energy, construction, gym, boutique, startup. Live in 2-5 days, contracted delivery, fixed price. Filter by sector, browse demos, get a quick quote."}
          </p>
        </div>
        <Suspense fallback={null}>
          <TemplateGallery locale={locale} />
        </Suspense>
      </section>
      <ContactCta locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
