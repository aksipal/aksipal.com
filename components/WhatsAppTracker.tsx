"use client";

import { useEffect } from "react";

export default function WhatsAppTracker() {
  useEffect(() => {
    const handleClick = (e: Event) => {
      if (!(e.target instanceof Element)) {
        return;
      }
      const link = e.target.closest<HTMLAnchorElement>("a[href*='wa.me']");

      if (link && typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "conversion", {
          send_to: "AW-400400735/caZnCNuF0aAcEN_C9r4B",
          value: 500.0,
          currency: "TRY",
        });
      }
    };

    const options: AddEventListenerOptions = { passive: true };
    document.addEventListener("click", handleClick, options);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
