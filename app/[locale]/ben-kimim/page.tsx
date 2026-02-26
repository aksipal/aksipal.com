import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Code2, Palette, Rocket, ShieldCheck } from "lucide-react";

import { ContactCta } from "@/components/sections/contact-cta";
import { Badge } from "@/components/ui/badge";
import { isLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

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
    pathname: "/ben-kimim",
    title: locale === "tr" ? "Ben Kimim" : "About",
    description:
      locale === "tr"
        ? "Aksipal arkasındaki uzmanlık: premium frontend, platform mühendisliği ve ürün odaklı tasarım yaklaşımı."
        : "Meet the expertise behind Aksipal: premium frontend, platform engineering, and product design.",
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
            icon: Palette,
            title: "Premium Minimal Tasarım",
            text: "Gösterişli ama sade. Dikkati aksiyonlara veren görsel hiyerarşi.",
          },
          {
            icon: Rocket,
            title: "Performans Odaklı Mühendislik",
            text: "Core Web Vitals ve gerçek kullanıcı hız verileri merkezde.",
          },
          {
            icon: Code2,
            title: "Ölçeklenebilir Kod Tabanı",
            text: "Server component ağırlıklı, temiz ve sürdürülebilir mimari.",
          },
          {
            icon: ShieldCheck,
            title: "İş Sonucu ve Güven",
            text: "Sadece site değil; dönüşüm hattı ve operasyonel netlik.",
          },
        ]
      : [
          {
            icon: Palette,
            title: "Premium Minimal Design",
            text: "Bold but clean visual hierarchy focused on action.",
          },
          {
            icon: Rocket,
            title: "Performance-first Engineering",
            text: "Core Web Vitals and real-user speed metrics are core.",
          },
          {
            icon: Code2,
            title: "Scalable Codebase",
            text: "Server-component-first, clean and maintainable architecture.",
          },
          {
            icon: ShieldCheck,
            title: "Business Outcomes and Trust",
            text: "Not just a website, but a reliable conversion system.",
          },
        ];

  return (
    <>
      <section className="section-shell pt-16">
        <div className="glass-card p-8 sm:p-12">
          <Badge variant="accent" className="w-fit">
            {locale === "tr" ? "Principal Frontend + Platform Engineer" : "Principal Engineer"}
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {locale === "tr"
              ? "Merhaba, ben Aksipal."
              : "Hi, I am the engineer behind Aksipal."}
          </h1>
          <p className="mt-4 max-w-3xl text-zinc-400">
            {locale === "tr"
              ? "Küçük işletmeler için premium algı oluşturan web deneyimleri tasarlıyor, gerektiğinde backend ve entegrasyon katmanını da uçtan uca kuruyorum. Hedefim: hızlı yayına çıkış + yüksek güven + net dönüşüm."
              : "I design premium web experiences for small businesses and deliver backend/integration layers when needed. The goal is always fast launch, trust and measurable conversion."}
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
    </>
  );
}
