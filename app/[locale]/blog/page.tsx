import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { getBlogPosts } from "@/lib/mdx";
import { isLocale, withLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

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
    title: locale === "tr" ? "Blog" : "Blog",
    description:
      locale === "tr"
        ? "Web performansı, dönüşüm odaklı tasarım ve dijital büyüme üzerine içerikler."
        : "Articles on performance, conversion-focused design and digital growth.",
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

  return (
    <section className="section-shell pt-16">
      <div className="mb-10 max-w-2xl space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Blog</h1>
        <p className="text-zinc-400">
          {locale === "tr"
            ? "Saha deneyiminden gelen pratik öneriler: hız, SEO, dönüşüm ve ürünleşmiş teslim yaklaşımı."
            : "Practical insights on speed, SEO, conversion and productized delivery."}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.slug} className="glass-card overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={960}
              height={640}
              className="h-44 w-full object-cover"
            />
            <div className="space-y-4 p-5">
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              <h2 className="text-xl font-semibold text-zinc-100">{post.title}</h2>
              <p className="text-sm text-zinc-400">{post.description}</p>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span>{new Date(post.publishedAt).toLocaleDateString(locale)}</span>
                <span>•</span>
                <span>
                  {post.readingMinutes} {locale === "tr" ? "dk okuma" : "min read"}
                </span>
              </div>
              <Link
                href={withLocale(locale, `/blog/${post.slug}`)}
                className="inline-flex text-sm font-semibold text-[var(--accent)]"
              >
                {locale === "tr" ? "Yazıyı Oku" : "Read Article"}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
