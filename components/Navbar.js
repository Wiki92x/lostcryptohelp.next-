"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import ConnectWalletButton from "./ConnectWalletButton";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <nav className="bg-[var(--background)] text-[var(--foreground)] px-4 py-4 border-b border-zinc-800 transition-colors duration-300 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-purple-500 hover:text-purple-400 transition"
        >
          LostCryptoHelp 🚀
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4 text-sm">
          <Link href="/deep-scan" className="hover:text-purple-400 transition">
            Deep Scan
          </Link>
          <Link href="/about" className="hover:text-purple-400 transition">
            About
          </Link>
          <Link href="/how-it-works" className="hover:text-purple-400 transition">
            How it Works
          </Link>
          <Link href="/report" className="hover:text-purple-400 transition">
            Report
          </Link>
          <button
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            className="text-purple-400 hover:text-purple-300 transition"
            aria-label="Toggle Theme"
          >
            {currentTheme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <ConnectWalletButton />
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-purple-400 hover:text-purple-300"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Mobile Menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 text-sm text-center border-t border-zinc-700 pt-4">
          <Link href="/deep-scan" className="block hover:text-purple-400" onClick={() => setMenuOpen(false)}>
            Deep Scan
          </Link>
          <Link href="/about" className="block hover:text-purple-400" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link href="/how-it-works" className="block hover:text-purple-400" onClick={() => setMenuOpen(false)}>
            How it Works
          </Link>
          <Link href="/report" className="block hover:text-purple-400" onClick={() => setMenuOpen(false)}>
            Report
          </Link>
          <button
            onClick={() => {
              setTheme(currentTheme === "dark" ? "light" : "dark");
              setMenuOpen(false);
            }}
            className="text-purple-400 hover:text-purple-300"
          >
            Toggle Theme
          </button>
          <div className="flex justify-center">
            <ConnectWalletButton />
          </div>
        </div>
      )}
    </nav>
  );
}
