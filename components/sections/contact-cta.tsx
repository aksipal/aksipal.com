import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { LeadDialog } from "@/components/contact/lead-dialog";
import GradientText from "@/components/ui/gradient-text";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/constants";
import { buildWhatsAppLink } from "@/lib/whatsapp";

type ContactCtaProps = {
  locale: Locale;
};

export function ContactCta({ locale }: ContactCtaProps) {
  const copy = {
    tr: {
      title: "Yapay zeka, otomasyon, web — sizin için hangisi en hızlı geri döner?",
      text: "30 dakikalık ücretsiz keşif görüşmesinde ihtiyacınızı netleştirelim: yapay zeka ajanı, WhatsApp ve süreç otomasyonu, özel yazılım veya hazır web sitesi — operasyonunuza en uygun teslim planını birlikte çıkaralım. 24 saat içinde yanıtlıyoruz.",
      detail: "Detaylı İletişim",
      modal: "Ücretsiz Keşif Görüşmesi",
      whatsapp: "WhatsApp'tan Yazın",
      call: "Ara",
      linksLabel: "Keşfedin:",
      linkTemplates: "Sektörel Çözümler",
      linkServices: "Hizmetler ve Fiyatlar",
      linkWork: "Referans Projeler",
    },
    en: {
      title: "AI, automation or web — what pays back fastest for you?",
      text: "In a focused 30-minute free discovery call we map the right delivery plan: AI agent, WhatsApp / workflow automation, custom software or a fast-launch website. We reply within 24 hours.",
      detail: "Full Contact Page",
      modal: "Free Discovery Call",
      whatsapp: "Message on WhatsApp",
      call: "Call",
      linksLabel: "Explore:",
      linkTemplates: "Solutions",
      linkServices: "Services & Pricing",
      linkWork: "Case Studies",
    },
  }[locale];

  const whatsappHref = buildWhatsAppLink({
    sector: locale === "tr" ? "Genel" : "General",
    template: locale === "tr" ? "Belirsiz" : "Not selected",
    city: locale === "tr" ? "İstanbul" : "Istanbul",
    budget: locale === "tr" ? "Konuşalım" : "Let's discuss",
  });

  return (
    <section className="section-shell mt-20" aria-labelledby="contact-cta-heading">
      <div className="glass-card relative overflow-hidden">
        <div className="flex w-full flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl space-y-2">
            <h2
              id="contact-cta-heading"
              className="text-2xl font-semibold text-[#E9DFFF] sm:text-3xl"
            >
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
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                data-cta="contactcta-whatsapp"
              >
                <MessageCircle className="size-4" aria-hidden />
                {copy.whatsapp}
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link href={withLocale(locale, "/iletisim")} data-cta="contactcta-detail">
                {copy.detail}
              </Link>
            </Button>
          </div>
        </div>
        <p className="border-t border-white/10 px-8 py-4 text-xs text-zinc-500">
          {locale === "tr" ? "Telefon: " : "Phone: "}
          <a
            href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
            className="text-zinc-300 hover:text-[var(--accent)]"
            data-cta="contactcta-tel"
          >
            {siteConfig.phone}
          </a>
          <span className="mx-2">·</span>
          {locale === "tr" ? "E-posta: " : "Email: "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-zinc-300 hover:text-[var(--accent)]"
            data-cta="contactcta-mail"
          >
            {siteConfig.email}
          </a>
        </p>
      </div>
    </section>
  );
}
