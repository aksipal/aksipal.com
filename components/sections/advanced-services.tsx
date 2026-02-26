import { Braces, Database, ShoppingCart, Workflow } from "lucide-react";

import type { Locale } from "@/lib/i18n";

const icons = [ShoppingCart, Database, Workflow, Braces] as const;

type AdvancedServicesTeaserProps = {
  locale: Locale;
};

export function AdvancedServicesTeaser({ locale }: AdvancedServicesTeaserProps) {
  const copy = {
    tr: {
      title: "Özel / İleri Seviye Çalışmalar",
      subtitle:
        "E-ticaret, backend, entegrasyon ve SaaS projeleri için yüksek biletli, stratejik geliştirme desteği.",
      items: [
        "E-ticaret altyapısı ve checkout optimizasyonu",
        "API, auth, rol ve veri modelleme",
        "CRM / ERP / WhatsApp entegrasyon akışları",
        "SaaS MVP tasarım + geliştirme",
      ],
    },
    en: {
      title: "Custom / Advanced Work",
      subtitle:
        "High-ticket strategic product development for e-commerce, backend, integrations and SaaS.",
      items: [
        "E-commerce architecture and checkout optimization",
        "API, auth, role and data modeling",
        "CRM / ERP / WhatsApp integration flows",
        "SaaS MVP design and development",
      ],
    },
  }[locale];

  return (
    <section className="section-shell mt-20">
      <div className="glass-card space-y-8 p-6 sm:p-8">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight text-white">{copy.title}</h2>
          <p className="text-zinc-400">{copy.subtitle}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.items.map((item, index) => {
            const Icon = icons[index] ?? Braces;
            return (
              <article
                key={item}
                className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-zinc-300"
              >
                <Icon className="mb-3 size-4 text-[var(--accent)]" />
                {item}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
