import { siteConfig } from "@/lib/constants";

type WhatsAppPayload = {
  sector?: string;
  template?: string;
  city?: string;
  budget?: string;
};

export function buildWhatsAppMessage(payload: WhatsAppPayload) {
  const sector = payload.sector ?? "[SEKTÖR]";
  const template = payload.template ?? "[TEMPLATE]";
  const city = payload.city ?? "[CITY]";
  const budget = payload.budget ?? "[BUDGET]";

  return `Merhaba, ${sector} için web sitesi istiyorum. Şablon: ${template}. Şehir: ${city}. Bütçe: ${budget}.`;
}

export function buildWhatsAppLink(payload: WhatsAppPayload) {
  const text = buildWhatsAppMessage(payload);
  return `https://wa.me/${siteConfig.whatsappPhone}?text=${encodeURIComponent(text)}`;
}
