import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactCta } from "@/components/sections/contact-cta";
import { TemplateGallery } from "@/components/templates/template-gallery";
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
    pathname: "/templates",
    title: locale === "tr" ? "Hazır Web Sitesi Şablonları | Sektöre Özel" : "Website Templates by Industry",
    description:
      locale === "tr"
        ? "Hazır web sitesi şablonları: berber, kuaför, lojistik, sağlık, enerji ve daha fazlası. Web sitesi satın al veya şablon seç; hızlı teslim, SEO uyumlu."
        : "Industry website templates—fast, SEO-ready delivery. Choose a sector package or request customization.",
    keywords: locale === "tr" ? [...seoKeywordsTr, "şablon", "hazır site"] : undefined,
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

  return (
    <>
      <section className="section-shell pt-16">
        <div className="mb-8 max-w-2xl space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {locale === "tr"
              ? "Hazır Web Sitesi Şablonları — Sektöre Özel"
              : "Website Templates by Industry"}
          </h1>
          <p className="text-zinc-400">
            {locale === "tr"
              ? "Web sitesi satın almak veya web sitesi yaptırmak isteyen işletmeler için sektöre özel hazır şablonlar. Berber, kuaför, lojistik, sağlık, enerji ve daha fazlası — hızlı teslim, SEO uyumlu."
              : "Industry-specific website templates for businesses. Filter by sector, choose your package and get a quick quote."}
          </p>
        </div>
        <TemplateGallery locale={locale} />
      </section>
      <ContactCta locale={locale} />
    </>
  );
}
