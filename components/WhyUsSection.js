'use client';
import { motion } from 'framer-motion';
import { ShieldCheck, Brain, BellRing, Wallet } from 'lucide-react';

export default function WhyUsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-zinc-900 text-white py-20 px-6"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          Why Choose <span className="text-purple-400">LostCryptoHelp?</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-base sm:text-lg">
          We combine AI detection, blockchain analytics, and real-time alerts to protect you from scams — no KYC, no email, just pure Web3 tools.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-zinc-800 p-6 rounded-xl shadow transition-all"
            >
              <item.icon className="text-purple-400 h-6 w-6 mb-3" />
              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

const features = [
  {
    icon: ShieldCheck,
    title: 'Deep Wallet Scans',
    desc: 'Scan ETH, BSC, and TRON for scam tokens, fake approvals, and risk flags instantly.',
  },
  {
    icon: Brain,
    title: 'AI + Human Analysis',
    desc: 'Get real-time smart flagging with optional upgraded manual audits.',
  },
  {
    icon: BellRing,
    title: 'Real-Time Telegram Alerts',
    desc: 'No email needed. Risky activity triggers instant, private Telegram alerts.',
  },
  {
    icon: Wallet,
    title: 'Crypto-Only Access',
    desc: 'No credit cards. No KYC. Just pay via your wallet and use directly on-chain.',
  },
];
