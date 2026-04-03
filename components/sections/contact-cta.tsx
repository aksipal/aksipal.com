"use client";

import Link from "next/link";

import { LeadDialog } from "@/components/contact/lead-dialog";
import GlareHover from "@/components/ui/glare-hover";
import GradientText from "@/components/ui/gradient-text";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

type ContactCtaProps = {
  locale: Locale;
};

export function ContactCta({ locale }: ContactCtaProps) {
  const copy = {
    tr: {
      title: "Web sitesi yaptırma veya hazır paket: hangisi sizin için doğru?",
      text: "15 dakikalık görüşmede ihtiyacınızı netleştirip (kurumsal web sitesi, şablon, özel yazılım) en doğru teslim planını çıkaralım.",
      detail: "Detaylı İletişim",
      modal: "Hızlı Teklif Al",
      linksLabel: "Keşfet:",
      linkTemplates: "Hazır Şablonlar",
      linkServices: "Hizmetler & Fiyatlar",
      linkWork: "Referans Projeler",
    },
    en: {
      title: "Need the right track: fast package or custom build?",
      text: "In a focused 15-minute call, we define your scope and the best delivery plan.",
      detail: "Full Contact Page",
      modal: "Quick Quote",
      linksLabel: "Explore:",
      linkTemplates: "Templates",
      linkServices: "Services & Pricing",
      linkWork: "Case Studies",
    },
  }[locale];

  return (
    <section className="section-shell mt-20">
      <GlareHover
        glareColor="#7cff92"
        glareOpacity={0.12}
        borderColor="rgba(124,255,146,0.15)"
        borderRadius="16px"
        className="glass-card"
      >
      <div className="flex w-full flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl font-semibold text-[#E9DFFF] sm:text-3xl">
            <GradientText colors={["#E9DFFF", "#7cff92", "#a78bfa"]} animationSpeed={8}>
              {copy.title}
            </GradientText>
          </h2>
          <p className="text-zinc-400">{copy.text}</p>
          <p className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-500">
            <span>{copy.linksLabel}</span>
            <Link href={withLocale(locale, "/templates")} className="underline hover:text-zinc-300">
              {copy.linkTemplates}
            </Link>
            <Link href={withLocale(locale, "/hizmetler")} className="underline hover:text-zinc-300">
              {copy.linkServices}
            </Link>
            <Link href={withLocale(locale, "/isler")} className="underline hover:text-zinc-300">
              {copy.linkWork}
            </Link>
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <LeadDialog locale={locale} buttonText={copy.modal} buttonVariant="default" />
          <Button asChild variant="secondary">
            <a href={withLocale(locale, "/iletisim")}>{copy.detail}</a>
          </Button>
        </div>
      </div>
      </GlareHover>
    </section>
  );
}
