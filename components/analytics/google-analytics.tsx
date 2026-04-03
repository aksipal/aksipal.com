"use client";

import ReactDOM from "react-dom";
import Script from "next/script";

import { useConsent } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function GoogleAnalytics() {
  const { analyticsAllowed } = useConsent();

  if (!GA_ID || !analyticsAllowed) return null;

  ReactDOM.preconnect("https://www.googletagmanager.com", { crossOrigin: "anonymous" });
  ReactDOM.preconnect("https://www.google-analytics.com", { crossOrigin: "anonymous" });

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
          });
        `}
      </Script>
    </>
  );
}
