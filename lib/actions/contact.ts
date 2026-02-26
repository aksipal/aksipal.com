"use server";

import { headers } from "next/headers";

import { storeLead } from "@/lib/leads";
import { consumeRateLimit } from "@/lib/rate-limit";
import { contactFormSchema } from "@/lib/validations";
import type { ContactFormState } from "@/lib/actions/contact-state";

export async function submitContactAction(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const honeypot = String(formData.get("company") ?? "");
  if (honeypot.trim().length > 0) {
    return {
      status: "success",
      message: "Mesajınız alındı. En kısa sürede dönüş sağlanacaktır.",
    };
  }

  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";
  const userAgent = headersList.get("user-agent") ?? "unknown";
  const limiter = consumeRateLimit(`${ip}:${userAgent}`);

  if (!limiter.success) {
    return {
      status: "error",
      message:
        "Kısa sürede çok fazla deneme yapıldı. Lütfen birkaç dakika sonra tekrar deneyin.",
    };
  }

  const payload = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    sector: String(formData.get("sector") ?? ""),
    budget: String(formData.get("budget") ?? ""),
    message: String(formData.get("message") ?? ""),
    company: String(formData.get("company") ?? ""),
  };

  const parsed = contactFormSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      status: "error",
      message: "Lütfen formdaki eksik veya hatalı alanları düzeltin.",
      errors: {
        name: fieldErrors.name?.[0] ?? "",
        email: fieldErrors.email?.[0] ?? "",
        phone: fieldErrors.phone?.[0] ?? "",
        sector: fieldErrors.sector?.[0] ?? "",
        budget: fieldErrors.budget?.[0] ?? "",
        message: fieldErrors.message?.[0] ?? "",
      },
    };
  }

  try {
    await storeLead({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      sector: parsed.data.sector,
      budget: parsed.data.budget,
      message: parsed.data.message,
    });

    return {
      status: "success",
      message: "Talebiniz alındı. 24 saat içinde size dönüş yapacağım.",
    };
  } catch {
    return {
      status: "error",
      message: "Bir hata oluştu. Lütfen WhatsApp üzerinden ulaşın.",
    };
  }
}
