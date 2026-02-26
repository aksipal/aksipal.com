import Link from "next/link";
import { Instagram, Linkedin, Youtube } from "lucide-react";

import { siteConfig } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const socialConfig = [
  { href: siteConfig.sameAs[0], label: "LinkedIn", Icon: Linkedin },
  { href: siteConfig.sameAs[1], label: "Instagram", Icon: Instagram },
  {
    href: siteConfig.sameAs[2],
    label: "X",
    Icon: () => (
      <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  { href: siteConfig.sameAs[3], label: "YouTube", Icon: Youtube },
  {
    href: siteConfig.sameAs[4],
    label: "TikTok",
    Icon: () => (
      <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="currentColor" aria-hidden>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
  },
] as const;

type SiteFooterProps = {
  locale: Locale;
};

export function SiteFooter({ locale }: SiteFooterProps) {
  const copy = {
    tr: {
      pitch: "Premium web deneyimi ve sürdürülebilir dijital altyapı.",
      quickLinks: "Hızlı Linkler",
      contact: "İletişim",
      legal: "Yasal",
      privacy: "Gizlilik",
      kvkk: "KVKK",
      rights: "Tüm hakları saklıdır.",
    },
    en: {
      pitch: "Premium web experiences and scalable digital infrastructure.",
      quickLinks: "Quick Links",
      contact: "Contact",
      legal: "Legal",
      privacy: "Privacy",
      kvkk: "Data Policy",
      rights: "All rights reserved.",
    },
  }[locale];

  const whatsappHref = buildWhatsAppLink({
    sector: "Genel",
    template: "Özel Çalışma",
    city: "Ankara",
    budget: "Belirtilecek",
  });

  return (
    <footer className="mt-20 border-t border-white/10 bg-[#07070b]/70">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4 lg:col-span-2">
          <p className="text-lg font-semibold text-white">{siteConfig.legalName}</p>
          <p className="max-w-md text-sm text-zinc-400">{copy.pitch}</p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center text-sm text-[var(--accent)] hover:brightness-110"
          >
            WhatsApp: {siteConfig.phone}
          </a>
          <div className="flex items-center gap-3 pt-1">
            {socialConfig.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-zinc-200">{copy.quickLinks}</p>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>
              <Link href={withLocale(locale, "/templates")} className="hover:text-zinc-100">
                Templates
              </Link>
            </li>
            <li>
              <Link href={withLocale(locale, "/hizmetler")} className="hover:text-zinc-100">
                {locale === "tr" ? "Hizmetler" : "Services"}
              </Link>
            </li>
            <li>
              <Link href={withLocale(locale, "/isler")} className="hover:text-zinc-100">
                {locale === "tr" ? "Referanslar" : "Work"}
              </Link>
            </li>
            <li>
              <Link href={withLocale(locale, "/blog")} className="hover:text-zinc-100">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-zinc-200">{copy.contact}</p>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>{siteConfig.email}</li>
            <li>{siteConfig.phone}</li>
            <li>{siteConfig.address.addressLocality}, Turkey</li>
          </ul>
          <div className="pt-4">
            <p className="mb-2 text-sm font-semibold text-zinc-200">{copy.legal}</p>
            <div className="flex gap-4 text-sm text-zinc-400">
              <Link href={withLocale(locale, "/iletisim")} className="hover:text-zinc-100">
                {copy.privacy}
              </Link>
              <Link href={withLocale(locale, "/iletisim")} className="hover:text-zinc-100">
                {copy.kvkk}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Aksipal. {copy.rights}
      </div>
    </footer>
  );
}
