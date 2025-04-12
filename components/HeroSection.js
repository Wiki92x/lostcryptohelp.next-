'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black text-white py-20 px-4 text-center min-h-screen flex flex-col justify-center items-center"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-400 leading-tight">
          Protect Your Crypto Wallet from Scams & Risks
        </h1>
        <p className="text-gray-300 text-base sm:text-lg">
          LostCryptoHelp scans wallets for scam tokens, fake approvals, and contract risks.
          Works across Ethereum, BSC & TRON.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-4">
          <Link href="/deep-scan">
            <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg text-white font-semibold shadow">
              Start Deep Scan <ArrowRightIcon className="inline h-5 w-5 ml-1" />
            </button>
          </Link>
          <Link href="/how-it-works" className="text-purple-300 underline hover:text-purple-400 text-sm">
            How it works
          </Link>
        </div>
      </div>
    </motion.section>
  );
}