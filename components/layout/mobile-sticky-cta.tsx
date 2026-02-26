import { MessageCircle } from "lucide-react";

import type { Locale } from "@/lib/i18n";
import { buildWhatsAppLink } from "@/lib/whatsapp";

type MobileStickyCtaProps = {
  locale: Locale;
};

export function MobileStickyCta({ locale }: MobileStickyCtaProps) {
  const href = buildWhatsAppLink({
    sector: locale === "tr" ? "Genel" : "General",
    template: locale === "tr" ? "Belirsiz" : "Not selected",
    city: locale === "tr" ? "Türkiye" : "Turkey",
    budget: locale === "tr" ? "Konuşalım" : "Let's discuss",
  });

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0a0a10]/90 p-3 backdrop-blur md:hidden">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-black"
      >
        <MessageCircle className="size-4" />
        {locale === "tr" ? "WhatsApp'tan Teklif Al" : "Get Quote via WhatsApp"}
      </a>
    </div>
  );
}
