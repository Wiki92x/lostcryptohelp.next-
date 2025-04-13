// ✅ app/privacy/page.tsx — Server Component (no metadata issues)

import { motion } from 'framer-motion';

export const metadata = {
  title: 'Privacy Policy | LostCryptoHelp',
  description: 'Read how LostCryptoHelp protects your data and wallet anonymity.',
};

export default function PrivacyPage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen py-20 px-6 bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-500 mb-6">Privacy Policy</h1>

        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          We take your privacy seriously:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>We never store your wallet data or scan history.</li>
          <li>No cookies, tracking, or 3rd-party analytics.</li>
          <li>Telegram alerts are end-to-end encrypted.</li>
          <li>PDF reports are never uploaded or logged.</li>
          <li>All interactions are wallet-only and self-sovereign.</li>
        </ul>

        <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </motion.section>
  );
}
