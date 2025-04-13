'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LegalHub() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-20 px-6 bg-[var(--background)] text-[var(--foreground)]"
    >
      <div className="max-w-4xl mx-auto space-y-8 text-center">
        <h1 className="text-4xl font-bold text-purple-500">Legal Center</h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
          Stay informed about your rights, data, and responsibilities while using LostCryptoHelp.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          <Link
            href="/terms"
            className="block p-6 rounded-xl bg-zinc-100 dark:bg-zinc-900 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-purple-500 mb-2">📜 Terms of Service</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Understand what’s allowed and what’s not when using our service.
            </p>
          </Link>

          <Link
            href="/privacy"
            className="block p-6 rounded-xl bg-zinc-100 dark:bg-zinc-900 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-purple-500 mb-2">🔒 Privacy Policy</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              See how we protect your wallet data and privacy. No tracking. No cookies.
            </p>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
