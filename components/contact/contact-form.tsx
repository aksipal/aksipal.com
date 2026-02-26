"use client";

import { useActionState } from "react";

import { SubmitButton } from "@/components/contact/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ContactFormState } from "@/lib/actions/contact-state";
import { initialContactFormState } from "@/lib/actions/contact-state";
import type { Locale } from "@/lib/i18n";

type ContactFormProps = {
  locale: Locale;
  action: (
    state: ContactFormState,
    formData: FormData,
  ) => Promise<ContactFormState>;
};

export function ContactForm({ locale, action }: ContactFormProps) {
  const [state, formAction] = useActionState(action, initialContactFormState);

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
      success: "Talebiniz başarıyla alındı.",
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
      success: "Your request has been received.",
    },
  }[locale];

  return (
    <form action={formAction} className="glass-card space-y-5 p-6">
      <div className="hidden">
        <Label htmlFor="company">Company</Label>
        <Input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">{copy.name}</Label>
          <Input id="name" name="name" placeholder={copy.name} />
          {state.errors?.name ? (
            <p className="mt-1 text-xs text-rose-400">{state.errors.name}</p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="email">{copy.email}</Label>
          <Input id="email" type="email" name="email" placeholder={copy.email} />
          {state.errors?.email ? (
            <p className="mt-1 text-xs text-rose-400">{state.errors.email}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">{copy.phone}</Label>
          <Input id="phone" name="phone" placeholder="+90 5xx xxx xx xx" />
          {state.errors?.phone ? (
            <p className="mt-1 text-xs text-rose-400">{state.errors.phone}</p>
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
              {copy.sector}
            </option>
            <option value="Emlak">Emlak</option>
            <option value="Tasımacılık">Taşımacılık</option>
            <option value="Restoran">Restoran</option>
            <option value="Klinik">Klinik</option>
            <option value="Oto Servis">Oto Servis</option>
            <option value={locale === "tr" ? "Diğer" : "Other"}>
              {locale === "tr" ? "Diğer" : "Other"}
            </option>
          </select>
          {state.errors?.sector ? (
            <p className="mt-1 text-xs text-rose-400">{state.errors.sector}</p>
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
          <option value="₺10k-₺20k">₺10k-₺20k</option>
          <option value="₺20k-₺40k">₺20k-₺40k</option>
          <option value="₺40k-₺80k">₺40k-₺80k</option>
          <option value={locale === "tr" ? "Özel teklif" : "Custom quote"}>
            {locale === "tr" ? "Özel teklif" : "Custom quote"}
          </option>
        </select>
        {state.errors?.budget ? (
          <p className="mt-1 text-xs text-rose-400">{state.errors.budget}</p>
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
        {state.errors?.message ? (
          <p className="mt-1 text-xs text-rose-400">{state.errors.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton idleLabel={copy.submit} loadingLabel={copy.sending} />
        <p
          className="text-sm text-zinc-400"
          role="status"
          aria-live="polite"
        >
          {state.status === "success" ? copy.success : state.message}
        </p>
      </div>
    </form>
  );
}
