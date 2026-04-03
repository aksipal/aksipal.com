"use client";

import {
  type CSSProperties,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { motion } from "motion/react";

interface TrueFocusProps {
  sentence: string;
  separator?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
}

interface FocusRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function TrueFocus({
  sentence,
  separator = " ",
  manualMode = false,
  blurAmount = 5,
  borderColor = "#7cff92",
  glowColor = "rgba(124, 255, 146, 0.6)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
}: TrueFocusProps) {
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const [focusRect, setFocusRect] = useState<FocusRect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const containerRef = useRef<HTMLSpanElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (manualMode || words.length < 2) return;
    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, (animationDuration + pauseBetweenAnimations) * 1000);
    return () => window.clearInterval(interval);
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    const container = containerRef.current;
    const active = wordRefs.current[currentIndex];
    if (!container || !active) return;

    const parentRect = container.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
  }, [currentIndex, words.length]);

  const handleMouseEnter = (
    _event: MouseEvent<HTMLSpanElement>,
    index: number,
  ) => {
    if (!manualMode) return;
    setLastActiveIndex(index);
    setCurrentIndex(index);
  };

  const handleMouseLeave = () => {
    if (!manualMode || lastActiveIndex === null) return;
    setCurrentIndex(lastActiveIndex);
  };

  return (
    <span
      ref={containerRef}
      className="relative inline-flex flex-wrap items-center justify-center gap-3"
      style={{ userSelect: "none" }}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={`${word}-${index}`}
            ref={(el) => {
              wordRefs.current[index] = el;
            }}
            className="relative inline-block"
            style={
              {
                filter: isActive ? "blur(0px)" : `blur(${blurAmount}px)`,
                transition: `filter ${animationDuration}s ease`,
              } as CSSProperties
            }
            onMouseEnter={(event) => handleMouseEnter(event, index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      <motion.span
        className="pointer-events-none absolute left-0 top-0 box-border"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0,
        }}
        transition={{ duration: animationDuration }}
        style={
          {
            "--border-color": borderColor,
            "--glow-color": glowColor,
          } as CSSProperties
        }
      >
        {[
          "absolute left-[-8px] top-[-8px] border-b-0 border-r-0",
          "absolute right-[-8px] top-[-8px] border-b-0 border-l-0",
          "absolute bottom-[-8px] left-[-8px] border-r-0 border-t-0",
          "absolute bottom-[-8px] right-[-8px] border-l-0 border-t-0",
        ].map((cls) => (
          <span
            key={cls}
            className={`h-3 w-3 rounded-[2px] border-2 ${cls}`}
            style={{
              borderColor: "var(--border-color)",
              filter: "drop-shadow(0 0 3px var(--glow-color))",
            }}
          />
        ))}
      </motion.span>
    </span>
  );
}
