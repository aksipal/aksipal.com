"use client";

import ReactDOM from "react-dom";
import Script from "next/script";

import { useConsent } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const fromEnvAds = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const GOOGLE_ADS_ID = fromEnvAds === "" ? null : (fromEnvAds ?? "AW-400400735");

export function GoogleAnalytics() {
  const { analyticsAllowed } = useConsent();

  const hasGa = Boolean(GA_ID);
  const hasAds = Boolean(GOOGLE_ADS_ID);
  const gtagLoaderId = GA_ID || GOOGLE_ADS_ID;

  if (!analyticsAllowed || !gtagLoaderId) return null;

  ReactDOM.preconnect("https://www.googletagmanager.com", { crossOrigin: "anonymous" });
  if (hasGa) {
    ReactDOM.preconnect("https://www.google-analytics.com", { crossOrigin: "anonymous" });
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gtagLoaderId}`}
        strategy="afterInteractive"
      />
      <Script id="google-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${hasGa
            ? `gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
          });`
            : ""}
          ${hasAds ? `gtag('config', '${GOOGLE_ADS_ID}');` : ""}
        `}
      </Script>
    </>
  );
}
