import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactCta } from "@/components/sections/contact-cta";
import { TemplateGallery } from "@/components/templates/template-gallery";
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
    title: locale === "tr" ? "Sektörel Web Şablonları" : "Sector Website Templates",
    description:
      locale === "tr"
        ? "Emlak, taşımacılık, restoran, klinik ve oto servis sektörleri için premium, hızlı teslim edilen şablonlar."
        : "Premium templates for real estate, logistics, restaurants, clinics and auto services.",
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
            {locale === "tr" ? "Template Gallery" : "Template Gallery"}
          </h1>
          <p className="text-zinc-400">
            {locale === "tr"
              ? "Filtrelenebilir sektör bazlı şablonlar. Karttan direkt seçip ön bilgileri doldurarak hızlı teklif alabilirsiniz."
              : "Filter templates by sector and request a quick quote directly from each card."}
          </p>
        </div>
        <TemplateGallery locale={locale} />
      </section>
      <ContactCta locale={locale} />
    </>
  );
}
