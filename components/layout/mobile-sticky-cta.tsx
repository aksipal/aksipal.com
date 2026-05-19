import { MessageCircle, Phone } from "lucide-react";

import { siteConfig } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";
import { buildWhatsAppLink } from "@/lib/whatsapp";

type MobileStickyCtaProps = {
  locale: Locale;
};

export function MobileStickyCta({ locale }: MobileStickyCtaProps) {
  const whatsappHref = buildWhatsAppLink({
    sector: locale === "tr" ? "Genel" : "General",
    template: locale === "tr" ? "Belirsiz" : "Not selected",
    city: locale === "tr" ? "Türkiye" : "Turkey",
    budget: locale === "tr" ? "Konuşalım" : "Let's discuss",
  });

  const telHref = `tel:${siteConfig.phone.replace(/\s+/g, "")}`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1fr_auto] gap-2 border-t border-white/10 bg-[#0a0a10]/95 p-3 backdrop-blur md:hidden">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-black"
        data-cta="mobile-sticky-whatsapp"
        aria-label={locale === "tr" ? "WhatsApp'tan yazın" : "Message on WhatsApp"}
      >
        <MessageCircle className="size-4" aria-hidden />
        {locale === "tr" ? "WhatsApp'tan Yazın" : "Message on WhatsApp"}
      </a>
      <a
        href={telHref}
        className="inline-flex size-12 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-white/15 bg-white/5 text-zinc-100"
        data-cta="mobile-sticky-tel"
        aria-label={locale === "tr" ? "Telefon ile ara" : "Call by phone"}
      >
        <Phone className="size-5" aria-hidden />
      </a>
    </div>
  );
}
