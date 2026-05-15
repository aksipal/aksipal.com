"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";

import { LeadDialog } from "@/components/contact/lead-dialog";
import GradientText from "@/components/ui/gradient-text";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { buildWhatsAppLink } from "@/lib/whatsapp";

type HeroSectionProps = {
  locale: Locale;
};

export function HeroSection({ locale }: HeroSectionProps) {
  const copy = {
    tr: {
      badge: "AI · Otomasyon · Premium Web",
      title: "AI çağında işletmeniz için yazılım, otomasyon ve premium web",
      description:
        "Manuel iş yükünüzü AI agent ve WhatsApp / süreç otomasyonu ile azaltın; kurumsal web sitenizi 4-12 günde yayına alın. 6+ yıl senior full-stack mühendislik, sözleşmeli teslim, şeffaf fiyat — Ankara merkezli, KVKK uyumlu.",
      quote: "WhatsApp'tan Teklif Al",
      templates: "Şablonları Gör",
      quickForm: "Hızlı Form",
      bullets: [
        "Sözleşmeli teslim · sabit fiyat · sürpriz yok",
        "WhatsApp + e-posta · Türkçe destek · 24 saat içinde dönüş",
        "Ankara merkezli · yüz yüze görüşmeye açık",
      ],
    },
    en: {
      badge: "AI · Automation · Premium Web",
      title: "Software, automation and premium web for the AI era",
      description:
        "Cut manual workload with AI agents and WhatsApp / workflow automation; launch your corporate website in 4-12 days. 6+ years senior full-stack engineering, contracted delivery, transparent pricing — Ankara, KVKK/GDPR-aware.",
      quote: "Get Quote on WhatsApp",
      templates: "View Templates",
      quickForm: "Quick Form",
      bullets: [
        "Contracted delivery · fixed price · no surprises",
        "WhatsApp + email · 24-hour response",
        "Ankara-based · in-person meetings on request",
      ],
    },
  }[locale];

  const whatsappHref = buildWhatsAppLink({
    sector: locale === "tr" ? "Genel" : "General",
    template: locale === "tr" ? "Belirsiz" : "Not selected",
    city: locale === "tr" ? "İstanbul" : "Istanbul",
    budget: locale === "tr" ? "Konuşalım" : "Let's discuss",
  });

  return (
    <section className="section-shell pt-16 sm:pt-24" aria-labelledby="hero-heading">
      <div className="glass-card relative overflow-hidden p-8 sm:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(124,255,146,0.18),transparent_40%),radial-gradient(circle_at_90%_20%,rgba(132,100,255,0.14),transparent_45%)]" />
        <div className="relative max-w-3xl space-y-6">
          <GradientText
            colors={["#7cff92", "#a78bfa", "#7cff92"]}
            animationSpeed={6}
            showBorder
            className="w-fit"
          >
            <span className="inline-flex items-center gap-1 text-sm font-medium">
              <Sparkles className="size-3" aria-hidden />
              {copy.badge}
            </span>
          </GradientText>

          <h1
            id="hero-heading"
            className="text-balance text-4xl font-semibold tracking-tight text-[#E9DFFF] sm:text-6xl"
          >
            {copy.title}
          </h1>

          <p className="max-w-2xl text-pretty text-base leading-7 text-[#B8B3D1] sm:text-lg">
            {copy.description}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                data-cta="hero-whatsapp"
                aria-label={copy.quote}
              >
                <MessageCircle className="size-4" aria-hidden />
                {copy.quote}
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href={withLocale(locale, "/templates")} data-cta="hero-templates">
                {copy.templates}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <LeadDialog locale={locale} buttonText={copy.quickForm} buttonVariant="outline" />
          </div>

          <ul className="grid gap-1.5 text-sm text-[#B8B3D1] sm:text-[15px]">
            {copy.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
