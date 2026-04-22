"use client";

import { useLayoutEffect } from "react";

import { gtagApplyConsentState } from "@/lib/gtag-consent";
import { useConsent } from "@/lib/consent";

export function GtagConsentSync() {
  const { decided, state } = useConsent();

  useLayoutEffect(() => {
    if (!decided || !state) {
      return;
    }
    gtagApplyConsentState(state);
  }, [decided, state, state?.analytics]);

  return null;
}
