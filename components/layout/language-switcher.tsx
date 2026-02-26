"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import { localeLabel, locales } from "@/lib/i18n";

type LanguageSwitcherProps = {
  currentLocale: Locale;
};

function createLocalePath(pathname: string, targetLocale: Locale) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${targetLocale}`;
  }

  segments[0] = targetLocale;
  return `/${segments.join("/")}`;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
      {locales.map((locale) => {
        const isActive = locale === currentLocale;
        return (
          <Link
            key={locale}
            href={createLocalePath(pathname, locale)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              isActive
                ? "bg-[var(--accent)] text-black"
                : "text-zinc-300 hover:bg-white/10 hover:text-white",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {localeLabel[locale]}
          </Link>
        );
      })}
    </div>
  );
}
