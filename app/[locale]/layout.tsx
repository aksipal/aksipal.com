import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Script from "next/script";

import { GtagConsentSync } from "@/components/analytics/gtag-consent-sync";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { BackgroundGrid } from "@/components/backgrounds/background-grid";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { MobileStickyCta } from "@/components/layout/mobile-sticky-cta";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import type { Locale } from "@/lib/i18n";
import { isLocale, locales } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  // Root <html> tek; ancak SEO için locale'e göre lang güncellenir
  return (
    <div className="relative min-h-screen pb-20 md:pb-0" lang={locale}>
      <Script id="set-html-lang" strategy="beforeInteractive">
        {`document.documentElement.lang = "${locale}";`}
      </Script>
      <BackgroundGrid />

      <div className="relative z-10">
        <SiteHeader locale={locale} />
        <main lang={locale}>{children}</main>
        <SiteFooter locale={locale} />
      </div>

      <MobileStickyCta locale={locale} />
      <CookieConsent locale={locale as Locale} />
      <GtagConsentSync />
      <GoogleAnalytics />
    </div>
  );
}
