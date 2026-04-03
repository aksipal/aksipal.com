import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "aksipal-cookie-consent";

export interface ConsentState {
  analytics: boolean;
}

function read(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    return null;
  }
}

function write(state: ConsentState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event("consent-change"));
}

let cache: ConsentState | null | undefined;

function subscribe(cb: () => void) {
  const handler = () => {
    cache = undefined;
    cb();
  };
  window.addEventListener("storage", handler);
  window.addEventListener("consent-change", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("consent-change", handler);
  };
}

function getSnapshot(): ConsentState | null {
  if (cache === undefined) cache = read();
  return cache;
}

function getServerSnapshot(): ConsentState | null {
  return null;
}

export function useConsent() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const accept = useCallback(() => write({ analytics: true }), []);
  const deny = useCallback(() => write({ analytics: false }), []);
  const update = useCallback((next: ConsentState) => write(next), []);

  return {
    state,
    accept,
    deny,
    update,
    analyticsAllowed: state?.analytics === true,
    decided: state !== null,
  };
}
