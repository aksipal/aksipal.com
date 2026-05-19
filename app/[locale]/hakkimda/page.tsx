import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Bot, Code2, Rocket, ShieldCheck } from "lucide-react";

import { ContactCta } from "@/components/sections/contact-cta";
import { Badge } from "@/components/ui/badge";
import { isLocale } from "@/lib/i18n";
import { seoKeywordsTr } from "@/lib/constants";
import {
  absoluteUrl,
  createPageMetadata,
  getBreadcrumbJsonLd,
  getPersonJsonLd,
} from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  return createPageMetadata({
    locale,
    pathname: "/hakkimda",
    title:
      locale === "tr"
        ? "Hakkımda — Barış Akşipal | Aksipal Web Studio"
        : "About — Barış Akşipal | Aksipal Web Studio",
    description:
      locale === "tr"
        ? "Barış Akşipal: 6+ yıl senior full-stack mühendisi. Yapay zeka ajanı (Claude / OpenAI / RAG), WhatsApp ve n8n otomasyonu, Java/Python backend ve Next.js — Ankara'dan, yazılı sözleşmeyle, tek muhatap."
        : "Barış Akşipal: 6+ years senior full-stack engineer. AI agents (Claude/OpenAI/RAG), WhatsApp & n8n automation, Java/Python backend and Next.js — Ankara, written contract, single point of contact.",
    keywords:
      locale === "tr"
        ? [
            ...seoKeywordsTr,
            "Barış Akşipal",
            "AI mühendisi Ankara",
            "yapay zeka geliştirici Ankara",
            "senior full-stack Ankara",
          ]
        : undefined,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const principles =
    locale === "tr"
      ? [
          {
            icon: Bot,
            title: "Yapay Zeka ve Otomasyon",
            text: "Claude / OpenAI tabanlı yapay zeka ajanı geliştirme, RAG (vektör veritabanı), function calling ve n8n + resmi WhatsApp Cloud API ile süreç otomasyonu — sahadan ölçülebilir sonuçlar.",
          },
          {
            icon: Code2,
            title: "Backend (Java / Python / Node)",
            text: "Java, Python ve Node ile API, iş kuralları ve entegrasyon katmanları. Kimlik doğrulama, rol yönetimi, veri modelleme ve performans iyileştirmesi.",
          },
          {
            icon: Rocket,
            title: "Frontend (Next.js / React / TS)",
            text: "Next.js, React ve TypeScript ile hızlı, modern ve dönüşüm odaklı arayüzler. App Router, server components ve Core Web Vitals odaklı geliştirme.",
          },
          {
            icon: ShieldCheck,
            title: "DevOps, Performans ve Güvenlik",
            text: "Docker ve CI/CD ile sürdürülebilir dağıtım, SEO ve Core Web Vitals iyileştirmesi, KVKK uyumlu altyapı standartları.",
          },
        ]
      : [
          {
            icon: Bot,
            title: "AI & Automation",
            text: "Claude / OpenAI based AI agent development, RAG, function calling, n8n workflow + WhatsApp automation — measurable answers to real operational problems.",
          },
          {
            icon: Code2,
            title: "Backend (Java / Python / Node)",
            text: "APIs, business logic and integration layers in Java, Python and Node. Auth, roles, data modeling and performance.",
          },
          {
            icon: Rocket,
            title: "Frontend (Next.js / React / TS)",
            text: "Fast, modern, conversion-focused UIs with Next.js, React and TypeScript. App Router, server components and Core Web Vitals first.",
          },
          {
            icon: ShieldCheck,
            title: "DevOps, Performance & Security",
            text: "Sustainable delivery with Docker / CI/CD, SEO and Core Web Vitals optimization, KVKK / GDPR-aware infrastructure standards.",
          },
        ];

  const personJsonLd = getPersonJsonLd();
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: locale === "tr" ? "Ana Sayfa" : "Home", url: absoluteUrl(`/${locale}`) },
    { name: locale === "tr" ? "Hakkımda" : "About", url: absoluteUrl(`/${locale}/hakkimda`) },
  ]);

  return (
    <>
      <section className="section-shell pt-16">
        <div className="glass-card p-8 sm:p-12">
          <Badge variant="accent" className="w-fit">
            {locale === "tr"
              ? "6+ Yıl Senior Mühendislik • Yapay Zeka ve Otomasyon"
              : "6+ Years Senior Engineering • AI & Automation"}
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {locale === "tr"
              ? "Merhaba, ben Barış Akşipal."
              : "Hi, I'm Barış Akşipal."}
          </h1>
          <p className="mt-4 max-w-3xl text-zinc-400">
            {locale === "tr"
              ? "Ankara merkezli, 6+ yıllık senior full-stack mühendisim. Kurumsal web ve özel yazılımın yanı sıra son 2 yıldır ağırlıklı olarak yapay zeka ajanı (AI agent) ve süreç otomasyonu projeleri geliştiriyorum. Backend tarafında Java, Python ve Node ile API ve entegrasyonlar; frontend tarafında Next.js, React ve TypeScript ile dönüşüm odaklı arayüzler. Yapay zeka tarafında Claude ve OpenAI tabanlı ajanlar, RAG (vektör veritabanı) sistemleri ve resmi WhatsApp Cloud API + n8n ile uçtan uca süreç otomasyonu kuruyorum. Çalışma prensibim sade: yazılı sözleşme, sabit fiyat, sözünde durulan teslim tarihi ve yayın sonrası Türkçe destek — tek muhatap."
              : "Ankara-based, 6+ years senior full-stack engineer. Corporate web and custom software, plus (for the past 2 years intensively) AI agent and workflow automation projects. Backend: Java, Python, Node — APIs and integrations. Frontend: Next.js / React / TypeScript focused on conversion. AI: Claude / OpenAI agents, RAG (vector DB) systems, and official WhatsApp Cloud API + n8n end-to-end automation. My principle is simple: written contract, fixed price, delivery dates kept, post-launch support in Turkish or English — one point of contact."}
          </p>
          <p className="mt-3 text-sm text-zinc-500">
            {locale === "tr"
              ? "6+ yıl deneyim · 40+ ürün ve servis yayını · Ankara merkezli · KVKK uyumlu çalışma"
              : "6+ years experience · 40+ product/service launches · Ankara · KVKK aware delivery"}
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {principles.map((item) => (
            <article key={item.title} className="glass-card p-6">
              <item.icon className="mb-3 size-5 text-[var(--accent)]" />
              <h2 className="text-xl font-semibold text-zinc-100">{item.title}</h2>
              <p className="mt-2 text-sm leading-7 text-zinc-400">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <ContactCta locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
