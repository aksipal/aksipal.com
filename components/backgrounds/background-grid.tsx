"use client";

import dynamic from "next/dynamic";

const ShapeGrid = dynamic(
  () => import("@/components/backgrounds/shape-grid"),
  { ssr: false },
);

export function BackgroundGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <ShapeGrid
        speed={0.3}
        squareSize={50}
        direction="diagonal"
        borderColor="rgba(124,255,146,0.06)"
        hoverFillColor="rgba(124,255,146,0.08)"
        shape="square"
        hoverTrailAmount={5}
      />
    </div>
  );
}
