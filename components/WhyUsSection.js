'use client';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Brain,
  BellRing,
  Wallet,
} from 'lucide-react';

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
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
          Why Choose <span className="text-purple-400">LostCryptoHelp?</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-12 text-lg">
          We combine blockchain analysis, AI risk detection, and real security logic to protect everyday users from crypto scams — without needing signups or KYC.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          <div className="bg-zinc-800 p-6 rounded-xl shadow">
            <ShieldCheck className="text-purple-400 h-6 w-6 mb-3" />
            <h3 className="font-semibold text-white mb-1">Deep Wallet Scans</h3>
            <p className="text-gray-400 text-sm">
              Instantly checks ETH, BSC, and TRON wallets for scam tokens, exploits, approvals & more.
            </p>
          </div>

          <div className="bg-zinc-800 p-6 rounded-xl shadow">
            <Brain className="text-purple-400 h-6 w-6 mb-3" />
            <h3 className="font-semibold text-white mb-1">AI + Human Reports</h3>
            <p className="text-gray-400 text-sm">
              Automated scan results with real-time flags. Upgrade for advanced forensic audit.
            </p>
          </div>

          <div className="bg-zinc-800 p-6 rounded-xl shadow">
            <BellRing className="text-purple-400 h-6 w-6 mb-3" />
            <h3 className="font-semibold text-white mb-1">Real-Time Alerts</h3>
            <p className="text-gray-400 text-sm">
              Telegram alerts for risky tokens or scam activity. Stay ahead of threats — no spam.
            </p>
          </div>

          <div className="bg-zinc-800 p-6 rounded-xl shadow">
            <Wallet className="text-purple-400 h-6 w-6 mb-3" />
            <h3 className="font-semibold text-white mb-1">Crypto-Only Access</h3>
            <p className="text-gray-400 text-sm">
              No credit cards. Pay with BNB, ETH or TRON. Decentralized logic, no KYC required.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}