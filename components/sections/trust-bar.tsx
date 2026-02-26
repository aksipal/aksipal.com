import { ShieldCheck, Smartphone, TimerReset, Zap } from "lucide-react";

import type { Locale } from "@/lib/i18n";

type TrustBarProps = {
  locale: Locale;
};

const trustItems = {
  tr: [
    { icon: TimerReset, label: "2 günde yayında" },
    { icon: ShieldCheck, label: "SEO altyapı" },
    { icon: Smartphone, label: "Mobil + hızlı" },
    { icon: Zap, label: "WhatsApp dönüşüm" },
  ],
  en: [
    { icon: TimerReset, label: "Live in 2 days" },
    { icon: ShieldCheck, label: "SEO ready infrastructure" },
    { icon: Smartphone, label: "Mobile and fast" },
    { icon: Zap, label: "WhatsApp conversion" },
  ],
};

export function TrustBar({ locale }: TrustBarProps) {
  return (
    <section className="section-shell mt-8">
      <div className="glass-card grid gap-4 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-4">
        {trustItems[locale].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <item.icon className="size-4 text-[var(--accent)]" />
            <span className="text-sm font-medium text-zinc-200">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
