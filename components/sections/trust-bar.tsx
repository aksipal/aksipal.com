import { Bot, MessageSquare, ShieldCheck, TimerReset } from "lucide-react";

import type { Locale } from "@/lib/i18n";

type TrustBarProps = {
  locale: Locale;
};

const trustItems = {
  tr: [
    { icon: Bot, label: "AI agent · Claude / OpenAI · RAG" },
    { icon: MessageSquare, label: "WhatsApp Cloud API · n8n otomasyon" },
    { icon: ShieldCheck, label: "Sözleşmeli teslim · KVKK uyumlu" },
    { icon: TimerReset, label: "Premium web · 4-12 günde yayın" },
  ],
  en: [
    { icon: Bot, label: "AI agents · Claude / OpenAI · RAG" },
    { icon: MessageSquare, label: "WhatsApp Cloud API · n8n automation" },
    { icon: ShieldCheck, label: "Contracted delivery · KVKK compliant" },
    { icon: TimerReset, label: "Premium web · live in 4-12 days" },
  ],
};

export function TrustBar({ locale }: TrustBarProps) {
  return (
    <section className="section-shell mt-8" aria-label={locale === "tr" ? "Güven Çizgisi" : "Trust bar"}>
      <div className="glass-card grid gap-4 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-4">
        {trustItems[locale].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <item.icon className="size-4 shrink-0 text-[var(--accent)]" aria-hidden />
            <span className="text-sm font-medium text-zinc-200">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
