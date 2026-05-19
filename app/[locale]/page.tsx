import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AdvancedServicesTeaser } from "@/components/sections/advanced-services";
import { CaseGrid } from "@/components/sections/case-grid";
import { ContactCta } from "@/components/sections/contact-cta";
import { HeroSection } from "@/components/sections/hero";
import { MiniInteractive } from "@/components/sections/mini-interactive";
import { TemplatePreview } from "@/components/sections/template-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { TrustBar } from "@/components/sections/trust-bar";
import { isLocale, type Locale } from "@/lib/i18n";
import { seoKeywordsEn, seoKeywordsTr, siteConfig } from "@/lib/constants";
import { FaqSection } from "@/components/sections/faq";
import {
  createPageMetadata,
  getLocalBusinessJsonLd,
  getOrganizationJsonLd,
  getPersonJsonLd,
  getServiceJsonLd,
  getWebSiteJsonLd,
} from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  const copy = {
    tr: {
      title: "Aksipal Web Studio | Yapay Zeka, Otomasyon, Premium Web",
      description:
        "Yapay zeka ajanı, WhatsApp ve süreç otomasyonu ve premium kurumsal web siteleri. 4–12 iş gününde canlıda, yazılı sözleşme, KVKK uyumlu — Ankara'dan senior mühendislik.",
      keywords: [...seoKeywordsTr],
    },
    en: {
      title: "Aksipal Web Studio | AI Agents, Automation & Premium Web",
      description:
        "AI agents, WhatsApp & workflow automation and premium corporate websites. Live in 4–12 business days, contracted, KVKK aware — senior engineering from Ankara.",
      keywords: [...seoKeywordsEn],
    },
  }[locale];

  return createPageMetadata({
    locale,
    pathname: "/",
    title: copy.title,
    description: copy.description,
    keywords: copy.keywords,
  });
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const localBusinessJsonLd = getLocalBusinessJsonLd();
  const serviceJsonLd = getServiceJsonLd();
  const webSiteJsonLd = getWebSiteJsonLd();
  const organizationJsonLd = getOrganizationJsonLd();
  const personJsonLd = getPersonJsonLd();

  return (
    <>
      <HeroSection locale={locale as Locale} />
      <TrustBar locale={locale as Locale} />
      <AdvancedServicesTeaser locale={locale as Locale} />
      <CaseGrid locale={locale as Locale} limit={8} />
      <TemplatePreview locale={locale as Locale} />
      <Testimonials locale={locale as Locale} />
      <FaqSection locale={locale as Locale} />
      <MiniInteractive locale={locale as Locale} />
      <ContactCta locale={locale as Locale} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </>
  );
}
