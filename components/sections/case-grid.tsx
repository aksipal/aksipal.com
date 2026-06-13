import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Lock } from "lucide-react";

import GradientText from "@/components/ui/gradient-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { cases, caseCategories, type CaseItem } from "@/lib/cases";

type CaseGridProps = {
  locale: Locale;
  /** Üstte ve altta "Tüm İşleri Gör" bağlantısını gösterir (ana sayfa için). */
  showAllLink?: boolean;
};

export function CaseGrid({ locale, showAllLink }: CaseGridProps) {
  const copy = {
    tr: {
      title: "Referans Projeler",
      subtitle:
        "Yayında olan gerçek müşteri projeleri ve sektörel kurumsal işler. Tasarım kalitesi, teknik SEO ve ölçülebilir dönüşüm metriklerine göre seçildi — tüm bağlantılar canlı projelere açılır.",
      detail: "Proje Detayı",
      demo: "Canlı Demo",
      all: "Tüm İşleri Görün",
      confidential: "Müşteri Gizli",
    },
    en: {
      title: "Selected Work",
      subtitle:
        "Real, live client websites and sector projects. Picked for design quality, technical SEO and measurable conversion — every link opens a live project.",
      detail: "View Case Study",
      demo: "View Demo",
      all: "See All Work",
      confidential: "Confidential Client",
    },
  }[locale];

  let cardIndex = 0;

  return (
    <section className="section-shell mt-20 space-y-12" aria-labelledby="cases-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl space-y-2">
          <h2
            id="cases-heading"
            className="text-3xl font-semibold tracking-tight text-[#E9DFFF]"
          >
            <GradientText colors={["#E9DFFF", "#a78bfa", "#7cff92", "#E9DFFF"]} animationSpeed={10}>
              {copy.title}
            </GradientText>
          </h2>
          <p className="text-zinc-400">{copy.subtitle}</p>
        </div>
        {showAllLink ? (
          <Link
            href={withLocale(locale, "/isler")}
            className="text-sm font-medium text-[var(--accent)] hover:brightness-110"
          >
            {copy.all}
          </Link>
        ) : null}
      </div>

      {caseCategories.map((category) => {
        const items = cases.filter((item) => item.category === category.id);
        if (items.length === 0) return null;

        return (
          <div key={category.id} className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="h-5 w-1 rounded-full bg-[var(--accent)]" aria-hidden />
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-[#E9DFFF]">
                  {locale === "tr" ? category.tr : category.en}
                </h3>
                <p className="text-sm text-zinc-500">
                  {locale === "tr" ? category.trSubtitle : category.enSubtitle}
                </p>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {items.map((item) => (
                <CaseCard
                  key={item.slug}
                  item={item}
                  locale={locale}
                  copy={copy}
                  eager={cardIndex++ < 3}
                />
              ))}
            </div>
          </div>
        );
      })}

      {showAllLink ? (
        <div className="flex justify-center pt-2">
          <Button asChild size="lg">
            <Link href={withLocale(locale, "/isler")}>{copy.all}</Link>
          </Button>
        </div>
      ) : null}
    </section>
  );
}

type CaseCardCopy = {
  detail: string;
  demo: string;
  confidential: string;
};

function CaseCard({
  item,
  locale,
  copy,
  eager,
}: {
  item: CaseItem;
  locale: Locale;
  copy: CaseCardCopy;
  eager: boolean;
}) {
  return (
    <article className="glass-card overflow-hidden transition-colors hover:border-white/20">
      <Link
        href={withLocale(locale, `/isler/${item.slug}`)}
        aria-label={`${item.title} — ${copy.detail}`}
        className="relative block"
      >
        <Image
          src={item.image ?? "/images/cases/ai-agent-case.png"}
          alt={`${item.title} — ${item.sector} referans projesi`}
          width={900}
          height={600}
          className="h-44 w-full object-cover"
          loading={eager ? "eager" : "lazy"}
        />
        {item.confidential ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/55 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-zinc-200 backdrop-blur">
            <Lock className="size-3 text-[var(--accent)]" aria-hidden />
            {copy.confidential}
          </span>
        ) : null}
      </Link>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-zinc-100">{item.title}</h3>
          <Badge>{item.sector}</Badge>
        </div>
        <p className="text-sm text-zinc-400">{item.summary}</p>
        <div className="grid grid-cols-3 gap-2">
          {item.metrics.map((metric) => (
            <div key={metric.label} className="rounded-lg border border-white/10 bg-white/5 p-2">
              <p className="text-[10px] uppercase tracking-[0.08em] text-zinc-500">{metric.label}</p>
              <p className="text-xs font-semibold text-zinc-100">{metric.value}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Link
            href={withLocale(locale, `/isler/${item.slug}`)}
            className="inline-flex text-sm font-medium text-[var(--accent)] hover:brightness-110"
          >
            {copy.detail}
          </Link>
          {item.demoUrl ? (
            <Button asChild variant="outline" size="sm">
              <a
                href={item.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5"
                aria-label={`${item.title} — ${copy.demo}`}
              >
                <ExternalLink className="size-3.5" aria-hidden />
                {copy.demo}
              </a>
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
