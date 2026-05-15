import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/lib/i18n";
import { getPackageTiers } from "@/lib/pricing";

type PricingSectionProps = {
  locale: Locale;
};

export function PricingSection({ locale }: PricingSectionProps) {
  const tiers = getPackageTiers(locale);

  return (
    <section className="section-shell pt-16">
      <div className="max-w-3xl space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {locale === "tr" ? "Hizmetler & Şeffaf Fiyatlar" : "Services & Transparent Pricing"}
        </h1>
        <p className="text-zinc-400">
          {locale === "tr"
            ? "İki kulvarda çalışıyoruz: Hızlı yayın için sektörel web siteleri (aşağıda) ve stratejik AI / otomasyon / özel yazılım projeleri (altta). Her paket sözleşmeli teslim, sabit fiyat ve net revizyon politikası ile gelir."
            : "Two tracks: fast-launch sector websites (below) and strategic AI / automation / custom software projects (further down). Every package includes contracted delivery, fixed pricing and a clear revision policy."}
        </p>
        <p className="text-sm font-medium text-[var(--accent)]">
          {locale === "tr"
            ? "Web Paketleri — 4-12 günde teslim · Fiyatlara KDV dahil değildir"
            : "Web Packages — Live in 4-12 days · Prices exclusive of VAT (KDV)"}
        </p>
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-3">
        {tiers.map((tier) => (
          <article
            key={tier.id}
            className={`glass-card p-6 ${tier.highlighted ? "ring-1 ring-[var(--accent)]/60" : ""}`}
          >
            <div className="mb-4 flex items-start justify-between gap-2">
              <h2 className="text-2xl font-semibold text-zinc-100">{tier.name}</h2>
              {tier.highlighted ? (
                <Badge variant="accent">
                  {locale === "tr" ? "Popüler" : "Popular"}
                </Badge>
              ) : null}
            </div>
            <p className="text-sm text-zinc-400">{tier.description}</p>
            <p className="mt-4 text-2xl font-semibold text-[var(--accent)]">{tier.price}</p>
            <div className="mt-2 text-xs text-zinc-500">
              <span>{tier.delivery}</span> • <span>{tier.revisions}</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              {tier.includes.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
