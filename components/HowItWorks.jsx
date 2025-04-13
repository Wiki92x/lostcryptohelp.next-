'use client';

import { motion } from 'framer-motion';
import { Wallet, ShieldCheck, FileText } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <Wallet className="w-6 h-6 text-purple-400" />,
      title: '1. Enter Wallet Address',
      description: 'Paste a public ETH, BSC, or TRON address. Select chain and scan.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-purple-400" />,
      title: '2. Deep Analysis',
      description: 'We scan for scams, exploits, token risks and dangerous contracts.',
    },
    {
      icon: <FileText className="w-6 h-6 text-purple-400" />,
      title: '3. Get PDF + Telegram Alert',
      description: 'Download full report + get alert in Telegram. Nothing stored.',
    },
  ];

  return (
    <section className="py-20 px-6 bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-purple-500 mb-10">
          How LostCryptoHelp Works
        </h2>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-zinc-100 dark:bg-zinc-900 text-left p-6 rounded-xl shadow-md flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div>{step.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-purple-500">{step.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
