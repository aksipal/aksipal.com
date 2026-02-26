import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/lib/i18n";
import { packageTiers } from "@/lib/pricing";

type PricingSectionProps = {
  locale: Locale;
};

export function PricingSection({ locale }: PricingSectionProps) {
  return (
    <section className="section-shell pt-16">
      <div className="max-w-3xl space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {locale === "tr" ? "Hizmetler" : "Services"}
        </h1>
        <p className="text-zinc-400">
          {locale === "tr"
            ? "İki lane ile çalışıyoruz: hızlı ve ürünleşmiş şablon paketleri veya özel yazılım/altyapı projeleri."
            : "We work in two lanes: fast productized templates or custom software/platform projects."}
        </p>
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-3">
        {packageTiers.map((tier) => (
          <article
            key={tier.id}
            className={`glass-card p-6 ${tier.highlighted ? "ring-1 ring-[var(--accent)]/60" : ""}`}
          >
            <div className="mb-4 flex items-start justify-between gap-2">
              <h2 className="text-2xl font-semibold text-zinc-100">{tier.name}</h2>
              {tier.highlighted ? <Badge variant="accent">Popular</Badge> : null}
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
