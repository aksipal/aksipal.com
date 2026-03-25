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
        ? "6+ yıllık deneyimle modern web, backend ve entegrasyon çözümleri geliştiren Barış Akşipal'i tanıyın."
        : "Meet Barış Akşipal: 6+ years of experience in modern web, backend and integration solutions.",
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
            icon: Code2,
            title: "Backend (Java / Python)",
            text: "Java ve Python ile API, iş kuralları ve entegrasyon katmanları geliştiriyorum.",
          },
          {
            icon: Rocket,
            title: "Frontend (React / TypeScript / Next.js)",
            text: "React, TypeScript ve Next.js ile hızlı, modern ve dönüşüm odaklı arayüzler geliştiriyorum.",
          },
          {
            icon: Palette,
            title: "Mikroservis ve DevOps",
            text: "Docker ve CI/CD ile sürdürülebilir, ölçeklenebilir dağıtım süreçleri.",
          },
          {
            icon: ShieldCheck,
            title: "Performans ve Güvenlik",
            text: "SEO, Core Web Vitals ve güvenli altyapı standartlarını birlikte sunarım.",
          },
        ]
      : [
          {
            icon: Code2,
            title: "Backend (Java / Python)",
            text: "I build APIs, business logic and integration layers with Java and Python.",
          },
          {
            icon: Rocket,
            title: "Frontend (React / TypeScript / Next.js)",
            text: "I build fast, modern, conversion-focused interfaces with React, TypeScript and Next.js.",
          },
          {
            icon: Palette,
            title: "Microservices and DevOps",
            text: "Docker and CI/CD based delivery for reliable scaling.",
          },
          {
            icon: ShieldCheck,
            title: "Performance and Security",
            text: "SEO, Core Web Vitals and secure infrastructure by default.",
          },
        ];

  return (
    <>
      <section className="section-shell pt-16">
        <div className="glass-card p-8 sm:p-12">
          <Badge variant="accent" className="w-fit">
            {locale === "tr"
              ? "6+ Yıl Deneyim • Full-Stack Mühendislik"
              : "6+ Years Experience • Full-Stack Engineering"}
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {locale === "tr"
              ? "Merhaba, ben Barış Akşipal."
              : "Hi, I'm Barış Akşipal."}
          </h1>
          <p className="mt-4 max-w-3xl text-zinc-400">
            {locale === "tr"
              ? "6+ yıldır web ve yazılım projeleri geliştiriyorum. Backend tarafında Java ve Python ile sağlam servisler kuruyor, frontend tarafında React, TypeScript ve Next.js ile modern arayüzler geliştiriyorum. Hedefim: hızlı teslim, güven ve ölçülebilir sonuç."
              : "For 6+ years, I have built web and software projects. On the backend, I build robust services with Java and Python; on the frontend, I deliver modern interfaces with React, TypeScript and Next.js. My focus is fast delivery, trust and measurable results."}
          </p>
          <p className="mt-3 text-sm text-zinc-500">
            {locale === "tr"
              ? "6+ yıl deneyim • 40+ ürün/servis yayını"
              : "6+ years of experience • 40+ product/service launches"}
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
