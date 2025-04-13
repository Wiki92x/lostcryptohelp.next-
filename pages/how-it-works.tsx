'use client';

import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { RocketIcon, ScanLineIcon, MessageSquareIcon } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <RocketIcon className="h-6 w-6 text-purple-400" />,
      title: '1. Enter Wallet Address',
      desc: 'Paste a public wallet (ETH, BSC, TRON) and select your chain. No login needed.',
    },
    {
      icon: <ScanLineIcon className="h-6 w-6 text-purple-400" />,
      title: '2. Scan for Risks',
      desc: 'We fetch token activity, risky approvals, and smart contract data from trusted APIs.',
    },
    {
      icon: <MessageSquareIcon className="h-6 w-6 text-purple-400" />,
      title: '3. Get Instant Report',
      desc: 'Receive a real-time Telegram alert + downloadable PDF audit — no data stored.',
    },
  ];

  return (
    <>
      <Head>
        <title>How It Works | LostCryptoHelp</title>
        <meta
          name="description"
          content="See how LostCryptoHelp scans your wallet for crypto threats and generates real-time safety reports."
        />
      </Head>

      <div className="min-h-screen bg-black text-white py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-purple-400 mb-10 text-center">
            How LostCryptoHelp Works 🚀
          </h1>

          <div className="space-y-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="bg-zinc-900 p-6 rounded-xl shadow border border-zinc-800 transition"
              >
                <div className="flex items-center gap-4 mb-2">
                  {step.icon}
                  <h2 className="text-xl font-semibold text-purple-200">{step.title}</h2>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/deep-scan"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow transition"
            >
              🔍 Start Deep Scan
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
