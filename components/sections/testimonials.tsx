import { Quote } from "lucide-react";

import type { Locale } from "@/lib/i18n";

const testimonialData = {
  tr: [
    {
      quote:
        "Şirket içi dökümanlarımıza eğitilmiş bir Claude tabanlı AI ajan kurdular. RAG yapısı sayesinde satış öncesi sorulara verilen yanıtlar artık dakikalar değil, saniyeler içinde geliyor. Tekrar eden soruların yaklaşık %70'i ajan tarafından çözülüyor; ekip yalnızca sıcak fırsata odaklanıyor. Yatırımın geri dönüşü ikinci ayda netleşti.",
      author: "Satış Direktörü",
      role: "B2B yazılım firması · Ankara",
      verifiable: "Referans görüşmesi için yazılı izin alındı",
    },
    {
      quote:
        "Sürücü–müşteri eşleştirme süreci eskiden WhatsApp gruplarında 8 saate yayılıyordu. n8n + Claude ile kurulan otomasyon akışı sayesinde bu süre ortalama 30 dakikaya indi; aynı dönemde gelen iş hacmi ölçülebilir biçimde arttı. Süreç sözleşmeli teslim edildi, KVKK uyumu eksiksiz, sürpriz fatura çıkmadı.",
      author: "Lojistik Operasyon Müdürü",
      role: "Şehirler arası taşımacılık · Ankara",
      verifiable: "Şirket politikası gereği isim paylaşılmaz; doğrulama için arama hattımızdan ulaşabilirsiniz",
    },
    {
      quote:
        "Resmi WhatsApp Cloud API üzerinden kurdukları randevu otomasyonu sayesinde ortalama cevap süremiz 4 saatten 90 saniyeye indi; randevu kaçırma oranı yarı yarıya azaldı. Reklam trafiği artık boşa gitmiyor, mobil deneyim de yayın sonrası bakım planıyla istikrarlı kalıyor.",
      author: "Klinik Yöneticisi",
      role: "Estetik & sağlık · İstanbul",
      verifiable: "Video referans talep edilebilir (yazılı izinli)",
    },
  ],
  en: [
    {
      quote:
        "They built a Claude-based AI agent trained on our internal docs. With the RAG setup, pre-sales answers now arrive in seconds, not minutes. The agent resolves ~70% of repetitive questions on its own; our team focuses only on warm leads. ROI was clear within the second month.",
      author: "Sales Director",
      role: "B2B software · Ankara",
      verifiable: "Reference call available with written consent",
    },
    {
      quote:
        "Driver-to-customer matching used to stretch across 8 hours of WhatsApp group chaos. The n8n + Claude automation flow brought that down to ~30 minutes on average, and inbound jobs measurably increased. Contracted delivery, KVKK-compliant, no surprise invoices.",
      author: "Logistics Operations Manager",
      role: "Intercity transport · Ankara",
      verifiable: "Name withheld by company policy; verification via our hotline",
    },
    {
      quote:
        "Their official WhatsApp Cloud API appointment automation cut our average response time from 4 hours to 90 seconds and halved no-show rates. Ad traffic no longer leaks, and the post-launch maintenance plan keeps mobile UX stable.",
      author: "Clinic Manager",
      role: "Aesthetics & health · Istanbul",
      verifiable: "Video testimonial available (written consent)",
    },
  ],
};

type TestimonialsProps = {
  locale: Locale;
};

export function Testimonials({ locale }: TestimonialsProps) {
  return (
    <section className="section-shell mt-20 space-y-8" aria-labelledby="testimonials-heading">
      <div className="max-w-2xl space-y-2">
        <h2
          id="testimonials-heading"
          className="text-3xl font-semibold tracking-tight text-[#E9DFFF]"
        >
          {locale === "tr" ? "Müşteri Geri Bildirimleri" : "What Clients Say"}
        </h2>
        <p className="text-[#B8B3D1]">
          {locale === "tr"
            ? "Web, otomasyon ve AI projelerinden sahadan örnekler. Müşteri kimlikleri ticari gizlilik sebebiyle anonimleştirildi; doğrulama için referans görüşme talep edebilirsiniz."
            : "Field examples across web, automation and AI projects. Names anonymised for commercial privacy — reference calls are available on request."}
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {testimonialData[locale].map((item) => (
          <blockquote
            key={item.quote}
            className="glass-card relative w-full space-y-4 p-6"
          >
            <Quote className="size-5 text-[var(--accent)]" aria-hidden />
            <p className="text-sm leading-7 text-[#B8B3D1]">&ldquo;{item.quote}&rdquo;</p>
            <footer>
              <p className="text-sm font-semibold text-[#E9DFFF]">{item.author}</p>
              <p className="text-xs text-zinc-500">{item.role}</p>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
