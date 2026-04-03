"use client";

import { Braces, Database, ShoppingCart, Workflow } from "lucide-react";

import GlareHover from "@/components/ui/glare-hover";
import GradientText from "@/components/ui/gradient-text";
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
          <h2 className="text-3xl font-semibold tracking-tight text-[#E9DFFF]">
            <GradientText colors={["#E9DFFF", "#7cff92", "#a78bfa", "#E9DFFF"]} animationSpeed={10}>
              {copy.title}
            </GradientText>
          </h2>
          <p className="text-[#B8B3D1]">{copy.subtitle}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.items.map((item, index) => {
            const Icon = icons[index] ?? Braces;
            return (
              <GlareHover
                key={item}
                glareColor="#7cff92"
                glareOpacity={0.1}
                borderColor="rgba(124,255,146,0.1)"
                borderRadius="16px"
                className="rounded-2xl border border-white/10 bg-black/20"
              >
                <div className="w-full p-4 text-sm text-[#B8B3D1]">
                  <Icon className="mb-3 size-4 text-[var(--accent)]" />
                  {item}
                </div>
              </GlareHover>
            );
          })}
        </div>
      </div>
    </section>
  );
}
