import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContactCta } from "@/components/sections/contact-cta";
import { CaseGrid } from "@/components/sections/case-grid";
import { seoKeywordsTr } from "@/lib/constants";
import { isLocale, withLocale } from "@/lib/i18n";
import { absoluteUrl, createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

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
    title:
      locale === "tr"
        ? "Referans Projeler | Aksipal Web Studio"
        : "Case Studies | Aksipal Web Studio",
    description:
      locale === "tr"
        ? "Aksipal Web Studio referans projeleri: yapay zeka ajanları, WhatsApp ve süreç otomasyonu, kurumsal web siteleri. Problem, çözüm, kullanılan teknoloji ve ölçülebilir metriklerle."
        : "Aksipal Web Studio case studies: AI agents, WhatsApp & workflow automation and corporate websites. Problem, solution, stack and measurable outcomes.",
    keywords:
      locale === "tr"
        ? [
            ...seoKeywordsTr,
            "kurumsal web sitesi referans",
            "web sitesi yaptırma örnekleri",
            "portfolio Ankara",
          ]
        : undefined,
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

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: locale === "tr" ? "Ana Sayfa" : "Home", url: absoluteUrl(`/${locale}`) },
    { name: locale === "tr" ? "Referans Projeler" : "Case Studies", url: absoluteUrl(`/${locale}/isler`) },
  ]);

  return (
    <>
      <section className="section-shell pt-16">
        <nav aria-label="Breadcrumb" className="mb-3 text-sm text-zinc-500">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href={withLocale(locale, "/")} className="hover:text-zinc-300">
                {locale === "tr" ? "Ana Sayfa" : "Home"}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-zinc-300">
              {locale === "tr" ? "Referans Projeler" : "Case Studies"}
            </li>
          </ol>
        </nav>
        <div className="max-w-2xl space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {locale === "tr"
              ? "Referans Projeler — Yapay Zeka, Otomasyon ve Web"
              : "Case Studies — AI, Automation and Web"}
          </h1>
          <p className="text-zinc-400">
            {locale === "tr"
              ? "Sahadan gerçek referanslar: yapay zeka ajanları, WhatsApp ve süreç otomasyonu kurulumları ve sektörel kurumsal web siteleri. Her vakada problem, çözüm, kullanılan teknoloji ve ölçülebilir sonuçlar yer alır. Müşteri kimliği gizli olan vakalar yazılı izinli olarak yayınlanmıştır; ek doğrulama için referans görüşmesi talep edebilirsiniz."
              : "Real-world references: AI agents, WhatsApp & workflow automation deployments, and sector-specific corporate websites. Every case lists problem, solution, stack and measurable outcomes. Confidential clients are published with written consent — reference calls available on request."}
          </p>
        </div>
      </section>
      <CaseGrid locale={locale} />
      <ContactCta locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
