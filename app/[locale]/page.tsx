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
import {
  createPageMetadata,
  getLocalBusinessJsonLd,
  getServiceJsonLd,
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
      title: "Premium Web Tasarım ve Yazılım",
      description:
        "Aksipal Web Studio ile 1 günde yayına alınan premium web siteleri, şablon paketler ve özel yazılım projeleri.",
    },
    en: {
      title: "Premium Web Design and Software",
      description:
        "Launch premium websites in 5 days with Aksipal templates or request advanced custom software.",
    },
  }[locale];

  return createPageMetadata({
    locale,
    pathname: "/",
    title: copy.title,
    description: copy.description,
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

  return (
    <>
      <HeroSection locale={locale as Locale} />
      <TrustBar locale={locale as Locale} />
      <TemplatePreview locale={locale as Locale} />
      <CaseGrid locale={locale as Locale} limit={3} />
      <AdvancedServicesTeaser locale={locale as Locale} />
      <Testimonials locale={locale as Locale} />
      <MiniInteractive locale={locale as Locale} />
      <ContactCta locale={locale as Locale} />

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
