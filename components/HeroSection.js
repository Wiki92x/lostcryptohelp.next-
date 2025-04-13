'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import ConnectWalletButton from './ConnectWalletButton';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[var(--background)] text-[var(--foreground)] py-20 px-6 flex flex-col justify-center items-center text-center transition-colors duration-300"
    >
      <div className="max-w-3xl mx-auto space-y-5">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-600 dark:text-purple-400 leading-tight">
          Protect Your Crypto Wallet from <br /> Scams & Risks
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl">
          Scan any wallet for scam tokens, malicious approvals, phishing contracts & more. <br />
          Supports Ethereum, BSC & TRON. No signups. No KYC.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
          <Link href="/deep-scan">
            <button className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 text-white font-medium rounded-xl shadow flex items-center">
              Start Deep Scan <ArrowRightIcon className="ml-2 h-5 w-5" />
            </button>
          </Link>

          <Link
            href="/how-it-works"
            className="text-purple-600 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-400 text-sm underline"
          >
            See how it works
          </Link>
        </div>

        <div className="pt-4">
          <ConnectWalletButton />
        </div>
      </div>
    </motion.section>
  );
}
