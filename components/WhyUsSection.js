// ✅ components/WhyUsSection.tsx — Trust & Value Block
'use client';

import { motion } from 'framer-motion';

const reasons = [
  'No KYC, no login — 100% Web3-native.',
  'Never ask for seed phrase or private key.',
  'Client-side scanning & PDF generation.',
  'Fully encrypted Telegram alerts.',
  'No cookies, tracking, or analytics.',
  'Crypto-only: BNB, ETH, TRON supported.'
];

export default function WhyUsSection() {
  return (
    <section className="relative py-24 px-6 bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground overflow-hidden">
      {/* 🔵 Glow FX */}
      <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-blue-500 opacity-10 blur-3xl rounded-full z-0" />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center space-y-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
          🔐 Why People Trust LostCryptoHelp
        </h2>

        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          We believe crypto security should be private, transparent, and decentralized.
          Our system is built from the ground up to respect your data and stay on-chain.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left mt-10">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-start gap-3 p-4 rounded-lg bg-zinc-900/60 dark:bg-zinc-800/70 border border-zinc-700 backdrop-blur"
            >
              <span className="text-green-400 text-lg">✅</span>
              <p className="text-sm text-muted-foreground">{reason}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}