"use client";

import { useEffect } from "react";

/**
 * Tıklama bazlı dönüşüm takibi:
 * - WhatsApp linkleri (wa.me) → Google Ads conversion + GA4 generic_click event
 * - tel: linkleri → GA4 phone_click event
 * - mailto: linkleri → GA4 email_click event
 *
 * data-cta="..." attribute'ı varsa label olarak gönderilir, böylece hangi CTA'nın
 * tıklandığı raporlarda görünür.
 */
export default function WhatsAppTracker() {
  useEffect(() => {
    const fire = (
      eventName: string,
      params: Record<string, unknown> = {},
    ) => {
      if (typeof window === "undefined" || typeof window.gtag !== "function") return;
      window.gtag("event", eventName, params);
    };

    const handleClick = (e: Event) => {
      if (!(e.target instanceof Element)) {
        return;
      }
      const link = e.target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      const cta = link.getAttribute("data-cta") ?? undefined;

      if (href.includes("wa.me") || href.includes("api.whatsapp.com")) {
        // Google Ads conversion (mevcut)
        if (typeof window.gtag === "function") {
          window.gtag("event", "conversion", {
            send_to: "AW-400400735/caZnCNuF0aAcEN_C9r4B",
            value: 500.0,
            currency: "TRY",
          });
        }
        fire("whatsapp_click", {
          link_url: href,
          cta_id: cta,
        });
        return;
      }

      if (href.startsWith("tel:")) {
        fire("phone_click", { link_url: href, cta_id: cta });
        return;
      }

      if (href.startsWith("mailto:")) {
        fire("email_click", { link_url: href, cta_id: cta });
        return;
      }

      if (cta) {
        fire("cta_click", { cta_id: cta, link_url: href });
      }
    };

    const options: AddEventListenerOptions = { passive: true };
    document.addEventListener("click", handleClick, options);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
