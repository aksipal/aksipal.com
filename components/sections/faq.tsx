import GradientText from "@/components/ui/gradient-text";
import { getFaqJsonLd } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

type FaqSectionProps = {
  locale: Locale;
};

const faqTr = [
  {
    q: "WhatsApp bot kurmak yasal mı, ne ile çalışıyorsunuz?",
    a: "Evet, yasal — kurulum Meta'nın resmi WhatsApp Cloud API'si üzerinden yapılır (toplu mesaj / spam aracı değil). Müşteri sizin numaranıza mesaj attığında bot içinde tanımlı akışlar (teklif, randevu, sipariş, destek) tetiklenir. KVKK uyumlu loglama, opt-out ve kullanıcı bilgilendirme süreçleriyle birlikte teslim edilir.",
  },
  {
    q: "AI agent için ChatGPT mi kuruyorsunuz, Claude mu?",
    a: "İhtiyacınıza göre seçiyoruz. Claude (Anthropic) uzun bağlam ve doküman analizi gerektiren işlerde, OpenAI (GPT-4 / GPT-4.1) çok dilli ve geniş ekosistem entegrasyonu olan akışlarda öne çıkıyor. Çoğu projede ikisi de gerektiğinde kullanılabilir; karar maliyet, gecikme (latency) ve kullanım senaryosuna göre verilir. Veriniz RAG (vektör veritabanı) ile modele güvenli şekilde sunulur.",
  },
  {
    q: "AI / otomasyon ne kadar sürede para kazandırır?",
    a: "Yaklaşık ölçek: WhatsApp ve süreç otomasyonu yatırımları genelde 1-3 ay içinde geri döner (haftada 5-10 saatlik manuel iş ortadan kalktığında). AI agent projelerinde geri dönüş 2-6 ay arasında değişir; soğuk satış desteği veya 7/24 müşteri destek senaryolarında daha hızlıdır. Görüşmede sizin operasyonunuz için somut bir tahmin çıkarıyoruz.",
  },
  {
    q: "Web sitesi yaptırma süreci nasıl işliyor, ne kadar sürer?",
    a: "Hazır şablon paketlerinde içerikler hazırsa 4-12 günde yayına alıyoruz. Süreç: kısa keşif (1 gün) → içerik & marka uyarlama (2-5 gün) → teknik SEO ve mobil uyum testi (1-2 gün) → yayın. Özel projelerde sprint bazlı çalışıyor, her sprintte çalışan teslim veriyoruz; toplam süre kapsama göre değişir.",
  },
  {
    q: "Web sitesi fiyatları ne kadar, KDV dahil mi?",
    a: "Hazır şablon paketleri ₺17.000'den başlıyor; sektörel paketler bazında ₺17k-₺35k aralığında. Kurumsal özel projeler kapsama göre fiyatlandırılır. Belirtilen fiyatlara KDV dahil değildir; teklif sırasında fatura tipi (KDV'li / hariç) net olarak yazılı paylaşılır.",
  },
  {
    q: "Berber, kuaför, restoran, klinik gibi sektörler için web sitesi yapıyor musunuz?",
    a: "Evet — sektöre özel hazır şablonlarımız var (berber/kuaför, klinik & estetik, lojistik & taşımacılık, oto yıkama, restoran, butik, danışmanlık, enerji, inşaat, spor salonu, startup ve daha fazlası). Metin ve görselleri işletmenize göre uyarlayıp kısa sürede yayına alıyoruz.",
  },
  {
    q: "SEO (arama motoru optimizasyonu) dahil mi?",
    a: "Evet, tüm projelerde teknik SEO standart: başlık ve açıklama meta etiketleri, Open Graph, JSON-LD yapılandırılmış veri, sitemap.xml, robots.txt, mobil uyum, Core Web Vitals (yükleme hızı), hreflang, görsel alt metinleri. Ek SEO içerik üretimi (blog, kategori sayfaları) ayrı talep olarak konuşulur.",
  },
  {
    q: "Sözleşmeli teslim ve şeffaf fiyat ne demek? Bütçe aşımı yaşar mıyım?",
    a: "Her proje için yazılı sözleşme imzalanır; kapsam, teslim tarihi, ödeme koşulu ve revizyon politikası tek dokümanda. Anlaşılan kapsam içinde sürpriz fiyat çıkmaz. Ek talep gelirse önce fiyat ve süre bildirilir, onayınız olmadan iş başlamaz — bu sayede bütçe aşımı yaşanmaz.",
  },
  {
    q: "Yayın sonrası destek veriyor musunuz, kullanamayacağım bir şey teslim alır mıyım?",
    a: "Hayır, teslim sonrası başınıza bırakılmaz. Aylık bakım planları (güvenlik yamaları, içerik güncellemeleri, performans takibi) sunuyoruz. WhatsApp ve e-posta üzerinden Türkçe destek; içerik güncellemeleri için size kısa video eğitimleri hazırlanır. Sözleşmede destek kapsamı net belirtilir.",
  },
  {
    q: "Veriler nerede tutuluyor, KVKK uyumlu musunuz?",
    a: "Tercihen Avrupa veya Türkiye lokasyonlu sunucular (Vercel EU, Supabase EU, Hetzner Almanya) kullanıyoruz. Form verileri için onay (consent) kutusu, gizlilik politikası ve KVKK aydınlatma metni standart kuruluyor. Çerez yönetimi için banner ve Google Consent Mode v2 ile çalışıyoruz; analytics ancak kullanıcı onayından sonra başlar.",
  },
  {
    q: "Ankara dışındaki müşterilerle de çalışıyor musunuz, yüz yüze görüşme mümkün mü?",
    a: "Türkiye genelinde uzaktan çalışıyoruz; toplantılar Google Meet / Zoom üzerinden. Ankara içindeyseniz yüz yüze görüşme mümkün. İstanbul ve diğer şehirler için yoğun kapsamlı projelerde planlı saha ziyareti opsiyonel olarak konuşulur.",
  },
];

