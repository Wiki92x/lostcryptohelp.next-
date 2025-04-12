'use client';

import { motion } from 'framer-motion';
import { RocketIcon, ScanLineIcon, MessageSquareIcon } from 'lucide-react';
import Link from 'next/link';

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <RocketIcon className="h-6 w-6 text-purple-400" />,
      title: '1. Enter Wallet Address',
      desc: 'Type or paste any public wallet address (ETH, BSC, TRON) and select the chain.',
    },
    {
      icon: <ScanLineIcon className="h-6 w-6 text-purple-400" />,
      title: '2. Scan for Risk & Tokens',
      desc: 'We analyze recent token activity, contracts, and scan for flagged behavior using GoPlusLabs & block explorers.',
    },
    {
      icon: <MessageSquareIcon className="h-6 w-6 text-purple-400" />,
      title: '3. Get Report & Alert',
      desc: 'You get a downloadable PDF report and real-time Telegram alert instantly. No data is stored on our side.',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-purple-400 mb-8 text-center">
          How LostCryptoHelp Works
        </h1>

        <div className="space-y-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-zinc-900 p-6 rounded-xl shadow-md">
              <div className="flex items-center gap-4 mb-2">
                {step.icon}
                <h2 className="text-xl font-semibold text-purple-200">{step.title}</h2>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/deep-scan"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow"
          >
            Start a Deep Scan
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
