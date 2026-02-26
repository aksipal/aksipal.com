export const locales = ["tr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "tr";

export const localeLabel: Record<Locale, string> = {
  tr: "TR",
  en: "EN",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function withLocale(locale: Locale, pathname = "/") {
  return `/${locale}${pathname === "/" ? "" : pathname}`;
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "tr" ? "en" : "tr";
}

export const navItems = [
  {
    href: "/",
    label: {
      tr: "Ana Sayfa",
      en: "Home",
    },
  },
  {
    href: "/templates",
    label: {
      tr: "Şablonlar",
      en: "Templates",
    },
  },
  {
    href: "/hizmetler",
    label: {
      tr: "Hizmetler",
      en: "Services",
    },
  },
  {
    href: "/isler",
    label: {
      tr: "İşler",
      en: "Work",
    },
  },
  {
    href: "/blog",
    label: {
      tr: "Blog",
      en: "Blog",
    },
  },
  {
    href: "/ben-kimim",
    label: {
      tr: "Ben Kimim",
      en: "About",
    },
  },
  {
    href: "/iletisim",
    label: {
      tr: "İletişim",
      en: "Contact",
    },
  },
] as const;
