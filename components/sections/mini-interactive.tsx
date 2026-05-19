import { CheckCircle2, MessagesSquare, Rocket } from "lucide-react";

import type { Locale } from "@/lib/i18n";

type MiniInteractiveProps = {
  locale: Locale;
};

/**
 * 3 Adımda Süreç bloğu — Türk müşterisi için "nasıl çalışıyoruz" sorusuna
 * somut, güven veren cevap. Önceki dekoratif "energy dots" mikro etkileşimi
 * yerine geçer; CRO ve Google Ads landing kalitesi için daha değerli.
 */
export function MiniInteractive({ locale }: MiniInteractiveProps) {
  const copy =
    locale === "tr"
      ? {
          eyebrow: "Süreç",
          title: "3 adımda nasıl çalışıyoruz",
          subtitle:
            "İlk mesajdan teslime kadar net bir akış. Yazılı sözleşme, sabit fiyat, ek kalem yok. WhatsApp veya formdan ulaşmanız yeterli — geri kalanını birlikte planlıyoruz.",
          steps: [
            {
              icon: MessagesSquare,
              num: "01",
              title: "Ücretsiz keşif görüşmesi (30 dk)",
              text: "WhatsApp veya formdan ulaşın. Mevcut durumu, hedefi ve bütçeyi konuşuyoruz; size en uygun kulvarı (web sitesi mi, yapay zeka / otomasyon mu) öneriyoruz.",
            },
            {
              icon: CheckCircle2,
              num: "02",
              title: "Plan ve yazılı sözleşme",
              text: "Kapsam, teslim tarihi, fiyat ve revizyon politikası tek dökümanda. Onayınız alınınca işe başlıyoruz; ek talep gelirse şeffaf değişiklik yönetimi devreye giriyor.",
            },
            {
              icon: Rocket,
              num: "03",
              title: "Teslim ve sürekli destek",
              text: "Web paketlerinde 4–12 iş gününde canlıya alım; yapay zeka ve özel yazılım projelerinde sprint bazlı çalışan teslim. Yayın sonrası bakım ve iyileştirme aylık plan ile mümkün.",
            },
          ],
        }
      : {
          eyebrow: "Process",
          title: "How we work — in 3 steps",
          subtitle:
            "A clear flow from first message to delivery. Contracted, transparent, no surprise invoices. Reach out on WhatsApp or via the form — we'll plan the rest together.",
          steps: [
            {
              icon: MessagesSquare,
              num: "01",
              title: "Talk (15 minutes)",
              text: "Reach out on WhatsApp or via the form. We clarify current state, goals and budget — and recommend the right track (website vs. AI / automation).",
            },
            {
              icon: CheckCircle2,
              num: "02",
              title: "Plan and contract",
              text: "Scope, delivery date, price and revision policy in a single document. Once approved we start; extra asks go through transparent change management.",
            },
            {
              icon: Rocket,
              num: "03",
              title: "Delivery and support",
              text: "Web packages live in 4-12 days; AI / custom software in sprint-based working delivery. Post-launch maintenance and improvements via monthly plan.",
            },
          ],
        };

  return (
    <section className="section-shell mt-20" aria-labelledby="process-heading">
      <div className="glass-card space-y-6 p-6 sm:p-10">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            {copy.eyebrow}
          </p>
          <h2
            id="process-heading"
            className="text-3xl font-semibold tracking-tight text-white"
          >
            {copy.title}
          </h2>
          <p className="text-zinc-400">{copy.subtitle}</p>
        </div>

        <ol className="grid gap-4 md:grid-cols-3">
          {copy.steps.map((step) => (
            <li
              key={step.num}
              className="rounded-2xl border border-white/10 bg-black/30 p-5 transition-colors hover:border-white/20"
            >
              <div className="mb-3 flex items-center justify-between">
                <step.icon className="size-5 text-[var(--accent)]" aria-hidden />
                <span className="text-xs font-mono text-zinc-500">{step.num}</span>
              </div>
              <h3 className="text-base font-semibold text-zinc-100">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-zinc-400">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
