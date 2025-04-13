'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye } from 'lucide-react';

export default function WhyUsSection() {
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-purple-400" />,
      title: 'No KYC, Fully Crypto-Native',
      desc: 'We don’t require any login, KYC, or email signup. Connect. Scan. Done.',
    },
    {
      icon: <Lock className="w-6 h-6 text-purple-400" />,
      title: 'Private & Secure',
      desc: 'Nothing is stored. Everything is self-hosted or on-chain. Telegram alerts are opt-in.',
    },
    {
      icon: <Eye className="w-6 h-6 text-purple-400" />,
      title: 'Transparent Risk Detection',
      desc: 'All scan logic is public. We use GoPlus & chain-native APIs for full clarity.',
    },
  ];

  return (
    <section className="py-20 px-6 bg-[var(--background)] text-[var(--foreground)] transition-colors">
      <div className="max-w-6xl mx-auto text-center space-y-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-purple-500"
        >
          Why People Trust LostCryptoHelp
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-xl text-left shadow-md transition-colors"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">{f.icon}<h3 className="text-lg font-semibold">{f.title}</h3></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
