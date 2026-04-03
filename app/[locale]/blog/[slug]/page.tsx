import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

import { ContactCta } from "@/components/sections/contact-cta";
import { mdxComponents } from "@/components/blog/mdx-components";
import { Badge } from "@/components/ui/badge";
import { getAllPostSlugs, getBlogPostBySlug, getBlogPosts } from "@/lib/mdx";
import { isLocale, locales, withLocale } from "@/lib/i18n";
import {
  absoluteUrl,
  createPageMetadata,
  getBlogPostingJsonLd,
  getBreadcrumbJsonLd,
  getFaqJsonLd,
} from "@/lib/seo";

type PageParams = {
  locale: string;
  slug: string;
};

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();

  return locales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  const post = await getBlogPostBySlug(slug);
  if (!post) {
    return {};
  }

  return createPageMetadata({
    locale,
    pathname: `/blog/${slug}`,
    title: post.title,
    description: post.description,
    image: post.coverImage,
    keywords: post.keywords.length ? post.keywords : post.tags,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const post = await getBlogPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const articleJsonLd = {
    ...getBlogPostingJsonLd({
      title: post.title,
      description: post.description,
      slug: post.slug,
      publishedAt: post.publishedAt,
      tags: post.tags,
    }),
    mainEntityOfPage: absoluteUrl(`/${locale}/blog/${post.slug}`),
    inLanguage: locale,
  };

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: locale === "tr" ? "Ana Sayfa" : "Home", url: absoluteUrl(`/${locale}`) },
    { name: "Blog", url: absoluteUrl(`/${locale}/blog`) },
    { name: post.title, url: absoluteUrl(`/${locale}/blog/${post.slug}`) },
  ]);

  const faqJsonLd =
    post.faq.length > 0
      ? getFaqJsonLd(post.faq.map((f) => ({ question: f.q, answer: f.a })))
      : null;

  return (
    <>
      <article className="section-shell pt-16">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-zinc-500">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href={withLocale(locale, "/")} className="hover:text-zinc-300">
                  {locale === "tr" ? "Ana Sayfa" : "Home"}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href={withLocale(locale, "/blog")} className="hover:text-zinc-300">
                  Blog
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="truncate text-zinc-300">{post.title}</li>
            </ol>
          </nav>

          <Image
            src={post.coverImage}
            alt={`${post.title} — Aksipal blog`}
            width={1200}
            height={630}
            className="mb-8 h-56 w-full rounded-2xl object-cover sm:h-72"
            priority
          />

          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-zinc-500">
            <span className="font-medium text-zinc-300">
              {locale === "tr" ? "Yazar:" : "Author:"} Baris Aksipal
            </span>
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

          <div className="mb-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>

          <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-zinc-400">{post.description}</p>

          <div className="prose-invert mt-12 max-w-none">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <aside className="mx-auto mt-20 max-w-3xl">
            <h2 className="mb-6 text-2xl font-semibold text-white">
              {locale === "tr" ? "Ilgili Yazilar" : "Related Articles"}
            </h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={withLocale(locale, `/blog/${rp.slug}`)}
                  className="glass-card overflow-hidden transition-colors hover:border-white/20"
                >
                  <Image
                    src={rp.coverImage}
                    alt={`${rp.title} — Aksipal blog`}
                    width={400}
                    height={220}
                    className="h-28 w-full object-cover"
                  />
                  <div className="p-4">
                    <p className="text-sm font-semibold text-zinc-100 line-clamp-2">{rp.title}</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {rp.readingMinutes} {locale === "tr" ? "dk" : "min"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        )}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        {faqJsonLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        ) : null}
      </article>

      <ContactCta locale={locale} />
    </>
  );
}
