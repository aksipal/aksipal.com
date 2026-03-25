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
        "Sektörünüze özel, hızlı başlangıç paketi. Profesyonel web varlığınızı en kısa sürede yayına alın.",
      price: "₺17.000",
      delivery: "4–5 gün",
      revisions: "1 revizyon turu",
      includes: [
        "Sektöre özel 6 sayfalık tasarım",
        "WhatsApp entegrasyonu",
        "Sosyal medya bağlantıları",
        "Temel SEO optimizasyonu",
        "Mobil uyumlu (responsive) tasarım",
      ],
    },
    {
      id: "growth",
      name: "Gelişim",
      description:
        "Dönüşüm odaklı, gelişmiş UI ve modern teknoloji altyapısıyla markanızı bir adım öne taşıyan premium paket.",
      price: "₺22.000",
      delivery: "6–8 gün",
      revisions: "2 revizyon turu",
      highlighted: true,
      includes: [
        "10 sayfalık gelişmiş tasarım",
        "Modern UI ve güncel teknoloji altyapısı",
        "Sosyal medya, WhatsApp ve e-posta entegrasyonu",
        "Gelişmiş SEO + Core Web Vitals optimizasyonu",
        "Sektöre özel içerik blokları",
      ],
    },
    {
      id: "scale",
      name: "Kurumsal",
      description:
        "Sektörünüze tamamen özel, ileri düzey altyapı ve entegrasyonlar içeren kapsamlı çözüm.",
      price: "₺35.000",
      delivery: "8–12 gün",
      revisions: "3 revizyon turu",
      includes: [
        "Sektöre göre tamamen özel tasarım",
        "İhtiyaca göre sınırsız sayfa",
        "Çoklu dil desteği (TR / EN)",
        "Dark mode ve gelişmiş tema sistemi",
        "Full responsive, modern dizayn",
        "WhatsApp, sosyal medya ve e-posta entegrasyonu",
        "Hazır kullanıcı giriş sistemi (Supabase auth)",
        "Netlify / GoDaddy deploy desteği",
        "Harici backend servis entegrasyonu",
      ],
    },
  ],
  en: [
    {
      id: "launch",
      name: "Launch",
      description:
        "A sector-specific starter package to get your professional web presence live fast.",
      price: "₺17,000",
      delivery: "4–5 days",
      revisions: "1 revision round",
      includes: [
        "Sector-specific 6-page design",
        "WhatsApp integration",
        "Social media links",
        "Basic SEO optimization",
        "Mobile-friendly responsive design",
      ],
    },
    {
      id: "growth",
      name: "Growth",
      description:
        "A conversion-focused premium package with advanced UI and modern tech to elevate your brand.",
      price: "₺22,000",
      delivery: "6–8 days",
      revisions: "2 revision rounds",
      highlighted: true,
      includes: [
        "10-page advanced design",
        "Modern UI and cutting-edge tech stack",
        "Social media, WhatsApp and email integration",
        "Advanced SEO + Core Web Vitals optimization",
        "Sector-specific content blocks",
      ],
    },
    {
      id: "scale",
      name: "Scale",
      description:
        "A fully custom solution designed for your sector with advanced infrastructure and integrations.",
      price: "₺35,000",
      delivery: "8–12 days",
      revisions: "3 revision rounds",
      includes: [
        "Fully custom design tailored to your sector",
        "Unlimited pages based on your needs",
        "Multi-language support (TR / EN)",
        "Dark mode and advanced theming",
        "Fully responsive, modern design",
        "WhatsApp, social media and email integration",
        "Built-in authentication system (Supabase auth)",
        "Netlify / GoDaddy deployment support",
        "External backend service integration",
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
      id: "ecommerce",
      title: "Minimal E-Ticaret",
      description:
        "Ürün yönetimi, sepet, ödeme ve sipariş takibi içeren minimal ama tam fonksiyonel bir e-ticaret çözümü.",
      price: "₺50.000",
      highlights: [
        "Ürün kataloğu ve yönetim paneli",
        "Sepet ve ödeme altyapısı",
        "Stok ve sipariş takibi",
        "Mobil uyumlu, hızlı ve SEO dostu",
      ],
    },
    {
      id: "custom-app",
      title: "Kişiye / Kuruma Özel Uygulama",
      description:
        "İhtiyacınıza özel tasarlanan, ölçeklenebilir backend ve modern arayüz ile kurumsal düzeyde uygulama geliştirme.",
      price: "₺100.000",
      priceNote: "1 aylık süre dahil · her ek ay +₺100.000",
      highlights: [
        "Kişiye veya kuruma özel backend mimarisi",
        "Ölçeklenebilir ve güvenli altyapı",
        "Kullanıcı yönetimi ve yetkilendirme",
        "1 aylık temel geliştirme süreci dahil",
      ],
    },
    {
      id: "custom-engineering",
      title: "Kişiye Özel Mühendislik Çözümleri",
      description:
        "Gömülü sistem, IoT, drone ve endüstriyel otomasyon gibi özel mühendislik projeleri. Anahtar teslim teslimat ve test süreçleri dahildir.",
      price: "₺150.000 / ay",
      priceNote: "İş yükü, yapılacak testler ve proje kapsamına göre değişkenlik gösterir",
      highlights: [
        "Gömülü sistem ve IoT entegrasyonları",
        "Anahtar teslim proje yönetimi",
        "Test, doğrulama ve saha kurulumu",
        "Örnek: Tarımsal drone ilaçlama sistemi",
      ],
    },
  ],
  en: [
    {
      id: "ecommerce",
      title: "Minimal E-Commerce",
      description:
        "A minimal yet fully functional e-commerce solution with product management, cart, payments and order tracking.",
      price: "₺50,000",
      highlights: [
        "Product catalog and admin panel",
        "Cart and payment infrastructure",
        "Inventory and order tracking",
        "Mobile-friendly, fast and SEO-optimized",
      ],
    },
    {
      id: "custom-app",
      title: "Custom Application",
      description:
        "Enterprise-grade application development with a custom backend and modern interface tailored to your needs.",
      price: "₺100,000",
      priceNote: "1-month base included · each additional month +₺100,000",
      highlights: [
        "Custom backend architecture",
        "Scalable and secure infrastructure",
        "User management and authorization",
        "1-month base development period included",
      ],
    },
    {
      id: "custom-engineering",
      title: "Custom Engineering Solutions",
      description:
        "Specialized engineering projects including embedded systems, IoT, drones and industrial automation. Turnkey delivery and testing included.",
      price: "₺150,000 / mo",
      priceNote: "Varies based on workload, testing requirements and project scope",
      highlights: [
        "Embedded systems and IoT integrations",
        "Turnkey project management",
        "Testing, validation and field deployment",
        "Example: Agricultural drone spraying system",
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Process Steps & Revision Policy                                   */
/* ------------------------------------------------------------------ */

const processStepsByLocale: Record<Locale, readonly string[]> = {
  tr: [
    "Kısa keşif görüşmesi + hedef belirleme",
    "Bilgi mimarisi, içerik ve wireframe",
    "Premium UI uygulaması + optimizasyon",
    "Test, revizyonlar ve yayına alma",
  ],
  en: [
    "Brief discovery call + goal setting",
    "Information architecture, content and wireframe",
    "Premium UI implementation + optimization",
    "Testing, revisions and go-live",
  ],
};

const revisionPolicyByLocale: Record<
  Locale,
  { template: string; custom: string }
> = {
  tr: {
    template:
      "Paketlerde belirtilen revizyon turu kadar tasarım/içerik güncellemesi dahildir.",
    custom:
      "Özel yazılım projelerinde sprint bazlı teslim ve değişiklik yönetimi uygulanır.",
  },
  en: {
    template:
      "Design and content updates are included up to the revision rounds specified in each package.",
    custom:
      "Custom software projects follow sprint-based delivery and change management.",
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
