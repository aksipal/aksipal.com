import type { Locale } from "@/lib/i18n";

/**
 * Ayrı hizmet sayfaları (/hizmetler/[slug]) — Google Ads landing + organik + AI arama (GEO) için.
 * Her sayfa: doğrudan cevap paragrafı, kapsam, süreç, fiyat çerçevesi, gerçek referanslar, SSS.
 * Yalnızca doğrulanabilir bilgi yazılır; uydurma metrik ve müşteri yok (bkz. lib/cases.ts).
 */

export type ServiceSlug = "kurumsal-web-sitesi" | "e-ticaret" | "ozel-yazilim";

export type ServiceFaq = { q: string; a: string };

export type ServiceContent = {
  slug: ServiceSlug;
  /** <title> (≤60 karakter hedefi) */
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** Kısa menü/kart adı */
  name: string;
  h1: string;
  /** İlk paragraf: soruya doğrudan cevap (AI/featured snippet için 40–60 kelime) */
  answer: string;
  intro: string;
  /** "Kimler için" */
  audience: string[];
  /** Kapsam */
  includes: { title: string; text: string }[];
  /** Süreç adımları */
  process: { title: string; text: string }[];
  /** Fiyat çerçevesi — doğrulanabilir, pricing.ts ile tutarlı */
  pricing: { headline: string; note: string; items: { name: string; price: string; detail: string }[] };
  /** Teknoloji yığını */
  stack: string[];
  /** Gösterilecek gerçek referans slug'ları (lib/cases.ts) */
  caseSlugs: string[];
  faq: ServiceFaq[];
  cta: string;
};

