import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { ContactCta } from "@/components/sections/contact-cta";
import { FaqSection } from "@/components/sections/faq";
import { PricingSection } from "@/components/sections/pricing";
import { seoKeywordsTr } from "@/lib/constants";
import { isLocale } from "@/lib/i18n";
import {
  getEnterpriseServices,
  getProcessSteps,
  getRevisionPolicy,
} from "@/lib/pricing";
import { getServices } from "@/lib/services";
import { withLocale } from "@/lib/i18n";
import { absoluteUrl, createPageMetadata, getBreadcrumbJsonLd, getServiceJsonLd } from "@/lib/seo";

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
    pathname: "/hizmetler",
    title:
      locale === "tr"
        ? "Hizmetler ve Fiyatlar | Aksipal Web Studio"
        : "Services & Pricing | Aksipal Web Studio",
    description:
      locale === "tr"
        ? "Kurumsal web sitesi paketleri 20.000 TL'den başlar (+KDV); e-ticaret, yapay zeka, otomasyon ve özel yazılım kapsama göre yazılı teklifle. Sabit fiyat, yazılı sözleşme."
        : "Corporate website packages from ₺20,000 (+VAT); e-commerce, AI, automation and custom software quoted per scope. Fixed price, written contract.",
    keywords:
      locale === "tr"
        ? [
            ...seoKeywordsTr,
            "yapay zeka ajanı fiyat",
            "n8n otomasyon fiyat",
            "web sitesi paketi fiyat",
            "özel yazılım Ankara fiyat",
          ]
        : undefined,
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const jsonLd = getServiceJsonLd();
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: locale === "tr" ? "Ana Sayfa" : "Home", url: absoluteUrl(`/${locale}`) },
    { name: locale === "tr" ? "Hizmetler & Fiyatlar" : "Services & Pricing", url: absoluteUrl(`/${locale}/hizmetler`) },
  ]);
  const enterprise = getEnterpriseServices(locale);
  const steps = getProcessSteps(locale);
  const policy = getRevisionPolicy(locale);
  const services = getServices(locale);

  return (
    <>
      {/* Ana hizmet alanları — ayrıntılı sayfalara giriş */}
      <section className="section-shell pt-16">
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            {locale === "tr" ? "Hizmet Alanlarımız" : "Our Service Areas"}
          </h2>
          <p className="max-w-2xl text-zinc-400">
            {locale === "tr"
              ? "Üç ana hizmet alanımız: kurumsal web sitesi, e-ticaret altyapısı ve kişiye özel yazılım. Her birinin kapsam, süreç, fiyat ve referanslarını kendi sayfasında ayrıntılı anlattık. Yapay zeka ve otomasyon, bu projelere entegre katman olarak eklenir."
              : "Our three core service areas: corporate websites, e-commerce platforms and custom software. Each has its own page with scope, process, pricing and references. AI and automation are added as an integrated layer on these projects."}
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {services.map((svc) => (
            <Link
              key={svc.slug}
              href={withLocale(locale, `/hizmetler/${svc.slug}`)}
              className="glass-card group flex flex-col justify-between p-6 transition-colors hover:border-white/20"
            >
              <div>
                <h2 className="text-xl font-semibold text-zinc-100 group-hover:text-[var(--accent)]">
                  {svc.name}
                </h2>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{svc.metaDescription}</p>
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)]">
                {locale === "tr" ? "Ayrıntılar, fiyat ve referanslar" : "Details, pricing and references"}
                <ArrowRight className="size-4" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <PricingSection locale={locale} />
      <p className="section-shell mt-6 text-sm text-zinc-500">
        {locale === "tr" ? "Hızlı yayın için sektöre göre hazırlanmış paketler: " : "Sector-ready packages for a fast launch: "}
        <Link href={withLocale(locale, "/templates")} className="text-[var(--accent)] hover:brightness-110">
          {locale === "tr" ? "Sektörel Web Çözümleri" : "Sector Web Solutions"}
        </Link>
      </p>

      {/* Daha Büyük İşler */}
      <section className="section-shell mt-20">
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            {locale === "tr" ? "Yapay Zeka, Otomasyon ve Özel Yazılım" : "AI, Automation & Custom Software"}
          </h2>
          <p className="max-w-2xl text-zinc-400">
            {locale === "tr"
              ? "Web sitesinin yetmediği noktada devreye giren projeler: yapay zeka ajanı, WhatsApp ve süreç otomasyonu, e-ticaret, kurumsal uygulama ve özel mühendislik. Sprint bazlı, ölçülebilir teslim."
              : "Projects where a website isn't enough: AI agents, WhatsApp & workflow automation, e-commerce, enterprise apps and custom engineering. Sprint-based, measurable delivery."}
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {enterprise.map((service) => (
            <article
              key={service.id}
              className="glass-card flex flex-col justify-between p-6"
            >
              <div>
                <h3 className="text-xl font-semibold text-zinc-100">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {service.description}
                </p>
                <ul className="mt-4 space-y-1.5 text-sm text-zinc-300">
                  {service.highlights.map((h) => (
                    <li key={h}>• {h}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="text-2xl font-semibold text-[var(--accent)]">
                  {service.price}
                </p>
                {service.priceNote ? (
                  <p className="mt-1 text-xs text-zinc-500">
                    {service.priceNote}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Süreç + Revizyon */}
      <section className="section-shell mt-20">
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="glass-card p-6">
            <h3 className="text-xl font-semibold text-zinc-100">
              {locale === "tr" ? "Süreç" : "Process"}
            </h3>
            <ol className="mt-4 space-y-2 text-sm text-zinc-300">
              {steps.map((step, idx) => (
                <li key={step}>
                  <span className="mr-2 text-zinc-500">0{idx + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </article>
          <article className="glass-card p-6">
            <h3 className="text-xl font-semibold text-zinc-100">
              {locale === "tr" ? "Revizyon Politikası" : "Revision Policy"}
            </h3>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              {policy.template}
            </p>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              {policy.custom}
            </p>
          </article>
        </div>
      </section>

      <FaqSection locale={locale} />
      <ContactCta locale={locale} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
