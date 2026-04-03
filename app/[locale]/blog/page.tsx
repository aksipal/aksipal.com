import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { seoKeywordsTr } from "@/lib/constants";
import { getBlogPosts } from "@/lib/mdx";
import { isLocale, withLocale } from "@/lib/i18n";
import { absoluteUrl, createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  return createPageMetadata({
    locale,
    pathname: "/blog",
    title:
      locale === "tr"
        ? "Blog — Web Sitesi Yaptırma, Fiyatları ve SEO Rehberleri | Aksipal"
        : "Blog — Web Design, Pricing & SEO Guides | Aksipal",
    description:
      locale === "tr"
        ? "Kurumsal web sitesi fiyatları, web sitesi yaptırma rehberi, SEO ipuçları ve küçük işletmeler için dijital çözümler. Aksipal blog yazıları."
        : "Corporate website pricing, web design guides, SEO tips and digital solutions for SMBs. Aksipal blog articles.",
    keywords:
      locale === "tr"
        ? [...seoKeywordsTr, "blog", "SEO rehberi", "web sitesi fiyatları", "web sitesi yaptırma"]
        : undefined,
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const posts = await getBlogPosts();

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: locale === "tr" ? "Ana Sayfa" : "Home", url: absoluteUrl(`/${locale}`) },
    { name: "Blog", url: absoluteUrl(`/${locale}/blog`) },
  ]);

  const blogListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: locale === "tr" ? "Aksipal Blog" : "Aksipal Blog",
    description:
      locale === "tr"
        ? "Web sitesi yaptırma, fiyatlar, SEO ve kurumsal dijital çözümler hakkında rehber yazılar."
        : "Guides on web design, pricing, SEO and corporate digital solutions.",
    url: absoluteUrl(`/${locale}/blog`),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(`/${locale}/blog/${post.slug}`),
        name: post.title,
      })),
    },
  };

  return (
    <section className="section-shell pt-16">
      <div className="mb-6 max-w-3xl space-y-3">
        <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href={withLocale(locale, "/")} className="hover:text-zinc-300">
                {locale === "tr" ? "Ana Sayfa" : "Home"}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-zinc-300">Blog</li>
          </ol>
        </nav>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {locale === "tr"
            ? "Blog — Web Sitesi Yaptırma Rehberleri"
            : "Blog — Web Design & SEO Guides"}
        </h1>
        <p className="text-zinc-400">
          {locale === "tr"
            ? "Kurumsal web sitesi fiyatları, web sitesi yaptırma süreci, SEO altyapısı ve dönüşüm optimizasyonu üzerine pratik rehberler. İşletmenizin dijital varlığını güçlendirecek bilgiler."
            : "Practical guides on corporate website pricing, web design process, SEO infrastructure and conversion optimization for businesses."}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post, i) => (
          <article
            key={post.slug}
            className={`glass-card overflow-hidden ${i === 0 ? "md:col-span-2" : ""}`}
          >
            <Link href={withLocale(locale, `/blog/${post.slug}`)} className="block">
              <Image
                src={post.coverImage}
                alt={`${post.title} — Aksipal blog yazısı`}
                width={1200}
                height={630}
                className={`w-full object-cover ${i === 0 ? "h-56 sm:h-72" : "h-44"}`}
                priority={i === 0}
              />
            </Link>
            <div className="space-y-4 p-5">
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              <h2 className={`font-semibold text-zinc-100 ${i === 0 ? "text-2xl" : "text-xl"}`}>
                <Link href={withLocale(locale, `/blog/${post.slug}`)} className="hover:text-[var(--accent)]">
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm text-zinc-400 line-clamp-3">{post.description}</p>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span className="font-medium text-zinc-400">Baris Aksipal</span>
                <span>|</span>
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span>|</span>
                <span>
                  {post.readingMinutes} {locale === "tr" ? "dk okuma" : "min read"}
                </span>
              </div>
              <Link
                href={withLocale(locale, `/blog/${post.slug}`)}
                className="inline-flex text-sm font-semibold text-[var(--accent)]"
              >
                {locale === "tr" ? "Yazıyı Oku" : "Read Article"} &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListJsonLd) }}
      />
    </section>
  );
}
