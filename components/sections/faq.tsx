"use client";

import GradientText from "@/components/ui/gradient-text";
import { getFaqJsonLd } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

type FaqSectionProps = {
  locale: Locale;
};

const faqTr = [
  {
    q: "Web sitesi yaptırma süreci nasıl işliyor?",
    a: "Önce ihtiyacınızı (hazır şablon mu, özel tasarım mı) netleştiriyoruz; ardından içerik ve marka materyallerinize göre sayfaları kurup teknik SEO (meta, hız, mobil) kontrolleriyle yayına alıyoruz.",
  },
  {
    q: "Hazır web sitesi satın almak mı, yoksa sıfırdan mı yaptırmalıyım?",
    a: "Bütçeniz ve zamanınız kısıtlıysa hazır şablon paketleri en uygun seçenektir; sektöre özel hazır şablonlarımız SEO uyumlu ve hızlı teslimat ile gelir. Daha kapsamlı ihtiyaçlarınız varsa özel tasarım projeleri uygundur.",
  },
  {
    q: "Berber, kuaför, restoran veya klinik gibi niş sektörler için web sitesi yapıyor musunuz?",
    a: "Evet. Sektöre özel hazır web sitesi şablonlarımız var; metin ve görselleri işletmenize göre uyarlayıp kısa sürede yayına alıyoruz. Berber, kuaför, restoran, klinik, lojistik, enerji ve daha pek çok sektörde deneyimimiz bulunuyor.",
  },
  {
    q: "Web sitesi fiyatları ne kadar?",
    a: "Hazır şablon paketlerimiz ₺5.000'den başlıyor, kurumsal ve özel projeler kapsama göre fiyatlandırılıyor. En güncel fiyatlar için hizmetler sayfamıza göz atabilirsiniz.",
  },
  {
    q: "Şablon paketlerde teslim süresi gerçekten 2-5 gün mü?",
    a: "Evet. İçeriklerin büyük kısmı hazırsa 2-5 gün aralığında yayına alıyoruz. Özel tasarımlarda süre projenin kapsamına göre belirlenir.",
  },
  {
    q: "SEO (arama motoru optimizasyonu) dahil mi?",
    a: "Evet. Tüm projelerimizde teknik SEO altyapısı (meta etiketler, Open Graph, yapısal veri, sitemap, hız optimizasyonu, mobil uyum) standart olarak dahildir.",
  },
  {
    q: "Özel yazılım projelerinde süreç nasıl ilerliyor?",
    a: "Kapsamı sprintlere bölüp her sprint sonunda çalışan teslim yapıyoruz. E-ticaret, kurumsal uygulama veya özel entegrasyon projeleri bu şekilde yürütülür.",
  },
  {
    q: "Yayın sonrası destek ve bakım veriyor musunuz?",
    a: "Evet. Bakım, güncelleme ve iyileştirme için aylık destek planları sunuyoruz. Güvenlik yamaları, içerik güncellemeleri ve performans takibi bu kapsamdadır.",
  },
];

const faqEn = [
  {
    q: "How does a typical website project start?",
    a: "We clarify whether you need a template package or a custom build, then structure pages around your content and run technical SEO checks (metadata, performance, mobile) before launch.",
  },
  {
    q: "Should I buy a ready-made template or build from scratch?",
    a: "If your budget and timeline are tight, our sector-specific templates are the best option—they come SEO-ready with fast delivery. For more complex needs, a custom design project is recommended.",
  },
  {
    q: "Do you build sites for barbershops, salons, restaurants or clinics?",
    a: "Yes. We offer industry-focused templates and adapt copy and visuals to your business. We have experience across barbershops, salons, restaurants, clinics, logistics, energy and more.",
  },
  {
    q: "How much does a website cost?",
    a: "Our template packages start from ₺5,000, while corporate and custom projects are priced based on scope. Visit our services page for the latest pricing.",
  },
  {
    q: "Is 2-5 day delivery realistic for template packages?",
    a: "Yes. If core content is ready, we typically launch within 2-5 days. Custom designs take longer depending on project scope.",
  },
  {
    q: "Is SEO included?",
    a: "Yes. All our projects include technical SEO infrastructure (meta tags, Open Graph, structured data, sitemap, speed optimization, mobile-first) as standard.",
  },
  {
    q: "How do custom software projects run?",
    a: "We split scope into sprints and deliver working increments each cycle. E-commerce, enterprise applications and custom integrations follow this process.",
  },
  {
    q: "Do you provide post-launch support?",
    a: "Yes. We offer monthly maintenance plans covering security patches, content updates and performance monitoring.",
  },
];

export function FaqSection({ locale }: FaqSectionProps) {
  const items = locale === "tr" ? faqTr : faqEn;

  const faqJsonLd = getFaqJsonLd(
    items.map((item) => ({ question: item.q, answer: item.a })),
  );

  return (
    <section className="section-shell mt-20 space-y-6">
      <h2 className="text-3xl font-semibold tracking-tight text-[#E9DFFF]">
        <GradientText colors={["#E9DFFF", "#a78bfa", "#7cff92", "#E9DFFF"]} animationSpeed={10}>
          {locale === "tr"
            ? "Sık Sorulan Sorular — Web Sitesi Yaptırma"
            : "Frequently Asked Questions"}
        </GradientText>
      </h2>
      <div className="grid gap-4">
        {items.map((item) => (
          <article key={item.q} className="glass-card p-5">
            <h3 className="text-base font-semibold text-zinc-100">{item.q}</h3>
            <p className="mt-2 text-sm leading-7 text-zinc-400">{item.a}</p>
          </article>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
