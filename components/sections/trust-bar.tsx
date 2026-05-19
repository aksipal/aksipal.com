import { Bot, Code2, Globe, ShoppingCart, Smartphone, Workflow } from "lucide-react";

import type { Locale } from "@/lib/i18n";

type TrustBarProps = {
  locale: Locale;
};

const trustItems = {
  tr: [
    { icon: Globe, label: "Premium Web Sitesi" },
    { icon: ShoppingCart, label: "E-Ticaret Altyapısı" },
    { icon: Smartphone, label: "Mobil Uygulama" },
    { icon: Workflow, label: "Süreç Otomasyonu" },
    { icon: Bot, label: "Yapay Zeka Entegrasyonu" },
    { icon: Code2, label: "Kişiye Özel Yazılım" },
  ],
  en: [
    { icon: Globe, label: "Premium Website" },
    { icon: ShoppingCart, label: "E-Commerce" },
    { icon: Smartphone, label: "Mobile Application" },
    { icon: Workflow, label: "Workflow Automation" },
    { icon: Bot, label: "AI Integration" },
    { icon: Code2, label: "Custom Software" },
  ],
};

export function TrustBar({ locale }: TrustBarProps) {
  return (
    <section className="section-shell mt-8" aria-label={locale === "tr" ? "Güven Bandı" : "Trust bar"}>
      <div className="glass-card grid gap-4 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3">
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
