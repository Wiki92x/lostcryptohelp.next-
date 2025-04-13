// ✅ components/HeroSection.tsx (Enhanced Final Version)

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Wallet, ScanEye } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="bg-[var(--background)] text-[var(--foreground)] py-28 px-6 text-center relative overflow-hidden">
      {/* 🌟 Soft spotlight glow */}
      <div className="absolute top-[-10%] left-[50%] transform -translate-x-1/2 w-[600px] h-[600px] bg-purple-500 opacity-20 blur-3xl rounded-full pointer-events-none z-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-purple-400 leading-tight mb-6">
          Protect Your Crypto Wallet from<br />
          <span className="text-white">Scams & Risks</span>
        </h1>

        <p className="text-gray-400 text-base sm:text-lg mb-10">
          Scan any wallet for scam tokens, malicious approvals, phishing contracts & more.<br />
          Supports Ethereum, BSC & TRON. No signups. No KYC.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href="/deep-scan"
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg shadow-md flex items-center gap-2 transition"
          >
            <ScanEye className="w-5 h-5" />
            Start Deep Scan
          </Link>

          <Link
            href="#how-it-works"
            className="text-sm text-purple-300 underline hover:text-purple-100"
          >
            See how it works
          </Link>
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            href="/"
            className="bg-zinc-900 border border-zinc-700 text-purple-300 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:border-purple-500"
          >
            <Wallet className="w-4 h-4" />
            Connect Wallet
            <span className="text-gray-500 text-xs ml-2">(Non-custodial, no login)</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
