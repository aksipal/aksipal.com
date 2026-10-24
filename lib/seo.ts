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

/**
 * Vaka çalışması detay sayfaları için yapılandırılmış veri.
 * Gerçek işlerde (kind=client) `about` ile müşterinin canlı sitesi işaretlenir — arama motoru ve
 * AI sistemleri "Aksipal şu firmanın sitesini yaptı" ilişkisini kurabilsin. Senaryolarda eklenmez.
 */
export function getCaseStudyJsonLd(input: {
  title: string;
  description: string;
  pathname: string;
  locale: Locale;
  image?: string;
  clientUrl?: string;
  clientName?: string;
  isScenario?: boolean;
  isLab?: boolean;
  repoUrl?: string;
  youtubeId?: string;
}) {
  const pageUrl = absoluteUrl(`/${input.locale}${input.pathname}`);
  const imageUrl = absoluteUrl(input.image ?? "/favicon.png");

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    genre: input.isScenario ? "Solution scenario" : input.isLab ? "R&D project" : "Case study",
    ...(input.isLab && input.repoUrl
      ? {
          about: {
            "@type": "SoftwareSourceCode",
            name: input.title,
            codeRepository: input.repoUrl,
            author: { "@id": `${siteConfig.url}#barisaksipal` },
          },
        }
      : {}),
    ...(input.youtubeId
      ? {
          video: {
            "@type": "VideoObject",
            name: input.title,
            description: input.description,
            thumbnailUrl: `https://i.ytimg.com/vi/${input.youtubeId}/hqdefault.jpg`,
            embedUrl: `https://www.youtube-nocookie.com/embed/${input.youtubeId}`,
            contentUrl: `https://www.youtube.com/watch?v=${input.youtubeId}`,
            uploadDate: "2026-10-01",
          },
        }
      : {}),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    url: pageUrl,
    image: imageUrl,
    inLanguage: input.locale === "tr" ? "tr-TR" : "en-US",
    ...(input.clientUrl && !input.isScenario
      ? {
          about: {
            "@type": "Organization",
            name: input.clientName ?? input.title,
            url: input.clientUrl,
          },
        }
      : {}),
    author: {
      "@type": "Organization",
      "@id": `${siteConfig.url}#organization`,
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
      { "@type": "Country", name: "Türkiye" },
      { "@type": "City", name: "Ankara" },
      { "@type": "City", name: "İstanbul" },
      { "@type": "City", name: "İzmir" },
      { "@type": "City", name: "Bursa" },
      { "@type": "City", name: "Antalya" },
      { "@type": "City", name: "Kocaeli" },
      { "@type": "City", name: "Konya" },
      { "@type": "City", name: "Gaziantep" },
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
      "Kurumsal web sitesi geliştirme, e-ticaret yazılımı, kişiye özel yazılım geliştirme, yapay zeka ajanı (AI agent) entegrasyonu, resmi WhatsApp Cloud API ve n8n süreç otomasyonu",
    areaServed: { "@type": "Country", name: "Türkiye" },
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
    alternateName: ["Aksipal", "Akşipal Web Studio", "Aksipal Web Systems Studio"],
    slogan: "Kurumsal web sitesi, e-ticaret ve özel yazılım — yazılı sözleşme, sabit fiyat, tek muhatap.",
    url: siteConfig.url,
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: absoluteUrl("/favicon.png"),
    logo: absoluteUrl("/favicon.png"),
    foundingDate: "2020",
    founder: { "@id": `${siteConfig.url}#barisaksipal` },
    numberOfEmployees: { "@type": "QuantitativeValue", value: 1 },
    address: {
      "@type": "PostalAddress",
      ...siteConfig.address,
    },
    areaServed: {
      "@type": "Country",
      name: "Türkiye",
    },
    availableLanguage: ["tr", "en"],
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.9334,
      longitude: 32.8597,
    },
    priceRange: "₺₺",
    sameAs: [...siteConfig.sameAs],
    knowsAbout: [
      "Kurumsal Web Sitesi Geliştirme",
      "Kurumsal Web Tasarım",
      "E-Ticaret Yazılımı",
      "E-Ticaret Sitesi Kurulumu",
      "B2B Portal Geliştirme",
      "Özel Yazılım Geliştirme",
      "Kuruma Özel Uygulama",
      "Teknik SEO",
      "Çok Dilli Web Sitesi",
      "Next.js",
      "React",
      "TypeScript",
      "Java",
      "Python",
      "Node.js",
      "PostgreSQL",
      "iyzico Entegrasyonu",
      "Yapay Zeka Entegrasyonu",
      "AI Agent Development",
      "Claude API",
      "OpenAI API",
      "RAG (Retrieval-Augmented Generation)",
      "WhatsApp Cloud API",
      "Süreç Otomasyonu (n8n)",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Aksipal Web Studio Hizmet Kataloğu",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Kurumsal Web Sitesi Geliştirme",
          url: absoluteUrl("/tr/hizmetler/kurumsal-web-sitesi"),
        },
        {
          "@type": "OfferCatalog",
          name: "E-Ticaret Sitesi Geliştirme",
          url: absoluteUrl("/tr/hizmetler/e-ticaret"),
        },
        {
          "@type": "OfferCatalog",
          name: "Kişiye Özel Yazılım Geliştirme",
          url: absoluteUrl("/tr/hizmetler/ozel-yazilim"),
        },
        {
          "@type": "OfferCatalog",
          name: "Yapay Zeka Ajanı (AI Agent) Entegrasyonu",
          url: absoluteUrl("/tr/hizmetler"),
        },
        {
          "@type": "OfferCatalog",
          name: "WhatsApp ve Süreç Otomasyonu",
          url: absoluteUrl("/tr/hizmetler"),
        },
        {
          "@type": "OfferCatalog",
          name: "Sektöre Özel Hazır Web Sitesi Paketleri",
          url: absoluteUrl("/tr/templates"),
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
    jobTitle: "Senior Full-Stack Engineer · Kurucu",
    description:
      "Aksipal Web Studio kurucusu. 6+ yıl senior full-stack mühendislik: kurumsal web sitesi, e-ticaret ve kişiye özel yazılım geliştirme; Java/Python backend, Next.js ve yapay zeka entegrasyonları — Ankara'dan Türkiye geneline.",
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
      "Kurumsal Web Sitesi Geliştirme",
      "E-Ticaret Yazılımı",
      "Özel Yazılım Geliştirme",
      "Next.js",
      "React",
      "TypeScript",
      "Java",
      "Python",
      "Node.js",
      "PostgreSQL",
      "Teknik SEO",
      "Yapay Zeka Entegrasyonu",
      "Claude",
      "OpenAI",
      "RAG",
      "WhatsApp Cloud API",
      "n8n",
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

/** /isler listesi için ItemList — gerçek referansların toplu işareti */
export function getItemListJsonLd(input: {
  name: string;
  locale: Locale;
  items: { name: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: input.name,
    inLanguage: input.locale === "tr" ? "tr-TR" : "en-US",
    numberOfItems: input.items.length,
    itemListElement: input.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
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
      "@type": "Person",
      "@id": `${siteConfig.url}#barisaksipal`,
      name: "Barış Akşipal",
      url: absoluteUrl("/tr/hakkimda"),
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}#organization`,
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
