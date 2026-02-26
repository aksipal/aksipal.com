import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

import { mdxComponents } from "@/components/blog/mdx-components";
import { getAllPostSlugs, getBlogPostBySlug } from "@/lib/mdx";
import { isLocale, locales } from "@/lib/i18n";
import {
  absoluteUrl,
  createPageMetadata,
  getBlogPostingJsonLd,
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

  return (
    <article className="section-shell pt-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm text-zinc-500">
          {new Date(post.publishedAt).toLocaleDateString(locale)} • {post.readingMinutes}{" "}
          {locale === "tr" ? "dk okuma" : "min read"}
        </p>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-zinc-400">{post.description}</p>

        <div className="prose-invert mt-12 max-w-none">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </article>
  );
}
