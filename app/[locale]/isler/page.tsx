import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContactCta } from "@/components/sections/contact-cta";
import { CaseGrid } from "@/components/sections/case-grid";
import { seoKeywordsTr } from "@/lib/constants";
import { isLocale, withLocale } from "@/lib/i18n";
import { cases } from "@/lib/cases";
import { absoluteUrl, createPageMetadata, getBreadcrumbJsonLd, getItemListJsonLd } from "@/lib/seo";

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
        ? "Türkiye genelinde firmalar için yayına aldığımız kurumsal web siteleri ve e-ticaret projeleri — canlı site bağlantılarıyla. Her projede ihtiyaç, çözüm ve kullanılan teknoloji."
        : "Corporate websites and e-commerce projects we shipped for companies across Turkey — with live site links. Need, solution and stack for every project.",
    keywords:
      locale === "tr"
        ? [
            ...seoKeywordsTr,
            "kurumsal web sitesi referans",
            "web sitesi yaptırma örnekleri",
            "e-ticaret sitesi örnekleri",
            "web yazılım firması referansları",
            "kurumsal web tasarım portföy",
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

  const itemListJsonLd = getItemListJsonLd({
    name: locale === "tr" ? "Aksipal Web Studio referans projeleri" : "Aksipal Web Studio case studies",
    locale,
    items: cases
      .filter((c) => c.kind === "client")
      .map((c) => ({ name: c.title, url: absoluteUrl(`/${locale}/isler/${c.slug}`) })),
  });

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
              ? "Referans Projeler — Kurumsal Web, E-Ticaret ve Yazılım"
              : "Case Studies — Corporate Web, E-Commerce and Software"}
          </h1>
          <p className="text-zinc-400">
            {locale === "tr"
              ? "Türkiye genelinde firmalar için yayına aldığımız gerçek projeler: kurumsal web siteleri ve e-ticaret altyapıları. Her projede ihtiyaç, çözüm ve kullanılan teknoloji yer alır; bağlantılar müşterinin canlı sitesine açılır. Yapay zeka ve otomasyon başlığı altındaki kayıtlar, kurulum yaklaşımımızı gösteren örnek senaryolardır ve ayrıca etiketlenmiştir. Dilerseniz referans görüşmesi de ayarlayabiliriz."
              : "Real projects we shipped for companies across Turkey: corporate websites and e-commerce platforms. Each entry lists the need, the solution and the stack; links open the client's live site. Entries under AI & automation are illustrative scenarios showing our build approach and are labelled accordingly. Reference calls available on request."}
          </p>
        </div>
      </section>
      <CaseGrid locale={locale} show3dSection />
      <ContactCta locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
    </>
  );
}
