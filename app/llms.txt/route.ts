import { cases } from "@/lib/cases";
import { siteConfig } from "@/lib/constants";
import { getBlogPosts } from "@/lib/mdx";
import { getServices } from "@/lib/services";

export const dynamic = "force-static";

/**
 * /llms.txt — yapay zeka asistanları ve ajanlar için sitenin düz metin özeti (llmstxt.org formatı).
 * Büyük AI arama botlarının bu dosyayı okuduğu kanıtlanmış değil; ancak maliyeti sıfır,
 * kodlama asistanları ve ajan araçları okuyor. Asıl görünürlük işi HTML sayfaların kendisinde.
 * Yalnızca doğrulanabilir bilgi: gerçek referanslar ayrı, örnek senaryolar ayrı listelenir.
 */
export async function GET() {
  const services = getServices("tr");
  const posts = await getBlogPosts();
  const clientCases = cases.filter((c) => c.kind === "client");
  const scenarios = cases.filter((c) => c.kind === "scenario");
  const labs = cases.filter((c) => c.kind === "lab");

  const lines: string[] = [
    `# ${siteConfig.legalName}`,
    "",
    `> Ankara merkezli, Türkiye genelinde firmalara uzaktan hizmet veren web ve yazılım stüdyosu. Kurumsal web sitesi, e-ticaret altyapısı ve kişiye özel yazılım geliştirir; ihtiyaç halinde yapay zeka (Claude/OpenAI, RAG) ve WhatsApp / n8n süreç otomasyonu entegre eder. Kurucu: Barış Akşipal (6+ yıl senior full-stack mühendis). Yazılı sözleşme, sabit fiyat, kaynak kod müşteriye ait, tek muhatap.`,
    "",
    "Hedef kitle: kurumsal ve orta ölçekli firmalar, büyüyen işletmeler, üretici/distribütörler (B2B portal), girişimler (MVP). Dil: Türkçe (ana), İngilizce.",
    `İletişim: ${siteConfig.email} · WhatsApp/Telefon ${siteConfig.phone} · ${siteConfig.url}/tr/iletisim`,
    "Teknolojiler: Next.js, React, TypeScript, Tailwind CSS, Java/Spring, Python/FastAPI, Node.js, PostgreSQL, iyzico/Stripe, Vercel/Netlify, Claude API, OpenAI API, WhatsApp Cloud API, n8n.",
    "",
    "## Hizmetler",
    "",
    ...services.map(
      (s) => `- [${s.name}](${siteConfig.url}/tr/hizmetler/${s.slug}): ${s.answer}`,
    ),
    `- [Yapay zeka ajanı ve WhatsApp / süreç otomasyonu](${siteConfig.url}/tr/hizmetler): Claude veya OpenAI tabanlı, şirket verisini RAG ile bilen asistanlar; resmi WhatsApp Cloud API ve n8n ile iş akışı otomasyonu. Fiyat kapsama göre yazılı teklifle belirlenir. Bu alanda henüz yayınlanmış müşteri referansı yoktur; sitedeki kayıtlar örnek senaryodur.`,
    `- [Tüm paketler ve fiyatlar](${siteConfig.url}/tr/hizmetler): Kurumsal web 20.000 / 35.000 / 50.000 TL + KDV (4–12 iş günü). E-ticaret, yapay zeka, otomasyon ve özel yazılım kapsama göre teklif.`,
    `- [Sektörel başlangıç paketleri](${siteConfig.url}/tr/templates): teknoloji, sağlık, lojistik, enerji, inşaat, turizm vb. için hazır kurumsal web paketleri, 4–7 iş günü.`,
    "",
    "## Yayında olan gerçek referanslar",
    "",
    ...clientCases.map(
      (c) =>
        `- [${c.title}](${siteConfig.url}/tr/isler/${c.slug}): ${c.sector}. ${c.summary}${c.demoUrl ? ` Canlı site: ${c.demoUrl}` : ""}`,
    ),
    "",
    "## Ar-Ge ve oyun projeleri (kişisel, açık kaynak — müşteri işi değildir)",
    "",
    ...labs.map(
      (c) =>
        `- [${c.title}](${siteConfig.url}/tr/isler/${c.slug}): ${c.summary}${c.repoUrl ? ` Kaynak: ${c.repoUrl}` : ""}${c.youtubeId ? ` Video: https://www.youtube.com/watch?v=${c.youtubeId}` : ""}`,
    ),
    "",
    "## Örnek çözüm senaryoları (müşteri referansı değildir)",
    "",
    ...scenarios.map((c) => `- [${c.title}](${siteConfig.url}/tr/isler/${c.slug}): ${c.summary}`),
    "",
    "## Blog",
    "",
    ...posts.map((p) => `- [${p.title}](${siteConfig.url}/tr/blog/${p.slug}): ${p.description}`),
    "",
    "## Diğer",
    "",
    `- [Hakkımda — Barış Akşipal](${siteConfig.url}/tr/hakkimda)`,
    `- [Google İşletme Profili yorumları](https://www.google.com/maps/place/?q=place_id:ChIJIVsX7jdP0xQR2rslnfyknyc)`,
    `- [Sitemap](${siteConfig.url}/sitemap.xml)`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=86400" },
  });
}
