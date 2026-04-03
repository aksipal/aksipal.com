import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
    title: locale === "tr" ? "Hizmetler | Web Sitesi Paketleri ve Özel Yazılım" : "Services | Website Packages & Custom Software",
    description:
      locale === "tr"
        ? "Web sitesi satın al ve paket seç: sektöre özel hazır şablonlar, kurumsal web sitesi geliştirme ve özel yazılım. SEO uyumlu teslim."
        : "Template packages, corporate web development and custom software—SEO-ready delivery for businesses.",
    keywords: locale === "tr" ? [...seoKeywordsTr, "web sitesi paketi", "özel yazılım"] : undefined,
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

  return (
    <>
      <PricingSection locale={locale} />

      {/* Daha Büyük İşler */}
      <section className="section-shell mt-20">
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            {locale === "tr" ? "Daha Büyük İşler" : "Enterprise Projects"}
          </h2>
          <p className="max-w-2xl text-zinc-400">
            {locale === "tr"
              ? "Web sitesi yaptırma kapsamının ötesinde: e-ticaret, kurumsal uygulama ve özel mühendislik projelerinde uçtan uca geliştirme ve anahtar teslim."
              : "Beyond standard websites: end-to-end e-commerce, enterprise applications and custom engineering—turnkey delivery."}
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
