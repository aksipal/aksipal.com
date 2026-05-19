"use client";

import Link from "next/link";
import { ArrowRight, Bot, Braces, MessageSquare, Workflow } from "lucide-react";

import GradientText from "@/components/ui/gradient-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

const icons = [Bot, MessageSquare, Workflow, Braces] as const;

type AdvancedServicesTeaserProps = {
  locale: Locale;
};

export function AdvancedServicesTeaser({ locale }: AdvancedServicesTeaserProps) {
  const copy = {
    tr: {
      badge: "Yüksek Etkili · Stratejik İş Ortaklığı",
      title: "Yapay Zeka, Otomasyon ve Özel Yazılım",
      subtitle:
        "Tek başına web sitesinin yetmediği noktada devreye giriyoruz. Bot değil — sizin diliniz konuşan, sizin verinizi bilen yapay zeka ajanları (AI agent), resmi WhatsApp Cloud API otomasyonu ve özel yazılım ile ekibinizin haftada saatlerce harcadığı tekrar eden işi sırtınızdan alıyoruz. Aşağıdaki rakamlar gerçek kurulumlarımızdan ölçülen metriklerdir.",
      items: [
        {
          title: "Yapay Zeka Ajanı (AI Agent)",
          desc: "Claude / OpenAI tabanlı, şirket verinizi (PDF, web, CRM, Notion) RAG ile bilen ajan. Örnek: B2B yazılım firmasında satış öncesi tekrar eden sorularda %70 yük azalması; ekip yalnızca sıcak fırsata bakıyor.",
        },
        {
          title: "WhatsApp Otomasyonu",
          desc: "Resmi WhatsApp Cloud API üzerinden teklif, randevu ve sipariş akışları — toplu mesaj/spam aracı değil. Örnek: Estetik klinikte yanıt süresi 4 saatten 90 saniyeye, randevu kaçırma oranı yarı yarıya.",
        },
        {
          title: "Süreç Otomasyonu (n8n)",
          desc: "Form → CRM → e-posta → fatura → WhatsApp gibi tekrar eden zincirleri yapay zeka destekli pipeline'a dönüştürüyoruz. Örnek: Lojistikte sürücü–müşteri eşleştirme 8 saatten 30 dakikaya indi.",
        },
        {
          title: "Özel Yazılım",
          desc: "İç panel, B2B portal, e-ticaret, entegrasyon, SaaS MVP — Java / Python backend + Next.js ile uçtan uca. Sprint bazlı, her sprintte çalışan teslim, ek kalem yok.",
        },
      ],
      cta: "Ücretsiz Keşif Görüşmesi Ayırın",
      explore: "Hizmetler ve Şeffaf Fiyatlar",
    },
    en: {
      badge: "High-impact · Strategic Partnership",
      title: "AI, Automation and Custom Software",
      subtitle:
        "Where a website alone isn't enough. Not a bot — AI agents that speak your team's language and know your data, plus official WhatsApp Cloud API automations and custom software. We take hours of repetitive work off your team every week. The numbers below are measured from real deployments.",
      items: [
        {
          title: "AI Agent",
          desc: "Claude / OpenAI agents that know your data (PDFs, web, CRM, Notion) via RAG. Example: B2B SaaS — 70% drop in repetitive pre-sales questions; team focuses only on warm leads.",
        },
        {
          title: "WhatsApp Automation",
          desc: "Official WhatsApp Cloud API quote, appointment and order flows — not bulk-messaging/spam tooling. Example: aesthetic clinic — response time 4h → 90s, no-shows halved.",
        },
        {
          title: "Workflow Automation (n8n)",
          desc: "Repetitive Form → CRM → email → invoice → WhatsApp loops turned into AI-augmented pipelines. Example: logistics — driver-to-customer match 8h → 30min.",
        },
        {
          title: "Custom Software",
          desc: "Internal tools, B2B portals, e-commerce, integrations, SaaS MVPs — Java/Python backend + Next.js. Sprint-based, working delivery each cycle, no extra line items.",
        },
      ],
      cta: "Book a Free Discovery Call",
      explore: "Services & Transparent Pricing",
    },
  }[locale];

  return (
    <section className="section-shell mt-20" aria-labelledby="adv-services-heading">
      <div className="glass-card relative overflow-hidden p-6 sm:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(124,255,146,0.12),transparent_45%),radial-gradient(circle_at_15%_85%,rgba(132,100,255,0.12),transparent_45%)]" />
        <div className="relative space-y-8">
          <div className="max-w-3xl space-y-3">
            <Badge variant="accent" className="w-fit">{copy.badge}</Badge>
            <h2
              id="adv-services-heading"
              className="text-3xl font-semibold tracking-tight text-[#E9DFFF] sm:text-4xl"
            >
              <GradientText colors={["#E9DFFF", "#7cff92", "#a78bfa", "#E9DFFF"]} animationSpeed={10}>
                {copy.title}
              </GradientText>
            </h2>
            <p className="text-[#B8B3D1]">{copy.subtitle}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.items.map((item, index) => {
              const Icon = icons[index] ?? Braces;
              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5 transition-colors hover:border-white/20"
                >
                  <Icon className="mb-2 size-5 text-[var(--accent)]" aria-hidden />
                  <h3 className="text-base font-semibold text-[#E9DFFF]">{item.title}</h3>
                  <p className="mt-1.5 text-xs leading-6 text-[#B8B3D1]">{item.desc}</p>
                </article>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href={withLocale(locale, "/iletisim")} data-cta="advservices-contact">
                {copy.cta}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={withLocale(locale, "/hizmetler")} data-cta="advservices-pricing">
                {copy.explore}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
