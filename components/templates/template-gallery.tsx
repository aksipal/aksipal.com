"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

import { LeadDialog } from "@/components/contact/lead-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import {
  templateSectorLabel,
  templates,
  type TemplateSector,
} from "@/lib/templates";

type TemplateGalleryProps = {
  locale: Locale;
};

const sectors = Object.keys(templateSectorLabel) as TemplateSector[];

export function TemplateGallery({ locale }: TemplateGalleryProps) {
  const [activeSector, setActiveSector] = useState<TemplateSector | "all">("all");

  const filtered = useMemo(
    () =>
      activeSector === "all"
        ? templates
        : templates.filter((item) => item.sector === activeSector),
    [activeSector],
  );

  const copy = {
    tr: {
      all: "Tümü",
      select: "Bu Şablonu Seç",
      demo: "Canlı Demo",
      from: "Başlangıç",
      empty: "Bu filtrede şablon bulunamadı.",
    },
    en: {
      all: "All",
      select: "Choose Template",
      demo: "View Demo",
      from: "Starting at",
      empty: "No template found in this filter.",
    },
  }[locale];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeSector === "all" ? "default" : "secondary"}
          size="sm"
          onClick={() => setActiveSector("all")}
        >
          {copy.all}
        </Button>
        {sectors.map((sector) => (
          <Button
            key={sector}
            variant={activeSector === sector ? "default" : "secondary"}
            size="sm"
            onClick={() => setActiveSector(sector)}
          >
            {templateSectorLabel[sector]}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-zinc-400">{copy.empty}</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((template) => (
            <article key={template.id} className="glass-card overflow-hidden">
              <Image
                src={template.image}
                alt={template.title}
                width={960}
                height={640}
                className="h-44 w-full object-cover"
              />
              <div className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-zinc-100">{template.title}</h3>
                  <Badge>{templateSectorLabel[template.sector]}</Badge>
                </div>
                <p className="text-sm text-zinc-400">{template.summary}</p>
                <ul className="space-y-1.5 text-sm text-zinc-300">
                  {template.features.map((feature) => (
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
      )}
    </div>
  );
}
