"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useConsent } from "@/lib/consent";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

type CookieConsentProps = {
  locale: Locale;
};

export function CookieConsent({ locale }: CookieConsentProps) {
  const { decided, accept, deny, update } = useConsent();
  const [showPrefs, setShowPrefs] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(false);

  const copy = {
    tr: {
      title: "Çerez tercihleri",
      message:
        "Deneyiminizi iyileştirmek ve site kullanımını ölçmek için çerezler kullanıyoruz. Zorunlu çerezler site için gereklidir. Analitik çerezler yalnızca onayınızla yüklenir. Detaylar için",
      policyLink: "Çerez Politikası",
      essential: "Zorunlu çerezler",
      alwaysOn: "her zaman açık",
      analytics: "İstatistik / analitik (Google Analytics — tanımlıysa)",
      accept: "Tümünü kabul et",
      deny: "Reddet",
      manage: "Tercihleri yönet",
      savePrefs: "Seçimleri kaydet",
    },
    en: {
      title: "Cookie preferences",
      message:
        "We use cookies to improve your experience and measure traffic. Essential cookies are required. Analytics loads only with your consent. See our",
      policyLink: "Cookie Policy",
      essential: "Essential cookies",
      alwaysOn: "always on",
      analytics: "Analytics (Google Analytics — if configured)",
      accept: "Accept all",
      deny: "Reject",
      manage: "Manage preferences",
      savePrefs: "Save choices",
    },
  }[locale];

  if (decided) return null;

  const handleSavePrefs = () => {
    update({ analytics: analyticsChecked });
  };

  return (
    <div
      role="dialog"
      aria-label={copy.title}
      className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6"
    >
      <div className="glass-card mx-auto max-w-xl border border-white/15 p-5 shadow-[0_-8px_40px_rgba(0,0,0,0.45)] sm:p-6">
        <p className="text-sm leading-relaxed text-zinc-300">
          {copy.message}{" "}
          <Link
            href={withLocale(locale, "/cerez-politikasi")}
            className="font-medium text-[var(--accent)] underline underline-offset-2 hover:brightness-110"
          >
            {copy.policyLink}
          </Link>
          .
        </p>

        {showPrefs ? (
          <div className="mt-4 space-y-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <label className="flex cursor-not-allowed items-start gap-3 text-sm text-zinc-400">
              <input
                type="checkbox"
                checked
                disabled
                className="mt-0.5 h-4 w-4 rounded border-white/20 accent-[var(--accent)]"
              />
              <span>
                {copy.essential}{" "}
                <span className="text-zinc-500">({copy.alwaysOn})</span>
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={analyticsChecked}
                onChange={(e) => setAnalyticsChecked(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-white/20 accent-[var(--accent)]"
              />
              <span>{copy.analytics}</span>
            </label>
          </div>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button type="button" size="sm" onClick={accept}>
            {copy.accept}
          </Button>
          <Button type="button" size="sm" variant="secondary" onClick={deny}>
            {copy.deny}
          </Button>
          {!showPrefs ? (
            <button
              type="button"
              onClick={() => setShowPrefs(true)}
              className="text-sm text-zinc-500 underline underline-offset-2 hover:text-zinc-300"
            >
              {copy.manage}
            </button>
          ) : (
            <Button type="button" size="sm" variant="outline" onClick={handleSavePrefs}>
              {copy.savePrefs}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
