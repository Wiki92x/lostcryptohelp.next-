'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white text-black dark:bg-black dark:text-white py-24 px-6 min-h-screen flex flex-col justify-center items-center"
    >
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-600 dark:text-purple-400 leading-tight">
          Protect Your Crypto Wallet from Scams & Risks
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl max-w-xl mx-auto">
          Scan any wallet for scam tokens, malicious approvals, phishing contracts & more.
          Supports Ethereum, BSC & TRON. No signups. No KYC.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
          <Link href="/deep-scan">
            <button className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 text-white font-medium rounded-xl shadow flex items-center">
              Start Deep Scan <ArrowRightIcon className="ml-2 h-5 w-5" />
            </button>
          </Link>
          <Link
            href="/how-it-works"
            className="text-purple-500 hover:text-purple-600 dark:text-purple-300 dark:hover:text-purple-400 text-sm underline"
          >
            See how it works
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
