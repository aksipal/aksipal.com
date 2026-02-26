import { z } from "zod";

const caseMetricSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const caseSchema = z.object({
  slug: z.string(),
  title: z.string(),
  sector: z.string(),
  summary: z.string(),
  problem: z.string(),
  solution: z.string(),
  stack: z.array(z.string()).min(2),
  metrics: z.array(caseMetricSchema).min(2),
  image: z.string(),
});

const rawCases = [
  {
    slug: "istanbul-emlak-hizli-yayin",
    title: "İstanbul Emlak - 5 Günde Yayın",
    sector: "Emlak",
    summary: "Yavaş ve dağınık siteden premium ilan vitrini deneyimine geçiş.",
    problem:
      "Firma mobilde geç açılan eski site nedeniyle reklam trafiğini lead'e çeviremiyordu.",
    solution:
      "Şablon tabanlı hızlı kurulum + ilan filtreleri + WhatsApp CTA akışı ile dönüşüm hattı yeniden tasarlandı.",
    stack: ["Next.js", "TypeScript", "Vercel", "Schema.org SEO"],
    metrics: [
      { label: "LCP", value: "1.9s" },
      { label: "Lighthouse Performance", value: "95" },
      { label: "Lead Artışı", value: "%38" },
    ],
    image: "/images/cases/emlak-case.svg",
  },
  {
    slug: "ankara-lojistik-teklif-akisi",
    title: "Ankara Lojistik - Teklif Akışı",
    sector: "Taşımacılık",
    summary: "Çok adımlı teklif süreci tek sayfada sadeleştirildi.",
    problem:
      "Müşteriler hizmet kapsamını anlayamıyor, teklif formu yarım bırakılıyordu.",
    solution:
      "Dönüşüm odaklı bilgi mimarisi, net paket kartları ve mobil-first form deneyimi uygulandı.",
    stack: ["Next.js App Router", "Server Actions", "Tailwind CSS"],
    metrics: [
      { label: "Form Tamamlama", value: "+%44" },
      { label: "CLS", value: "0.01" },
      { label: "Bounce Azalışı", value: "%27" },
    ],
    image: "/images/cases/lojistik-case.svg",
  },
  {
    slug: "izmir-klinik-randevu",
    title: "İzmir Klinik - Randevu Dönüşümü",
    sector: "Klinik",
    summary: "Güven odaklı arayüz ile randevu dönüşüm oranı yükseltildi.",
    problem:
      "Klinik sitesi içerik kalabalığı yüzünden ziyaretçiye güven ve netlik veremiyordu.",
    solution:
      "Doktor profilleri, tedavi akışları ve güçlü sosyal kanıt bloklarıyla sade premium tasarım kurgulandı.",
    stack: ["Next.js", "MDX", "Structured Data", "Image Optimization"],
    metrics: [
      { label: "Randevu Talebi", value: "+%33" },
      { label: "TTFB", value: "120ms" },
      { label: "SEO Görünürlük", value: "+%29" },
    ],
    image: "/images/cases/klinik-case.svg",
  },
] as const;

export const cases = z.array(caseSchema).parse(rawCases);

export type CaseItem = z.infer<typeof caseSchema>;
