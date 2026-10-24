import Image from "next/image";
import Link from "next/link";
import { ExternalLink, FlaskConical, Github, PlayCircle } from "lucide-react";

import GradientText from "@/components/ui/gradient-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { cases, cases3d, caseCategories, caseHighlightLabel, type CaseItem } from "@/lib/cases";

type CaseGridProps = {
  locale: Locale;
  /** Üstte ve altta "Tüm İşleri Gör" bağlantısını gösterir (ana sayfa için). */
  showAllLink?: boolean;
  /** 3D / animasyonlu işleri en üstte ayrı bölümde göster (/isler sayfası). Ana sayfada kapalı — kalabalık olmasın. */
  show3dSection?: boolean;
};

export function CaseGrid({ locale, showAllLink, show3dSection }: CaseGridProps) {
  const copy = {
    tr: {
      title: "Referans Projeler",
      subtitle:
        "Yayında olan gerçek müşteri projeleri; her kartın bağlantısı canlı siteye açılır. Ar-Ge ve örnek senaryo kayıtları ayrıca etiketlenmiştir.",
      detail: "Proje Detayı",
      demo: "Canlı Site",
      all: "Tüm İşleri Görün",
      scenario: "Örnek Senaryo",
      lab: "Ar-Ge Projesi",
      repo: "Kaynak Kod",
      video: "Video",
      threeDTitle: "3D ve Animasyonlu Arayüzler",
      threeDSubtitle:
        "Three.js / React Three Fiber ile interaktif 3D sahneler, GSAP ve Motion ile akıcı geçişler — markasını teknolojik ve premium konumlandırmak isteyen firmalar için. Yayında olan örnekler:",
    },
    en: {
      title: "Selected Work",
      subtitle:
        "Live client projects; every card links to the live site. R&D and example-scenario entries are labelled separately.",
      detail: "View Case Study",
      demo: "Live Site",
      all: "See All Work",
      scenario: "Example Scenario",
      lab: "R&D Project",
      repo: "Source Code",
      video: "Video",
      threeDTitle: "3D and Animated Interfaces",
      threeDSubtitle:
        "Interactive 3D scenes with Three.js / React Three Fiber, fluid transitions with GSAP and Motion — for companies positioning their brand as technological and premium. Live examples:",
    },
  }[locale];

  let cardIndex = 0;

  return (
    <section className="section-shell mt-20 space-y-12" aria-labelledby="cases-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl space-y-2">
          <h2
            id="cases-heading"
            className="text-3xl font-semibold tracking-tight text-[#E9DFFF]"
          >
            <GradientText colors={["#E9DFFF", "#a78bfa", "#7cff92", "#E9DFFF"]} animationSpeed={10}>
              {copy.title}
            </GradientText>
          </h2>
        </div>
        {showAllLink ? (
          <Link
            href={withLocale(locale, "/isler")}
            className="text-sm font-medium text-[var(--accent)] hover:brightness-110"
          >
            {copy.all}
          </Link>
        ) : null}
      </div>

      {show3dSection && cases3d.length > 0 ? (
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="h-5 w-1 rounded-full bg-[#a78bfa]" aria-hidden />
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-[#E9DFFF]">{copy.threeDTitle}</h3>
              <p className="text-sm text-zinc-500">{copy.threeDSubtitle}</p>
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {cases3d.map((item) => (
              <CaseCard key={`3d-${item.slug}`} item={item} locale={locale} copy={copy} eager={cardIndex++ < 3} />
            ))}
          </div>
        </div>
      ) : null}

      {showAllLink ? (
        /* Ana sayfa ilk satır: E-Ticaret (2 kart) + Ar-Ge (1 kart) yan yana, başlıkları üstte */
        <div className="grid gap-5 lg:grid-cols-3">
          {(["ecommerce", "lab"] as const).map((id) => {
            const category = caseCategories.find((c) => c.id === id)!;
            const items = cases.filter((item) => item.category === id);
            return (
              <div key={id} className={id === "ecommerce" ? "lg:col-span-2 space-y-5" : "space-y-5"}>
                <div className="flex items-center gap-3">
                  <span className="h-5 w-1 rounded-full bg-[var(--accent)]" aria-hidden />
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-[#E9DFFF]">
                      {locale === "tr" ? category.tr : category.en}
                    </h3>
                  </div>
                </div>
                <div className={id === "ecommerce" ? "grid gap-5 md:grid-cols-2" : "grid gap-5"}>
                  {items.map((item) => (
                    <CaseCard key={item.slug} item={item} locale={locale} copy={copy} eager={cardIndex++ < 3} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {caseCategories.map((category) => {
        if (showAllLink && (category.id === "ecommerce" || category.id === "lab")) return null;
        const items = cases.filter((item) => item.category === category.id);
        if (items.length === 0) return null;

        return (
          <div key={category.id} className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="h-5 w-1 rounded-full bg-[var(--accent)]" aria-hidden />
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-[#E9DFFF]">
                  {locale === "tr" ? category.tr : category.en}
                </h3>
                <p className="text-sm text-zinc-500">
                  {locale === "tr" ? category.trSubtitle : category.enSubtitle}
                </p>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {items.map((item) => (
                <CaseCard
                  key={item.slug}
                  item={item}
                  locale={locale}
                  copy={copy}
                  eager={cardIndex++ < 3}
                />
              ))}
            </div>
          </div>
        );
      })}

      {showAllLink ? (
        <div className="flex justify-center pt-2">
          <Button asChild size="lg">
            <Link href={withLocale(locale, "/isler")}>{copy.all}</Link>
          </Button>
        </div>
      ) : null}
    </section>
  );
}

type CaseCardCopy = {
  detail: string;
  demo: string;
  scenario: string;
  lab: string;
  repo: string;
  video: string;
};

function CaseCard({
  item,
  locale,
  copy,
  eager,
}: {
  item: CaseItem;
  locale: Locale;
  copy: CaseCardCopy;
  eager: boolean;
}) {
  return (
    <article className="glass-card flex h-full flex-col overflow-hidden transition-colors hover:border-white/20">
      <Link
        href={withLocale(locale, `/isler/${item.slug}`)}
        aria-label={`${item.title} — ${copy.detail}`}
        className="relative block"
      >
        <Image
          src={item.image ?? "/images/cases/ai-agent-case.png"}
          alt={
            item.kind === "scenario"
              ? `${item.title} — ${item.sector} örnek çözüm senaryosu`
              : `${item.title} — ${item.sector} referans projesi`
          }
          width={900}
          height={600}
          className="h-44 w-full object-cover"
          loading={eager ? "eager" : "lazy"}
        />
        {item.kind === "scenario" || item.kind === "lab" ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/55 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-zinc-200 backdrop-blur">
            <FlaskConical className="size-3 text-[var(--accent)]" aria-hidden />
            {item.kind === "lab" ? copy.lab : copy.scenario}
          </span>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-lg font-semibold text-zinc-100">{item.title}</h3>
          <Badge className="shrink-0 whitespace-nowrap">{item.sector}</Badge>
        </div>
        {item.highlights?.length ? (
          <ul className="flex flex-wrap gap-1.5" aria-label={locale === "tr" ? "Öne çıkanlar" : "Highlights"}>
            {item.highlights.map((h) => (
              <li
                key={h}
                className={
                  h === "3d" || h === "motion"
                    ? "rounded-full border border-[#a78bfa]/40 bg-[#a78bfa]/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-[#c4b5fd]"
                    : "rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-zinc-400"
                }
              >
                {caseHighlightLabel[h][locale]}
              </li>
            ))}
          </ul>
        ) : null}
        <p className="line-clamp-3 text-sm text-zinc-400">{item.summary}</p>
        <div className="mt-auto grid grid-cols-3 gap-2">
          {item.metrics.map((metric) => (
            <div key={metric.label} className="rounded-lg border border-white/10 bg-white/5 p-2">
              <p className="line-clamp-1 text-[10px] uppercase tracking-[0.08em] text-zinc-500">{metric.label}</p>
              <p className="line-clamp-1 text-xs font-semibold text-zinc-100">{metric.value}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Link
            href={withLocale(locale, `/isler/${item.slug}`)}
            className="inline-flex text-sm font-medium text-[var(--accent)] hover:brightness-110"
          >
            {copy.detail}
          </Link>
          {item.demoUrl ? (
            <Button asChild variant="outline" size="sm">
              <a
                href={item.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5"
                aria-label={`${item.title} — ${copy.demo}`}
              >
                <ExternalLink className="size-3.5" aria-hidden />
                {copy.demo}
              </a>
            </Button>
          ) : null}
          {item.youtubeId ? (
            <Button asChild variant="outline" size="sm">
              <a
                href={`https://www.youtube.com/watch?v=${item.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5"
                aria-label={`${item.title} — ${copy.video}`}
              >
                <PlayCircle className="size-3.5" aria-hidden />
                {copy.video}
              </a>
            </Button>
          ) : null}
          {item.repoUrl ? (
            <Button asChild variant="outline" size="sm">
              <a
                href={item.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5"
                aria-label={`${item.title} — ${copy.repo}`}
              >
                <Github className="size-3.5" aria-hidden />
                {copy.repo}
              </a>
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
