import { Quote } from "lucide-react";

import type { Locale } from "@/lib/i18n";

const testimonialData = {
  tr: [
    {
      quote:
        "WhatsApp grup kaosumuzu AI destekli bir akışla çözdüler. Sürücü-müşteri eşleştirme manuel iş 8 saatten ~30 dakikaya düştü, gelen iş sayısı ölçülebilir şekilde arttı. Süreç sözleşmeli teslim edildi, sürpriz fatura olmadı.",
      author: "Lojistik Operasyon Müdürü",
      role: "Şehirler arası taşımacılık · Ankara",
    },
    {
      quote:
        "Site 5 günde yayında, mobil hız ve tasarım kalitesi müşteride güven oluşturdu. Reklam trafiğimiz artık boşa gitmiyor, randevu talepleri net arttı. Yayın sonrası destek de hızlı.",
      author: "Klinik Yöneticisi",
      role: "Estetik & sağlık · İstanbul",
    },
    {
      quote:
        "Sürekli yazışma yükü olan satış ekibimize özel bir AI asistan kurdu. Tekrar eden soruların ~%70'ini bot çözüyor, ekip artık sadece sıcak fırsata bakıyor. ROI ilk 2 ayda netleşti.",
      author: "Satış Direktörü",
      role: "B2B yazılım · Ankara",
    },
  ],
  en: [
    {
      quote:
        "They solved our WhatsApp-group chaos with an AI-driven flow. Driver-to-customer matching dropped from 8 hours to ~30 minutes and inbound jobs went up. Contracted delivery, no surprise invoices.",
      author: "Logistics Operations Manager",
      role: "Intercity transport · Ankara",
    },
    {
      quote:
        "Live in 5 days. Mobile speed and design quality built immediate trust — our ad traffic no longer leaks and appointment requests rose noticeably. Post-launch support is responsive too.",
      author: "Clinic Manager",
      role: "Aesthetics & health · Istanbul",
    },
    {
      quote:
        "Built a custom AI assistant for our sales team. The bot handles ~70% of repetitive questions; the team now focuses only on warm opportunities. ROI was clear within 2 months.",
      author: "Sales Director",
      role: "B2B software · Ankara",
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
