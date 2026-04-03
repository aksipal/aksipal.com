"use client";

import { ShieldCheck, Smartphone, TimerReset, Zap } from "lucide-react";

import ShinyText from "@/components/ui/shiny-text";
import type { Locale } from "@/lib/i18n";

type TrustBarProps = {
  locale: Locale;
};

const trustItems = {
  tr: [
    { icon: TimerReset, label: "2-5 günde web sitesi teslimi" },
    { icon: ShieldCheck, label: "SEO uyumlu altyapı" },
    { icon: Smartphone, label: "Mobil uyumlu & hızlı" },
    { icon: Zap, label: "WhatsApp ile kolay iletişim" },
  ],
  en: [
    { icon: TimerReset, label: "Website delivered in 2-5 days" },
    { icon: ShieldCheck, label: "SEO ready infrastructure" },
    { icon: Smartphone, label: "Mobile-first & fast" },
    { icon: Zap, label: "Easy WhatsApp contact" },
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
            <ShinyText
              text={item.label}
              color="#d4d4d8"
              shineColor="#7cff92"
              speed={3}
              className="text-sm font-medium"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
