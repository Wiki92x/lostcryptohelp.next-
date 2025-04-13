'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const toggleTheme = () => setTheme(currentTheme === 'dark' ? 'light' : 'dark');

  if (!mounted) return null;

  return (
    <nav className="w-full px-4 py-4 bg-white dark:bg-black text-black dark:text-white border-b border-gray-300 dark:border-gray-800 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-purple-600 dark:text-purple-400 hover:opacity-80 transition">
          LostCryptoHelp 🚀
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/deep-scan" className="hover:text-purple-500 dark:hover:text-purple-400 transition">Deep Scan</Link>
          <Link href="/about" className="hover:text-purple-500 dark:hover:text-purple-400 transition">About</Link>
          <Link href="/how-it-works" className="hover:text-purple-500 dark:hover:text-purple-400 transition">How it Works</Link>
          <Link href="/report" className="hover:text-purple-500 dark:hover:text-purple-400 transition">Report</Link>
          <button
            onClick={toggleTheme}
            className="text-purple-500 dark:text-purple-300 hover:opacity-80 transition"
            aria-label="Toggle Theme"
          >
            {currentTheme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Mobile Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav Links */}
      {menuOpen && (
        <div className="md:hidden mt-2 px-4 pb-4 space-y-2 text-sm">
          <Link href="/deep-scan" className="block hover:text-purple-400">Deep Scan</Link>
          <Link href="/about" className="block hover:text-purple-400">About</Link>
          <Link href="/how-it-works" className="block hover:text-purple-400">How it Works</Link>
          <Link href="/report" className="block hover:text-purple-400">Report</Link>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mt-2"
          >
            {currentTheme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            {currentTheme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
      )}
    </nav>
  );
}
