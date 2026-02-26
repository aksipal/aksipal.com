import { LeadDialog } from "@/components/contact/lead-dialog";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

type ContactCtaProps = {
  locale: Locale;
};

export function ContactCta({ locale }: ContactCtaProps) {
  const copy = {
    tr: {
      title: "Projeniz için doğru rota: hızlı paket mi, özel yazılım mı?",
      text: "15 dakikalık kısa görüşmede ihtiyaçlarınızı netleştirip en doğru teslim planını çıkaralım.",
      detail: "Detaylı İletişim",
      modal: "Hızlı Teklif Al",
    },
    en: {
      title: "Need the right track: fast package or custom build?",
      text: "In a focused 15-minute call, we define your scope and the best delivery plan.",
      detail: "Full Contact Page",
      modal: "Quick Quote",
    },
  }[locale];

  return (
    <section className="section-shell mt-20">
      <div className="glass-card flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl font-semibold text-zinc-100 sm:text-3xl">{copy.title}</h2>
          <p className="text-zinc-400">{copy.text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <LeadDialog locale={locale} buttonText={copy.modal} buttonVariant="default" />
          <Button asChild variant="secondary">
            <a href={withLocale(locale, "/iletisim")}>{copy.detail}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
