import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

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
        "Sadece estetik değil; hız, SEO ve dönüşüm metrikleriyle ölçülen sonuçlar.",
      detail: "Proje Detayı",
      demo: "Canlı Demo",
      all: "Tüm İşleri Gör",
    },
    en: {
      title: "Selected Work",
      subtitle:
        "Not only visual quality; measurable outcomes across speed, SEO and conversion.",
      detail: "View Case Study",
      demo: "View Demo",
      all: "See All Work",
    },
  }[locale];

  const items = typeof limit === "number" ? cases.slice(0, limit) : cases;

  return (
    <section className="section-shell mt-20 space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight text-white">{copy.title}</h2>
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
        {items.map((item) => (
          <article key={item.slug} className="glass-card overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              width={900}
              height={600}
              className="h-44 w-full object-cover"
            />
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
                    >
                      <ExternalLink className="size-3.5" />
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
