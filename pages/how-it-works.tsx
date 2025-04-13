'use client';

import { motion } from 'framer-motion';
import {
  RocketIcon,
  ScanLineIcon,
  MessageSquareIcon,
} from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    icon: <RocketIcon className="w-5 h-5 text-purple-500 dark:text-purple-400" />,
    title: '1. Enter Wallet Address',
    desc: 'Paste a public ETH, BSC, or TRON address. Select chain and scan.',
  },
  {
    icon: <ScanLineIcon className="w-5 h-5 text-purple-500 dark:text-purple-400" />,
    title: '2. Deep Analysis',
    desc: 'We scan for scams, exploits, token risks and dangerous contracts.',
  },
  {
    icon: <MessageSquareIcon className="w-5 h-5 text-purple-500 dark:text-purple-400" />,
    title: '3. Get PDF + Telegram Alert',
    desc: 'Download full report + get alert in Telegram. Nothing stored.',
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-center text-3xl sm:text-4xl font-extrabold text-purple-500 dark:text-purple-400 mb-10">
          How LostCryptoHelp Works
        </h1>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-zinc-900 dark:bg-zinc-800 rounded-xl p-6 shadow border border-zinc-700"
            >
              <div className="flex items-center gap-3 mb-2">
                {step.icon}
                <h2 className="font-semibold text-base sm:text-lg text-purple-300">
                  {step.title}
                </h2>
              </div>
              <p className="text-sm text-gray-400">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/deep-scan">
            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition">
              Start Deep Scan
            </button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
