import { z } from "zod";

import type { Locale } from "@/lib/i18n";

/* ------------------------------------------------------------------ */
/*  Schemas                                                           */
/* ------------------------------------------------------------------ */

export const packageTierSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.string(),
  delivery: z.string(),
  revisions: z.string(),
  highlighted: z.boolean().optional().default(false),
  includes: z.array(z.string()).min(3),
});

export const enterpriseServiceSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.string(),
  priceNote: z.string().optional(),
  highlights: z.array(z.string()).min(2),
});

type RawTier = z.input<typeof packageTierSchema>;
type RawEnterprise = z.input<typeof enterpriseServiceSchema>;

/* ------------------------------------------------------------------ */
/*  Package Tiers – Launch / Growth / Scale                           */
/* ------------------------------------------------------------------ */

const tiersByLocale: Record<Locale, readonly RawTier[]> = {
  tr: [
    {
      id: "launch",
      name: "Başlangıç",
      description:
        "Sektörünüze özel, hızlı yayın paketi. Kurumsal web varlığınızı kısa sürede ve şeffaf fiyatla canlıya alın.",
      price: "17.000 TL + KDV",
      delivery: "4–5 iş günü",
      revisions: "1 revizyon turu",
      includes: [
        "Sektöre özel 6 sayfalık tasarım",
        "WhatsApp Cloud API yönlendirmesi",
        "Sosyal medya bağlantıları",
        "Teknik SEO temeli (meta, sitemap, robots)",
        "Mobil uyumlu (responsive) modern tasarım",
      ],
    },
    {
      id: "growth",
      name: "Gelişim",
      description:
        "Dönüşüm odaklı premium paket: gelişmiş arayüz, performans ve sektöre özel içerik blokları ile markanızı bir adım öne taşır.",
      price: "22.000 TL + KDV",
      delivery: "6–8 iş günü",
      revisions: "2 revizyon turu",
      highlighted: true,
      includes: [
        "10 sayfalık gelişmiş tasarım",
        "Premium UI bileşenleri ve güncel teknoloji altyapısı",
        "Sosyal medya, WhatsApp ve e-posta entegrasyonu",
        "Gelişmiş SEO ve Core Web Vitals iyileştirmesi",
        "Sektöre özel içerik ve dönüşüm blokları",
      ],
    },
    {
      id: "scale",
      name: "Kurumsal",
      description:
        "Tamamen size özel kurgu, çok dil, ileri düzey entegrasyonlar ve kullanıcı yönetimi içeren kapsamlı kurumsal paket.",
      price: "35.000 TL + KDV",
      delivery: "8–12 iş günü",
      revisions: "3 revizyon turu",
      includes: [
        "Sektöre göre tamamen özel tasarım",
        "İhtiyaca göre sınırsız sayfa",
        "Türkçe / İngilizce çift dil desteği",
        "Koyu tema ve gelişmiş tema sistemi",
        "Tamamen mobil uyumlu modern arayüz",
        "WhatsApp, sosyal medya ve e-posta entegrasyonu",
        "Kullanıcı giriş sistemi (Supabase auth)",
        "Vercel / Netlify yayın desteği",
        "Harici sistem ve backend servis entegrasyonu",
      ],
    },
  ],
  en: [
    {
      id: "launch",
      name: "Launch",
      description:
        "A sector-specific starter package to get your corporate web presence live fast at a transparent price.",
      price: "₺17,000 + VAT",
      delivery: "4–5 business days",
      revisions: "1 revision round",
      includes: [
        "Sector-specific 6-page design",
        "WhatsApp Cloud API routing",
        "Social media links",
        "Technical SEO foundation (meta, sitemap, robots)",
        "Mobile-friendly responsive modern design",
      ],
    },
    {
      id: "growth",
      name: "Growth",
      description:
        "Conversion-focused premium package: advanced UI, performance and sector-specific content blocks to step ahead.",
      price: "₺22,000 + VAT",
      delivery: "6–8 business days",
      revisions: "2 revision rounds",
      highlighted: true,
      includes: [
        "10-page advanced design",
        "Premium UI components and modern stack",
        "Social media, WhatsApp and email integration",
        "Advanced SEO and Core Web Vitals tuning",
        "Sector-specific content and conversion blocks",
      ],
    },
    {
      id: "scale",
      name: "Scale",
      description:
        "A fully custom solution with multi-language, advanced integrations and user management for enterprise needs.",
      price: "₺35,000 + VAT",
      delivery: "8–12 business days",
      revisions: "3 revision rounds",
      includes: [
        "Fully custom design tailored to your sector",
        "Unlimited pages based on your needs",
        "Turkish / English multi-language",
        "Dark mode and advanced theming",
        "Fully responsive, modern design",
        "WhatsApp, social media and email integration",
        "User authentication system (Supabase auth)",
        "Vercel / Netlify deployment support",
        "External system and backend integrations",
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Enterprise / Daha Büyük İşler                                     */
/* ------------------------------------------------------------------ */

const enterpriseByLocale: Record<Locale, readonly RawEnterprise[]> = {
  tr: [
    {
      id: "ai-agent",
      title: "Yapay Zeka Ajanı (AI Agent)",
      description:
        "Claude veya OpenAI tabanlı, şirket verinizi (PDF, web, CRM, Notion) bilen ve gerçek işlem yapabilen ajan. Müşteri desteği, satış öncesi soru yanıtlama veya iç verimlilik senaryoları için RAG, function calling ve WhatsApp / web entegrasyonu dahil teslim edilir.",
      price: "45.000 TL'den başlayan",
      priceNote: "Veri kaynağı ve entegrasyon sayısına göre kapsam keşif görüşmesinde netleştirilir (+KDV)",
      highlights: [
        "Claude / OpenAI · RAG (vektör veritabanı)",
        "WhatsApp, web widget, Slack veya Discord entegrasyonu",
        "Şirket verinizle (PDF, site, Notion, CRM) eğitilmiş",
        "Loglama, kullanım paneli ve maliyet kontrolü",
      ],
    },
    {
      id: "automation",
      title: "WhatsApp ve Süreç Otomasyonu",
      description:
        "n8n + yapay zeka ile uçtan uca otomasyon: form → CRM → e-posta → WhatsApp → fatura akışları. Tekrar eden manuel işi sırtınızdan alır, yanıt süresini saatlerden saniyelere çeker.",
      price: "35.000 TL'den başlayan",
      priceNote: "Akış sayısı ve entegre edilen sistem adedine göre değişir (+KDV)",
      highlights: [
        "Resmi WhatsApp Cloud API entegrasyonu",
        "Otomatik teklif, randevu ve sipariş akışları",
        "CRM, e-posta, Sheets ve fatura entegrasyonları",
        "n8n özel sunucu (self-host) veya bulut kurulumu",
      ],
    },
    {
      id: "ecommerce",
      title: "E-Ticaret",
      description:
        "Ürün yönetimi, sepet, ödeme ve sipariş takibini kapsayan, performans odaklı e-ticaret kurulumu. Kapsama bağlı olarak özel temalı veya bütünleşik altyapı sunulur.",
      price: "40.000 TL'den başlayan",
      priceNote: "Ürün adedi, ödeme sağlayıcı ve entegrasyonlara göre detaylı teklif çıkarılır (+KDV)",
      highlights: [
        "Ürün kataloğu ve yönetim paneli",
        "Sepet, ödeme ve iyzico/Stripe entegrasyonu",
        "Stok ve sipariş takibi, sipariş bildirim akışı",
        "Mobil öncelikli, hızlı ve SEO uyumlu altyapı",
      ],
    },
    {
      id: "custom-app",
      title: "Kuruma Özel Uygulama",
      description:
        "İhtiyacınıza özel kurgulanan, ölçeklenebilir backend ve modern arayüze sahip kurumsal düzeyde uygulama. İç panel, B2B portal veya SaaS MVP olarak teslim edilir.",
      price: "Görüşelim",
      priceNote: "Kapsam, ekran sayısı ve entegrasyona göre sprint bazlı teklif sunulur",
      highlights: [
        "Kuruma özel backend mimarisi (Java / Python / Node)",
        "Ölçeklenebilir ve güvenli altyapı",
        "Rol bazlı kullanıcı yönetimi ve yetkilendirme",
        "Sprint bazlı çalışan teslim, kaynak kod sizde",
      ],
    },
    {
      id: "custom-engineering",
      title: "Özel Mühendislik Projeleri",
      description:
        "Gömülü sistem, IoT, drone ve endüstriyel otomasyon gibi özel mühendislik kapsamları. Anahtar teslim teslimat, test ve saha doğrulaması dahildir.",
      price: "Görüşelim",
      priceNote: "İş yükü, test gereksinimleri ve saha kapsamı görüşmede netleştirilir",
      highlights: [
        "Gömülü sistem ve IoT entegrasyonları",
        "Anahtar teslim proje yönetimi",
        "Test, doğrulama ve saha kurulumu",
        "Örnek: tarımsal drone ilaçlama sistemi",
      ],
    },
  ],
  en: [
    {
      id: "ai-agent",
      title: "AI Agent",
      description:
        "Claude or OpenAI agent that knows your company data (PDFs, web, CRM, Notion) and can take real actions. For support, pre-sales question handling or internal productivity — with RAG, function calling and WhatsApp / web integration included.",
      price: "from ₺45,000",
      priceNote: "Final scope set by data sources and integration count (+VAT)",
      highlights: [
        "Claude / OpenAI · RAG (vector DB)",
        "WhatsApp, web widget, Slack or Discord integration",
        "Trained on your data (PDF, site, Notion, CRM)",
        "Logging, usage dashboard and cost control",
      ],
    },
    {
      id: "automation",
      title: "WhatsApp & Workflow Automation",
      description:
        "End-to-end automation with n8n + AI: form → CRM → email → WhatsApp → invoice. Takes repetitive manual work off your team and slashes response time from hours to seconds.",
      price: "from ₺35,000",
      priceNote: "Varies with number of flows and integrated systems (+VAT)",
      highlights: [
        "Official WhatsApp Cloud API integration",
        "Automated quote, appointment and order flows",
        "CRM / email / Sheets / invoice integrations",
        "Self-hosted or cloud n8n setup",
      ],
    },
    {
      id: "ecommerce",
      title: "E-Commerce",
      description:
        "Performance-focused e-commerce build with product management, cart, payments and order tracking. Delivered with a custom theme or integrated stack depending on scope.",
      price: "from ₺40,000",
      priceNote: "Detailed quote based on product count, payment provider and integrations (+VAT)",
      highlights: [
        "Product catalog and admin panel",
        "Cart, payments and iyzico/Stripe integration",
        "Inventory & order tracking, notification flows",
        "Mobile-first, fast and SEO-friendly",
      ],
    },
    {
      id: "custom-app",
      title: "Custom Application",
      description:
        "Enterprise-grade application built to your needs — scalable backend and modern interface. Delivered as an internal tool, B2B portal or SaaS MVP.",
      price: "Let's talk",
      priceNote: "Sprint-based quote based on scope, screens and integrations",
      highlights: [
        "Custom backend architecture (Java / Python / Node)",
        "Scalable and secure infrastructure",
        "Role-based user management and authorization",
        "Sprint-based working delivery; source code is yours",
      ],
    },
    {
      id: "custom-engineering",
      title: "Custom Engineering",
      description:
        "Specialized engineering projects: embedded systems, IoT, drones and industrial automation. Turnkey delivery, testing and on-site validation included.",
      price: "Let's talk",
      priceNote: "Workload, testing requirements and on-site scope discussed in discovery",
      highlights: [
        "Embedded systems and IoT integrations",
        "Turnkey project management",
        "Testing, validation and on-site deployment",
        "Example: agricultural drone spraying system",
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Process Steps & Revision Policy                                   */
/* ------------------------------------------------------------------ */

const processStepsByLocale: Record<Locale, readonly string[]> = {
  tr: [
    "Kısa keşif görüşmesi ve hedef belirleme",
    "Bilgi mimarisi, içerik ve wireframe",
    "Premium UI uygulaması ve performans optimizasyonu",
    "Test, revizyonlar ve canlıya alım",
  ],
  en: [
    "Brief discovery call and goal setting",
    "Information architecture, content and wireframe",
    "Premium UI implementation and performance tuning",
    "Testing, revisions and go-live",
  ],
};

const revisionPolicyByLocale: Record<
  Locale,
  { template: string; custom: string }
> = {
  tr: {
    template:
      "Paketlerde belirtilen revizyon turu kadar tasarım ve içerik güncellemesi dahildir. Ek revizyon talepleri görüşmede netleştirilir.",
    custom:
      "Özel yazılım ve yapay zeka projelerinde sprint bazlı teslim ve şeffaf değişiklik yönetimi uygulanır.",
  },
  en: {
    template:
      "Design and content updates are included up to the revision rounds specified in each package. Additional revisions are scoped on request.",
    custom:
      "Custom software and AI projects follow sprint-based delivery and transparent change management.",
  },
};

/* ------------------------------------------------------------------ */
/*  Locale-aware getters                                              */
/* ------------------------------------------------------------------ */

export function getPackageTiers(locale: Locale) {
  return z.array(packageTierSchema).parse(tiersByLocale[locale]);
}

export function getEnterpriseServices(locale: Locale) {
  return z.array(enterpriseServiceSchema).parse(enterpriseByLocale[locale]);
}

export function getProcessSteps(locale: Locale) {
  return processStepsByLocale[locale];
}

export function getRevisionPolicy(locale: Locale) {
  return revisionPolicyByLocale[locale];
}

/* ------------------------------------------------------------------ */
/*  Default TR exports (SEO, backward compat)                         */
/* ------------------------------------------------------------------ */

export const packageTiers = getPackageTiers("tr");
export const enterpriseServices = getEnterpriseServices("tr");
export const processSteps = processStepsByLocale.tr;
export const revisionPolicy = revisionPolicyByLocale.tr;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export type PackageTier = z.infer<typeof packageTierSchema>;
export type EnterpriseService = z.infer<typeof enterpriseServiceSchema>;
