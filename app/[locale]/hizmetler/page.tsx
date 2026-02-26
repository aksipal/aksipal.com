import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactCta } from "@/components/sections/contact-cta";
import { FaqSection } from "@/components/sections/faq";
import { PricingSection } from "@/components/sections/pricing";
import { isLocale } from "@/lib/i18n";
import {
  advancedServices,
  processSteps,
  revisionPolicy,
} from "@/lib/pricing";
import { createPageMetadata, getServiceJsonLd } from "@/lib/seo";

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
    title: locale === "tr" ? "Hizmetler ve Paketler" : "Services and Packages",
    description:
      locale === "tr"
        ? "Hızlı şablon paketleri ve e-ticaret/backend/entegrasyon gibi özel yazılım çözümleri."
        : "Fast template packages and custom solutions for e-commerce, backend and integrations.",
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

  return (
    <>
      <PricingSection locale={locale} />

      <section className="section-shell mt-20">
        <div className="glass-card p-8">
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            {locale === "tr"
              ? "B) Özel Yazılım / E-ticaret / Backend / Otomasyon"
              : "B) Custom Software / E-commerce / Backend / Automation"}
          </h2>
          <p className="mt-3 max-w-2xl text-zinc-400">
            {locale === "tr"
              ? "Kapsamı keşif ile netleştirip hedefe uygun mimari ve teslim planı oluşturuyorum. Teklif proje detayına göre hazırlanır."
              : "Scope is clarified via discovery and converted into a tailored architecture and delivery plan."}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {advancedServices.map((service) => (
              <article key={service.id} className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <h3 className="text-lg font-semibold text-zinc-100">{service.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{service.description}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-zinc-300">
                  {service.outputs.map((output) => (
                    <li key={output}>• {output}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell mt-20">
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="glass-card p-6">
            <h3 className="text-xl font-semibold text-zinc-100">
              {locale === "tr" ? "Süreç" : "Process"}
            </h3>
            <ol className="mt-4 space-y-2 text-sm text-zinc-300">
              {processSteps.map((step, idx) => (
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
            <p className="mt-4 text-sm leading-7 text-zinc-300">{revisionPolicy.template}</p>
            <p className="mt-3 text-sm leading-7 text-zinc-400">{revisionPolicy.custom}</p>
          </article>
        </div>
      </section>

      <FaqSection locale={locale} />
      <ContactCta locale={locale} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
