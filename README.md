# Aksipal.com

**Aksipal Web Systems Studio** — Türkiye’deki küçük işletmeler (emlak, taşımacılık, restoran, klinik, spor salonu, enerji, danışmanlık vb.) için premium, karanlık temalı kurumsal site ve şablon vitrini.

- **Site:** [aksipal.com](https://aksipal.com)
- **İki hizmet kolu:** Ürünleşmiş şablon paketleri (hızlı teslim) ve özel yazılım / e-ticaret / backend projeleri.

---

## Tech Stack

| Alan | Teknoloji |
|------|-----------|
| Framework | **Next.js 16** (App Router) |
| Dil | **TypeScript** (strict) |
| Stil | **Tailwind CSS v4** |
| Bileşenler | **Radix UI** (Dialog vb.), **Lucide React** ikonlar |
| Validasyon | **Zod** |
| İçerik | **MDX** (blog), **gray-matter**, **reading-time** |
| Font | **next/font** (Inter, Space Grotesk) |

Server Components varsayılan; client bileşenler yalnızca etkileşim gereken yerlerde kullanılıyor.

---

## Proje Yapısı

```
├── app/
│   ├── [locale]/           # TR/EN sayfalar (ana sayfa, şablonlar, hizmetler, işler, blog, ben-kimim, iletişim)
│   ├── sitemap.ts
│   ├── robots.ts
│   └── opengraph-image.tsx
├── components/
│   ├── ui/                 # Button, Badge, Dialog, Input, Textarea, Label
│   ├── layout/             # Header, Footer, LanguageSwitcher, MobileStickyCta
│   ├── sections/           # Hero, TrustBar, TemplatePreview, CaseGrid, Testimonials, FAQ, ContactCta
│   ├── templates/          # TemplateGallery (filtreli)
│   ├── contact/            # LeadDialog, ContactForm, SubmitButton
│   └── blog/               # MDX bileşenleri
├── content/blog/           # MDX yazılar (frontmatter: title, description, publishedAt, tags)
├── lib/
│   ├── constants.ts       # Site adı, telefon, adres, sosyal linkler
│   ├── i18n.ts             # Locale (tr/en), nav, withLocale
│   ├── templates.ts        # Şablon kataloğu (sector, demoUrl, fiyat)
│   ├── cases.ts            # Referans / portfolyo verisi
│   ├── pricing.ts          # Paket kademeleri ve ileri hizmetler
│   ├── seo.ts              # Metadata, JSON-LD (LocalBusiness, Service, BlogPosting)
│   ├── whatsapp.ts         # WhatsApp ön doldurulmuş mesaj linki
│   ├── validations.ts      # İletişim formu Zod şeması
│   ├── rate-limit.ts       # Form rate limit (in-memory)
│   ├── leads.ts            # Lead kayıt (.data/leads.jsonl)
│   ├── mdx.ts              # Blog slug listesi, post okuma
│   └── actions/            # submitContactAction (server action)
├── public/images/          # Şablon ve vaka görselleri (templates/, cases/)
└── proxy.ts                # Locale yönlendirme (/ → /tr)
```

---

## Geliştirme

### Gereksinimler

- **Node.js** 18+
- **npm** (veya yarn/pnpm/bun)

### Kurulum ve Çalıştırma

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusu (http://localhost:3000)
npm run dev
```

Tarayıcıda `http://localhost:3000` açıldığında otomatik olarak `/tr` ana sayfaya yönlendirilir.

### Diğer Komutlar

```bash
# Production build
npm run build

# Build sonrası sunucu
npm run start

# Lint
npm run lint
```

---

## Özellikler

- **i18n:** TR ve EN; dil değiştirici header’da.
- **Şablon vitrini:** Sektöre göre filtre, her kartta “Canlı Demo” ve “Bu Şablonu Seç” (WhatsApp/iletişim modal).
- **SEO:** Sayfa bazlı metadata, OpenGraph, Twitter kartları, canonical, `sitemap.xml`, `robots.txt`, JSON-LD (LocalBusiness, Service, BlogPosting).
- **İletişim formu:** Server Action, Zod validasyon, honeypot, rate limit; lead’ler `.data/leads.jsonl` dosyasına yazılır.
- **WhatsApp CTA:** Ön doldurulmuş mesaj (sektör, şablon, şehir, bütçe); mobilde sticky CTA.
- **Dark theme:** Tek tema; premium koyu palet, cam kartlar, aurora arka plan.
- **Performans:** Server Components ağırlıklı, hafif client bundle, `next/image` ile görsel optimizasyonu.

---

## Ortam Değişkenleri

Varsayılan kurulumda **zorunlu env yok**. Telefon, e-posta, adres ve sosyal linkler `lib/constants.ts` içinde tanımlı; ihtiyaca göre oradan veya env ile override edilebilir.

---

## Dağıtım

- **Vercel:** Repo’yu bağlayıp `main` branch’i deploy etmek yeterli; Next.js otomatik tanınır.
- **Build komutu:** `npm run build`
- **Output:** Standart Next.js standalone değil; Vercel default kullanılır.

Detay için: [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying).

---

## Lisans ve İletişim

© Aksipal. Tüm hakları saklıdır.

- **Web:** [aksipal.com](https://aksipal.com)
- **E-posta:** b.aksipal@gmail.com
- **WhatsApp:** +90 507 590 23 02