const faqEn = [
  {
    q: "Is WhatsApp automation legal, what stack do you use?",
    a: "Yes — built on Meta's official WhatsApp Cloud API (not bulk-message / spam tooling). When a customer messages your number, defined flows (quote, appointment, order, support) are triggered. Delivered with KVKK/GDPR-compliant logging, opt-out and user notification.",
  },
  {
    q: "For AI agents, do you use ChatGPT or Claude?",
    a: "We pick per use case. Claude (Anthropic) shines on long-context document tasks; OpenAI GPT-4 family on multilingual, broad-ecosystem flows. We can use both. Decision is based on cost, latency and scenario. Your data is exposed safely via RAG (vector DB).",
  },
  {
    q: "How fast does AI / automation pay back?",
    a: "Rough scale: WhatsApp + workflow automation usually pays back in 1-3 months (when 5-10 hours/week of manual work disappear). AI agent projects 2-6 months — faster in cold-sales support or 24/7 customer support scenarios. We give a concrete estimate during the discovery call.",
  },
  {
    q: "How does a website project start, how long does it take?",
    a: "Template packages: live in 4-12 days when content is ready. Flow: brief discovery (1 day) → content & brand customization (2-5 days) → technical SEO + mobile QA (1-2 days) → launch. Custom projects run sprint-based with working delivery each cycle.",
  },
  {
    q: "How much does a website cost, is VAT included?",
    a: "Template packages start at ₺17,000; sector packages range ₺17k-₺35k. Corporate custom projects are scoped. Listed prices are exclusive of VAT (KDV); the invoice type is stated in writing during the quote.",
  },
  {
    q: "Do you build sites for barbershops, salons, restaurants or clinics?",
    a: "Yes — sector-specific templates: barber/salon, clinic & aesthetic, logistics & transport, car wash, restaurant, boutique, consultancy, energy, construction, gym, startup and more. We adapt copy and visuals to your business and launch fast.",
  },
  {
    q: "Is SEO included?",
    a: "Yes — technical SEO is standard on every project: meta tags, Open Graph, JSON-LD structured data, sitemap.xml, robots.txt, mobile UX, Core Web Vitals, hreflang, image alt texts. Ongoing content SEO (blog, category pages) is scoped separately.",
  },
  {
    q: "What is contracted delivery and transparent pricing? Will my budget overflow?",
    a: "Every project is signed with a written contract: scope, delivery date, payment terms and revision policy in one document. No surprise charges within agreed scope. Any extra ask is quoted before work starts — so no budget overflow.",
  },
  {
    q: "Do you provide post-launch support?",
    a: "Yes. Monthly maintenance plans cover security patches, content updates and performance monitoring. Support over WhatsApp and email; short video walkthroughs for content updates. Support scope is stated in the contract.",
  },
  {
    q: "Where is data stored, are you KVKK / GDPR aware?",
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
            ? "Sık Sorulan Sorular — AI, Otomasyon ve Web"
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
