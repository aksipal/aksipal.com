"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { LeadDialog } from "@/components/contact/lead-dialog";
import GradientText from "@/components/ui/gradient-text";
import ShinyText from "@/components/ui/shiny-text";
import TrueFocus from "@/components/ui/true-focus";
import { Badge } from "@/components/ui/badge";
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
      badge: "Premium Web & Platform",
      title: "İşletmeler için modern hızlı premium web siteleri",
      description:
        "Web sitesi yaptırma veya hazır web sitesi paketi arayan işletmeler için: SEO uyumlu kurumsal web siteleri, sektöre özel şablonlar ve özel yazılım. Google'da görünürlük ve hız odaklı teslim.",
      quote: "Teklif Al",
      templates: "Şablonları Gör",
      quickForm: "Hızlı Form",
      note: "Lighthouse 90+ hedefi, teknik SEO (meta, OG, performans) ve mobil uyum — berber, kuaför, lojistik gibi nişler için hazır şablonlar.",
    },
    en: {
      badge: "Premium Web & Platform",
      title: "Modern fast premium websites for businesses",
      description:
        "Corporate websites, template packages and custom software—built for conversions, search visibility and speed. Full delivery for teams that need a serious web presence.",
      quote: "Get Quote",
      templates: "View Templates",
      quickForm: "Quick Form",
      note: "Lighthouse 90+ target, technical SEO (metadata, OG, performance) and mobile-first layouts—sector templates included.",
    },
  }[locale];

  const whatsappHref = buildWhatsAppLink({
    sector: locale === "tr" ? "Genel" : "General",
    template: locale === "tr" ? "Belirsiz" : "Not selected",
    city: locale === "tr" ? "İstanbul" : "Istanbul",
    budget: locale === "tr" ? "Konuşalım" : "Let's discuss",
  });

  return (
    <section className="section-shell pt-16 sm:pt-24">
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
              <Sparkles className="size-3" />
              {copy.badge}
            </span>
          </GradientText>

          <h1 className="text-balance text-4xl font-semibold tracking-tight text-[#E9DFFF] sm:text-6xl">
            <TrueFocus
              sentence={copy.title}
              manualMode={false}
              blurAmount={3}
              borderColor="#7cff92"
              glowColor="rgba(124, 255, 146, 0.5)"
              animationDuration={0.5}
              pauseBetweenAnimations={1.5}
            />
          </h1>

          <p className="max-w-2xl text-pretty text-base leading-7 sm:text-lg">
            <ShinyText
              text={copy.description}
              color="#B8B3D1"
              shineColor="#E9DFFF"
              speed={4}
              className="leading-7"
            />
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                {copy.quote}
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href={withLocale(locale, "/templates")}>
                {copy.templates}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <LeadDialog locale={locale} buttonText={copy.quickForm} buttonVariant="outline" />
          </div>

          <p className="text-sm text-[#B8B3D1]">
            <ShinyText
              text={copy.note}
              color="#8a8599"
              shineColor="#B8B3D1"
              speed={5}
              className="text-sm"
            />
          </p>
        </div>
      </div>
    </section>
  );
}
