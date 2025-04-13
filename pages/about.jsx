'use client';

import { ShieldCheck, Eye, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <main className="bg-[var(--bg)] text-[var(--text)] min-h-screen py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-12"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-purple-500 dark:text-purple-400 text-center">
          <ShieldCheck className="inline-block mr-2 h-6 w-6" />
          About LostCryptoHelp
        </h1>

        <section>
          <h2 className="text-xl font-semibold text-purple-500 dark:text-purple-400 mb-2 flex items-center gap-2">
            <Eye className="w-4 h-4" />
            What We Do
          </h2>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 pl-4 list-disc">
            <li>Scan wallets for risky approvals or malicious token access</li>
            <li>Analyze token risks using GoPlus Security & chain APIs</li>
            <li>Trigger real-time Telegram alerts — no emails, no spam</li>
            <li>Auto-check presale and smart contract safety</li>
            <li>Download smart risk audit in PDF format</li>
            <li>TRON scans are free. ETH & BSC use pay-as-you-scan</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-purple-500 dark:text-purple-400 mb-2 flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Why People Trust Us
          </h2>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 pl-4 list-disc">
            <li>No PayPal, no Stripe, no KYC. Fully crypto-native</li>
            <li>Wallet-based access only — you control your data</li>
            <li>No storage of transactions or personal info</li>
            <li>Scan logic is on-chain or self-hosted</li>
            <li>Opt-in only — Telegram alerts are encrypted</li>
          </ul>
        </section>
      </motion.div>
    </main>
  );
}
