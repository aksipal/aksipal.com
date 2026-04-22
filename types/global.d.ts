/* eslint-disable @typescript-eslint/no-explicit-any */
// gtag, Google'ın tüm gtag(…) yüklerini (consent, config, event, js) kapsayacak şekilde
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}
export {};
/* eslint-enable @typescript-eslint/no-explicit-any */
