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
  /** Canlı demo URL; varsa kartta "Canlı Demo" butonu gösterilir */
  demoUrl: z.string().url().optional(),
  /** Meta keywords; arama görünürlüğü için (özellikle marka + sektör sorguları) */
  seoKeywords: z.array(z.string()).optional(),
});

const rawCases = [
  {
    slug: "korsis-teknoloji",
    title: "Korsis Teknoloji",
    sector: "Teknoloji",
    summary:
      "Korsis Teknoloji A.Ş. kurumsal web sitesi: siber güvenlik, kurumsal ağ altyapısı ve uç nokta koruması odaklı çok sayfalı Next.js uygulaması; Obsolix ürün vitrini, sektör/hizmet modülleri, TR/EN dil, çerez ve KVKK uyumu, teknik SEO ve üst düzey görsel etkiler (3D, motion, glass UI).",
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
    title: "DedPharma",
    sector: "İlaç & Sağlık",
    summary:
      "DedPharma (DeD Farma İlaç Sağlık Tic. San. Ltd. Şti.) kurumsal web sitesi: medikal ürün distribütörü için çok sayfalı Next.js yapı, ürün ve bilim danışma kurulu içerikleri, CE/KFDA ile güven mesajları, KVKK ve gizlilik sayfaları, form ve CTA; teknik SEO, Open Graph ve performans odaklı teslim.",
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
    image: "/images/templates/gym.png",
    demoUrl: "https://musclefactorysportcenter.com/",
  },
  {
    slug: "ankara-kamyonetciler-dernegi",
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
    title: "Aksipal Web Studio",
    sector: "Blog",
    summary:
      "Kişisel satış ve stüdyo tanıtım sitesi. Sektöre özel şablon galerisi (teknoloji, lojistik, spor salonu, enerji, inşaat, taşımacılık vb.), hizmetler, referans projeler, blog ve teklif akışı; premium koyu tema, TR/EN dil desteği, WhatsApp ve form ile dönüşüm odaklı.",
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

export type CaseItem = z.infer<typeof caseSchema>;
