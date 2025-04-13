'use client';

import { motion } from 'framer-motion';
import { Wallet, ShieldCheck, FileText } from 'lucide-react';
import Link from 'next/link';

export default function HowItWorks() {
  const steps = [
    {
      icon: <Wallet className="w-6 h-6 text-purple-400" />,
      title: '1. Enter Wallet Address',
      description: 'Paste a public Ethereum, BSC, or TRON address. Choose the chain you want to scan.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-purple-400" />,
      title: '2. Deep Analysis',
      description: 'We scan for scams, exploits, malicious approvals, token risks and suspicious contracts.',
    },
    {
      icon: <FileText className="w-6 h-6 text-purple-400" />,
      title: '3. Get PDF + Telegram Alert',
      description: 'Download a full risk report and receive instant Telegram alerts. No data stored.',
    },
  ];

  return (
    <section className="py-20 px-6 bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-purple-500 mb-12">
          How LostCryptoHelp Works
        </h2>

        <div className="space-y-6 mb-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-zinc-100 dark:bg-zinc-900 text-left p-6 rounded-xl shadow-md flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="pt-1">{step.icon}</div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-purple-500 mb-1">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            href="/deep-scan"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm sm:text-base py-3 px-6 rounded-full transition-colors duration-300"
          >
            Start Your First Scan →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
