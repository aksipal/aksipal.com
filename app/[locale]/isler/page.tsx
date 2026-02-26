import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactCta } from "@/components/sections/contact-cta";
import { CaseGrid } from "@/components/sections/case-grid";
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
    pathname: "/isler",
    title: locale === "tr" ? "Referans İşler" : "Case Studies",
    description:
      locale === "tr"
        ? "Gerçek sektörlerden örnek web dönüşüm projeleri ve performans metrikleri."
        : "Real project examples with measurable performance and conversion metrics.",
  });
}

export default async function WorkPage({
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
        <div className="max-w-2xl space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {locale === "tr" ? "Referanslar / İşler" : "Work / References"}
          </h1>
          <p className="text-zinc-400">
            {locale === "tr"
              ? "Her vaka: problem, çözüm, teknoloji ve metrik odaklı çıktı."
              : "Each case includes the problem, solution, stack and measurable results."}
          </p>
        </div>
      </section>
      <CaseGrid locale={locale} />
      <ContactCta locale={locale} />
    </>
  );
}
