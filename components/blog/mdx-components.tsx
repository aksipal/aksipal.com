import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-10 text-2xl font-semibold tracking-tight text-zinc-100"
      {...props}
    />
  ),
  h3: (props) => <h3 className="mt-8 text-xl font-semibold text-zinc-200" {...props} />,
  p: (props) => <p className="mt-4 leading-8 text-zinc-300" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-300" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-zinc-300" {...props} />,
  li: (props) => <li className="marker:text-zinc-500" {...props} />,
  strong: (props) => <strong className="font-semibold text-zinc-100" {...props} />,
  a: (props) => (
    <a
      className="underline decoration-[var(--accent)]/70 underline-offset-4 hover:text-[var(--accent)]"
      {...props}
    />
  ),
  code: (props) => (
    <code className="rounded-md bg-white/10 px-1.5 py-0.5 text-sm text-zinc-200" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-6 border-l-2 border-[var(--accent)] pl-4 italic text-zinc-300"
      {...props}
    />
  ),
};
