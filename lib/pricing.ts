import { z } from "zod";

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

export const advancedServiceSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  outputs: z.array(z.string()).min(2),
});

const rawPackageTiers = [
  {
    id: "launch",
    name: "Launch",
    description: "Hızlı yayına çıkmak isteyen işletmeler için.",
    price: "₺14.900",
    delivery: "4-5 gün",
    revisions: "1 revizyon turu",
    includes: [
      "5 sayfaya kadar kurulum",
      "WhatsApp entegrasyonu",
      "Temel teknik SEO",
      "Mobil performans optimizasyonu",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    description: "Dönüşüm ve marka algısı odaklı premium paket.",
    price: "₺22.900",
    delivery: "6-8 gün",
    revisions: "2 revizyon turu",
    highlighted: true,
    includes: [
      "10+ bölüm, gelişmiş UI sistemi",
      "Sektöre özel içerik blokları",
      "Form + analiz + etkinlik takibi",
      "Performans + SEO + Core Web Vitals tuning",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    description: "Şablon tabanlı ama ileri seviye ihtiyaçları kapsayan kurulum.",
    price: "₺32.900",
    delivery: "8-12 gün",
    revisions: "3 revizyon turu",
    includes: [
      "Çoklu dil (TR/EN) yapı",
      "Gelişmiş blog / içerik altyapısı",
      "A/B testlenebilir CTA yapısı",
      "3. parti entegrasyon bağlantıları",
    ],
  },
] as const;

const rawAdvancedServices = [
  {
    id: "commerce",
    title: "E-ticaret",
    description: "Headless veya platform bazlı mağaza kurgusu ve checkout optimizasyonu.",
    outputs: [
      "Ürün/PIM entegrasyonları",
      "Ödeme ve kargo akışı",
      "Kampanya ve sepet dönüşüm optimizasyonu",
    ],
  },
  {
    id: "backend",
    title: "Backend & API",
    description: "Ölçeklenebilir API katmanı, auth, rol yönetimi ve veri modelleme.",
    outputs: [
      "REST/GraphQL servisleri",
      "Yetkilendirme ve güvenlik hardening",
      "Panel veya mobil uygulama backend'i",
    ],
  },
  {
    id: "automation",
    title: "Entegrasyon & Otomasyon",
    description: "CRM, ERP, WhatsApp ve operasyon araçlarını tek hatta birleştirme.",
    outputs: [
      "Webhook ve event tabanlı otomasyon",
      "Tekrarlayan işlerin otomatikleştirilmesi",
      "Raporlama ve izleme panelleri",
    ],
  },
  {
    id: "saas",
    title: "SaaS MVP",
    description: "Fikirden ilk kullanıcıya giden uçtan uca ürün geliştirme.",
    outputs: [
      "Ürün mimarisi + tasarım sistemi",
      "Ödeme/abonelik altyapısı",
      "MVP sonrası büyüme yol haritası",
    ],
  },
] as const;

export const packageTiers = z.array(packageTierSchema).parse(rawPackageTiers);
export const advancedServices = z
  .array(advancedServiceSchema)
  .parse(rawAdvancedServices);

export const processSteps = [
  "Kısa keşif görüşmesi + hedef belirleme",
  "Bilgi mimarisi, içerik ve wireframe",
  "Premium UI uygulaması + optimizasyon",
  "Test, revizyonlar ve yayına alma",
] as const;

export const revisionPolicy = {
  template:
    "Paketlerde belirtilen revizyon turu kadar tasarım/icerik güncellemesi dahildir.",
  custom:
    "Özel yazılım projelerinde sprint bazlı teslim ve değişiklik yönetimi uygulanır.",
} as const;
