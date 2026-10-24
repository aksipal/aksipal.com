import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";

import { LeadDialog } from "@/components/contact/lead-dialog";
import { ContactCta } from "@/components/sections/contact-cta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cases } from "@/lib/cases";
import { siteConfig } from "@/lib/constants";
import { isLocale, locales, withLocale } from "@/lib/i18n";
import { getService, getServices, isServiceSlug, serviceSlugs } from "@/lib/services";
import { absoluteUrl, createPageMetadata, getBreadcrumbJsonLd, getFaqJsonLd } from "@/lib/seo";

type PageParams = { locale: string; slug: string };

export function generateStaticParams() {
  return locales.flatMap((locale) => serviceSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isServiceSlug(slug)) return {};
  const svc = getService(locale, slug);
  return createPageMetadata({
    locale,
    pathname: `/hizmetler/${slug}`,
    title: svc.metaTitle,
    description: svc.metaDescription,
    keywords: svc.keywords,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<PageParams> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isServiceSlug(slug)) notFound();

  const svc = getService(locale, slug);
  const related = svc.caseSlugs
    .map((s) => cases.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const others = getServices(locale).filter((s) => s.slug !== slug);

  const t = {
    tr: {
      home: "Ana Sayfa",
      services: "Hizmetler",
      audience: "Kimler için uygun?",
      includes: "Neler dahil?",
      process: "Süreç",
      pricing: "Fiyatlandırma",
      stack: "Kullandığımız teknolojiler",
      references: "Bu hizmette yayında olan referanslar",
      referencesNote: "Bağlantılar müşterinin canlı sitesine açılır.",
      live: "Canlı site",
      detail: "Proje detayı",
      faq: "Sık sorulan sorular",
      other: "Diğer hizmetler",
      allPricing: "Tüm paketler ve fiyatlar",
      quick: "Hızlı teklif",
    },
    en: {
      home: "Home",
      services: "Services",
      audience: "Who is it for?",
      includes: "What's included?",
      process: "Process",
      pricing: "Pricing",
      stack: "Technologies we use",
      references: "Live references for this service",
      referencesNote: "Links open the client's live site.",
      live: "Live site",
      detail: "Case study",
      faq: "Frequently asked questions",
      other: "Other services",
      allPricing: "All packages and pricing",
      quick: "Quick quote",
    },
  }[locale];

  const pageUrl = absoluteUrl(`/${locale}/hizmetler/${slug}`);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: svc.name,
    serviceType: svc.name,
    description: svc.answer,
    url: pageUrl,
    inLanguage: locale === "tr" ? "tr-TR" : "en-US",
    areaServed: { "@type": "Country", name: "Türkiye" },
    provider: {
      "@type": "ProfessionalService",
      "@id": `${siteConfig.url}#organization`,
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
    offers: svc.pricing.items
      .filter((i) => /\d/.test(i.price))
      .map((i) => ({
        "@type": "Offer",
        name: i.name,
        description: i.detail,
        price: i.price.replace(/[^\d]/g, ""),
        priceCurrency: "TRY",
        url: pageUrl,
        availability: "https://schema.org/InStock",
      })),
  };

  const faqJsonLd = getFaqJsonLd(svc.faq.map((f) => ({ question: f.q, answer: f.a })));
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: t.home, url: absoluteUrl(`/${locale}`) },
    { name: t.services, url: absoluteUrl(`/${locale}/hizmetler`) },
    { name: svc.name, url: pageUrl },
  ]);

  return (
    <>
      <section className="section-shell pt-16">
        <nav aria-label="Breadcrumb" className="mb-3 text-sm text-zinc-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href={withLocale(locale, "/")} className="hover:text-zinc-300">
                {t.home}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href={withLocale(locale, "/hizmetler")} className="hover:text-zinc-300">
                {t.services}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-zinc-300">{svc.name}</li>
          </ol>
        </nav>

        <div className="glass-card relative overflow-hidden p-8 sm:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(124,255,146,0.14),transparent_40%),radial-gradient(circle_at_90%_20%,rgba(132,100,255,0.12),transparent_45%)]" />
          <div className="relative max-w-3xl space-y-5">
            <Badge variant="accent" className="w-fit">
              {svc.name}
            </Badge>
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              {svc.h1}
            </h1>
            {/* Doğrudan cevap paragrafı — arama motoru ve AI özetleri için */}
            <p className="text-pretty text-base leading-7 text-zinc-200 sm:text-lg">{svc.answer}</p>
            <p className="text-sm leading-7 text-zinc-400">{svc.intro}</p>
            <div className="flex flex-wrap gap-3 pt-1">
              <LeadDialog
                locale={locale}
                buttonText={svc.cta}
                buttonVariant="default"
                defaultTemplate={svc.name}
              />
              <Button asChild variant="secondary">
                <Link href={withLocale(locale, "/hizmetler")}>
                  {t.allPricing}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Kimler için */}
      <section className="section-shell mt-16">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{t.audience}</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {svc.audience.map((a) => (
            <li key={a} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-zinc-300">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[var(--accent)]" aria-hidden />
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Kapsam */}
      <section className="section-shell mt-16">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{t.includes}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {svc.includes.map((item) => (
            <article key={item.title} className="glass-card p-5">
              <h3 className="text-base font-semibold text-zinc-100">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Süreç + Fiyat */}
      <section className="section-shell mt-16">
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="glass-card p-6">
            <h2 className="text-xl font-semibold text-zinc-100">{t.process}</h2>
            <ol className="mt-4 space-y-4">
              {svc.process.map((step, i) => (
                <li key={step.title} className="flex gap-3">
                  <span className="mt-0.5 text-sm font-semibold text-[var(--accent)]">0{i + 1}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-zinc-400">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </article>
          <article className="glass-card p-6">
            <h2 className="text-xl font-semibold text-zinc-100">{t.pricing}</h2>
            <p className="mt-1 text-sm text-[var(--accent)]">{svc.pricing.headline}</p>
            <ul className="mt-4 space-y-3">
              {svc.pricing.items.map((item) => (
                <li key={item.name} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-sm font-semibold text-zinc-100">{item.name}</span>
                    <span className="text-sm font-semibold text-[var(--accent)]">{item.price}</span>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-zinc-400">{item.detail}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-5 text-zinc-500">{svc.pricing.note}</p>
            <div className="mt-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-zinc-500">{t.stack}</h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {svc.stack.map((s) => (
                  <li key={s} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </section>

      {/* Referanslar */}
      {related.length > 0 ? (
        <section className="section-shell mt-16">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{t.references}</h2>
          <p className="mt-1 text-sm text-zinc-500">{t.referencesNote}</p>
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <article key={c.slug} className="glass-card overflow-hidden">
                <Link href={withLocale(locale, `/isler/${c.slug}`)} aria-label={`${c.title} — ${t.detail}`}>
                  <Image
                    src={c.image ?? "/images/cases/ai-agent-case.png"}
                    alt={`${c.title} — ${c.sector}`}
                    width={900}
                    height={600}
                    className="h-40 w-full object-cover"
                    loading="lazy"
                  />
                </Link>
                <div className="space-y-3 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-semibold text-zinc-100">{c.title}</h3>
                    <Badge>{c.sector}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <Link href={withLocale(locale, `/isler/${c.slug}`)} className="font-medium text-[var(--accent)] hover:brightness-110">
                      {t.detail}
                    </Link>
                    {c.demoUrl ? (
                      <a
                        href={c.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-zinc-300 hover:text-white"
                      >
                        <ExternalLink className="size-3.5" aria-hidden />
                        {t.live}
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* SSS */}
      <section className="section-shell mt-16 space-y-5">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{t.faq}</h2>
        <div className="grid gap-4">
          {svc.faq.map((item) => (
            <details key={item.q} className="glass-card group p-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                <h3 className="text-base font-semibold text-zinc-100">{item.q}</h3>
                <span
                  aria-hidden
                  className="mt-1 inline-block size-5 shrink-0 rounded-full border border-white/15 text-center text-sm leading-5 text-zinc-400 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Diğer hizmetler */}
      <section className="section-shell mt-16">
        <h2 className="text-xl font-semibold text-zinc-100">{t.other}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={withLocale(locale, `/hizmetler/${o.slug}`)}
              className="glass-card flex items-center justify-between gap-3 p-5 transition-colors hover:border-white/20"
            >
              <div>
                <p className="text-base font-semibold text-zinc-100">{o.name}</p>
                <p className="mt-1 line-clamp-2 text-sm text-zinc-400">{o.metaDescription}</p>
              </div>
              <ArrowRight className="size-4 shrink-0 text-[var(--accent)]" aria-hidden />
            </Link>
          ))}
        </div>
      </section>

      <ContactCta locale={locale} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  );
}
