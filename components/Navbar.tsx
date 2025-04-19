'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Menu, X, Lock, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/deep-scan', label: 'Deep Scan' },
    { href: '/report', label: 'Submit Report' },
    { href: '/scan-history', label: 'Scan History' },
    { href: '/dao', label: 'DAO' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/connect', label: 'Access Pro', icon: <Lock className="w-4 h-4 text-yellow-400" /> }
  ];

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur-md shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <span className="text-xl font-bold text-blue-500">LostCryptoHelp</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-1 text-sm font-medium transition ${
                pathname === href
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'text-foreground hover:text-blue-500'
              }`}
            >
              {icon && icon}
              {label}
            </Link>
          ))}

          {/* Telegram Ping */}
          <Link
            href="https://t.me/yourChannel" // replace with your real link
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 flex items-center gap-1 text-sm text-green-500 hover:underline"
          >
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Telegram
          </Link>

          {/* Theme Toggle */}
          <button
            aria-label="Toggle Theme"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="ml-2 p-2 rounded-full bg-zinc-800 hover:scale-105 transition"
          >
            {theme === 'light' ? <Moon className="w-4 h-4 text-white" /> : <Sun className="w-4 h-4 text-yellow-400" />}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          aria-label="Toggle Menu"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-zinc-500"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-zinc-800">
          <div className="flex flex-col px-4 py-4 space-y-4">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`${
                  pathname === href ? 'text-blue-600 font-medium' : 'text-zinc-400'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}

            <div className="flex items-center justify-between pt-2">
              <Link
                href="https://t.me/yourChannel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-green-500 hover:underline"
              >
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Telegram
              </Link>

              <button
                aria-label="Toggle Theme"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="p-2 rounded-full bg-zinc-800"
              >
                {theme === 'light' ? <Moon className="w-4 h-4 text-white" /> : <Sun className="w-4 h-4 text-yellow-400" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}