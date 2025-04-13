'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import ConnectWalletButton from './ConnectWalletButton'; // ✅

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <nav className="bg-[var(--background)] text-[var(--foreground)] px-4 py-4 border-b border-zinc-800 transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex justify-between items-center w-full md:w-auto">
          <Link href="/" className="text-xl font-bold text-purple-500">
            LostCryptoHelp 🚀
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/deep-scan" className="hover:text-purple-400">Deep Scan</Link>
          <Link href="/about" className="hover:text-purple-400">About</Link>
          <Link href="/how-it-works" className="hover:text-purple-400">How it Works</Link>
          <Link href="/report" className="hover:text-purple-400">Report</Link>

          {/* 🌗 Theme toggle */}
          <button
            onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
            className="text-purple-400 hover:text-purple-300"
            aria-label="Toggle Theme"
          >
            {currentTheme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>

          {/* 👛 Wallet Connect Button */}
          <div className="ml-2">
            <ConnectWalletButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
