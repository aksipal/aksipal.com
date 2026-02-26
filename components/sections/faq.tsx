import type { Locale } from "@/lib/i18n";

type FaqSectionProps = {
  locale: Locale;
};

export function FaqSection({ locale }: FaqSectionProps) {
  const items =
    locale === "tr"
      ? [
          {
            q: "Şablon paketlerde teslim süresi gerçekten 5 gün mü?",
            a: "Evet. İçeriklerin büyük kısmı hazırsa 4-6 gün aralığında yayına alıyoruz.",
          },
          {
            q: "Özel yazılım projelerinde süreç nasıl ilerliyor?",
            a: "Kapsamı sprintlere bölüp her sprint sonunda çalışan teslim yapıyoruz.",
          },
          {
            q: "Yayın sonrası destek veriyor musunuz?",
            a: "Bakım ve iyileştirme için aylık destek planları sunuyoruz.",
          },
        ]
      : [
          {
            q: "Is 5-day delivery realistic for template packages?",
            a: "Yes. If core content is ready, we typically launch within 4-6 days.",
          },
          {
            q: "How do custom software projects run?",
            a: "We split scope into sprints and deliver working increments each cycle.",
          },
          {
            q: "Do you provide post-launch support?",
            a: "Yes, we provide monthly maintenance and continuous improvements.",
          },
        ];

  return (
    <section className="section-shell mt-20 space-y-6">
      <h2 className="text-3xl font-semibold tracking-tight text-white">
        {locale === "tr" ? "Sık Sorulanlar" : "FAQ"}
      </h2>
      <div className="grid gap-4">
        {items.map((item) => (
          <article key={item.q} className="glass-card p-5">
            <h3 className="text-base font-semibold text-zinc-100">{item.q}</h3>
            <p className="mt-2 text-sm leading-7 text-zinc-400">{item.a}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
