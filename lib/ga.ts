// lib/ga.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXX';

export const pageview = (url: string) => {
  if (typeof window.gtag !== 'function') return;
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};
