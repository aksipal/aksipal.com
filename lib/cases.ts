import { z } from "zod";

const caseMetricSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const caseCategorySchema = z.enum(["web", "ecommerce", "lab", "ai"]);
export type CaseCategory = z.infer<typeof caseCategorySchema>;

/** Referans projeleri ana sayfada ve /isler'de gruplamak için kategori başlıkları (sıralı). */
export const caseCategories: ReadonlyArray<{
  id: CaseCategory;
  tr: string;
  en: string;
  trSubtitle: string;
  enSubtitle: string;
}> = [
  {
    id: "ecommerce",
    tr: "E-Ticaret",
    en: "E-Commerce",
    trSubtitle: "Ürün yönetimi, ödeme ve sipariş akışlarıyla uçtan uca online mağazalar.",
    enSubtitle: "End-to-end online stores with product management, payments and orders.",
  },
  {
    id: "lab",
    tr: "Ar-Ge ve Oyun Projeleri",
    en: "R&D and Game Projects",
    trSubtitle:
      "Müşteri işi değil: teknik sınırları zorlamak için geliştirdiğimiz, kaynak kodu ve videosu açık kişisel projeler. Ne yapabildiğimizi gösterir.",
    enSubtitle:
      "Not client work: personal projects built to push technical limits, with public source code and video. They show what we can do.",
  },
  {
    id: "web",
    tr: "Kurumsal Web Siteleri",
    en: "Corporate Websites",
    trSubtitle: "Sektöre özel, SEO ve dönüşüm odaklı kurumsal web siteleri.",
    enSubtitle: "Sector-specific, SEO and conversion-focused corporate websites.",
  },
  {
    id: "ai",
    tr: "Yapay Zeka & Otomasyon",
    en: "AI & Automation",
    trSubtitle:
      "Örnek çözüm senaryoları: Claude/RAG tabanlı ajanlar, WhatsApp ve süreç otomasyonlarını nasıl kurduğumuzu gösterir. Bu kategoride henüz yayınlanmış müşteri referansı yoktur.",
    enSubtitle:
      "Illustrative solution scenarios showing how we build Claude/RAG agents, WhatsApp and workflow automation. No published client reference in this category yet.",
  },
];

export const caseSchema = z.object({
  slug: z.string(),
  title: z.string(),
  sector: z.string(),
  /** Ana sayfa/işler gruplaması için kategori. */
  category: caseCategorySchema,
  summary: z.string(),
  problem: z.string(),
  solution: z.string(),
  stack: z.array(z.string()).min(2),
  metrics: z.array(caseMetricSchema).min(2),
  /** Görsel yoksa kart, gradient bir özet bloğu render eder (gizliliği korunan müşteriler için). */
  image: z.string().optional(),
  /** Görsel yokken kartta gösterilecek 1-2 kelimelik etiket (örn. "AI Agent"). */
  visualTag: z.string().optional(),
  /** Canlı demo URL; varsa kartta "Canlı Demo" butonu gösterilir */
  demoUrl: z.string().url().optional(),
  /**
   * "client": yayında olan gerçek müşteri işi (varsayılan).
   * "scenario": henüz müşteri referansı olmayan, kurulum yaklaşımını anlatan örnek çözüm senaryosu —
   * kartta ve detayda açıkça etiketlenir; gerçek referans gibi sunulmaz.
   * "lab": kendi geliştirdiğimiz gerçek ama müşteri işi olmayan Ar-Ge / oyun projesi (açık kaynak + video).
   */
  kind: z.enum(["client", "scenario", "lab"]).optional().default("client"),
  /** Açık kaynak depo (Ar-Ge projeleri) */
  repoUrl: z.string().url().optional(),
  /** YouTube video kimliği (örn. "bQCZgWsVJQY") — detay sayfasında gömülü oynatıcı */
  youtubeId: z.string().optional(),
  /** Referansın canlı yayında olduğu müşteri sitesi (gerçek işlerde demoUrl ile aynı) — JSON-LD için. */
  clientName: z.string().optional(),
  /**
   * Öne çıkan teknik özellikler. "3d" olanlar /isler sayfasında ayrı "3D ve Animasyonlu Arayüzler"
   * bölümünde toplanır; kartta küçük etiket olarak görünür (ana sayfa kalabalık olmasın diye yalnızca etiket).
   */
  highlights: z.array(z.enum(["3d", "motion", "multilingual", "ecommerce-revision"])).optional(),
  /** Meta keywords; arama görünürlüğü için (özellikle marka + sektör sorguları) */
  seoKeywords: z.array(z.string()).optional(),
});

