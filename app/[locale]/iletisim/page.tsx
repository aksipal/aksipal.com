import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { notFound } from "next/navigation";

import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig, seoKeywordsTr } from "@/lib/constants";
import { isLocale, withLocale } from "@/lib/i18n";
import {
  absoluteUrl,
  createPageMetadata,
  getBreadcrumbJsonLd,
  getOrganizationJsonLd,
} from "@/lib/seo";
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
    title:
      locale === "tr"
        ? "İletişim — AI, Otomasyon & Web Teklifi | Aksipal"
        : "Contact — AI, Automation & Web Inquiry | Aksipal",
    description:
      locale === "tr"
        ? "AI agent, WhatsApp / süreç otomasyonu, özel yazılım veya web sitesi teklifi için WhatsApp, telefon, e-posta veya formdan ulaşın. 24 saat içinde yazılı geri dönüş."
        : "Reach out for AI agent, WhatsApp / workflow automation, custom software or website quotes — WhatsApp, phone, email or form. Written reply within 24 hours.",
    keywords:
      locale === "tr"
        ? [...seoKeywordsTr, "iletişim", "AI teklif", "otomasyon teklif", "web sitesi teklif"]
        : undefined,
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

  const telHref = `tel:${siteConfig.phone.replace(/\s+/g, "")}`;
  const mailHref = `mailto:${siteConfig.email}`;

  const orgJsonLd = getOrganizationJsonLd();
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: locale === "tr" ? "Ana Sayfa" : "Home", url: absoluteUrl(`/${locale}`) },
    { name: locale === "tr" ? "İletişim" : "Contact", url: absoluteUrl(`/${locale}/iletisim`) },
  ]);

  return (
    <section className="section-shell pt-16">
      <div className="mb-10 max-w-3xl space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {locale === "tr"
            ? "İletişim — Projenizi 15 Dakikada Konuşalım"
            : "Contact — Let's Talk Your Project in 15 Minutes"}
        </h1>
        <p className="text-zinc-400">
          {locale === "tr"
            ? "AI agent, WhatsApp / süreç otomasyonu, özel yazılım veya web sitesi — projenizi kısaca anlatın, 24 saat içinde net bir aksiyon planı, sözleşmeli fiyat ve teslim tarihi ile dönüş yapayım. Acil ihtiyaçlar için WhatsApp en hızlısı."
            : "AI agent, WhatsApp / workflow automation, custom software or website — share a short brief and I'll respond within 24 hours with a clear plan, contracted price and delivery date. WhatsApp is fastest for urgent needs."}
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
            data-cta="contactpage-whatsapp"
            aria-label={locale === "tr" ? "WhatsApp ile yaz" : "Write on WhatsApp"}
          >
            <MessageCircle className="size-4 text-[var(--accent)]" aria-hidden />
            WhatsApp: {siteConfig.phone}
          </a>
          <a
            href={telHref}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-200 hover:bg-white/10"
            data-cta="contactpage-tel"
            aria-label={locale === "tr" ? "Telefon ile ara" : "Call by phone"}
          >
            <Phone className="size-4 text-[var(--accent)]" aria-hidden />
            {siteConfig.phone}
          </a>
          <a
            href={mailHref}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-200 hover:bg-white/10"
            data-cta="contactpage-mail"
          >
            <Mail className="size-4 text-[var(--accent)]" aria-hidden />
            {siteConfig.email}
          </a>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-200">
            <MapPin className="size-4 text-[var(--accent)]" aria-hidden />
            {siteConfig.address.streetAddress}, {siteConfig.address.addressLocality} · TR
          </div>
          <div className="rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/5 p-4 text-xs leading-6 text-zinc-300">
            {locale === "tr" ? (
              <>
                <strong className="text-zinc-100">Yanıt süresi:</strong> Hafta içi 09:00-19:00 arasında
                ortalama 1-2 saat; mesai dışında ertesi iş günü içinde dönüş yapılır.
              </>
            ) : (
              <>
                <strong className="text-zinc-100">Response time:</strong> 1-2 hours on weekdays
                between 09:00-19:00 (Turkey); next business day outside office hours.
              </>
            )}
          </div>
        </aside>

        <ContactForm locale={locale} />
      </div>

      <p className="mt-6 max-w-3xl text-xs leading-6 text-zinc-500">
        {locale === "tr" ? (
          <>
            Form üzerinden ilettiğiniz veriler yalnızca size geri dönüş yapmak için kullanılır;
            üçüncü taraflarla paylaşılmaz. Ayrıntılar için{" "}
            <Link href={withLocale(locale, "/kvkk-aydinlatma")} className="underline hover:text-zinc-300">
              KVKK Aydınlatma Metni
            </Link>{" "}
            ve{" "}
            <Link href={withLocale(locale, "/gizlilik-politikasi")} className="underline hover:text-zinc-300">
              Gizlilik Politikası
            </Link>
            .
          </>
        ) : (
          <>
            Submitted data is used only to respond to your inquiry and is not shared with third
            parties. See our{" "}
            <Link href={withLocale(locale, "/kvkk-aydinlatma")} className="underline hover:text-zinc-300">
              KVKK Notice
            </Link>{" "}
            and{" "}
            <Link href={withLocale(locale, "/gizlilik-politikasi")} className="underline hover:text-zinc-300">
              Privacy Policy
            </Link>
            .
          </>
        )}
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </section>
  );
}