const tr: Record<ServiceSlug, ServiceContent> = {
  "kurumsal-web-sitesi": {
    slug: "kurumsal-web-sitesi",
    metaTitle: "Kurumsal Web Sitesi Yaptırma | Aksipal Web Studio",
    metaDescription:
      "Türkiye genelinde firmalar için Next.js ile hızlı, çok dilli, teknik SEO'su hazır kurumsal web sitesi. 20.000 TL'den başlayan sabit fiyat, 4–12 iş gününde yayında, yazılı sözleşme. Yayında 10+ referans.",
    keywords: [
      "kurumsal web sitesi yaptırma",
      "kurumsal web sitesi",
      "kurumsal web tasarım",
      "kurumsal web sitesi fiyatları 2026",
      "firma web sitesi yaptırma",
      "web yazılım firması",
      "çok dilli kurumsal web sitesi",
      "SEO uyumlu kurumsal web sitesi",
      "Next.js kurumsal web sitesi",
      "web tasarım firması Türkiye",
      "3D animasyonlu web sitesi",
      "Three.js kurumsal web sitesi",
    ],
    name: "Kurumsal Web Sitesi",
    h1: "Kurumsal Web Sitesi Yaptırma — Hızlı, Çok Dilli, SEO'su Hazır",
    answer:
      "Aksipal Web Studio, Türkiye genelindeki firmalar için Next.js altyapısıyla kurumsal web sitesi geliştirir: 20.000 TL + KDV'den başlayan sabit fiyat, 4–12 iş gününde yayın, Türkçe/İngilizce dil desteği, teknik SEO ve KVKK uyumu standart. Yazılı sözleşme imzalanır; kaynak kod ve tüm hesaplar size ait olur.",
    intro:
      "Kurumsal web sitesi bir firmanın en çok ziyaret edilen vitrinidir: potansiyel müşteri, iş ortağı ve aday çalışan sizi önce burada değerlendirir. Biz bu vitrini WordPress tema kalabalığı yerine modern bir yazılım projesi gibi ele alıyoruz — hızlı açılan, Google'ın okuyabildiği, mobilde kusursuz ve yıllarca sorunsuz çalışan bir yapı. Teknoloji, sağlık, lojistik, enerji, inşaat ve turizm sektörlerinde yayında olan referanslarımızı aşağıda canlı olarak inceleyebilirsiniz.",
    audience: [
      "Mevcut sitesi eski, yavaş veya mobilde kötü görünen kurumsal firmalar",
      "İlk kez profesyonel bir kurumsal site yaptıracak büyüyen şirketler",
      "İhracat yapan veya yurt dışında faaliyet gösteren, TR/EN ya da üç dilli (örn. EN/TR/AR) siteye ihtiyaç duyan firmalar",
      "Google Ads veya LinkedIn reklamı verecek, dönüşüm odaklı bir açılış sayfası isteyen pazarlama ekipleri",
    ],
    includes: [
      { title: "Markanıza özel tasarım", text: "Hazır tema değil; kurumsal kimliğinize, hedef kitlenize ve sektörünüze göre tasarlanan arayüz. Koyu/açık tema, animasyon ve 3D görsel efekt seçenekleri." },
      { title: "3D ve animasyonlu arayüz (opsiyonel)", text: "Three.js / React Three Fiber ile interaktif 3D sahneler, GSAP ve Motion ile akıcı geçişler. Teknoloji, savunma, enerji gibi sektörlerde premium ve yenilikçi algı için; canlı örnek: Korsis Teknoloji." },
      { title: "Özgün görsel ve video üretimi", text: "Stok fotoğraf kullanmıyoruz. Sıfırdan geliştirdiğimiz projelerde markaya özel görseller ve tanıtım/ürün videoları tarafımızca hazırlanır; canlı örnekler: Obsolix (ürün videoları), Oditron." },
      { title: "Çok dilli yapı (TR/EN ve ötesi)", text: "Her dil için ayrı URL, hreflang etiketleri ve dil bazlı meta veriler. Üçüncü dil eklenebilir; canlı örnek: Obsolix (EN/TR/AR)." },
      { title: "Teknik SEO standart", text: "Meta başlık ve açıklamalar, Open Graph, JSON-LD yapılandırılmış veri, sitemap.xml, robots.txt, Core Web Vitals optimizasyonu ve görsel alt metinleri." },
      { title: "Dönüşüm altyapısı", text: "Teklif ve iletişim formları, WhatsApp yönlendirmesi, tıklama takibi, Google Analytics 4 ve Consent Mode v2 ile KVKK uyumlu ölçümleme." },
      { title: "Yasal sayfalar ve KVKK", text: "Gizlilik politikası, KVKK aydınlatma metni, çerez politikası ve çerez onay banner'ı hazır teslim edilir." },
      { title: "Yayın ve devir", text: "Vercel veya Netlify üzerinde yayın, alan adı ve DNS yönlendirmesi, kaynak kodun ve hesapların size devri. İsteğe bağlı aylık bakım planı." },
    ],
    process: [
      { title: "Keşif görüşmesi (30 dk)", text: "Hedef, kitle, sayfa yapısı ve içerik durumunu netleştiriyoruz. Aynı gün yazılı kapsam ve fiyat." },
      { title: "Bilgi mimarisi ve içerik", text: "Sayfa ağacı, başlık hiyerarşisi ve mesaj sırası. İçeriklerinizi düzenliyor, eksikleri birlikte tamamlıyoruz." },
      { title: "Tasarım ve geliştirme", text: "Next.js ile geliştirme; ara teslimlerde canlı önizleme linki üzerinden geri bildirim." },
      { title: "Test ve yayın", text: "Mobil, tarayıcı, hız ve SEO kontrolleri; alan adına bağlama ve Google Search Console kurulumu." },
    ],
    pricing: {
      headline: "Sabit fiyat, yazılı sözleşme",
      note: "Fiyatlara KDV dahil değildir. Kapsam dışı talepler önce yazılı olarak fiyatlandırılır; onayınız olmadan başlanmaz.",
      items: [
        { name: "Başlangıç", price: "20.000 TL + KDV", detail: "6 sayfa, sektöre özel tasarım, teknik SEO temeli, 4–5 iş günü" },
        { name: "Gelişim", price: "35.000 TL + KDV", detail: "10 sayfa, premium arayüz, gelişmiş SEO ve Core Web Vitals, 6–8 iş günü" },
        { name: "Kurumsal", price: "50.000 TL + KDV", detail: "Sınırsız sayfa, TR/EN, kullanıcı girişi ve harici sistem entegrasyonu, 8–12 iş günü" },
      ],
    },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel / Netlify", "JSON-LD", "Google Analytics 4"],
    caseSlugs: ["oditron-siber-guvenlik", "korsis-teknoloji", "dedpharma", "efsense-travel", "renk-lojistik", "artel-energy"],
    faq: [
      { q: "Kurumsal web sitesi fiyatı 2026'da ne kadar?", a: "Bizde kurumsal web sitesi 20.000 TL + KDV'den başlar ve kapsama göre 50.000 TL + KDV'ye kadar çıkar. Fiyat sayfa sayısı, dil sayısı, özel tasarım derinliği ve entegrasyonlara göre belirlenir; teklifte tek rakam ve net kapsam yazar." },
      { q: "Kurumsal web sitesi ne kadar sürede yayına alınır?", a: "İçerikleriniz hazırsa 4–12 iş günü. Başlangıç paketi 4–5, Gelişim 6–8, Kurumsal paket 8–12 iş günü sürer. İçerik hazır değilse birlikte hazırlıyoruz; süre buna göre teklifte güncellenir." },
      { q: "WordPress yerine neden Next.js?", a: "Next.js ile geliştirilen siteler statik olarak yayınlandığı için çok daha hızlı açılır, eklenti güvenlik açıkları taşımaz ve sunucu bakımı gerektirmez. Google'ın hız ve Core Web Vitals sinyallerinde belirgin avantaj sağlar. İçerik güncellemesi için size kısa video eğitimi hazırlıyoruz." },
      { q: "Siteyi sonradan kendimiz güncelleyebilir miyiz?", a: "Evet. Metin ve görsel güncellemeleri için düzenleme akışı ve kısa video rehber teslim ediyoruz. Daha sık içerik girişi gereken firmalar için yönetim paneli (CMS) entegrasyonu da ekleyebiliyoruz." },
      { q: "Türkiye'nin başka bir şehrindeyiz, çalışabilir miyiz?", a: "Evet. Projelerimizin büyük bölümü uzaktan yürür: görüşmeler Google Meet üzerinden, geri bildirimler canlı önizleme linki ile. Ankara'da yüz yüze görüşme de mümkündür." },
      { q: "Kaynak kod ve alan adı kime ait olur?", a: "Size. Kaynak kod GitHub hesabınıza, yayın hesapları ve alan adı sizin adınıza devredilir; bu sözleşmede yazılıdır. Bize bağımlı kalmazsınız." },
    ],
    cta: "Kurumsal web siteniz için teklif alın",
  },

  "e-ticaret": {
    slug: "e-ticaret",
    metaTitle: "E-Ticaret Sitesi Yaptırma | Aksipal Web Studio",
    metaDescription:
      "Hazır paket kısıtı olmadan markanıza özel e-ticaret sitesi: ürün yönetimi, sepet, iyzico/Stripe ödeme, üyelik, abonelik ve B2B akışları. Kapsama göre yazılı teklif, sabit fiyat. Canlı referans: Tiny Bean Coffee Shop.",
    keywords: [
      "e-ticaret sitesi yaptırma",
      "e-ticaret sitesi kurma",
      "e-ticaret yazılımı",
      "kurumsal e-ticaret sitesi",
      "B2B e-ticaret sitesi",
      "özel e-ticaret yazılımı",
      "iyzico entegrasyonu",
      "Next.js e-ticaret",
      "e-ticaret sitesi fiyatları 2026",
      "online mağaza yaptırma",
    ],
    name: "E-Ticaret Sitesi",
    h1: "E-Ticaret Sitesi Yaptırma — Markanıza Özel, Hızlı ve Ölçeklenebilir",
    answer:
      "Aksipal Web Studio, Next.js ve PostgreSQL altyapısıyla markanıza özel e-ticaret sitesi geliştirir: ürün ve stok yönetimi, sepet, iyzico veya Stripe ile güvenli ödeme, üyelik, abonelik ve B2B/toptan sipariş akışları. Fiyat kapsama göre yazılı teklifte netleşir; aylık paket lisansı yoktur, kaynak kod size aittir.",
    intro:
      "Hazır e-ticaret paketleri hızlı başlar ama büyüdükçe sizi sınırlar: tema kısıtları, aylık lisans, eklenti bağımlılığı ve yavaş sayfalar. Biz e-ticareti kendi yazılımınız olarak kuruyoruz — tasarım, ürün yapısı ve sipariş akışı tamamen işinize göre. Canlı referanslar: Ankaragücü Store (ikas üzerinde arayüz revizyonu) ve Tiny Bean Coffee Shop (sıfırdan geliştirilmiş mağaza: katalog, iyzico ödeme, üyelik, abonelik, B2B akışı).",
    audience: [
      "Fiziksel mağazası olup online satışa açılacak markalar",
      "Hazır e-ticaret paketinin kısıtlarına takılmış, kendi altyapısına geçmek isteyen firmalar",
      "Bayi veya kurumsal müşterilerine B2B/toptan sipariş portalı açacak üretici ve distribütörler",
      "Abonelik, ön sipariş veya özel ürün kurgusu gibi standart paketlerin desteklemediği modeller",
    ],
    includes: [
      { title: "Ürün kataloğu ve yönetim paneli", text: "Kategori, varyant (beden, renk, gramaj), stok ve fiyat yönetimi; toplu ürün yükleme ve görsel optimizasyonu." },
      { title: "Sepet, ödeme ve sipariş", text: "iyzico veya Stripe ile 3D Secure ödeme, taksit seçenekleri, sipariş takibi, otomatik e-posta ve WhatsApp bildirimi." },
      { title: "Üyelik ve müşteri hesabı", text: "Kayıt/giriş, adres defteri, sipariş geçmişi, favoriler; KVKK uyumlu pazarlama izni ve bülten kaydı." },
      { title: "Abonelik ve B2B akışları", text: "Tekrarlayan sipariş (abonelik), toptan fiyat listesi, bayi girişi ve teklif talebi gibi işinize özel akışlar." },
      { title: "SEO ve performans", text: "Ürün ve kategori sayfalarında yapılandırılmış veri (Product, Offer), hızlı açılış, mobil öncelikli tasarım ve Google Merchant Center uyumu." },
      { title: "Entegrasyonlar", text: "Kargo firmaları, e-fatura, muhasebe ve pazar yeri (Trendyol, Hepsiburada) entegrasyonları kapsama göre eklenir." },
    ],
    process: [
      { title: "Keşif ve kapsam", text: "Ürün yapısı, ödeme sağlayıcı, kargo ve entegrasyon ihtiyaçlarını çıkarıyoruz; sprint planı ve yazılı teklif." },
      { title: "Veri modeli ve tasarım", text: "Ürün/varyant modeli, sipariş akışı ve arayüz tasarımı; onayınızla geliştirmeye geçiş." },
      { title: "Sprint bazlı geliştirme", text: "Her sprint sonunda çalışan sürümü test ortamında deniyorsunuz; ödeme testleri sandbox üzerinde yapılır." },
      { title: "Canlıya alım ve eğitim", text: "Ödeme sağlayıcı canlı anahtarları, alan adı, SSL ve panel eğitimi; ilk haftalarda yakın destek." },
    ],
    pricing: {
      headline: "Kapsama göre yazılı teklif, aylık lisansı olmayan altyapı",
      note: "Nihai fiyat ürün adedi, varyant yapısı, ödeme sağlayıcı ve entegrasyon sayısına göre yazılı teklifte netleşir. Kaynak kod size aittir; aylık paket kirası ödemezsiniz.",
      items: [
        { name: "Mağaza", price: "Teklif", detail: "Katalog, sepet, iyzico/Stripe ödeme, üyelik, sipariş yönetimi, SEO" },
        { name: "Mağaza + Abonelik / B2B", price: "Teklif", detail: "Tekrarlayan sipariş, toptan fiyat listesi, bayi portalı ve özel akışlar" },
        { name: "Entegrasyon paketi", price: "Teklif", detail: "Kargo, e-fatura, muhasebe ve pazar yeri bağlantıları" },
      ],
    },
    stack: ["Next.js", "TypeScript", "PostgreSQL (Neon)", "iyzico / Stripe", "Vercel", "Resend / WhatsApp bildirim"],
    caseSlugs: ["ankaragucu-store", "tiny-bean-coffee"],
    faq: [
      { q: "Mevcut e-ticaret sitemizi sıfırdan yapmadan iyileştirebilir misiniz?", a: "Evet. ikas, Ticimax veya benzeri hazır altyapıda çalışan bir mağazanız varsa altyapıyı değiştirmeden tema, vitrin, kategori düzeni ve mobil deneyimi revize edebiliyoruz. Ankaragücü Store bu şekilde, ikas altyapısı üzerinde yapılan bir arayüz revizyonu projesidir." },
      { q: "E-ticaret sitesi kurma maliyeti 2026'da ne kadar?", a: "Markaya özel e-ticaret altyapısında tek liste fiyatı yok; ürün yapısı, ödeme sağlayıcı ve entegrasyonlara göre yazılı teklif çıkarıyoruz. Hazır paketlerdeki gibi aylık lisans ücreti yoktur; ödeme sağlayıcının işlem komisyonu ve yıllık alan adı/hosting gideri ayrıca oluşur. Kapsam büyüdükçe (abonelik, B2B, entegrasyonlar) fiyat yazılı teklifte netleşir." },
      { q: "Hazır e-ticaret paketi mi, özel yazılım mı?", a: "Ürün sayınız az, standart bir satış akışınız varsa ve hızlı başlamak istiyorsanız hazır paket mantıklı olabilir. Markanıza özel tasarım, abonelik/B2B gibi özel akışlar, yüksek hız ve lisans bağımlılığından kurtulmak istiyorsanız özel altyapı uzun vadede daha ekonomik ve esnek olur." },
      { q: "Hangi ödeme altyapılarını kullanıyorsunuz?", a: "Türkiye'de iyzico (taksit, 3D Secure), yurt dışı satış için Stripe. İsteğe göre PayTR veya banka sanal POS entegrasyonu da yapılabilir." },
      { q: "Trendyol ve Hepsiburada entegrasyonu yapıyor musunuz?", a: "Evet, kapsama göre pazar yeri entegrasyonu ekliyoruz: ürün ve stok senkronizasyonu, sipariş aktarımı. Bu kalem ayrı fiyatlandırılır." },
      { q: "Site ne kadar sürede canlıya çıkar?", a: "Standart bir mağaza 4–8 haftada canlıya alınır. Abonelik, B2B veya çoklu entegrasyon içeren projelerde süre sprint planında netleşir; her sprint sonunda çalışan sürümü görürsünüz." },
    ],
    cta: "E-ticaret projeniz için teklif alın",
  },

  "ozel-yazilim": {
    slug: "ozel-yazilim",
    metaTitle: "Kişiye Özel Yazılım Geliştirme | Aksipal Web Studio",
    metaDescription:
      "Firmanıza özel web tabanlı yazılım: iç panel, B2B portal, bayi/müşteri portalı, entegrasyon katmanı veya SaaS MVP. Java/Python/Node backend + Next.js, sprint bazlı teslim, kaynak kod sizde. Türkiye geneli.",
    keywords: [
      "kişiye özel yazılım geliştirme",
      "özel yazılım şirketi",
      "özel yazılım geliştirme",
      "kurumsal uygulama geliştirme",
      "B2B portal yazılımı",
      "bayi portalı yazılımı",
      "web tabanlı yazılım",
      "SaaS MVP geliştirme",
      "yazılım firması Türkiye",
      "özel yazılım Ankara",
    ],
    name: "Kişiye Özel Yazılım",
    h1: "Kişiye Özel Yazılım Geliştirme — İşinize Göre Yazılan Sistemler",
    answer:
      "Aksipal Web Studio, firmaların hazır yazılımlarla çözemediği ihtiyaçlar için web tabanlı özel yazılım geliştirir: iç yönetim panelleri, B2B ve bayi portalları, müşteri portalları, sistemler arası entegrasyon katmanları ve SaaS ürün prototipleri (MVP). Java, Python veya Node backend ile Next.js arayüz; sprint bazlı teslim, her sprintte çalışan sürüm, kaynak kod size ait.",
    intro:
      "Excel'de yürüyen süreçler, birbirine bağlanmayan programlar ve 'bunu yapan hazır yazılım yok' dediğiniz işler için yazılımı sizin kurallarınıza göre yazıyoruz. Tek muhatapla çalışırsınız: analizden mimariye, geliştirmeden yayına kadar aynı mühendis. Tüm projeler standart ve yaygın teknolojilerle kurulur; başka bir ekip devralmak istese kolayca devralır.",
    audience: [
      "Operasyonunu Excel ve WhatsApp grupları üzerinden yürüten, tek panelde toplamak isteyen firmalar",
      "Bayilerine veya kurumsal müşterilerine sipariş, stok ve fiyat portalı açacak üretici ve distribütörler",
      "Mevcut ERP/CRM/muhasebe yazılımını web sitesi, e-ticaret veya saha ekibiyle konuşturmak isteyen şirketler",
      "Yazılım fikrini yatırımcı veya ilk müşterilerle test etmek için hızlı MVP isteyen girişimler",
    ],
    includes: [
      { title: "Analiz ve teknik tasarım", text: "Süreç haritası, ekran listesi, veri modeli ve entegrasyon noktaları. Ne yapılacağı kodlamadan önce yazılı olarak netleşir." },
      { title: "Backend ve veri katmanı", text: "Java (Spring), Python (FastAPI) veya Node ile API; PostgreSQL veri tabanı; rol bazlı yetkilendirme, loglama ve yedekleme." },
      { title: "Arayüz", text: "Next.js ve React ile hızlı, mobil uyumlu web arayüzü; tablo, filtre, rapor ve form yoğun ekranlar için optimize." },
      { title: "Entegrasyonlar", text: "ERP, muhasebe (Logo, Mikro, Paraşüt), e-fatura, kargo, ödeme, WhatsApp Cloud API, Google Workspace ve diğer sistemlerle API bağlantısı." },
      { title: "Yapay zeka katmanı (opsiyonel)", text: "Claude veya OpenAI tabanlı döküman analizi, sınıflandırma, özetleme veya müşteri asistanı; şirket verinizle RAG üzerinden, veriniz model eğitimine girmeden." },
      { title: "Yayın, güvenlik ve devir", text: "Docker ve CI/CD ile yayın, KVKK uyumlu barındırma (Türkiye/AB), dokümantasyon ve kaynak kodun devri. İsteğe bağlı bakım sözleşmesi." },
    ],
    process: [
      { title: "Keşif ve analiz", text: "Mevcut süreç, kullanıcılar ve hedefler. Çıktı: kapsam dokümanı ve sprint planı." },
      { title: "Mimari ve ilk sprint", text: "Veri modeli, API tasarımı ve ilk çalışan ekranlar. 2 haftalık sprintler." },
      { title: "Sprint döngüsü", text: "Her sprint sonunda test ortamında çalışan sürüm; geri bildirimler bir sonraki sprintte." },
      { title: "Canlıya alım ve eğitim", text: "Veri aktarımı, kullanıcı eğitimi, dokümantasyon; ilk ay yakın destek." },
    ],
    pricing: {
      headline: "Sprint bazlı, şeffaf fiyatlandırma",
      note: "Özel yazılımda tek bir liste fiyatı yoktur; kapsam dokümanı sonrası sprint sayısı ve toplam bütçe yazılı olarak sunulur. Kapsam değişiklikleri önce fiyatlandırılır, onaysız başlanmaz.",
      items: [
        { name: "MVP / İç panel", price: "Teklif", detail: "Tipik olarak 3–6 sprint; tek modül, sınırlı kullanıcı, temel entegrasyon" },
        { name: "B2B / bayi portalı", price: "Teklif", detail: "Ürün-fiyat-stok, sipariş, rol yönetimi, ERP/muhasebe entegrasyonu" },
        { name: "Bakım ve geliştirme", price: "Aylık", detail: "Yayın sonrası düzenli geliştirme ve destek için aylık sprint planı" },
      ],
    },
    stack: ["Java / Spring", "Python / FastAPI", "Node.js", "Next.js", "PostgreSQL", "Docker", "Claude / OpenAI (opsiyonel)"],
    caseSlugs: ["tiny-bean-coffee", "korsis-teknoloji"],
    faq: [
      { q: "Özel yazılım fiyatı nasıl belirlenir?", a: "Kapsam dokümanı çıkarıldıktan sonra sprint sayısına göre toplam bütçe yazılı olarak sunulur. Fiyatı belirleyen ana etkenler: ekran ve modül sayısı, entegrasyon adedi, kullanıcı rolleri ve veri aktarımı. Tek liste fiyatı vermiyoruz çünkü her proje farklıdır; ancak teklif tek rakam ve net kapsam içerir." },
      { q: "Tek mühendisle çalışmak risk değil mi?", a: "Bu yüzden tüm projeler yaygın ve standart teknolojilerle (Java, Python, Node, Next.js, PostgreSQL) kurulur, dokümante edilir ve kaynak kod ilk günden sizin GitHub hesabınızdadır. Başka bir ekip istediğiniz an devralabilir. Tek muhatap olmanın avantajı da var: takım koordinasyonunda kaybolan saatler size yansımaz." },
      { q: "Mevcut muhasebe veya ERP programımızla entegre olur mu?", a: "API veya dışa aktarım imkânı olan tüm sistemlerle entegrasyon kurabiliyoruz: Logo, Mikro, Paraşüt, e-fatura sağlayıcıları, kargo firmaları, ödeme altyapıları ve Google Workspace dahil. Keşif aşamasında entegrasyon noktalarını birlikte doğruluyoruz." },
      { q: "Verilerimiz nerede tutulur, KVKK'ya uygun mu?", a: "Tercihen Türkiye veya AB lokasyonlu sunucular (Hetzner Almanya, Vercel EU, Supabase EU). Rol bazlı erişim, loglama, yedekleme ve KVKK aydınlatma süreçleri standart olarak kurulur." },
      { q: "Proje ne kadar sürer?", a: "Tipik bir iç panel veya MVP 6–12 haftada canlıya çıkar; B2B portal gibi entegrasyon yoğun projeler kapsamına göre daha uzun sürer. Süre sprint planında netleşir ve her sprint sonunda çalışan sürümü görürsünüz." },
    ],
    cta: "Özel yazılım projeniz için keşif görüşmesi ayırın",
  },
};

