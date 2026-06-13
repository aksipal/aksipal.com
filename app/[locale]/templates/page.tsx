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
        ? "Sektörel Web Çözümleri — Hazır Web Siteleri | Aksipal Web Studio"
        : "Sector Web Solutions — Ready Websites | Aksipal Web Studio",
    description:
      locale === "tr"
        ? "Berber, kuaför, klinik, lojistik, oto yıkama, danışmanlık ve daha fazlası için sektöre özel hazır web sitesi şablonları. 4–7 iş gününde canlıya alım, yazılı sözleşme, KVKK uyumlu (+KDV)."
        : "Sector-specific website templates — barber, salon, clinic, logistics, car wash, consultancy and more. Live in 4–7 business days, written contract, KVKK aware (+VAT).",
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
    { name: locale === "tr" ? "Sektörel Çözümler" : "Solutions", url: absoluteUrl(`/${locale}/templates`) },
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
              {locale === "tr" ? "Sektörel Çözümler" : "Solutions"}
            </li>
          </ol>
        </nav>
        <div className="mb-8 max-w-2xl space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {locale === "tr"
              ? "Sektörel Web Çözümleri — İş Modelinize Özel"
              : "Sector Web Solutions — Built for Your Business"}
          </h1>
          <p className="text-zinc-400">
            {locale === "tr"
              ? "Hızlı yayına çıkmak isteyen KOBİ ve esnaf için iş modeline göre gruplanmış hazır web çözümleri: yerel hizmet (spor salonu, oto yıkama, danışmanlık), kurumsal & sanayi (teknoloji, enerji, inşaat, sağlık), lojistik & taşımacılık ve perakende, turizm & girişim (butik, turizm, startup). 4–7 iş gününde canlıya alım, yazılı sözleşme, sabit fiyat (+KDV). İş modelinizi seçin, canlı demoları inceleyin, ücretsiz keşif görüşmesi ayırtın."
              : "Ready web solutions for SMBs, grouped by business model: local services (gym, car wash, consultancy), corporate & industry (technology, energy, construction, health), logistics & transport and retail, travel & startup (boutique, travel, startup). Live in 4–7 business days, written contract, fixed price (+VAT). Pick your business model, browse live demos, book a free discovery call."}
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
