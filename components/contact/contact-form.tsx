"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  checkContactRateLimit,
  storeLeadAfterContact,
} from "@/lib/actions/contact";
import { web3formsAccessKey } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";
import { contactFormSchema } from "@/lib/validations";

type ContactFormProps = {
  locale: Locale;
};

export function ContactForm({ locale }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string> | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const copy = {
    tr: {
      name: "Ad Soyad",
      email: "E-posta",
      phone: "Telefon",
      sector: "Sektör",
      budget: "Bütçe Aralığı",
      message: "Proje Detayı",
      submit: "Talep Gönder",
      sending: "Gönderiliyor...",
      rateLimit:
        "Çok fazla deneme yapıldı. Lütfen birkaç dakika sonra tekrar deneyin.",
      sendFail:
        "Gönderilemedi. WhatsApp veya e-posta ile ulaşmayı deneyin.",
      genericError: "Bir hata oluştu. Lütfen WhatsApp üzerinden ulaşın.",
    },
    en: {
      name: "Full Name",
      email: "Email",
      phone: "Phone",
      sector: "Sector",
      budget: "Budget Range",
      message: "Project Details",
      submit: "Send Request",
      sending: "Sending...",
      rateLimit: "Too many attempts. Please try again in a few minutes.",
      sendFail: "Could not send. Try WhatsApp or email.",
      genericError: "Something went wrong. Please reach out via WhatsApp.",
    },
  }[locale];

  const isEn = locale === "en";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors(undefined);
    setStatus("idle");
    setMessage("");

    const form = event.currentTarget;
    const fd = new FormData(form);

    const honeypot = String(fd.get("company") ?? "").trim();
    if (honeypot.length > 0) {
      setStatus("success");
      setMessage(
        isEn
          ? "Your request has been received."
          : "Talebiniz alındı. En kısa sürede dönüş sağlanacaktır.",
      );
      return;
    }

    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      sector: String(fd.get("sector") ?? ""),
      budget: String(fd.get("budget") ?? ""),
      message: String(fd.get("message") ?? ""),
      company: String(fd.get("company") ?? ""),
    };

    const parsed = contactFormSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setStatus("error");
      setMessage(
        isEn
          ? "Please fix the invalid fields below."
          : "Lütfen formdaki eksik veya hatalı alanları düzeltin.",
      );
      setErrors({
        name: fieldErrors.name?.[0] ?? "",
        email: fieldErrors.email?.[0] ?? "",
        phone: fieldErrors.phone?.[0] ?? "",
        sector: fieldErrors.sector?.[0] ?? "",
        budget: fieldErrors.budget?.[0] ?? "",
        message: fieldErrors.message?.[0] ?? "",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { ok } = await checkContactRateLimit();
      if (!ok) {
        setStatus("error");
        setMessage(copy.rateLimit);
        return;
      }

      const subject = isEn
        ? "[Aksipal] Contact form"
        : "[Aksipal] İletişim formu";
      const bodyText = [
        `${isEn ? "Phone" : "Telefon"}: ${parsed.data.phone}`,
        `${isEn ? "Sector" : "Sektör"}: ${parsed.data.sector}`,
        `${isEn ? "Budget" : "Bütçe"}: ${parsed.data.budget}`,
        "",
        parsed.data.message,
      ].join("\n");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3formsAccessKey,
          subject,
          name: parsed.data.name,
          email: parsed.data.email,
          replyto: parsed.data.email,
          message: bodyText,
        }),
      });

      const json = (await res.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!res.ok || !json.success) {
        const detail = json.message?.trim();
        setStatus("error");
        setMessage(
          detail
            ? (isEn ? `Could not send: ${detail}` : `Gönderilemedi: ${detail}`)
            : copy.sendFail,
        );
        return;
      }

      await storeLeadAfterContact(parsed.data);
      setStatus("success");
      setMessage(
        isEn
          ? "Your request has been received. I will get back to you within 24 hours."
          : "Talebiniz alındı. 24 saat içinde size dönüş yapacağım.",
      );
      // GA4 form submit conversion eventi (consent verildiyse gtag yüklü olur)
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", {
          form_name: "contact",
          sector: parsed.data.sector,
          budget: parsed.data.budget,
          currency: "TRY",
        });
      }
      form.reset();
    } catch {
      setStatus("error");
      setMessage(copy.genericError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card space-y-5 p-6">
      <div className="hidden">
        <Label htmlFor="company">Company</Label>
        <Input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">{copy.name}</Label>
          <Input id="name" name="name" placeholder={copy.name} />
          {errors?.name ? (
            <p className="mt-1 text-xs text-rose-400">{errors.name}</p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="email">{copy.email}</Label>
          <Input id="email" type="email" name="email" placeholder={copy.email} />
          {errors?.email ? (
            <p className="mt-1 text-xs text-rose-400">{errors.email}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">{copy.phone}</Label>
          <Input id="phone" name="phone" placeholder="+90 5xx xxx xx xx" />
          {errors?.phone ? (
            <p className="mt-1 text-xs text-rose-400">{errors.phone}</p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="sector">{copy.sector}</Label>
          <select
            id="sector"
            name="sector"
            defaultValue=""
            className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-2.5 text-sm text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <option value="" disabled>
              {locale === "tr" ? "İlgilendiğiniz Hizmet" : "Service of Interest"}
            </option>
            <optgroup label={locale === "tr" ? "AI · Otomasyon · Yazılım" : "AI · Automation · Software"}>
              <option value="AI Agent / Chatbot">{locale === "tr" ? "AI Agent / Chatbot" : "AI Agent / Chatbot"}</option>
              <option value="WhatsApp Otomasyon">{locale === "tr" ? "WhatsApp Otomasyonu" : "WhatsApp Automation"}</option>
              <option value="Süreç Otomasyonu (n8n)">{locale === "tr" ? "Süreç Otomasyonu (n8n)" : "Workflow Automation (n8n)"}</option>
              <option value="Özel Yazılım">{locale === "tr" ? "Özel Yazılım" : "Custom Software"}</option>
              <option value="E-Ticaret">{locale === "tr" ? "E-Ticaret" : "E-Commerce"}</option>
            </optgroup>
            <optgroup label={locale === "tr" ? "Web Sitesi (Sektör)" : "Website (Sector)"}>
              <option value="Emlak">{locale === "tr" ? "Emlak" : "Real Estate"}</option>
              <option value="Taşımacılık">{locale === "tr" ? "Taşımacılık / Lojistik" : "Logistics"}</option>
              <option value="Restoran">{locale === "tr" ? "Restoran" : "Restaurant"}</option>
              <option value="Klinik">{locale === "tr" ? "Klinik / Sağlık" : "Clinic / Health"}</option>
              <option value="Oto Servis">{locale === "tr" ? "Oto Servis" : "Auto Service"}</option>
            </optgroup>
            <option value={locale === "tr" ? "Diğer" : "Other"}>
              {locale === "tr" ? "Diğer" : "Other"}
            </option>
          </select>
          {errors?.sector ? (
            <p className="mt-1 text-xs text-rose-400">{errors.sector}</p>
          ) : null}
        </div>
      </div>

      <div>
        <Label htmlFor="budget">{copy.budget}</Label>
        <select
          id="budget"
          name="budget"
          defaultValue=""
          className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-2.5 text-sm text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <option value="" disabled>
            {copy.budget}
          </option>
          <option value="₺10k-₺25k">₺10k-₺25k</option>
          <option value="₺25k-₺50k">₺25k-₺50k</option>
          <option value="₺50k-₺100k">₺50k-₺100k</option>
          <option value="₺100k+">₺100k+</option>
          <option value={locale === "tr" ? "Özel teklif" : "Custom quote"}>
            {locale === "tr" ? "Önce konuşalım" : "Let's discuss first"}
          </option>
        </select>
        {errors?.budget ? (
          <p className="mt-1 text-xs text-rose-400">{errors.budget}</p>
        ) : null}
      </div>

      <div>
        <Label htmlFor="message">{copy.message}</Label>
        <Textarea
          id="message"
          name="message"
          placeholder={
            locale === "tr"
              ? "İhtiyacınızı, teslim tarihini ve varsa örnek siteleri paylaşın."
              : "Share your needs, timeline, and reference sites."
          }
        />
        {errors?.message ? (
          <p className="mt-1 text-xs text-rose-400">{errors.message}</p>
        ) : null}
      </div>

      <label
        htmlFor="kvkk-consent"
        className="flex items-start gap-2 text-xs leading-6 text-zinc-400"
      >
        <input
          id="kvkk-consent"
          name="kvkk"
          type="checkbox"
          required
          className="mt-1 size-4 rounded border-white/20 bg-black/40 accent-[var(--accent)]"
        />
        <span>
          {isEn
            ? "I have read and consent to the use of my data per the KVKK / Privacy Policy for responding to this inquiry."
            : "İletişim talebime yanıt verilmesi amacıyla bilgilerimin KVKK Aydınlatma Metni ve Gizlilik Politikası kapsamında işlenmesine onay veriyorum."}
        </span>
      </label>

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          className="w-full sm:w-auto"
          disabled={isSubmitting}
          data-cta="contactform-submit"
        >
          {isSubmitting ? copy.sending : copy.submit}
        </Button>
        {message ? (
          <p
            className={`text-sm ${
              status === "success"
                ? "text-[var(--accent)]"
                : status === "error"
                  ? "text-rose-400"
                  : "text-zinc-400"
            }`}
            role="status"
            aria-live="polite"
          >
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
