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
        ? "Barış Akşipal: 6+ yıl senior full-stack mühendisi. Kurumsal web sitesi, e-ticaret ve kişiye özel yazılım; Java/Python backend, Next.js ve yapay zeka entegrasyonları — Ankara'dan Türkiye geneline, yazılı sözleşmeyle, tek muhatap."
        : "Barış Akşipal: 6+ years senior full-stack engineer. Corporate websites, e-commerce and custom software; Java/Python backend, Next.js and AI integrations — from Ankara across Turkey, written contract, single point of contact.",
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
            title: "Yapay Zeka ve Otomasyon Entegrasyonu",
            text: "Claude / OpenAI tabanlı asistanlar, RAG (vektör veritabanı), function calling ve resmi WhatsApp Cloud API / n8n ile süreç otomasyonu — mevcut web ve yazılım projelerinize entegre katman olarak.",
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
            text: "Claude / OpenAI based assistants, RAG, function calling, n8n workflow + WhatsApp automation — as an integrated layer on your web and software projects.",
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
              ? "6+ Yıl Senior Mühendislik • Web, E-Ticaret ve Yazılım"
              : "6+ Years Senior Engineering • Web, E-Commerce & Software"}
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {locale === "tr"
              ? "Merhaba, ben Barış Akşipal."
              : "Hi, I'm Barış Akşipal."}
          </h1>
          <p className="mt-4 max-w-3xl text-zinc-400">
            {locale === "tr"
              ? "Ankara merkezli, 6+ yıllık senior full-stack mühendisim; Türkiye genelinde firmalarla uzaktan çalışıyorum. Ana işim kurumsal web siteleri, e-ticaret altyapıları ve kişiye özel yazılım geliştirmek: backend tarafında Java, Python ve Node ile API ve entegrasyonlar; frontend tarafında Next.js, React ve TypeScript ile hızlı, çok dilli ve dönüşüm odaklı arayüzler. Projelere ihtiyaç duyulduğunda Claude / OpenAI tabanlı yapay zeka asistanları, RAG ve resmi WhatsApp Cloud API ile otomasyon katmanı ekliyorum. Boş zamanımda teknik sınırları zorlayan Ar-Ge projeleri geliştiriyorum; tarayıcıda çalışan açık kaynak MMORPG Ironveil bunlardan biri. Çalışma prensibim sade: yazılı sözleşme, sabit fiyat, sözünde durulan teslim tarihi, kaynak kodun size ait olması ve yayın sonrası Türkçe destek — tek muhatap."
              : "Ankara-based senior full-stack engineer with 6+ years of experience, working remotely with companies across Turkey. My core work is corporate websites, e-commerce platforms and custom software: Java, Python and Node on the backend for APIs and integrations; Next.js, React and TypeScript on the frontend for fast, multilingual, conversion-focused interfaces. Where a project needs it, I add Claude / OpenAI based AI assistants, RAG and official WhatsApp Cloud API automation. In my spare time I build R&D projects that push technical limits — the open-source browser MMORPG Ironveil is one of them. My principles are simple: written contract, fixed price, delivery dates kept, you own the source code, and post-launch support — one point of contact."}
          </p>
          <p className="mt-3 text-sm text-zinc-500">
            {locale === "tr"
              ? "6+ yıl deneyim · Yayında 10+ kurumsal referans · Google'da 5 yıldız · Ankara merkezli, Türkiye geneli"
              : "6+ years experience · 10+ live corporate references · 5 stars on Google · Ankara-based, serving all of Turkey"}
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
