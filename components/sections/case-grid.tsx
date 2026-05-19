import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Bot, Lock } from "lucide-react";

import GradientText from "@/components/ui/gradient-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { cases } from "@/lib/cases";

type CaseGridProps = {
  locale: Locale;
  limit?: number;
};

export function CaseGrid({ locale, limit }: CaseGridProps) {
  const copy = {
    tr: {
      title: "Referans Projeler",
      subtitle:
        "Yayında olan gerçek müşteri projeleri ve sektörel kurumsal işler. Tasarım kalitesi, teknik SEO ve ölçülebilir dönüşüm metriklerine göre seçildi — tüm bağlantılar canlı projelere açılır.",
      detail: "Proje Detayı",
      demo: "Canlı Demo",
      all: "Tüm İşleri Görün",
    },
    en: {
      title: "Selected Work",
      subtitle:
        "Real, live client websites and sector projects. Picked for design quality, technical SEO and measurable conversion — every link opens a live project.",
      detail: "View Case Study",
      demo: "View Demo",
      all: "See All Work",
    },
  }[locale];

  const items = typeof limit === "number" ? cases.slice(0, limit) : cases;

  return (
    <section className="section-shell mt-20 space-y-8" aria-labelledby="cases-heading">
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
        {limit ? (
          <Link
            href={withLocale(locale, "/isler")}
            className="text-sm font-medium text-[var(--accent)] hover:brightness-110"
          >
            {copy.all}
          </Link>
        ) : null}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {items.map((item, index) => (
          <article
            key={item.slug}
            className="glass-card overflow-hidden transition-colors hover:border-white/20"
          >
            <Link
              href={withLocale(locale, `/isler/${item.slug}`)}
              aria-label={`${item.title} — ${copy.detail}`}
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={`${item.title} — ${item.sector} referans projesi`}
                  width={900}
                  height={600}
                  className="h-44 w-full object-cover"
                  loading={index < 3 ? "eager" : "lazy"}
                />
              ) : (
                <div className="relative flex h-44 w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_25%_25%,rgba(124,255,146,0.18),transparent_55%),radial-gradient(circle_at_75%_75%,rgba(132,100,255,0.22),transparent_55%),linear-gradient(180deg,#0a0a14_0%,#101019_100%)]">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" aria-hidden />
                  <div className="relative flex flex-col items-center gap-2 text-center">
                    <Bot className="size-9 text-[var(--accent)]" aria-hidden />
                    <p className="text-base font-semibold tracking-tight text-[#E9DFFF]">
                      {item.visualTag ?? item.sector}
                    </p>
                    {item.confidential ? (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                        <Lock className="size-3" aria-hidden />
                        {locale === "tr" ? "Müşteri Gizli" : "Confidential Client"}
                      </span>
                    ) : null}
                  </div>
                </div>
              )}
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
                    <p className="text-[10px] uppercase tracking-[0.08em] text-zinc-500">
                      {metric.label}
                    </p>
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
        ))}
      </div>
    </section>
  );
}
