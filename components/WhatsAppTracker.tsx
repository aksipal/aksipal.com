"use client";

import { useEffect } from "react";

export default function WhatsAppTracker() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a[href*='wa.me']") as HTMLAnchorElement | null;

      if (link && typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "conversion", {
          send_to: "AW-400400735/caZnCNuF0aAcEN_C9r4B",
          value: 500.0,
          currency: "TRY",
        });
      }
    };

    document.addEventListener("click", handleClick, { passive: true });
    return () => document.removeEventListener("click", handleClick, { passive: true });
  }, []);

  return null;
}
