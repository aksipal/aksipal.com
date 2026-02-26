import type { Locale } from "@/lib/i18n";

const testimonialData = {
  tr: [
    {
      quote:
        "Aksipal ile 6 günde yayına çıktık. Reklam trafiğimiz artık boşa gitmiyor, WhatsApp talepleri net arttı.",
      author: "M. Demir",
      role: "Emlak Ofisi Sahibi",
    },
    {
      quote:
        "Sitemiz ilk kez premium hissettiriyor. Mobil hız ve tasarım kalitesi müşteride güven oluşturdu.",
      author: "Z. Korkmaz",
      role: "Klinik Yöneticisi",
    },
    {
      quote:
        "Teklif akışımız sadeleşti, form tamamlanma oranı yükseldi. Teknik tarafta da çok profesyonel ilerledik.",
      author: "A. Kara",
      role: "Lojistik Operasyon Müdürü",
    },
  ],
  en: [
    {
      quote:
        "We launched in 6 days. Our ad traffic no longer leaks and WhatsApp leads are clearly higher.",
      author: "M. Demir",
      role: "Real Estate Agency Owner",
    },
    {
      quote:
        "For the first time, our site feels premium. Mobile speed and design quality improved trust.",
      author: "Z. Korkmaz",
      role: "Clinic Manager",
    },
    {
      quote:
        "Our quote flow became simpler and completion rates increased. The technical process was excellent.",
      author: "A. Kara",
      role: "Logistics Operations Manager",
    },
  ],
};

type TestimonialsProps = {
  locale: Locale;
};

export function Testimonials({ locale }: TestimonialsProps) {
  return (
    <section className="section-shell mt-20 space-y-8">
      <div className="max-w-xl space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight text-white">
          {locale === "tr" ? "Referanslar" : "Testimonials"}
        </h2>
        <p className="text-zinc-400">
          {locale === "tr"
            ? "Placeholder referans metinleri. Gerçek müşteri yorumları ile kolayca güncellenir."
            : "Placeholder testimonials. Easy to replace with real client references."}
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {testimonialData[locale].map((item) => (
          <blockquote key={item.quote} className="glass-card space-y-4 p-6">
            <p className="text-sm leading-7 text-zinc-300">“{item.quote}”</p>
            <footer>
              <p className="text-sm font-semibold text-zinc-100">{item.author}</p>
              <p className="text-xs text-zinc-500">{item.role}</p>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
