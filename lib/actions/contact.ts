"use server";

import { headers } from "next/headers";

import { storeLead } from "@/lib/leads";
import { consumeRateLimit } from "@/lib/rate-limit";
import type { ContactFormInput } from "@/lib/validations";

/** Web3Forms başarılı olduktan sonra sunucuda yedek lead kaydı */
export async function storeLeadAfterContact(payload: ContactFormInput) {
  try {
    await storeLead({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      sector: payload.sector,
      budget: payload.budget,
      message: payload.message,
    });
  } catch {
    /* e-posta zaten gitti */
  }
}

/** İstemci gönderiminden önce IP tabanlı flood kontrolü */
export async function checkContactRateLimit(): Promise<{ ok: boolean }> {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";
  const userAgent = headersList.get("user-agent") ?? "unknown";
  const limiter = consumeRateLimit(`${ip}:${userAgent}`);
  return { ok: limiter.success };
}
