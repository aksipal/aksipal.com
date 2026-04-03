"use client";

import GlareHover from "@/components/ui/glare-hover";
import type { Locale } from "@/lib/i18n";

const testimonialData = {
  tr: [
    {
      quote:
        "Aksipal ile 2 gunede yayina ciktik. Reklam trafigimiz artik bosa gitmiyor, WhatsApp talepleri net artti.",
      author: "M. Demir",
      role: "Emlak Ofisi Sahibi",
    },
    {
      quote:
        "Sitemiz ilk kez premium hissettiriyor. Mobil hiz ve tasarim kalitesi musteride guven olusturdu.",
      author: "Z. Korkmaz",
      role: "Klinik Yoneticisi",
    },
    {
      quote:
        "Teklif akisimiz sadelesti, form tamamlanma orani yukseldi. Teknik tarafta da cok profesyonel ilerledik.",
      author: "A. Kara",
      role: "Lojistik Operasyon Muduru",
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
        <h2 className="text-3xl font-semibold tracking-tight text-[#E9DFFF]">
          {locale === "tr" ? "Referanslar" : "Testimonials"}
        </h2>
        <p className="text-[#B8B3D1]">
          {locale === "tr"
            ? "Placeholder referans metinleri. Gercek musteri yorumlari ile kolayca guncellenir."
            : "Placeholder testimonials. Easy to replace with real client references."}
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {testimonialData[locale].map((item) => (
          <GlareHover
            key={item.quote}
            glareColor="#a78bfa"
            glareOpacity={0.12}
            borderColor="rgba(167,139,250,0.1)"
            borderRadius="16px"
            className="glass-card"
          >
            <blockquote className="w-full space-y-4 p-6">
              <p className="text-sm leading-7 text-[#B8B3D1]">&ldquo;{item.quote}&rdquo;</p>
              <footer>
                <p className="text-sm font-semibold text-[#E9DFFF]">{item.author}</p>
                <p className="text-xs text-zinc-500">{item.role}</p>
              </footer>
            </blockquote>
          </GlareHover>
        ))}
      </div>
    </section>
  );
}
