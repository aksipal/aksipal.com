import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { LeadDialog } from "@/components/contact/lead-dialog";
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
      title: "Küçük işletmeler için modern, hızlı ve premium web sistemleri.",
      description:
        "Aksipal Web Systems Studio, işletmeler için dönüşüm odaklı kurumsal web siteleri ve yazılım altyapıları geliştirir.",
      quote: "Teklif Al",
      templates: "Şablonları Gör",
      quickForm: "Hızlı Form",
      note: "Hedef: Google Lighthouse puanı 90+ (hızlı, SEO'su güçlü) ve premium koyu tema tasarım.",
    },
    en: {
      badge: "Premium Web & Platform",
      title: "Modern, fast and premium web systems for small businesses.",
      description:
        "Aksipal Web Systems Studio develops conversion-focused corporate websites and software infrastructure for businesses.",
      quote: "Get Quote",
      templates: "View Templates",
      quickForm: "Quick Form",
      note: "Target: Google Lighthouse score 90+ (fast, strong SEO) and premium dark theme design.",
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
          <Badge variant="accent" className="w-fit">
            <Sparkles className="mr-1 size-3" />
            {copy.badge}
          </Badge>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            {copy.title}
          </h1>
          <p className="max-w-2xl text-pretty text-base leading-7 text-zinc-300 sm:text-lg">
            {copy.description}
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
          <p className="text-sm text-zinc-400">{copy.note}</p>
        </div>
      </div>
    </section>
  );
}
