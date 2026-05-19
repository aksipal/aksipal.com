import GradientText from "@/components/ui/gradient-text";
import { getFaqJsonLd } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

type FaqSectionProps = {
  locale: Locale;
};

const faqTr = [
  {
    q: "Yapay zeka ajanı (AI agent) ile sıradan chatbot arasında ne fark var?",
    a: "Sıradan chatbot önceden yazılmış cevapları seçer; yapay zeka ajanı sizin verinizi (PDF, web, CRM, Notion) okur, anlar ve gerektiğinde sisteminize gerçek işlem yapar (randevu yazar, CRM günceller, sipariş açar, fatura kesilmesini tetikler). Claude veya OpenAI üzerine RAG (vektör veritabanı) ile kuruyoruz. Müşteriniz robotla konuştuğunu fark etmez; arka planda kontrol size kalır.",
  },
  {
    q: "WhatsApp otomasyonu yasal mı, hangi altyapıyla kuruyorsunuz?",
    a: "Evet, yasaldır. Kurulum Meta'nın resmi WhatsApp Cloud API'si üzerinden yapılır — toplu mesaj veya spam aracı değildir. Müşteri sizin numaranıza yazdığında akıllı akışlar (teklif, randevu, sipariş, destek) tetiklenir. KVKK uyumlu loglama, vazgeçme (opt-out) ve kullanıcı aydınlatma süreçleri standart olarak teslim edilir.",
  },
  {
    q: "Yapay zeka için ChatGPT mi, Claude mu kullanıyorsunuz?",
    a: "İhtiyacınıza göre seçiyoruz. Claude (Anthropic) uzun bağlam ve döküman analizinde, OpenAI ailesi ise çok dilli ve geniş ekosistem entegrasyonu olan akışlarda öne çıkıyor. Çoğu projede ikisi birlikte kullanılır; karar maliyet, gecikme (latency) ve senaryoya göre verilir. Veriniz RAG ile modele kontrollü şekilde sunulur — şirket verisi modelin eğitimine girmez.",
  },
  {
    q: "Otomasyon yatırımı ne kadar sürede kendini amorti eder?",
    a: "Ölçek olarak: WhatsApp ve süreç otomasyonu yatırımları çoğunlukla 1–3 ay içinde geri döner (haftada 5–10 saatlik manuel iş ortadan kalktığında). Yapay zeka ajanı projelerinde geri dönüş 2–6 ay arasında değişir; 7/24 müşteri desteği veya satış öncesi soru yükü senaryolarında daha hızlıdır. Keşif görüşmesinde sizin operasyonunuz için somut bir tahmin çıkarıyoruz.",
  },
  {
    q: "Web sitesi süreci nasıl işliyor, ne kadar sürede yayında olur?",
    a: "Hazır şablon paketlerinde içerikleriniz hazırsa 4–12 iş gününde yayına alıyoruz. Akış: kısa keşif (1 gün) → içerik ve marka uyarlama (2–5 gün) → teknik SEO ve mobil testi (1–2 gün) → canlıya alım. Özel projelerde sprint bazlı çalışıyoruz; her sprintte çalışan teslim alıyorsunuz, toplam süre kapsama göre netleşir.",
  },
  {
    q: "Fiyatlar nedir, KDV nasıl uygulanıyor?",
    a: "Sektörel hazır web paketleri 17.000 TL'den başlar; web paketleri 17.000 – 35.000 TL aralığında. Yapay zeka ajanı kurulumları 45.000 TL'den, WhatsApp ve süreç otomasyonu 25.000 TL'den başlar; e-ticaret ve özel yazılım kapsama göre fiyatlandırılır. Tüm fiyatlara KDV hariçtir (+KDV). Yazılı teklifte kapsam, fatura tipi ve ödeme koşulu açıkça belirtilir.",
  },
  {
    q: "Berber, kuaför, restoran, klinik gibi sektörlere özel şablonunuz var mı?",
    a: "Evet. Sektöre özel hazır şablonlarımız mevcut: berber & kuaför, klinik ve estetik, lojistik ve taşımacılık, oto yıkama, restoran, butik, danışmanlık, enerji, inşaat, spor salonu, startup ve daha fazlası. İçerik ve görsellerinizi işletmenize göre uyarlıyor, kısa sürede yayına alıyoruz.",
  },
  {
    q: "SEO (arama motoru optimizasyonu) pakete dahil mi?",
    a: "Evet, tüm projelerde teknik SEO standarttır: meta başlık ve açıklama, Open Graph, JSON-LD yapılandırılmış veri, sitemap.xml, robots.txt, mobil uyum, Core Web Vitals, hreflang, görsel alternatif metinleri. Sürekli içerik SEO'su (blog yazıları, kategori sayfaları, anahtar kelime stratejisi) ayrı bir hizmet olarak ele alınır.",
  },
  {
    q: "Şeffaf fiyat ve sözleşmeli teslim ne demek? Bütçem aşılır mı?",
    a: "Her proje için yazılı sözleşme imzalanır; kapsam, teslim tarihi, ödeme koşulu ve revizyon politikası tek dökümanda yer alır. Anlaşılan kapsam içinde sürpriz fatura çıkmaz. Ek talep gelirse önce fiyat ve süre yazılı bildirilir, onayınız olmadan başlamayız — bu sayede bütçe aşımı yaşanmaz.",
  },
  {
    q: "Tek mühendisle çalışmak risk değil mi? Yarın iş bırakırsanız ne olur?",
    a: "Doğru bir soru. Bu yüzden tüm projeler standart araçlarla (Next.js, Java, Python, n8n, Supabase, Vercel) kuruluyor — başka bir mühendis devralabilir. Kaynak kod ve hesap erişimleri en başından sizde, sözleşmede yazılı. Aylık bakım planı opsiyonel; bağımlılık yaratmıyoruz. Üstelik: tek muhatap olduğum için takım koordinasyonunda kaybolan saatler size yansımıyor.",
  },
  {
    q: "Yayın sonrası destek veriyor musunuz?",
    a: "Evet, teslim ettikten sonra başınıza bırakmıyoruz. Aylık bakım paketleri (güvenlik yamaları, içerik güncellemeleri, performans takibi) mevcut. WhatsApp ve e-posta üzerinden Türkçe destek; içerik güncellemeleri için size kısa video eğitimleri hazırlıyoruz. Destek kapsamı sözleşmede net şekilde yer alıyor.",
  },
  {
    q: "Verilerim nerede tutuluyor, KVKK uyumlu mu?",
    a: "Tercihen Türkiye veya Avrupa lokasyonlu sunucular kullanıyoruz (Vercel EU, Supabase EU, Hetzner Almanya). Form verileri için onay (consent) kutusu, gizlilik politikası ve KVKK aydınlatma metni standart kuruluyor. Çerez yönetimi için banner ve Google Consent Mode v2 ile çalışıyoruz; ölçümleme yalnızca kullanıcı onayı sonrası başlıyor.",
  },
  {
    q: "Ankara dışındayım, çalışabilir miyiz?",
    a: "Evet. Türkiye genelinde uzaktan çalışıyoruz; görüşmeler Google Meet veya Zoom üzerinden. Ankara'daysanız yüz yüze görüşme mümkündür. İstanbul ve diğer şehirlerdeki yoğun kapsamlı projeler için planlı saha ziyareti opsiyoneldir.",
  },
];

