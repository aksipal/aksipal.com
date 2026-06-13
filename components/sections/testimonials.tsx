import { Quote, Star } from "lucide-react";

import type { Locale } from "@/lib/i18n";
import { getGoogleReviews } from "@/lib/reviews";

type TestimonialsProps = {
  locale: Locale;
};

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} / 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < count
              ? "size-4 fill-[#FFC83D] text-[#FFC83D]"
              : "size-4 text-zinc-600"
          }
          aria-hidden
        />
      ))}
    </div>
  );
}

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export async function Testimonials({ locale }: TestimonialsProps) {
  const data = await getGoogleReviews(locale);

  const copy = {
    tr: {
      title: "Müşteri Değerlendirmeleri",
      subtitle:
        "Google İşletme Profilimizdeki gerçek 5 yıldızlı değerlendirmeler — düzenleme yapılmadan, doğrudan müşterilerimizden.",
      ratingLabel: "Google değerlendirmesi",
      seeAll: "Tümünü Google'da görün",
      badge: "Google'da 5 yıldız",
    },
    en: {
      title: "Client Reviews",
      subtitle:
        "Genuine 5-star reviews from our Google Business Profile — unedited, straight from our clients.",
      ratingLabel: "Google reviews",
      seeAll: "See all on Google",
      badge: "5 stars on Google",
    },
  }[locale];

  return (
    <section className="section-shell mt-20 space-y-8" aria-labelledby="testimonials-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl space-y-2">
          <h2
            id="testimonials-heading"
            className="text-3xl font-semibold tracking-tight text-[#E9DFFF]"
          >
            {copy.title}
          </h2>
          <p className="text-[#B8B3D1]">{copy.subtitle}</p>
        </div>
        <a
          href={data.mapsUri}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 transition-colors hover:border-white/20"
        >
          <Stars count={Math.round(data.rating)} />
          <span className="font-semibold text-[#E9DFFF]">{data.rating.toFixed(1)}</span>
          <span className="text-zinc-500">· {data.total} {copy.ratingLabel}</span>
        </a>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {data.reviews.map((review) => (
          <blockquote
            key={`${review.author}-${review.publishTime}`}
            className="glass-card relative flex w-full flex-col gap-4 p-6"
          >
            <div className="flex items-center justify-between">
              <Stars count={review.rating} />
              <Quote className="size-5 text-[var(--accent)]" aria-hidden />
            </div>
            <p className="flex-1 text-sm leading-7 text-[#B8B3D1]">&ldquo;{review.text}&rdquo;</p>
            <footer className="flex items-center gap-3 border-t border-white/5 pt-4">
              {review.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={review.photo}
                  alt={review.author}
                  width={36}
                  height={36}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="size-9 rounded-full object-cover"
                />
              ) : (
                <span className="flex size-9 items-center justify-center rounded-full bg-[var(--accent)]/15 text-xs font-semibold text-[var(--accent)]">
                  {initials(review.author)}
                </span>
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#E9DFFF]">{review.author}</p>
                <p className="text-xs text-zinc-500">
                  {review.relativeTime ? `${review.relativeTime} · ` : ""}Google
                </p>
              </div>
            </footer>
          </blockquote>
        ))}
      </div>

      <div className="flex justify-center">
        <a
          href={data.mapsUri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-[var(--accent)] hover:brightness-110"
        >
          {copy.seeAll}
        </a>
      </div>
    </section>
  );
}
