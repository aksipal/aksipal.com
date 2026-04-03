import type { Metadata } from "next";

import { enterpriseServices, packageTiers } from "@/lib/pricing";
import { siteConfig } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";

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

export function createPageMetadata({
  title,
  description,
  pathname,
  locale,
  image = "/opengraph-image.png",
  keywords,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(`/${locale}${pathname === "/" ? "" : pathname}`);

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical,
      languages: {
        tr: absoluteUrl(`/tr${pathname === "/" ? "" : pathname}`),
        en: absoluteUrl(`/en${pathname === "/" ? "" : pathname}`),
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      type: "website",
      images: [
        {
          url: absoluteUrl(image),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
  image: string;
}) {
  const pageUrl = absoluteUrl(`/${input.locale}${input.pathname}`);
  const imageUrl = absoluteUrl(input.image);

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
    },
  };
}

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: absoluteUrl("/favicon.png"),
    address: {
      "@type": "PostalAddress",
      ...siteConfig.address,
    },
    areaServed: "TR",
    sameAs: siteConfig.sameAs,
  };
}

export function getServiceJsonLd() {
  const offers = packageTiers.map((tier) => ({
    "@type": "Offer",
    name: tier.name,
    price: tier.price.replace(/[^\d]/g, ""),
    priceCurrency: "TRY",
    description: tier.description,
  }));

  const customServices = enterpriseServices.map((service) => ({
    "@type": "Service",
    name: service.title,
    description: service.description,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType:
      "Kurumsal web sitesi geliştirme, hazır web sitesi şablonları ve özel yazılım (web sitesi yaptırma, SEO uyumlu teslim)",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Aksipal Paketleri",
      itemListElement: offers,
    },
    additionalType: customServices,
  };
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
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
      sameAs: [...siteConfig.sameAs],
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
    name: siteConfig.legalName,
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
      "Web Sitesi Geliştirme",
      "Kurumsal Web Tasarım",
      "SEO",
      "Next.js",
      "React",
      "TypeScript",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Sitesi Paketleri",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Hazır Web Sitesi Şablonları",
        },
        {
          "@type": "OfferCatalog",
          name: "Kurumsal Web Sitesi Geliştirme",
        },
        {
          "@type": "OfferCatalog",
          name: "Özel Yazılım Projeleri",
        },
      ],
    },
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
    author: {
      "@type": "Person",
      name: "Aksipal",
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
