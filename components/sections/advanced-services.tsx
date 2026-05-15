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
      badge: "Yüksek Bilet · Stratejik İş Ortaklığı",
      title: "AI, Otomasyon ve Özel Yazılım",
      subtitle:
        "Web sitesi tek başına yetmediği noktada devreye giriyoruz: AI agent, WhatsApp / e-posta / CRM otomasyonu ve özel yazılım ile günde harcadığınız manuel saatleri operasyonel kazanca çeviriyoruz. Aşağıdaki senaryolar gerçek müşteri kurulumlarımızdan örneklerdir.",
      items: [
        {
          title: "AI Agent & Chatbot",
          desc: "Claude / OpenAI tabanlı, şirket verinizi (PDF, web, CRM, Notion) bilen agent. Örnek: B2B yazılım firmasında satış öncesi sorularda %70 yük azalması, ekip sadece sıcak fırsata bakıyor.",
        },
        {
          title: "WhatsApp Otomasyonu",
          desc: "Resmi WhatsApp Cloud API ile teklif, randevu ve sipariş akışları. Örnek: Estetik klinikte randevu cevap süresi 4 saatten 90 saniyeye, randevu kaçırma oranı yarıya düştü.",
        },
        {
          title: "Süreç Otomasyonu (n8n)",
          desc: "Form → CRM → e-posta → fatura → WhatsApp gibi tekrar eden zincirleri AI destekli pipeline'a çeviriyoruz. Örnek: Lojistikte sürücü-müşteri eşleştirme 8 saatten 30 dakikaya indi.",
        },
        {
          title: "Özel Yazılım",
          desc: "İç panel, B2B portal, e-ticaret, entegrasyon, SaaS MVP — Java/Python backend + Next.js ile uçtan uca. Sprint bazlı, her sprintte çalışan teslim, sürpriz fatura yok.",
        },
      ],
      cta: "AI / Otomasyon İçin Konuşalım",
      explore: "Hizmetler & Şeffaf Fiyatlar",
    },
    en: {
      badge: "High-ticket · Strategic Partnership",
      title: "AI, Automation and Custom Software",
      subtitle:
        "Where a website alone isn't enough: AI agents, WhatsApp / email / CRM automations and custom software that turn daily manual hours into operational gains. The examples below come from real client deployments.",
      items: [
        {
          title: "AI Agents & Chatbots",
          desc: "Claude / OpenAI agents that know your data (PDFs, web, CRM, Notion). Example: B2B SaaS — 70% drop in repetitive pre-sales questions; team focuses only on warm leads.",
        },
        {
          title: "WhatsApp Automation",
          desc: "Official WhatsApp Cloud API for quotes, appointments and order flows. Example: aesthetic clinic — response time from 4 hours to 90 seconds, no-shows cut in half.",
        },
        {
          title: "Workflow Automation (n8n)",
          desc: "Repetitive Form → CRM → email → invoice → WhatsApp loops turned into AI-augmented pipelines. Example: logistics — driver-to-customer match dropped from 8 hours to 30 minutes.",
        },
        {
          title: "Custom Software",
          desc: "Internal tools, B2B portals, e-commerce, integrations, SaaS MVPs — Java/Python backend + Next.js. Sprint-based, working delivery each cycle, no surprise invoices.",
        },
      ],
      cta: "Let's Talk AI / Automation",
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
