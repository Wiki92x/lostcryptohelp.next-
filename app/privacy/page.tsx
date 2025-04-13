// app/privacy/page.tsx (✅ Server-safe)

import { motion } from 'framer-motion';

export const metadata = {
  title: 'Privacy Policy | LostCryptoHelp',
  description: 'Read how LostCryptoHelp protects your data, privacy, and wallet anonymity.',
};

export default function PrivacyPage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen py-20 px-6 bg-[var(--background)] text-[var(--foreground)]"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-400 mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          LostCryptoHelp respects your privacy:
        </p>
        <ul className="list-disc pl-6 mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>No tracking, cookies, or analytics.</li>
          <li>We do not store wallet addresses or scan results.</li>
          <li>PDF reports are never uploaded to our servers.</li>
          <li>Telegram alerts are opt-in and encrypted.</li>
        </ul>
        <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </motion.section>
  );
}
