import type { ConsentState } from "@/lib/consent";

const GRANT_ALL = {
  ad_storage: "granted" as const,
  ad_user_data: "granted" as const,
  ad_personalization: "granted" as const,
  analytics_storage: "granted" as const,
};

const DENY_ALL = {
  ad_storage: "denied" as const,
  ad_user_data: "denied" as const,
  ad_personalization: "denied" as const,
  analytics_storage: "denied" as const,
};

export function gtagApplyConsentState(state: ConsentState) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  const params = state.analytics ? GRANT_ALL : DENY_ALL;
  window.gtag("consent", "update", params);
}