const en: Record<ServiceSlug, ServiceContent> = {
  "kurumsal-web-sitesi": {
    slug: "kurumsal-web-sitesi",
    metaTitle: "Corporate Website Development | Aksipal Web Studio",
    metaDescription:
      "Fast, bilingual, SEO-ready corporate websites built with Next.js for companies across Turkey. Fixed price from ₺20,000, live in 4–12 business days, written contract. 10+ live references.",
    keywords: ["corporate website development Turkey", "corporate web design", "bilingual corporate website", "Next.js corporate website", "web design agency Turkey"],
    name: "Corporate Website",
    h1: "Corporate Website Development — Fast, Bilingual, SEO-Ready",
    answer:
      "Aksipal Web Studio builds corporate websites on Next.js for companies across Turkey: fixed price from ₺20,000 + VAT, live in 4–12 business days, Turkish/English support, technical SEO and KVKK compliance as standard. A written contract is signed; source code and all accounts are yours.",
    intro:
      "A corporate website is your company's most visited storefront: prospects, partners and candidates evaluate you here first. We treat it as a modern software project rather than a WordPress theme — fast, crawlable, flawless on mobile and reliable for years. Our live references in technology, healthcare, logistics, energy, construction and travel are linked below.",
    audience: [
      "Companies whose current site is outdated, slow or poor on mobile",
      "Growing businesses commissioning their first professional corporate site",
      "Exporters and firms with foreign partners that need a TR/EN site",
      "Marketing teams running Google or LinkedIn ads that need a conversion-focused landing page",
    ],
    includes: [
      { title: "Brand-specific design", text: "No off-the-shelf theme; an interface designed for your identity, audience and sector. Dark/light theme, motion and 3D visual options." },
      { title: "3D and animated UI (optional)", text: "Interactive 3D scenes with Three.js / React Three Fiber, fluid transitions with GSAP and Motion. For a premium, innovative feel in technology, defence or energy sectors; live example: Korsis Teknoloji." },
      { title: "Original imagery and video", text: "No stock photos. On projects built from scratch we produce brand-specific imagery and promotional/product videos ourselves; live examples: Obsolix (product videos), Oditron." },
      { title: "Bilingual structure (TR/EN)", text: "Separate URLs per language, hreflang tags and language-specific metadata. A third language can be added." },
      { title: "Technical SEO as standard", text: "Meta tags, Open Graph, JSON-LD structured data, sitemap.xml, robots.txt, Core Web Vitals optimization and image alt texts." },
      { title: "Conversion infrastructure", text: "Quote and contact forms, WhatsApp routing, click tracking, Google Analytics 4 with Consent Mode v2." },
      { title: "Legal pages and KVKK", text: "Privacy policy, KVKK notice, cookie policy and consent banner delivered ready." },
      { title: "Launch and handover", text: "Deployment on Vercel or Netlify, domain and DNS setup, handover of source code and accounts. Optional monthly maintenance." },
    ],
    process: [
      { title: "Discovery call (30 min)", text: "Goals, audience, page structure and content status. Written scope and price the same day." },
      { title: "Information architecture and content", text: "Page tree, heading hierarchy and message order. We organize your content and fill gaps together." },
      { title: "Design and development", text: "Built with Next.js; feedback via live preview links at interim deliveries." },
      { title: "Testing and launch", text: "Mobile, browser, speed and SEO checks; domain connection and Google Search Console setup." },
    ],
    pricing: {
      headline: "Fixed price, written contract",
      note: "Prices exclude VAT. Out-of-scope requests are quoted in writing first; nothing starts without your approval.",
      items: [
        { name: "Launch", price: "₺20,000 + VAT", detail: "6 pages, sector-specific design, technical SEO foundation, 4–5 business days" },
        { name: "Growth", price: "₺35,000 + VAT", detail: "10 pages, premium UI, advanced SEO and Core Web Vitals, 6–8 business days" },
        { name: "Scale", price: "₺50,000 + VAT", detail: "Unlimited pages, TR/EN, user login and external integrations, 8–12 business days" },
      ],
    },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel / Netlify", "JSON-LD", "Google Analytics 4"],
    caseSlugs: ["oditron-siber-guvenlik", "korsis-teknoloji", "dedpharma", "efsense-travel", "renk-lojistik", "artel-energy"],
    faq: [
      { q: "How much does a corporate website cost in 2026?", a: "Our corporate websites start at ₺20,000 + VAT and go up to ₺50,000 + VAT depending on scope. Price depends on page count, languages, design depth and integrations; the quote states one figure and a clear scope." },
      { q: "How long until launch?", a: "4–12 business days when your content is ready: Launch 4–5, Growth 6–8, Scale 8–12. If content isn't ready we prepare it together and update the timeline in the quote." },
      { q: "Why Next.js instead of WordPress?", a: "Next.js sites are statically deployed, so they load much faster, carry no plugin vulnerabilities and need no server maintenance — a clear advantage on Google's speed and Core Web Vitals signals. We provide a short video guide for content updates." },
      { q: "Can we update the site ourselves?", a: "Yes. We deliver an editing flow and a short video guide for text and image updates. For frequent content entry we can add a CMS." },
      { q: "We're in another city in Turkey — can we work together?", a: "Yes. Most projects run remotely: meetings on Google Meet, feedback via live preview links. In-person meetings are possible in Ankara." },
      { q: "Who owns the source code and domain?", a: "You do. Source code goes to your GitHub account; hosting accounts and domain are in your name — written into the contract. No lock-in." },
    ],
    cta: "Get a quote for your corporate website",
  },
  "e-ticaret": {
    slug: "e-ticaret",
    metaTitle: "E-Commerce Website Development | Aksipal Web Studio",
    metaDescription:
      "Brand-specific e-commerce without off-the-shelf limits: product management, cart, iyzico/Stripe payments, membership, subscriptions and B2B flows. Written quote per scope, fixed price. Live reference: Tiny Bean Coffee Shop.",
    keywords: ["e-commerce website development Turkey", "custom e-commerce software", "B2B e-commerce platform", "iyzico integration", "Next.js e-commerce"],
    name: "E-Commerce Website",
    h1: "E-Commerce Website Development — Brand-Specific, Fast and Scalable",
    answer:
      "Aksipal Web Studio builds brand-specific e-commerce platforms on Next.js and PostgreSQL: product and stock management, cart, secure payments via iyzico or Stripe, membership, subscriptions and B2B/wholesale order flows. Price is set per scope in a written quote; no monthly package license, you own the source code.",
    intro:
      "Off-the-shelf e-commerce packages start fast but limit you as you grow: theme constraints, monthly licenses, plugin dependency and slow pages. We build e-commerce as your own software — design, product structure and order flow tailored to your business. Live references: a UI and style revision of the official MKE Ankaragücü club store on the ikas platform, and Tiny Bean Coffee Shop — a store built from scratch with product catalog, iyzico payments, membership, coffee subscription and wholesale/B2B flows.",
    audience: [
      "Brands with physical stores moving into online sales",
      "Companies that have outgrown an off-the-shelf package and want their own platform",
      "Manufacturers and distributors opening a B2B/wholesale order portal for dealers or corporate clients",
      "Models standard packages don't support: subscriptions, pre-orders, custom product configurations",
    ],
    includes: [
      { title: "Product catalog and admin panel", text: "Categories, variants (size, color, weight), stock and price management; bulk upload and image optimization." },
      { title: "Cart, payment and orders", text: "3D Secure payments via iyzico or Stripe, installments, order tracking, automatic email and WhatsApp notifications." },
      { title: "Membership and customer account", text: "Sign-up/login, address book, order history, favorites; KVKK-compliant marketing consent and newsletter." },
      { title: "Subscription and B2B flows", text: "Recurring orders, wholesale price lists, dealer login and quote requests — flows specific to your business." },
      { title: "SEO and performance", text: "Structured data (Product, Offer) on product and category pages, fast load, mobile-first design and Google Merchant Center readiness." },
      { title: "Integrations", text: "Shipping carriers, e-invoice, accounting and marketplaces (Trendyol, Hepsiburada) added per scope." },
    ],
    process: [
      { title: "Discovery and scope", text: "Product structure, payment provider, shipping and integration needs; sprint plan and written quote." },
      { title: "Data model and design", text: "Product/variant model, order flow and UI design; development starts on your approval." },
      { title: "Sprint-based development", text: "A working version on staging after each sprint; payment tests in sandbox." },
      { title: "Go-live and training", text: "Live payment keys, domain, SSL and admin training; close support in the first weeks." },
    ],
    pricing: {
      headline: "Written quote per scope, no monthly license",
      note: "Final price depends on product count, variant structure, payment provider and integrations, set in the written quote. You own the source code; no monthly package rent.",
      items: [
        { name: "Store", price: "Quote", detail: "Catalog, cart, iyzico/Stripe payments, membership, order management, SEO" },
        { name: "Store + Subscription / B2B", price: "Quote", detail: "Recurring orders, wholesale price lists, dealer portal and custom flows" },
        { name: "Integration package", price: "Quote", detail: "Shipping, e-invoice, accounting and marketplace connections" },
      ],
    },
    stack: ["Next.js", "TypeScript", "PostgreSQL (Neon)", "iyzico / Stripe", "Vercel", "Resend / WhatsApp notifications"],
    caseSlugs: ["ankaragucu-store", "tiny-bean-coffee"],
    faq: [
      { q: "Can you improve our existing store without rebuilding it?", a: "Yes. If your store runs on ikas, Ticimax or a similar platform, we can revise theme, storefront, category layout and mobile experience without changing the infrastructure. The official MKE Ankaragücü club store, ankaragucustore.com.tr, is such a project — a UI revision done through the ikas panel." },
      { q: "How much does an e-commerce site cost in 2026?", a: "There is no single list price for a brand-specific platform; we quote in writing based on product structure, payment provider and integrations. There is no monthly license as with packaged solutions; the payment provider's transaction fee and annual domain/hosting are separate. As scope grows (subscriptions, B2B, integrations) the price is set in the written quote." },
      { q: "Packaged e-commerce or custom software?", a: "If you have few products, a standard sales flow and want to start quickly, a package can make sense. If you want brand-specific design, custom flows like subscriptions or B2B, high speed and freedom from license lock-in, a custom platform is more economical and flexible long-term." },
      { q: "Which payment providers do you use?", a: "iyzico in Turkey (installments, 3D Secure), Stripe for international sales. PayTR or bank virtual POS integrations are also possible." },
      { q: "Do you integrate Trendyol and Hepsiburada?", a: "Yes, per scope: product and stock sync, order import. Priced separately." },
      { q: "How long until launch?", a: "A standard store goes live in 4–8 weeks. Projects with subscriptions, B2B or multiple integrations are scheduled in the sprint plan; you see a working version after each sprint." },
    ],
    cta: "Get a quote for your e-commerce project",
  },
  "ozel-yazilim": {
    slug: "ozel-yazilim",
    metaTitle: "Custom Software Development | Aksipal Web Studio",
    metaDescription:
      "Web-based custom software for your company: internal tools, B2B and dealer portals, customer portals, integration layers or SaaS MVPs. Java/Python/Node backend + Next.js, sprint-based delivery, you own the code.",
    keywords: ["custom software development Turkey", "B2B portal development", "dealer portal software", "internal tool development", "SaaS MVP development"],
    name: "Custom Software",
    h1: "Custom Software Development — Systems Written for Your Business",
    answer:
      "Aksipal Web Studio builds web-based custom software for needs off-the-shelf tools can't meet: internal admin panels, B2B and dealer portals, customer portals, integration layers between systems and SaaS prototypes (MVPs). Java, Python or Node backend with a Next.js interface; sprint-based delivery, a working version every sprint, source code is yours.",
    intro:
      "For processes running in Excel, programs that don't talk to each other and the jobs you call 'no software does this' — we write the software to your rules. One point of contact from analysis to architecture, development to launch. All projects use standard, widely adopted technologies so another team can take over easily if you ever want.",
    audience: [
      "Companies running operations over Excel and WhatsApp groups that want one panel",
      "Manufacturers and distributors opening order, stock and price portals for dealers or corporate clients",
      "Businesses that need their ERP/CRM/accounting to talk to their website, e-commerce or field team",
      "Startups that need a fast MVP to test an idea with investors or first customers",
    ],
    includes: [
      { title: "Analysis and technical design", text: "Process map, screen list, data model and integration points — written down before any code." },
      { title: "Backend and data layer", text: "APIs in Java (Spring), Python (FastAPI) or Node; PostgreSQL; role-based authorization, logging and backups." },
      { title: "Interface", text: "Fast, mobile-friendly web UI with Next.js and React, optimized for table-, filter-, report- and form-heavy screens." },
      { title: "Integrations", text: "ERP, accounting (Logo, Mikro, Paraşüt), e-invoice, shipping, payments, WhatsApp Cloud API, Google Workspace and other systems via API." },
      { title: "AI layer (optional)", text: "Claude or OpenAI based document analysis, classification, summarization or customer assistant over your data via RAG — without your data entering model training." },
      { title: "Deployment, security and handover", text: "Docker and CI/CD, KVKK-compliant hosting (Turkey/EU), documentation and source code handover. Optional maintenance contract." },
    ],
    process: [
      { title: "Discovery and analysis", text: "Current process, users and goals. Output: scope document and sprint plan." },
      { title: "Architecture and first sprint", text: "Data model, API design and first working screens. Two-week sprints." },
      { title: "Sprint cycle", text: "A working version on staging after each sprint; feedback flows into the next." },
      { title: "Go-live and training", text: "Data migration, user training, documentation; close support in the first month." },
    ],
    pricing: {
      headline: "Sprint-based, transparent pricing",
      note: "Custom software has no single list price; after the scope document we present sprint count and total budget in writing. Scope changes are priced first and never started without approval.",
      items: [
        { name: "MVP / internal tool", price: "Quote", detail: "Typically 3–6 sprints; one module, limited users, basic integration" },
        { name: "B2B / dealer portal", price: "Quote", detail: "Product-price-stock, orders, role management, ERP/accounting integration" },
        { name: "Maintenance and growth", price: "Monthly", detail: "Monthly sprint plan for ongoing development and support after launch" },
      ],
    },
    stack: ["Java / Spring", "Python / FastAPI", "Node.js", "Next.js", "PostgreSQL", "Docker", "Claude / OpenAI (optional)"],
    caseSlugs: ["tiny-bean-coffee", "korsis-teknoloji"],
    faq: [
      { q: "How is custom software priced?", a: "After the scope document, total budget is presented in writing based on sprint count. Main drivers: number of screens and modules, integrations, user roles and data migration. We don't give a list price because every project differs, but the quote contains one figure and a clear scope." },
      { q: "Isn't a single engineer a risk?", a: "That's why every project uses standard technologies (Java, Python, Node, Next.js, PostgreSQL), is documented, and the source code sits in your GitHub from day one. Another team can take over any time. The upside: no hours lost to team coordination." },
      { q: "Will it integrate with our accounting or ERP?", a: "We integrate with any system that offers an API or export: Logo, Mikro, Paraşüt, e-invoice providers, carriers, payment gateways and Google Workspace included. Integration points are verified together during discovery." },
      { q: "Where is our data stored?", a: "Preferably Turkey or EU locations (Hetzner Germany, Vercel EU, Supabase EU). Role-based access, logging, backups and KVKK processes are standard." },
      { q: "How long does a project take?", a: "A typical internal tool or MVP goes live in 6–12 weeks; integration-heavy projects like B2B portals take longer depending on scope. Timeline is set in the sprint plan and you see a working version after each sprint." },
    ],
    cta: "Book a discovery call for your software project",
  },
};

const byLocale: Record<Locale, Record<ServiceSlug, ServiceContent>> = { tr, en };

export const serviceSlugs: ServiceSlug[] = ["kurumsal-web-sitesi", "e-ticaret", "ozel-yazilim"];

export function isServiceSlug(value: string): value is ServiceSlug {
  return (serviceSlugs as string[]).includes(value);
}

export function getService(locale: Locale, slug: ServiceSlug): ServiceContent {
  return byLocale[locale][slug];
}

export function getServices(locale: Locale): ServiceContent[] {
  return serviceSlugs.map((slug) => byLocale[locale][slug]);
}
