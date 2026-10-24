"use client";

import Link from "next/link";
import { ArrowRight, Bot, Braces, Globe, ShoppingCart } from "lucide-react";

import GradientText from "@/components/ui/gradient-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

const icons = [Globe, ShoppingCart, Braces, Bot] as const;

type AdvancedServicesTeaserProps = {
  locale: Locale;
};

export function AdvancedServicesTeaser({ locale }: AdvancedServicesTeaserProps) {
  const copy = {
    tr: {
      badge: "Hizmetler",
      title: "Kurumsal Web, E-Ticaret, Özel Yazılım ve Otomasyon",
      subtitle:
        "Web sitesinin tek başına yetmediği noktada devreye giriyoruz. Kurumsal web sitesinden e-ticaret altyapısına, kişiye özel yazılımdan yapay zeka ve süreç otomasyonuna kadar firmanızın dijital tarafını tek muhatapla yürütüyoruz: yazılı sözleşme, sabit fiyat, kaynak kod sizde. Siber güvenlik, sağlık, lojistik, enerji, turizm ve spor sektörlerinde yayında referanslarımızı inceleyebilirsiniz.",
      items: [
        {
          title: "Kurumsal Web Sitesi",
          desc: "Next.js ile hızlı açılan, çok dilli (TR/EN ve ötesi), teknik SEO'su ve KVKK sayfaları hazır kurumsal siteler. İstenirse 3D ve animasyonlu arayüz. Örnek: Korsis Teknoloji, Oditron, Obsolix. 4–12 iş gününde yayında.",
          href: "/hizmetler/kurumsal-web-sitesi",
        },
        {
          title: "E-Ticaret Altyapısı",
          desc: "Ürün ve stok yönetimi, sepet, iyzico/Stripe ödeme, üyelik, abonelik ve B2B/toptan akışları; aylık lisans yok, kaynak kod sizde. Sıfırdan mağaza (Tiny Bean Coffee) veya mevcut mağazada arayüz revizyonu (Ankaragücü Store).",
          href: "/hizmetler/e-ticaret",
        },
        {
          title: "Kişiye Özel Yazılım",
          desc: "Excel ve WhatsApp gruplarında yürüyen operasyonu tek panele taşıyan iç uygulamalar, bayi/B2B portalları, sistemler arası entegrasyon katmanı veya SaaS MVP. Java / Python / Node backend + Next.js arayüz; iki haftalık sprintler, her sprintte çalışan teslim.",
          href: "/hizmetler/ozel-yazilim",
        },
        {
          title: "Yapay Zeka ve Otomasyon",
          desc: "Claude / OpenAI tabanlı, şirket dökümanlarınızı RAG ile bilen asistanlar; resmi WhatsApp Cloud API üzerinden teklif, randevu ve sipariş akışları; n8n ile tekrar eden iş zincirlerinin otomasyonu. Mevcut web veya yazılım projenize entegre katman olarak.",
          href: "/hizmetler",
        },
      ],
      cta: "Ücretsiz Keşif Görüşmesi Ayırın",
      explore: "Hizmetler ve Şeffaf Fiyatlar",
    },
    en: {
      badge: "Services",
      title: "Corporate Web, E-Commerce, Custom Software and Automation",
      subtitle:
        "Where a website alone isn't enough. From corporate websites to e-commerce platforms, custom software to AI and workflow automation, we run your company's digital side with one point of contact: written contract, fixed price, you own the code. Live references in cybersecurity, healthcare, logistics, energy, travel and sports.",
      items: [
        {
          title: "Corporate Website",
          desc: "Fast-loading, multilingual (TR/EN and beyond) Next.js corporate sites with technical SEO and KVKK pages built in; 3D and animated UI on request. Examples: Korsis Teknoloji, Oditron, Obsolix. Live in 4–12 business days.",
          href: "/hizmetler/kurumsal-web-sitesi",
        },
        {
          title: "E-Commerce Platform",
          desc: "Product and stock management, cart, iyzico/Stripe payments, membership, subscriptions and B2B/wholesale flows; no monthly license, you own the code. A new store (Tiny Bean Coffee) or a UI revision of an existing one (Ankaragücü Store).",
          href: "/hizmetler/e-ticaret",
        },
        {
          title: "Custom Software",
          desc: "Internal tools that move Excel-and-WhatsApp operations into one panel, dealer/B2B portals, integration layers between systems or SaaS MVPs. Java / Python / Node backend + Next.js UI; two-week sprints, working delivery each cycle.",
          href: "/hizmetler/ozel-yazilim",
        },
        {
          title: "AI & Automation",
          desc: "Claude / OpenAI assistants that know your documents via RAG; quote, appointment and order flows over the official WhatsApp Cloud API; n8n automation of repetitive work chains. Integrated as a layer on your existing web or software project.",
          href: "/hizmetler",
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
                  <h3 className="text-base font-semibold text-[#E9DFFF]">
                    <Link href={withLocale(locale, item.href)} className="hover:text-[var(--accent)]">
                      {item.title}
                    </Link>
                  </h3>
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
