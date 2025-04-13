// ✅ app/terms/page.tsx
'use client';

import { motion } from 'framer-motion';

export const metadata = {
  title: 'Terms of Service | LostCryptoHelp',
  description: 'Read the terms of using LostCryptoHelp — security scans, user data, and limitations.',
};

export default function TermsPage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen py-20 px-6 bg-[var(--background)] text-[var(--foreground)]"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-400 mb-6">Terms of Service</h1>

        <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          By using LostCryptoHelp, you agree to the following terms:
        </p>

        <ul className="list-disc pl-6 space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <li>LostCryptoHelp does not store your wallet data or private keys.</li>
          <li>All scans are for informational purposes only and do not constitute financial advice.</li>
          <li>Users are responsible for verifying scan results before making transactions.</li>
          <li>LostCryptoHelp reserves the right to change pricing or features at any time.</li>
          <li>We do not collect personal data unless voluntarily provided in reports.</li>
          <li>TRON scans are free. BSC and ETH scans are pay-per-use and non-refundable.</li>
          <li>PDF reports are generated client-side and never stored on our servers.</li>
        </ul>

        <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </motion.section>
  );
}
