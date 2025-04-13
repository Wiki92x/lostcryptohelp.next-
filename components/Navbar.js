'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import ConnectWalletButton from './ConnectWalletButton';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <nav className="bg-[var(--background)] text-[var(--foreground)] px-4 py-4 border-b border-zinc-800 transition-colors duration-300 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        
        {/* Logo */}
        <div className="flex justify-between items-center w-full md:w-auto">
          <Link href="/" className="text-xl font-bold text-purple-500 hover:text-purple-400 transition">
            LostCryptoHelp 🚀
          </Link>
        </div>

        {/* Nav + Actions */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/deep-scan" className="hover:text-purple-400 transition">Deep Scan</Link>
          <Link href="/about" className="hover:text-purple-400 transition">About</Link>
          <Link href="/how-it-works" className="hover:text-purple-400 transition">How it Works</Link>
          <Link href="/report" className="hover:text-purple-400 transition">Report</Link>

          {/* Theme Switcher */}
          <button
            onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
            className="text-purple-400 hover:text-purple-300 transition"
            aria-label="Toggle Theme"
          >
            {currentTheme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>

          {/* Wallet Connect */}
          <div className="ml-1">
            <ConnectWalletButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
