type LegalSection = {
  heading: string;
  body: string | string[];
};

type LegalPageShellProps = {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export function LegalPageShell({ title, lastUpdated, sections }: LegalPageShellProps) {
  return (
    <section className="section-shell pt-16 pb-20">
      <article className="glass-card max-w-3xl space-y-8 p-6 sm:p-10">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h1>
          <p className="text-sm text-zinc-500">{lastUpdated}</p>
        </header>

        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-lg font-semibold text-zinc-100">{section.heading}</h2>
              {Array.isArray(section.body) ? (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400">
                  {section.body.map((item) => (
                    <li key={item.slice(0, 64)}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-zinc-400">
                  {section.body}
                </p>
              )}
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
