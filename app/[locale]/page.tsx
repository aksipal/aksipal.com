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
      title: "Web Sitesi Yaptırma | Kurumsal Web Tasarım",
      description: siteConfig.description,
      keywords: [...seoKeywordsTr],
    },
    en: {
      title: "Corporate Websites & Web Design Services",
      description:
        "Corporate websites, business templates and custom software: SEO-ready, fast delivery. Built with Next.js for teams that need a strong online presence in Turkey and abroad.",
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

  return (
    <>
      <HeroSection locale={locale as Locale} />
      <TrustBar locale={locale as Locale} />
      <TemplatePreview locale={locale as Locale} />
      <CaseGrid locale={locale as Locale} limit={8} />
      <AdvancedServicesTeaser locale={locale as Locale} />
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
    </>
  );
}