const faqEn = [
  {
    q: "What's the difference between an AI agent and a regular chatbot?",
    a: "A regular chatbot picks pre-written responses; an AI agent reads and understands your data (PDFs, web, CRM, Notion) and can take real actions inside your systems (book appointments, update the CRM, open orders, trigger invoices). Built on Claude or OpenAI with RAG (vector DB). Customers don't realize they're talking to a bot — you stay in control.",
  },
  {
    q: "Is WhatsApp automation legal, what stack do you use?",
    a: "Yes, fully legal. Built on Meta's official WhatsApp Cloud API — not bulk-message / spam tooling. When a customer messages your number, smart flows (quote, appointment, order, support) are triggered. KVKK/GDPR-compliant logging, opt-out and user notification are standard.",
  },
  {
    q: "For AI, do you use ChatGPT or Claude?",
    a: "We pick per use case. Claude (Anthropic) shines on long-context document tasks; OpenAI on multilingual, broad-ecosystem flows. Most projects use both. The decision is based on cost, latency and scenario. Your data is exposed via RAG — company data is never used to train the model.",
  },
  {
    q: "How fast does automation pay back?",
    a: "Rough scale: WhatsApp + workflow automation usually pays back in 1–3 months (when 5–10 hours/week of manual work disappear). AI agent projects 2–6 months — faster on 24/7 support or pre-sales question load. We give a concrete estimate during the discovery call.",
  },
  {
    q: "How does the website process work and how long does it take?",
    a: "Template packages: live in 4–12 business days when content is ready. Flow: brief discovery (1 day) → content & brand customization (2–5 days) → technical SEO + mobile QA (1–2 days) → launch. Custom projects run sprint-based with working delivery each cycle.",
  },
  {
    q: "How are prices structured, is VAT included?",
    a: "Sector-specific web packages start at ₺17,000; web tiers range ₺17,000–35,000. AI agent setups from ₺45,000; WhatsApp & workflow automation from ₺25,000; e-commerce and custom software are scoped per project. All prices exclude VAT (+KDV). The written quote states scope, invoice type and payment terms clearly.",
  },
  {
    q: "Do you build sites for barbershops, salons, restaurants or clinics?",
    a: "Yes — sector-specific templates: barber/salon, clinic & aesthetic, logistics & transport, car wash, restaurant, boutique, consultancy, energy, construction, gym, startup and more. We adapt copy and visuals to your business and launch fast.",
  },
  {
    q: "Is SEO included?",
    a: "Yes — technical SEO is standard on every project: meta tags, Open Graph, JSON-LD structured data, sitemap.xml, robots.txt, mobile UX, Core Web Vitals, hreflang, image alt texts. Ongoing content SEO (blog posts, category pages, keyword strategy) is scoped separately.",
  },
  {
    q: "What is contracted delivery and transparent pricing? Will my budget overflow?",
    a: "Every project is signed with a written contract: scope, delivery date, payment terms and revision policy in one document. No surprise charges within agreed scope. Any extra ask is quoted in writing before work starts — no budget overflow.",
  },
  {
    q: "Isn't working with a single engineer risky? What if you stop?",
    a: "Fair question. That's why all projects use standard tooling (Next.js, Java, Python, n8n, Supabase, Vercel) — another engineer can take over. Source code and account access are yours from day one, written into the contract. The monthly maintenance plan is optional; no lock-in. Plus: as the sole point of contact I don't lose hours in team coordination.",
  },
  {
    q: "Do you provide post-launch support?",
    a: "Yes. Monthly maintenance plans cover security patches, content updates and performance monitoring. Support over WhatsApp and email; short video walkthroughs for content updates. Support scope is stated in the contract.",
  },
  {
    q: "Where is data stored, are you KVKK/GDPR aware?",
    a: "We prefer EU or Turkey hosting (Vercel EU, Supabase EU, Hetzner Germany). Forms ship with consent checkbox, privacy policy and KVKK notice. Cookie banner with Google Consent Mode v2; analytics only fires after user consent.",
  },
  {
    q: "Do you work outside Ankara, are in-person meetings possible?",
    a: "We work remotely across Turkey; meetings via Google Meet / Zoom. In Ankara we offer in-person meetings; for large projects in Istanbul or other cities, planned site visits can be arranged.",
  },
];

export function FaqSection({ locale }: FaqSectionProps) {
  const items = locale === "tr" ? faqTr : faqEn;

  const faqJsonLd = getFaqJsonLd(
    items.map((item) => ({ question: item.q, answer: item.a })),
  );

  return (
    <section className="section-shell mt-20 space-y-6" aria-labelledby="faq-heading">
      <h2
        id="faq-heading"
        className="text-3xl font-semibold tracking-tight text-[#E9DFFF]"
      >
        <GradientText colors={["#E9DFFF", "#a78bfa", "#7cff92", "#E9DFFF"]} animationSpeed={10}>
          {locale === "tr"
            ? "Sık Sorulan Sorular — Yapay Zeka, Otomasyon ve Web"
            : "Frequently Asked Questions"}
        </GradientText>
      </h2>
      <div className="grid gap-4">
        {items.map((item) => (
          <details
            key={item.q}
            className="glass-card group p-5 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
              <h3 className="text-base font-semibold text-zinc-100">{item.q}</h3>
              <span
                aria-hidden
                className="mt-1 inline-block size-5 shrink-0 rounded-full border border-white/15 text-center text-sm leading-5 text-zinc-400 transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-7 text-zinc-400">{item.a}</p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
