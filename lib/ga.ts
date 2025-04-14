export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// 👇 Extend window interface to include gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const pageview = (url: string) => {
  if (typeof window.gtag !== 'function') return;
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};
