import Image from "next/image";
import Link from "next/link";

import { LeadDialog } from "@/components/contact/lead-dialog";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import { navItems, withLocale } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
};

export function SiteHeader({ locale }: SiteHeaderProps) {
  const copy = {
    tr: {
      cta: "Teklif Al",
    },
    en: {
      cta: "Get Quote",
    },
  }[locale];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07070b]/85 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href={withLocale(locale, "/")} className="group inline-flex items-center gap-2">
            <Image
              src="/favicon.png"
              alt="Aksipal"
              width={40}
              height={40}
              className="size-10 object-contain"
              priority
            />
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-[0.08em] text-zinc-100 uppercase">
                Aksipal
              </p>
              <p className="text-[11px] text-zinc-400">Web Systems Studio</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Button key={item.href} asChild variant="ghost" size="sm">
                <Link href={withLocale(locale, item.href)}>{item.label[locale]}</Link>
              </Button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher currentLocale={locale} />
            <div className="hidden sm:block">
              <LeadDialog locale={locale} buttonText={copy.cta} buttonVariant="default" />
            </div>
          </div>
        </div>
        <nav className="mb-3 flex gap-2 overflow-x-auto pb-1 md:hidden">
          {navItems.slice(0, 5).map((item) => (
            <Button key={item.href} asChild variant="ghost" size="sm">
              <Link href={withLocale(locale, item.href)}>{item.label[locale]}</Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}
