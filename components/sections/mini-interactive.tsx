"use client";

import { useMemo, useRef, useState } from "react";

import type { Locale } from "@/lib/i18n";

type Dot = {
  id: number;
  x: number;
  y: number;
};

type MiniInteractiveProps = {
  locale: Locale;
};

export function MiniInteractive({ locale }: MiniInteractiveProps) {
  const [dots, setDots] = useState<Dot[]>([]);
  const [score, setScore] = useState(0);
  const areaRef = useRef<HTMLDivElement>(null);

  const heading = useMemo(
    () =>
      locale === "tr"
        ? "Mini Etkileşim: Enerji Noktaları"
        : "Mini Interaction: Energy Dots",
    [locale],
  );

  const description = useMemo(
    () =>
      locale === "tr"
        ? "Alana tıklayarak enerji noktaları biriktirin. Hafif, hızlı ve tamamen yerel bir mikro etkileşim."
        : "Click inside the area to collect energy dots. Lightweight, fast and fully local.",
    [locale],
  );

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    event.currentTarget.style.setProperty("--x", `${x}px`);
    event.currentTarget.style.setProperty("--y", `${y}px`);
  };

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rect = event.currentTarget.getBoundingClientRect();
    const dot: Dot = {
      id: Date.now(),
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    setDots((prev) => [...prev, dot]);
    setScore((prev) => prev + 1);

    window.setTimeout(() => {
      setDots((prev) => prev.filter((item) => item.id !== dot.id));
    }, reduceMotion ? 250 : 900);
  };

  return (
    <section className="section-shell mt-20">
      <div className="glass-card space-y-5 p-6 sm:p-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight text-white">{heading}</h2>
          <p className="max-w-2xl text-zinc-400">{description}</p>
        </div>

        <div
          ref={areaRef}
          onPointerMove={onPointerMove}
          onClick={onClick}
          className="interactive-surface relative h-52 cursor-crosshair overflow-hidden rounded-2xl border border-white/10 bg-black/40"
          aria-label={heading}
        >
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(120px_circle_at_var(--x)_var(--y),rgba(124,255,146,0.22),transparent_70%)]" />

          {dots.map((dot) => (
            <span
              key={dot.id}
              className="dot-burst absolute"
              style={{
                left: dot.x,
                top: dot.y,
                animationDuration: "900ms",
              }}
            />
          ))}

          <div className="absolute left-4 top-4 rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-xs text-zinc-300">
            {locale === "tr" ? "Toplanan nokta" : "Dots collected"}:{" "}
            <span className="font-semibold text-[var(--accent)]">{score}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
