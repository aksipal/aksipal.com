import type { Metadata } from "next";

import { enterpriseServices, packageTiers } from "@/lib/pricing";
import { siteConfig } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";
import { defaultLocale } from "@/lib/i18n";

export function absoluteUrl(pathname = "") {
  return new URL(pathname, siteConfig.url).toString();
}

type PageMetadataInput = {
  title: string;
  description: string;
  pathname: string;
  locale: Locale;
  image?: string;
  /** Arama motorları için; vaka ve blog sayfalarında hedef anahtar kelimeler */
  keywords?: string[];
};

const TITLE_MAX = 60;
const DESC_MAX = 160;

function clamp(text: string, max: number) {
  if (!text) return text;
  if (text.length <= max) return text;
  // Kelime sınırına yakın kes ve "…" ekle (Türkçe karakter güvenli)
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd() + "…";
}

export function createPageMetadata({
  title,
  description,
  pathname,
  locale,
  image = "/opengraph-image.png",
  keywords,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(`/${locale}${pathname === "/" ? "" : pathname}`);
  const safeTitle = clamp(title, TITLE_MAX);
  const safeDescription = clamp(description, DESC_MAX);

  // x-default Türkiye odaklı olduğu için TR'ye işaret ediyor
  const trUrl = absoluteUrl(`/tr${pathname === "/" ? "" : pathname}`);
  const enUrl = absoluteUrl(`/en${pathname === "/" ? "" : pathname}`);

  return {
    title: safeTitle,
    description: safeDescription,
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical,
      languages: {
        tr: trUrl,
        "tr-TR": trUrl,
        en: enUrl,
        "en-US": enUrl,
        "x-default": defaultLocale === "tr" ? trUrl : enUrl,
      },
    },
    openGraph: {
      title: safeTitle,
      description: safeDescription,
      url: canonical,
      siteName: siteConfig.name,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      type: "website",
      images: [
        {
          url: absoluteUrl(image),
          width: 1200,
          height: 630,
          alt: safeTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: safeTitle,
      description: safeDescription,
      images: [absoluteUrl(image)],
    },
  };
}

/** Vaka çalışması detay sayfaları için yapılandırılmış veri (Article + yayıncı) */
export function getCaseStudyJsonLd(input: {
  title: string;
  description: string;
  pathname: string;
  locale: Locale;
  image?: string;
}) {
  const pageUrl = absoluteUrl(`/${input.locale}${input.pathname}`);
  const imageUrl = absoluteUrl(input.image ?? "/favicon.png");

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    url: pageUrl,
    image: imageUrl,
    inLanguage: input.locale === "tr" ? "tr-TR" : "en-US",
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/favicon.png"),
      },
    },
  };
}

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}#localbusiness`,
    name: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: absoluteUrl("/favicon.png"),
    priceRange: "₺₺",
    address: {
      "@type": "PostalAddress",
      ...siteConfig.address,
    },
    areaServed: [
      { "@type": "Country", name: "TR" },
      { "@type": "City", name: "Ankara" },
      { "@type": "City", name: "İstanbul" },
      { "@type": "City", name: "İzmir" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    sameAs: siteConfig.sameAs,
  };
}

export function getServiceJsonLd() {
  const offers = packageTiers.map((tier) => ({
    "@type": "Offer",
    name: tier.name,
    price: tier.price.replace(/[^\d]/g, ""),
    priceCurrency: "TRY",
    availability: "https://schema.org/InStock",
    description: tier.description,
    url: absoluteUrl("/tr/hizmetler"),
    seller: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
  }));

  const enterpriseOffers = enterpriseServices.map((svc) => ({
    "@type": "Offer",
    name: svc.title,
    description: svc.description,
    priceCurrency: "TRY",
    price: svc.price.replace(/[^\d]/g, "") || undefined,
    availability: "https://schema.org/InStock",
    url: absoluteUrl("/tr/hizmetler"),
  }));

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType:
      "Yapay zeka ajanı (AI agent) geliştirme, resmi WhatsApp Cloud API ve n8n süreç otomasyonu, özel yazılım geliştirme, kurumsal web sitesi geliştirme ve sektöre özel hazır web sitesi şablonları",
    areaServed: { "@type": "Country", name: "TR" },
    provider: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
      logo: absoluteUrl("/favicon.png"),
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Aksipal Web Studio Hizmet Paketleri",
      itemListElement: [...offers, ...enterpriseOffers],
    },
  };
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: ["tr-TR", "en-US"],
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/favicon.png"),
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/tr?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: absoluteUrl("/favicon.png"),
    logo: absoluteUrl("/favicon.png"),
    address: {
      "@type": "PostalAddress",
      ...siteConfig.address,
    },
    areaServed: {
      "@type": "Country",
      name: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.9334,
      longitude: 32.8597,
    },
    priceRange: "₺₺",
    sameAs: [...siteConfig.sameAs],
    knowsAbout: [
      "Yapay Zeka Ajanı Geliştirme",
      "AI Agent Development",
      "Yapay Zeka Entegrasyonu",
      "Claude API",
      "OpenAI API",
      "RAG (Retrieval-Augmented Generation)",
      "WhatsApp Otomasyonu",
      "WhatsApp Cloud API",
      "Süreç Otomasyonu (n8n)",
      "İş Süreçleri Otomasyonu",
      "Özel Yazılım Geliştirme",
      "Web Sitesi Geliştirme",
      "Kurumsal Web Tasarım",
      "Teknik SEO",
      "Next.js",
      "React",
      "TypeScript",
      "Java",
      "Python",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Aksipal Web Studio Hizmet Kataloğu",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Yapay Zeka Ajanı (AI Agent) Geliştirme",
        },
        {
          "@type": "OfferCatalog",
          name: "WhatsApp ve Süreç Otomasyonu",
        },
        {
          "@type": "OfferCatalog",
          name: "Özel Yazılım Projeleri",
        },
        {
          "@type": "OfferCatalog",
          name: "Kurumsal Web Sitesi Geliştirme",
        },
        {
          "@type": "OfferCatalog",
          name: "Sektöre Özel Hazır Web Sitesi Şablonları",
        },
      ],
    },
  };
}

/** Founder Person şeması — E-E-A-T için ayrı entity */
export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}#barisaksipal`,
    name: "Barış Akşipal",
    givenName: "Barış",
    familyName: "Akşipal",
    jobTitle: "Senior Full-Stack & AI Engineer",
    description:
      "6+ yıl senior full-stack mühendislik. Yapay zeka ajanı (AI agent) geliştirme, WhatsApp ve süreç otomasyonu, özel yazılım ve premium kurumsal web — Ankara.",
    url: absoluteUrl("/tr/hakkimda"),
    image: absoluteUrl("/favicon.png"),
    email: `mailto:${siteConfig.email}`,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ankara",
      addressCountry: "TR",
    },
    worksFor: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
    knowsAbout: [
      "Yapay Zeka Ajanı",
      "AI Agent",
      "Claude",
      "OpenAI",
      "RAG",
      "n8n",
      "WhatsApp Cloud API",
      "Next.js",
      "Java",
      "Python",
    ],
    knowsLanguage: ["tr", "en"],
    sameAs: [...siteConfig.sameAs],
  };
}

export function getFaqJsonLd(
  items: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getBreadcrumbJsonLd(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getBlogPostingJsonLd(input: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  tags: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    datePublished: input.publishedAt,
    dateModified: input.publishedAt,
    inLanguage: "tr-TR",
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.png"),
      },
    },
    mainEntityOfPage: absoluteUrl(`/tr/blog/${input.slug}`),
    keywords: input.tags.join(", "),
  };
}
