import type { Metadata } from "next";

import { advancedServices, packageTiers } from "@/lib/pricing";
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
};

export function createPageMetadata({
  title,
  description,
  pathname,
  locale,
  image = "/opengraph-image",
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(`/${locale}${pathname === "/" ? "" : pathname}`);

  return {
    title,
    description,
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

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.legalName,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: absoluteUrl("/opengraph-image"),
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

  const customServices = advancedServices.map((service) => ({
    "@type": "Service",
    name: service.title,
    description: service.description,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Web tasarım ve yazılım geliştirme",
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
        url: absoluteUrl("/opengraph-image"),
      },
    },
    mainEntityOfPage: absoluteUrl(`/tr/blog/${input.slug}`),
    keywords: input.tags.join(", "),
  };
}
