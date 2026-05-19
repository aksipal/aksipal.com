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
      badge: "Yapay Zeka · Otomasyon · Özel Yazılım",
      title: "Markanıza Özel Dijital Çözümler Geliştiriyoruz",
      subtitle: "WEB · E-TİCARET · MOBİL · OTOMASYON · YAPAY ZEKA",
      description:
        "Kurumsal firmalar, KOBİ'ler ve esnaflar için web sitesi, e-ticaret altyapısı, mobil uygulama, yapay zeka ajanları, otomasyon sistemleri ve özel yazılım projelerini markanıza özel geliştiriyoruz.",
      quote: "WhatsApp'tan Yazın",
      templates: "Çözümleri İnceleyin",
      quickForm: "Keşif Görüşmesi Yapın",
      bullets: [
        "Modern Tasarım",
        "Güçlü Altyapı",
        "SEO Uyumlu",
        "Bakım ve Destek",
      ],
    },
    en: {
      badge: "AI · Automation · Custom Software",
      title: "We Build Brand-Tailored Digital Solutions",
      subtitle: "WEB · E-COMMERCE · MOBILE · AUTOMATION · AI",
      description:
        "For enterprises, SMBs and local businesses we build brand-tailored websites, e-commerce infrastructure, mobile applications, AI agents, automation systems and custom software.",
      quote: "Message on WhatsApp",
      templates: "Explore Solutions",
      quickForm: "Book a Discovery Call",
      bullets: [
        "Modern Design",
        "Solid Infrastructure",
        "SEO Friendly",
        "Maintenance & Support",
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
    <section className="section-shell pt-6 sm:pt-10" aria-labelledby="hero-heading">
      <div className="glass-card relative overflow-hidden p-8 sm:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(124,255,146,0.18),transparent_40%),radial-gradient(circle_at_90%_20%,rgba(132,100,255,0.14),transparent_45%)]" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center space-y-6 text-center">
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
            className="text-balance text-3xl font-semibold tracking-tight text-[#E9DFFF] sm:text-5xl"
          >
            {copy.title}
          </h1>

          <p className="text-sm font-medium uppercase tracking-[0.16em] text-[var(--accent)] sm:text-base">
            {copy.subtitle}
          </p>

          <p className="text-pretty text-base leading-7 text-[#B8B3D1] sm:text-lg">
            {copy.description}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
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

          <ul className="grid w-full grid-cols-1 gap-x-5 gap-y-2 text-left text-sm text-[#B8B3D1] sm:grid-cols-2 sm:text-[15px] lg:grid-cols-4">
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
