'use client';

import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const tgTheme = (window as any)?.Telegram?.WebApp?.themeParams?.bg_color;

    if (tgTheme) {
      // Telegram in-app browser detected
      const isDark = tgTheme.toLowerCase() === '#1c1c1e' || tgTheme.includes('1c1c1e');
      const mode = isDark ? 'dark' : 'light';
      localStorage.setItem('lostcrypto-theme', mode); // optional
      document.documentElement.classList.add(mode);
      document.documentElement.classList.remove(isDark ? 'light' : 'dark');
    }

    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      storageKey="lostcrypto-theme"
    >
      {children}
    </ThemeProvider>
  );
}
