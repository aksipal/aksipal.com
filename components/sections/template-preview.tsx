import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { LeadDialog } from "@/components/contact/lead-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { templateSectorLabel, templates } from "@/lib/templates";

type TemplatePreviewProps = {
  locale: Locale;
};

export function TemplatePreview({ locale }: TemplatePreviewProps) {
  const copy = {
    tr: {
      title: "Sektöre Özel Şablonlar",
      subtitle:
        "Hızlı teslim edilen ürünleşmiş paketler. İşinize göre uyarlanır, performans ve SEO standardı korunur.",
      all: "Tüm Şablonlar",
      select: "Bu Şablonu Seç",
      demo: "Canlı Demo",
      from: "Başlangıç",
    },
    en: {
      title: "Sector-focused Templates",
      subtitle:
        "Productized packages with fast delivery. Tailored to your business while preserving SEO and performance standards.",
      all: "All Templates",
      select: "Choose This Template",
      demo: "View Demo",
      from: "Starting at",
    },
  }[locale];

  return (
    <section className="section-shell mt-20 space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight text-white">{copy.title}</h2>
          <p className="text-zinc-400">{copy.subtitle}</p>
        </div>
        <Link
          href={withLocale(locale, "/templates")}
          className="text-sm font-medium text-[var(--accent)] hover:brightness-110"
        >
          {copy.all}
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {templates.slice(0, 10).map((template) => (
          <article key={template.id} className="glass-card overflow-hidden">
            <Image
              src={template.image}
              alt={template.title}
              width={960}
              height={640}
              className="h-44 w-full object-cover"
            />
            <div className="space-y-4 p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-zinc-100">{template.title}</h3>
                <Badge>{templateSectorLabel[template.sector]}</Badge>
              </div>
              <p className="text-sm text-zinc-400">{template.summary}</p>
              <ul className="space-y-1.5 text-sm text-zinc-300">
                {template.features.slice(0, 2).map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">{template.deliveryTime}</span>
                <span className="font-semibold text-[var(--accent)]">
                  {copy.from} {template.startingPrice}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <LeadDialog
                  locale={locale}
                  buttonText={copy.select}
                  buttonVariant="secondary"
                  defaultSector={templateSectorLabel[template.sector]}
                  defaultTemplate={template.title}
                />
                {template.demoUrl ? (
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={template.demoUrl}
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
