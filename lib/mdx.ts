import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  coverImage: string;
  readingMinutes: number;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

const parseTags = (value: unknown) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => String(item));
};

const parsePost = async (slug: string): Promise<BlogPost> => {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const source = await readFile(fullPath, "utf8");
  const { data, content } = matter(source);
  const minutes = Math.max(1, Math.round(readingTime(content).minutes));

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    publishedAt: String(data.publishedAt ?? new Date().toISOString()),
    tags: parseTags(data.tags),
    coverImage: String(data.coverImage ?? "/images/cases/emlak-case.svg"),
    readingMinutes: minutes,
    content,
  };
};

export const getAllPostSlugs = cache(async () => {
  const files = await readdir(BLOG_DIR);
  return files.filter((file) => file.endsWith(".mdx")).map((file) => file.replace(/\.mdx$/, ""));
});

export const getBlogPosts = cache(async (): Promise<BlogPostMeta[]> => {
  const slugs = await getAllPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => parsePost(slug)));
  const metadata = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt,
    tags: post.tags,
    coverImage: post.coverImage,
    readingMinutes: post.readingMinutes,
  }));

  return metadata.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
});

export const getBlogPostBySlug = cache(async (slug: string) => {
  const slugs = await getAllPostSlugs();
  if (!slugs.includes(slug)) {
    return null;
  }

  return parsePost(slug);
});
