import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { notFound } from "next/navigation";

import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig, seoKeywordsTr } from "@/lib/constants";
import { submitContactAction } from "@/lib/actions/contact";
import { isLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import { buildWhatsAppLink } from "@/lib/whatsapp";

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
    pathname: "/iletisim",
    title: locale === "tr" ? "İletişim | Web Sitesi Teklifi" : "Contact | Project Inquiry",
    description:
      locale === "tr"
        ? "Web sitesi yaptırma ve kurumsal web tasarım teklifi için WhatsApp, e-posta veya form. Aksipal ile projenizi iletin."
        : "Contact Aksipal for corporate website projects, quotes and custom software—WhatsApp, email, phone or form.",
    keywords: locale === "tr" ? [...seoKeywordsTr, "iletişim", "teklif"] : undefined,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const whatsappHref = buildWhatsAppLink({
    sector: locale === "tr" ? "Genel" : "General",
    template: locale === "tr" ? "Belirsiz" : "Not selected",
    city: locale === "tr" ? "Türkiye" : "Turkey",
    budget: locale === "tr" ? "Konuşalım" : "Let's discuss",
  });

  return (
    <section className="section-shell pt-16">
      <div className="mb-10 max-w-3xl space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {locale === "tr"
            ? "İletişim — Web Sitesi Teklifi Alın"
            : "Contact — Get a Website Quote"}
        </h1>
        <p className="text-zinc-400">
          {locale === "tr"
            ? "Web sitesi yaptırma veya hazır web sitesi paketi için projenizi kısaca anlatın, 24 saat içinde size net bir aksiyon planı ile dönüş yapayım."
            : "Share a short brief about your website project and I will respond within 24 hours with a concrete plan."}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="glass-card space-y-5 p-6">
          <h2 className="text-xl font-semibold text-zinc-100">
            {locale === "tr" ? "Hızlı İletişim Kanalları" : "Direct Channels"}
          </h2>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-200 hover:bg-white/10"
          >
            <MessageCircle className="size-4 text-[var(--accent)]" />
            WhatsApp: {siteConfig.phone}
          </a>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-200">
            <Mail className="size-4 text-[var(--accent)]" />
            {siteConfig.email}
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-200">
            <Phone className="size-4 text-[var(--accent)]" />
            {siteConfig.phone}
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-200">
            <MapPin className="size-4 text-[var(--accent)]" />
            {siteConfig.address.streetAddress}, {siteConfig.address.addressLocality}
          </div>
        </aside>

        <ContactForm locale={locale} action={submitContactAction} />
      </div>
    </section>
  );
}
