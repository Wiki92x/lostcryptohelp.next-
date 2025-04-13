'use client';

import { motion } from 'framer-motion';
import { Rocket, Search, FileText } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <Search className="w-6 h-6 text-purple-400" />,
      title: '1. Enter Wallet Address',
      desc: 'Paste a public ETH, BSC, or TRON address. Select chain and scan.',
    },
    {
      icon: <Rocket className="w-6 h-6 text-purple-400" />,
      title: '2. Deep Analysis',
      desc: 'We scan for scams, exploits, token risks and dangerous contracts.',
    },
    {
      icon: <FileText className="w-6 h-6 text-purple-400" />,
      title: '3. Get PDF + Telegram Alert',
      desc: 'Download full report + get alert in Telegram. Nothing stored.',
    },
  ];

  return (
    <section className="py-20 px-6 bg-[var(--background)] text-[var(--foreground)] transition-colors">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-purple-500"
        >
          How LostCryptoHelp Works
        </motion.h2>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 bg-zinc-100 dark:bg-zinc-900 p-6 rounded-xl text-left shadow-md"
            >
              <div>{step.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-purple-500 mb-1">{step.title}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-400">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
