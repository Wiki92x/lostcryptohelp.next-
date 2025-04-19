'use client';

import { ShieldCheck, Fingerprint, ThumbsUp, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-green-400" />,
    title: 'No KYC, No Login',
    desc: 'Connect wallet anonymously. Your scans stay 100% private.'
  },
  {
    icon: <Fingerprint className="w-6 h-6 text-blue-400" />,
    title: 'Zero Tracking',
    desc: 'No cookies. No email required. Built for true Web3 users.'
  },
  {
    icon: <Bot className="w-6 h-6 text-yellow-400" />,
    title: 'AI-Powered Analysis',
    desc: 'Our engine uses AI to identify malicious patterns and high-risk tokens.'
  },
  {
    icon: <ThumbsUp className="w-6 h-6 text-purple-400" />,
    title: 'Trusted by Real Users',
    desc: 'Backed by transparent DAO logic and verified Telegram alerts.'
  }
];

export default function TrustBenefitsBlock() {
  return (
    <section className="py-20 px-6 transition-colors duration-500 bg-[var(--background)] text-[var(--foreground)] border-t border-zinc-800">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-6">
          Why People Trust LostCryptoHelp
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto mb-12">
          Our zero-KYC model, AI insights, and Telegram-only alerts make us the most trusted tool for Web3 wallet security.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-zinc-900/80 border border-zinc-700 rounded-2xl p-6 text-left shadow hover:shadow-lg transition"
            >
              <div className="mb-3">{feat.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-1">{feat.title}</h3>
              <p className="text-sm text-zinc-400">{feat.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}