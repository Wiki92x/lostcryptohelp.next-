// ✅ app/legal/page.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LegalHubPage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen py-20 px-6 bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-purple-500 mb-6">Legal Information</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10 text-sm">
          Here’s how LostCryptoHelp keeps your data private and transparent.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          <Link
            href="/terms"
            className="p-6 rounded-xl border border-purple-500 hover:bg-purple-50 dark:hover:bg-zinc-900 transition"
          >
            <h2 className="text-xl font-semibold text-purple-500 mb-2">Terms of Service</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Understand the terms under which we offer crypto scan services.
            </p>
          </Link>

          <Link
            href="/privacy"
            className="p-6 rounded-xl border border-purple-500 hover:bg-purple-50 dark:hover:bg-zinc-900 transition"
          >
            <h2 className="text-xl font-semibold text-purple-500 mb-2">Privacy Policy</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Learn how your data is protected and how we never track you.
            </p>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
