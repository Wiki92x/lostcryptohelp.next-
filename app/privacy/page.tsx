// ✅ app/privacy/page.tsx
import { Metadata } from 'next';
import { motion } from 'framer-motion';

export const metadata: Metadata = {
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

        <ul className="list-disc pl-6 space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <li>No wallet data is stored.</li>
          <li>No trackers, analytics, or third-party scripts.</li>
          <li>All scans are processed on-device or via public APIs.</li>
          <li>Telegram alerts are encrypted and opt-in only.</li>
          <li>PDF reports are generated client-side and deleted after download.</li>
        </ul>

        <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </motion.section>
  );
}