const rawCases = [
  {
    slug: "ironveil-mmorpg",
    category: "lab",
    kind: "lab",
    highlights: ["3d", "motion", "multilingual"],
    title: "Ironveil",
    sector: "Oyun / Ar-Ge",
    summary:
      "Tarayıcıda indirme gerektirmeden çalışan, sunucu yetkili karanlık fantezi MMORPG. Babylon.js 3D istemci, Java + Netty gerçek zamanlı sunucu, Next.js hesap katmanı; dört sınıf, kalıcı karakterler. Açık kaynak (MIT), tanıtım videosu bize ait. Canlı sunucu yok; Ar-Ge projesi.",
    problem:
      "Tek mühendisin, tarayıcıda çalışan ve tüm hesaplamaların sunucuda yapıldığı çok oyunculu bir 3D oyunu uçtan uca kurabileceğini göstermek: gerçek zamanlı ağ kodu, istemci tahmini, kalıcı veri ve gözlemlenebilirlik.",
    solution:
      "İstemci: Babylon.js + TypeScript, dört sınıf, hedefleme, ganimet ve ekipman, TR/EN. Sunucu: Java 25 + Netty, 30 Hz simülasyon, 15 Hz Protobuf yayın; istemci yalnızca niyet gönderir. Postgres'te kalıcı karakterler, Redis'te geçici durum, Prometheus + Grafana ile izleme; otomatik ağ kodu botları ve sunucu testleri. Claude ile birlikte geliştirildi.",
    stack: [
      "Babylon.js (3D istemci)",
      "TypeScript",
      "Next.js (App Router)",
      "Java 25 + Netty (oyun sunucusu)",
      "Protobuf (ikili ağ protokolü)",
      "PostgreSQL + Redis",
      "Prometheus + Grafana",
      "Claude ile geliştirme",
      "MIT lisans",
    ],
    metrics: [
      { label: "Mimari", value: "Sunucu yetkili" },
      { label: "Simülasyon", value: "30 Hz / 15 Hz yayın" },
      { label: "Kaynak Kod", value: "Açık (MIT)" },
    ],
    image: "/images/cases/ironveil.png",
    repoUrl: "https://github.com/aksipal/ironveil",
    youtubeId: "bQCZgWsVJQY",
    seoKeywords: [
      "Ironveil",
      "tarayıcı tabanlı MMORPG",
      "Babylon.js oyun",
      "Java Netty oyun sunucusu",
      "server authoritative multiplayer",
      "Claude ile oyun geliştirme",
      "Barış Akşipal oyun projesi",
      "açık kaynak MMORPG",
    ],
  },
  {
    slug: "b2b-saas-ai-agent",
    category: "ai",
    kind: "scenario",
    title: "Satış Öncesi Yapay Zeka Ajanı — Örnek Senaryo",
    sector: "Yapay Zeka Ajanı",
    summary:
      "Örnek senaryo: B2B firma için Claude tabanlı, şirket dökümanlarına RAG ile bağlı satış öncesi yapay zeka ajanı. Web widget ve WhatsApp Cloud API üzerinden 7/24 yanıt, nitelikli fırsatı ekibe aktarım.",
    problem:
      "Tipik durum: satış ekibi ürün ve hizmet dokümantasyonundaki aynı sorulara her gün saatler ayırır; mesai dışı gelen sorular ertesi güne sarkar; lead takibi kişiye bağlı ve tutarsızdır. Hızlı karar veren alıcılar bu bekleme sırasında rakibe yönelir.",
    solution:
      "Kurulum yaklaşımımız: Claude (Anthropic) üzerine RAG (vektör veritabanı) ile satış öncesi dökümanlar (ürün PDF, fiyat tablosu, SSS, çözüm sayfaları) indekslenir. Ajan web widget ve WhatsApp Cloud API üzerinden 7/24 yanıt verir; nitelikli fırsat tespit edince ekibe e-posta/Slack ve CRM bildirimi geçer. Loglama, kullanım paneli ve aylık model maliyeti kontrolü standart olarak teslim edilir. Kapsam ve veri kaynakları keşif görüşmesinde netleşir.",
    stack: [
      "Claude (Anthropic) · RAG",
      "Embedding · vektör veritabanı",
      "WhatsApp Cloud API",
      "Web widget (Next.js)",
      "CRM / e-posta webhook",
      "Loglama ve kullanım paneli",
    ],
    metrics: [
      { label: "Hedef", value: "7/24 yanıt" },
      { label: "Kanal", value: "Web + WhatsApp" },
      { label: "Teslim", value: "Sprint bazlı" },
    ],
    image: "/images/cases/ai-agent-case.png",
    visualTag: "AI Agent",
    seoKeywords: [
      "yapay zeka ajanı geliştirme",
      "AI agent B2B",
      "Claude RAG entegrasyonu",
      "satış öncesi yapay zeka asistanı",
      "WhatsApp yapay zeka ajanı",
    ],
  },
  {
    slug: "estetik-klinik-whatsapp-otomasyon",
    category: "ai",
    kind: "scenario",
    title: "WhatsApp Randevu Otomasyonu — Örnek Senaryo",
    sector: "WhatsApp Otomasyonu",
    summary:
      "Örnek senaryo: randevuyla çalışan işletmeler için resmi WhatsApp Cloud API üzerinden randevu alma, hatırlatma ve randevu sonrası iletişim otomasyonu.",
    problem:
      "Tipik durum: reklamdan gelen WhatsApp mesajları resepsiyon yoğunluğunda geç yanıtlanır, sıcak ilgi soğur; randevu hatırlatmaları elle yapılır ve randevuya gelmeme (no-show) oranı reklam bütçesini eritir.",
    solution:
      "Kurulum yaklaşımımız: resmi WhatsApp Cloud API üzerinden hizmet bilgisi, fiyat aralığı, randevu rezervasyonu (takvim entegrasyonu) ve KVKK aydınlatma onayı akışları kurulur. Randevudan 24 saat ve 1 saat önce otomatik hatırlatma; randevu sonrası bakım/memnuniyet mesajı. CRM, takvim ve faturalama sistemleri webhook veya n8n ile bağlanır. Toplu mesaj/spam aracı değildir; müşteri size yazdığında akış tetiklenir.",
    stack: [
      "Resmi WhatsApp Cloud API",
      "Takvim entegrasyonu",
      "CRM webhook / n8n",
      "KVKK aydınlatma akışı",
      "Loglama",
    ],
    metrics: [
      { label: "Hedef", value: "Anında yanıt" },
      { label: "Hatırlatma", value: "24 sa + 1 sa" },
      { label: "Altyapı", value: "Resmi Meta API" },
    ],
    image: "/images/cases/whatsapp-otomasyon-case.png",
    visualTag: "WhatsApp",
    seoKeywords: [
      "WhatsApp randevu otomasyonu",
      "WhatsApp Cloud API entegrasyonu",
      "klinik WhatsApp otomasyonu",
      "WhatsApp bot kurulumu",
    ],
  },
  {
    slug: "lojistik-surec-otomasyonu",
    category: "ai",
    kind: "scenario",
    title: "Lojistik Süreç Otomasyonu — Örnek Senaryo",
    sector: "Süreç Otomasyonu",
    summary:
      "Örnek senaryo: form ve WhatsApp'tan gelen talepleri tek akışta toplayan, yapay zeka destekli teklif ve ekip atama otomasyonu; WhatsApp gruplarındaki manuel koordinasyonun yerine geçer.",
    problem:
      "Tipik durum: sürücü/ekip atama, müşteri bilgilendirme, teklif paylaşımı ve onay süreçleri farklı WhatsApp grupları üzerinden elle yürütülür. Kalite yanıt veren kişiye göre değişir, gecikmeler alınabilecek iş sayısını sınırlar.",
    solution:
      "Kurulum yaklaşımımız: form ve WhatsApp'tan gelen talepler tek bir otomasyon hattına (n8n veya özel backend) alınır; yapay zeka ile rota, yük tipi ve aciliyet sınıflandırılır; uygun ekip eşleştirilip teklif ve onay akışı otomatik tetiklenir. Google Sheets veya CRM'e kayıt, KVKK aydınlatma ve loglama dahildir. Entegrasyon sayısı ve akış karmaşıklığı keşif görüşmesinde netleşir.",
    stack: [
      "n8n veya özel backend",
      "Claude (Anthropic)",
      "Resmi WhatsApp Cloud API",
      "Google Sheets / CRM entegrasyonu",
      "KVKK aydınlatma akışı",
    ],
    metrics: [
      { label: "Hedef", value: "Tek akış" },
      { label: "Girdi", value: "Form + WhatsApp" },
      { label: "Çıktı", value: "Teklif + atama" },
    ],
    image: "/images/cases/surec-otomasyonu-case.png",
    visualTag: "n8n + AI",
    seoKeywords: [
      "lojistik süreç otomasyonu",
      "n8n otomasyon Türkiye",
      "iş süreçleri otomasyonu",
      "WhatsApp teklif otomasyonu",
    ],
  },
  {
    slug: "efsense-travel",
    category: "web",
    highlights: ["multilingual"],
    title: "Efsense Travel",
    sector: "Lüks Seyahat & MICE",
    summary:
      "2006'dan bu yana faaliyet gösteren A grubu seyahat acentesi Efsense Travel için butik seyahat ve kurumsal etkinlik (MICE) markasını taşıyan, Astro ile geliştirilmiş görsel ağırlıklı TR/EN kurumsal site.",
    problem:
      "Markanın hem bireysel butik seyahat (Fransa şatoları, büyülü Kapadokya, Ferrari deneyimi, gastronomi ve konser rotaları gibi temalı, kişiye özel kurgular) hem de kurumsal & MICE (kongre, konferans, lansman, gala, teşvik seyahatleri) tarafını; “paket tur” algısından uzak, lüks ve güven veren bir dille tek bir profesyonel platformda toplaması gerekiyordu. Görsellerin yoğun olduğu bir markada hız, mobil deneyim, TR/EN dil ve yasal uyum (çerez onayı, gizlilik) olmadan premium algı tam taşınmazdı.",
    solution:
      "Astro ile statik, yüksek performanslı bir mimari kuruldu: ana sayfa, Butik Seyahat, Kurumsal & MICE, Hakkımızda ve İletişim sayfaları; markanın “Dinle → Tasarla → İncelt → Uygula” sürecini anlatan akış ve deneyim galerileri. TR/EN çok dilli yapı, görsel optimizasyonu, çerez onayı ve gizlilik metinleri, bülten kaydı ve telefon/e-posta ile iletişim; teknik SEO ve Open Graph ile paylaşım önizlemeleri eksiksiz teslim edildi. Canlı site: efsense.com.",
    stack: [
      "Astro",
      "TypeScript",
      "Çok Dilli (TR/EN)",
      "Görsel Optimizasyonu",
      "SEO / Open Graph",
      "Çerez Onayı & Gizlilik",
      "Bülten Kaydı",
    ],
    metrics: [
      { label: "Dil", value: "TR / EN" },
      { label: "Hizmet Hattı", value: "Butik + MICE" },
      { label: "Mimari", value: "Astro / Hızlı" },
    ],
    image: "/images/cases/efsense.webp",
    demoUrl: "https://efsense.com/",
    seoKeywords: [
      "Efsense",
      "Efsense Travel",
      "butik seyahat web sitesi",
      "lüks tur web tasarım",
      "MICE Ankara",
      "kurumsal etkinlik web sitesi",
      "seyahat acentesi web sitesi",
      "Astro web sitesi",
      "Aksipal referans",
    ],
  },
  {
    slug: "ankaragucu-store",
    category: "ecommerce",
    highlights: ["ecommerce-revision"],
    title: "Ankaragücü Store",
    sector: "E-Ticaret",
    summary:
      "MKE Ankaragücü resmi online mağazası. ikas altyapısı üzerinde tema, vitrin, kategori düzeni ve mobil deneyim revizyonu; forma, giyim ve aksesuar kategorileriyle canlı mağaza.",
    problem:
      "Hazır altyapıdaki mağazanın görünümü kulüp kimliğini tam taşımıyordu; ürün vitrini, kategori düzeni ve mobil deneyim, altyapı değiştirilmeden iyileştirilmeliydi.",
    solution:
      "ikas tema katmanında kulüp renklerine uygun düzen, vitrin ve kampanya blokları, kategori menüsü, ürün kartı ve detay sayfası, mobil görünüm ve tipografi revize edildi. Ürün, ödeme ve kargo akışı korunarak canlı mağaza kesintisiz güncellendi.",
    stack: [
      "ikas e-ticaret altyapısı",
      "Tema ve stil özelleştirme",
      "Vitrin ve kampanya düzeni",
      "Kategori ve ürün kartı düzeni",
      "Mobil deneyim iyileştirmesi",
      "Canlı mağazada kesintisiz güncelleme",
    ],
    metrics: [
      { label: "Kapsam", value: "Arayüz revizyonu" },
      { label: "Altyapı", value: "ikas" },
      { label: "Kategori", value: "6 ana kategori" },
    ],
    image: "/images/cases/ankaragucu-store.png",
    demoUrl: "https://ankaragucustore.com.tr/",
    seoKeywords: [
      "Ankaragücü Store",
      "ankaragucustore.com.tr",
      "Ankaragücü resmi mağaza",
      "ikas tema özelleştirme",
      "ikas e-ticaret arayüz revizyonu",
      "spor kulübü e-ticaret sitesi",
      "e-ticaret sitesi revizyon",
      "Aksipal e-ticaret referans",
    ],
  },
  {
    slug: "tiny-bean-coffee",
    category: "ecommerce",
    title: "Tiny Bean Coffee Shop",
    sector: "E-Ticaret",
    summary:
      "Ankara Balgat'taki Tiny Bean Coffee Shop için iyzico ödeme entegrasyonlu Next.js e-ticaret mağazası: ürün kataloğu, sepet, favoriler, üyelik, kahve aboneliği ve toptan/B2B talep akışı tek platformda.",
    problem:
      "10+ yıllık, Google'da 4.7 puanlı fiziksel bir kahve markasının; ürünlerini (espresso harmanları, single-origin filtre, Türk kahvesi çeşitleri, bitki çayları, ekipman, hediye paketleri) çevrim içi satışa açması, güvenli ödeme alması ve sadık müşteri kitlesini aboneliğe taşıması gerekiyordu. Ürün yönetimi, stok, sipariş takibi ve KVKK uyumlu pazarlama izni olmadan sürdürülebilir bir online mağaza kurulamazdı.",
    solution:
      "Next.js App Router ile performans odaklı bir mağaza kuruldu; ürün veritabanı Neon (PostgreSQL) üzerinde, yayın Vercel'de. iyzico ile güvenli ödeme; kategori bazlı ürün filtreleme, arama, sepet, favoriler ve üyelik/hesap sistemi. Kahve aboneliği, toptan & B2B talep akışı, hediye paketleri, demleme rehberi ve “Kahve Günlüğü” blogu; KVKK uyumlu bülten kaydı ve WhatsApp/Instagram iletişim entegrasyonu. Teknik SEO ve mobil öncelikli tasarımla teslim edildi.",
    stack: [
      "Next.js (App Router)",
      "TypeScript",
      "Neon (PostgreSQL)",
      "Vercel",
      "iyzico ödeme entegrasyonu",
      "Sepet · Favori · Üyelik",
      "Kahve Aboneliği & B2B",
      "KVKK Bülten · SEO",
    ],
    metrics: [
      { label: "Ürün Kategorisi", value: "6+" },
      { label: "Ödeme", value: "iyzico" },
      { label: "Altyapı", value: "Next.js + Neon" },
    ],
    image: "/images/cases/tiny-bean-coffee.webp",
    demoUrl: "https://tinybeancoffeeshop.com/",
    seoKeywords: [
      "Tiny Bean Coffee Shop",
      "tinybeancoffeeshop.com",
      "kahve e-ticaret sitesi",
      "Next.js e-ticaret",
      "iyzico ödeme entegrasyonu",
      "Neon PostgreSQL e-ticaret",
      "Ankara e-ticaret web tasarım",
      "online kahve mağazası",
      "Aksipal e-ticaret referans",
    ],
  },
  {
    slug: "oditron-siber-guvenlik",
    category: "web",
    highlights: ["multilingual", "motion"],
    title: "Oditron Teknoloji",
    sector: "Siber Güvenlik",
    summary:
      "Ankara merkezli siber güvenlik şirketi Oditron Teknoloji için sıfırdan kurumsal web sitesi. Gazete mizanpajlı ana sayfa, çözümler, 23 iş ortağı vitrini, haberler ve iletişim; TR/EN, KVKK ve teknik SEO ile Next.js üzerinde.",
    problem:
      "Siber güvenlik danışmanlığı, proaktif güvenlik, Ar-Ge ve eğitim hizmetleri ile yerli ve global ürün portföyünün kurumsal müşterilere tek sitede, sektördeki benzer sitelerden ayrışan bir kurguyla anlatılması gerekiyordu.",
    solution:
      "Next.js App Router ile Hakkımızda, Çözümler, İş Ortakları, Haberler, İletişim ve yasal sayfalar. Ana sayfada manşet, köşe yazısı ve sütunlu haber bloklarından oluşan gazete mizanpajı; mobilde tek akışa inen düzen. Görseller markaya özel üretildi; sayfa bazlı meta, Open Graph ve yapılandırılmış veri ile teknik SEO.",
    stack: [
      "Next.js (App Router)",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Çok Dilli (TR/EN)",
      "Gazete mizanpajı & tipografi",
      "Geçiş animasyonları",
      "SEO / Open Graph",
      "KVKK & çerez uyumu",
    ],
    metrics: [
      { label: "Konsept", value: "Gazete düzeni" },
      { label: "İş Ortağı Vitrini", value: "23 marka" },
      { label: "Dil", value: "TR / EN" },
    ],
    image: "/images/cases/oditron.png",
    demoUrl: "https://oditron.com/tr/",
    seoKeywords: [
      "Oditron",
      "Oditron Teknoloji",
      "oditron.com",
      "siber güvenlik şirketi web sitesi",
      "siber güvenlik firması kurumsal web tasarım",
      "gazete konseptli web sitesi",
      "Next.js kurumsal web sitesi Ankara",
      "Aksipal referans",
    ],
  },
  {
    slug: "obsolix-dns-security",
    category: "web",
    highlights: ["multilingual", "motion"],
    title: "Obsolix",
    sector: "Siber Güvenlik / SaaS",
    summary:
      "Dubai merkezli Obsolix'in DNS güvenlik platformu için üç dilli (EN/TR/AR) kurumsal ürün sitesi. Platform, kaynaklar ve şirket bölümleri, demo talebi akışı; ürün videoları ve görseller tarafımızca üretildi, şirketin kendi sunucularında yayında.",
    problem:
      "Teknik derinliği yüksek bir güvenlik ürününün kamu, finans ve savunma alıcılarına üç dilde, sade ve güven veren bir yapıyla anlatılması; ürün, uyumluluk, kaynak ve basın sayfalarının hızlı ve SEO uyumlu tek sitede toplanması gerekiyordu.",
    solution:
      "Next.js App Router ile EN/TR/AR dil yapısı ve hreflang; Platform (genel bakış, nasıl çalışır, karşılaştırma, uyumluluk), Kaynaklar (SSS, destek), Şirket ve iletişim sayfaları. Neon vurgulu koyu tema, geçiş animasyonları, her sayfada demo talebi. Tanıtım ve ürün videoları ile görseller stok değil, markaya özel üretildi. Şirketin kendi sunucusunda yayınlandı.",
    stack: [
      "Next.js (App Router)",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Çok Dilli (EN / TR / AR)",
      "Özgün video & görsel üretimi",
      "Geçiş animasyonları",
      "Demo talebi akışı",
      "SEO / hreflang / Open Graph",
      "Self-host yayın",
    ],
    metrics: [
      { label: "Dil", value: "EN / TR / AR" },
      { label: "Video & Görsel", value: "Özgün üretim" },
      { label: "Yayın", value: "Kendi sunucusu" },
    ],
    image: "/images/cases/obsolix.png",
    demoUrl: "https://obsolix.com/",
    seoKeywords: [
      "Obsolix",
      "obsolix.com",
      "DNS güvenlik platformu web sitesi",
      "siber güvenlik SaaS web sitesi",
      "çok dilli kurumsal web sitesi",
      "Arapça İngilizce Türkçe web sitesi",
      "Next.js ürün sitesi",
      "Dubai şirketi web sitesi",
      "Aksipal referans",
    ],
  },
  {
    slug: "korsis-teknoloji",
    category: "web",
    highlights: ["3d", "motion", "multilingual"],
    title: "Korsis Teknoloji",
    sector: "Teknoloji",
    summary:
      "Korsis Teknoloji A.Ş. kurumsal web sitesi: siber güvenlik ve ağ altyapısı odaklı çok sayfalı Next.js uygulaması; Obsolix ürün vitrini, TR/EN dil, KVKK uyumu, teknik SEO ve 3D / motion görsel efektler.",
    problem:
      "Kurumsal siber güvenlik ve ağ mühendisliği alanında faaliyet gösteren şirketin; teknik güvenilirlik, ürün (Obsolix) ve hizmet portföyünün aynı anda anlaşılır şekilde sunulması, Obsolix ve hizmet sayfalarında dönüşüm, referans ve çözüm ortakları görünürlüğü ile profesyonel bir ilk izlenim gerekiyordu. Çok dilli (TR/EN) yapı, yasal sayfalar (KVKK, gizlilik, çerez) ve cookie consent olmadan kurumsal uyum tamamlanamazdı. Rakip teknoloji siteleri arasında ayrışmak için yalnız statik sayfa değil; ileri seviye etkileşim, performans ve SEO sinyalleri bir arada taşınmalıydı.",
    solution:
      "Next.js 15 App Router ve TypeScript ile modüler sayfa mimarisi: ana sayfa (hero, hizmet alanları, Obsolix vitrin, sektör grid’i, süreç ve CTA), dinamik hizmet sayfaları, hakkımızda, referanslar, çözüm ortakları, iletişim ve şirket profili; gizlilik, KVKK, kullanım şartları ve çerez politikası. next-intl ile TR/EN; görsel tarafta React Three Fiber / Three.js tabanlı interaktif bileşenler, GSAP ve Motion ile animasyonlar, glassmorphism ve koyu kurumsal tema. Metadata ve JSON-LD ile arama uyumu; çerez banner ve Google Analytics entegrasyonuna uygun yapı. Canlı site: korsisteknoloji.com.",
    stack: [
      "Next.js 15",
      "TypeScript",
      "React 19",
      "next-intl (TR/EN)",
      "Tailwind CSS",
      "React Three Fiber & drei",
      "Three.js",
      "GSAP",
      "Motion",
      "SEO / JSON-LD",
      "Cookie consent",
    ],
    metrics: [
      { label: "Sayfa / Rota", value: "15+" },
      { label: "Dil", value: "TR / EN" },
      { label: "3D / Motion", value: "Evet" },
    ],
    image: "/images/cases/korsis-teknoloji.png",
    demoUrl: "https://korsisteknoloji.com/",
    seoKeywords: [
      "Korsis Teknoloji",
      "Korsis Teknoloji web sitesi",
      "korsisteknoloji.com",
      "kurumsal siber güvenlik web sitesi",
      "Obsolix",
      "ağ altyapısı web tasarım",
      "siber güvenlik şirketi sitesi",
      "Aksipal referans",
      "Next.js kurumsal site",
    ],
  },
  {
    slug: "dedpharma",
    category: "web",
    title: "DedPharma",
    sector: "İlaç & Sağlık",
    summary:
      "DedPharma kurumsal web sitesi: medikal ürün distribütörü için çok sayfalı Next.js yapı, ürün ve bilim danışma kurulu içerikleri, KVKK ve gizlilik sayfaları, teknik SEO ve performans odaklı teslim.",
    problem:
      "İlaç ve medikal alanda faaliyet gösteren markanın; kurumsal güven, regülasyonlara uygun içerik sunumu ve sağlık profesyonellerine yönelik net bilgi mimarisi tek bir sitede toplanmalıydı. Ürün bilgileri, bilim danışma kurulu, şirket kimliği ve iletişim kanallarının ayrı ayrı dağınık veya güncelliğini yitirmiş kaynaklarda olması, hem marka aramalarında hem de «DeD Farma», «DedPharma», «Ultracol» gibi niyetli sorgularda görünürlüğü zayıflatıyordu. Yasal gereklilikler (KVKK, gizlilik politikası) ve erişilebilir, hızlı, mobil uyumlu deneyim olmadan kurumsal itibar tam taşınmıyordu.",
    solution:
      "Next.js App Router ile çok sayfalı kurumsal yapı kurgulandı: ana sayfa, ürünler ve ürün detay, bilim danışma kurulu (uzman profilleri), hakkımızda, iletişim ve bilgi talep akışları; gizlilik politikası ve KVKK metinleri. Semantik HTML başlık hiyerarşisi, sayfa bazlı meta açıklamalar, Open Graph ve Twitter Card ile paylaşım önizlemeleri; Türkçe içerik ve tutarlı URL yapısı (ör. /urunler, /bilim-kurulu) ile arama motorlarına net sinyal. Tailwind CSS ile responsive arayüz, görsel optimizasyonu ve form/CTA ile dönüşüm; Core Web Vitals ve Lighthouse uyumlu performans hedefiyle yayına alındı. Canlı site: dedpharma.com.",
    stack: [
      "Next.js (App Router)",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "SEO",
      "Open Graph",
      "Semantic HTML",
      "Performans / CWV",
    ],
    metrics: [
      { label: "Sayfa", value: "~8+" },
      { label: "Yasal / KVKK", value: "Dahil" },
      { label: "Teknik SEO", value: "OG + Meta" },
    ],
    image: "/images/cases/dedpharma.png",
    demoUrl: "https://dedpharma.com/",
    seoKeywords: [
      "DedPharma",
      "DeD Farma",
      "DedPharma web sitesi",
      "DeD Farma İlaç Sağlık",
      "ilaç distribütörü web sitesi",
      "medikal kurumsal web tasarım",
      "Ultracol",
      "PDO dolgu",
      "sağlık sektörü web sitesi",
      "Aksipal referans",
      "kurumsal web sitesi",
    ],
  },
  {
    slug: "renk-lojistik",
    category: "web",
    title: "RENK LOJİSTİK",
    sector: "Taşımacılık",
    summary:
      "81 il parça, parsiyel ve komple taşımacılık; şehir içi, şehirler arası, ekspres ve kurumsal sözleşmeli hizmetler. Sigortalı taşıma, zamanında teslimat, teklif formu ve WhatsApp entegrasyonu; dark mode ve SEO ile kurumsal lojistik sitesi.",
    problem:
      "Lojistik hizmetlerinin (şehir içi, 81 il, parsiyel, komple, ekspres, kurumsal) tek sitede net sunulması, teklif ve iletişim (form + WhatsApp) ile dark mode deneyimi gerekiyordu.",
    solution:
      "Next.js App Router ile 10 sayfalık lojistik sitesi; hizmet kartları (şehir içi, şehirler arası, parsiyel, komple, ekspres, kurumsal), her hizmette «Teklif Al» ve WhatsApp CTA, teklif formu, dark mode ve SEO odaklı yapı kurgulandı.",
    stack: ["Next.js App Router", "TypeScript", "React", "Dark Mode", "WhatsApp Entegrasyonu", "Teklif Formu", "SEO"],
    metrics: [
      { label: "Hizmet Sayısı", value: "6+" },
      { label: "Sayfa", value: "~10" },
      { label: "Teklif / WhatsApp", value: "Entegre" },
    ],
    image: "/images/cases/renklojistik.png",
    demoUrl: "https://renklojistik.com/",
  },
  {
    slug: "artel-energy",
    category: "web",
    title: "Artel Energy",
    sector: "Enerji",
    summary:
      "Elektrikli araç şarj istasyonları, güneş enerjisi danışmanlığı, AG/OG altyapı ve pano kurulumu; WhatsApp, e-posta ve sosyal medya yönlendirmeleri ile tek çatıda kurumsal site.",
    problem:
      "Yenilenebilir enerji ve elektrik altyapısı hizmetlerinin tek bir profesyonel sitede toplanması, teklif ve iletişim kanallarının net sunulması gerekiyordu.",
    solution:
      "Hizmet odaklı hero alanları, proje galerisi, ücretsiz teklif formu ve 7/24 iletişim (telefon, WhatsApp, e-posta, sosyal medya) ile dönüşüm odaklı modern arayüz kurgulandı.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "SEO", "İletişim Entegrasyonları"],
    metrics: [
      { label: "Hizmet Alanları", value: "4+" },
      { label: "İletişim Kanalları", value: "7/24" },
      { label: "Teklif Formu", value: "Entegre" },
    ],
    image: "/images/cases/artel-energy.png",
    demoUrl: "https://artelenerji.com/",
  },
  {
    slug: "el-sa-mekanik",
    category: "web",
    title: "EL&SA MEKANİK",
    sector: "İnşaat / Mekanik",
    summary:
      "Ankara merkezli inşaat firması; yurt içi ve yurt dışı inşaat işleri. Isıtma, doğalgaz, mekanik tesisat, su tesisatı, sprinkler yangın sistemleri ve plan & proje hizmetleri; dark mode ve TR dil desteği ile kurumsal site.",
    problem:
      "Mekanik tesisat ve inşaat hizmetlerinin tek bir sitede net sunulması, her hizmet için WhatsApp üzerinden teklif alımı ve kullanıcı tercihine göre (koyu tema, dil) deneyim sunulması gerekiyordu.",
    solution:
      "Koyu tema (dark mode) ve TR dil seçeneği, hizmet odaklı sayfalar (ısıtma/doğalgaz, su tesisatı, yangın sistemleri, plan & proje), her hizmette «Bu Hizmet İçin Teklif Al» WhatsApp CTA ile dönüşüm odaklı modern arayüz kurgulandı.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Dark Mode", "i18n (TR)", "WhatsApp Entegrasyonu", "SEO"],
    metrics: [
      { label: "Hizmet Alanları", value: "4+" },
      { label: "WhatsApp Teklif", value: "Hizmet Bazlı" },
      { label: "Tema / Dil", value: "Dark, TR" },
    ],
    image: "/images/cases/el-sa-mekanik.png",
    demoUrl: "https://elsamekanik.com/",
  },
  {
    slug: "muscle-factory-sport-center",
    category: "web",
    title: "Muscle Factory Sport Center",
    sector: "Spor / Fitness",
    summary:
      "Ankara Yenimahalle’de spor ve fitness merkezi; 10 yıllık deneyim, sertifikalı merkez ve ödüllü hizmet. Vücut geliştirme, kas geliştirme, sınıf programları (Kardiyo, Crossfit, Powerlifting), antrenör profili ve VKE hesaplayıcı.",
    problem:
      "Spor salonunun dijital görünürlüğü, sınıf programları ve üyelik dönüşümünün tek bir sitede net sunulması, güven (sertifika, ödül) ve «hemen katıl» akışının vurgulanması gerekiyordu.",
    solution:
      "Hero ve hizmet kartları (vücut geliştirme, kas geliştirme), sınıf zaman çizelgesi, 10 yıllık deneyim / sertifikalı merkez / ödüllü hizmet blokları, antrenör profili, VKE hesaplayıcı, blog ve müşteri referansları ile dönüşüm odaklı kurumsal site kurgulandı.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "SEO", "Blog", "İletişim Formu"],
    metrics: [
      { label: "Deneyim", value: "10 Yıl" },
      { label: "Sertifika / Ödül", value: "Vurgulu" },
      { label: "Sınıf Programı", value: "Entegre" },
    ],
    image: "/images/cases/musclefactory-gym.png",
    demoUrl: "https://musclefactorysportcenter.com/",
  },
  {
    slug: "ankara-kamyonetciler-dernegi",
    category: "web",
    title: "Ankara Kamyonetçiler Derneği",
    sector: "Taşımacılık",
    summary: "Ankara Kamyonetçi Nakliyeciler Derneği kurumsal sitesi; hizmetler, üyelik ve iletişim odaklı modern arayüz.",
    problem:
      "Derneğin dijital görünürlüğü ve üye yönlendirme süreçleri tek bir profesyonel platformda toplanmıyordu.",
    solution:
      "Next.js ile hızlı, SEO uyumlu site; hizmet kartları, blog, üyelik formu ve iletişim kanalları tek çatıda.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "SEO"],
    metrics: [
      { label: "Hizmet Sayısı", value: "6+" },
      { label: "İletişim Kanalları", value: "7/24" },
      { label: "Üyelik Akışı", value: "Entegre" },
    ],
    image: "/images/cases/kamyonetciler.png",
    demoUrl: "https://kamyonetciler.com/",
  },
  {
    slug: "aksipal-web-systems-studio",
    category: "web",
    title: "Aksipal Web Studio",
    sector: "Blog",
    summary:
      "Stüdyo tanıtım sitesi: hizmetler, sektörel paketler, referans projeler, blog ve teklif akışı; koyu tema, TR/EN dil desteği, WhatsApp ve form ile dönüşüm odaklı.",
    problem:
      "Stüdyonun hizmetlerini, şablonları ve referansları tek bir premium sitede sunması; küçük işletmelere net mesaj, filtrelenebilir şablon seçimi ve «Teklif Al» akışı ile erişmesi gerekiyordu.",
    solution:
      "Template Gallery (sektör filtresi, karttan şablon seçimi, canlı demo linkleri), hizmetler, Referans Projeler grid’i, referans/testimonials, blog, Hakkımda, iletişim ve Teklif Al CTA; koyu tema, i18n (TR/EN), SEO ve Lighthouse 90+ hedefi ile tek sayfa deneyimi kurgulandı.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "i18n (TR/EN)", "SEO", "Lead Form", "WhatsApp CTA"],
    metrics: [
      { label: "Şablon Kategorisi", value: "11+" },
      { label: "Referans Projeler", value: "Grid" },
      { label: "Dil", value: "TR / EN" },
    ],
    image: "/images/cases/aksipal.png",
    demoUrl: "https://aksipal.com/",
  },
] as const;

export const cases = z.array(caseSchema).parse(rawCases);

export type CaseHighlight = NonNullable<CaseItem["highlights"]>[number];

/** Kart etiketleri için kısa adlar */
export const caseHighlightLabel: Record<CaseHighlight, { tr: string; en: string }> = {
  "3d": { tr: "3D", en: "3D" },
  motion: { tr: "Motion", en: "Motion" },
  multilingual: { tr: "TR / EN", en: "TR / EN" },
  "ecommerce-revision": { tr: "Revizyon", en: "Revision" },
};

/** /isler sayfasında ayrı bölümde gösterilecek 3D / animasyonlu işler */
export const cases3d = cases.filter((c) => c.highlights?.includes("3d"));

export type CaseItem = z.infer<typeof caseSchema>;
