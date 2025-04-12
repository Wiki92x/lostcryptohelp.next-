'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure that the component only renders on the client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;  // This prevents the server from rendering which avoids hydration issues.

  // Determine the current theme based on the user's system preference
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const toggleTheme = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-xl px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300 ease-in-out"
      aria-label="Toggle Theme"
      title="Toggle Theme"
    >
      {currentTheme === 'dark' ? '🌞' : '🌙'}
    </button>
  );
}