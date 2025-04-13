'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <nav className="bg-[var(--background)] text-[var(--foreground)] px-4 py-4 border-b border-zinc-800 transition-colors">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-purple-500">LostCryptoHelp 🚀</Link>

        <div className="flex items-center space-x-6 text-sm">
          <Link href="/deep-scan">Deep Scan</Link>
          <Link href="/about">About</Link>
          <Link href="/how-it-works">How it Works</Link>
          <Link href="/report">Report</Link>

          <button
            onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
            className="text-purple-400 hover:text-purple-300"
            aria-label="Toggle Theme"
          >
            {currentTheme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
