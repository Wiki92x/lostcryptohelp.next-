// ✅ pages/pricing.tsx
'use client';

import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PricingPage() {
  const plans = [
    {
      name: 'Ethereum Scan',
      price: '$1.50',
      features: ['ERC-20 Token Analysis', 'GoPlus Risk Flags', 'PDF + Telegram Report'],
    },
    {
      name: 'BSC Scan',
      price: '$0.50',
      features: ['BEP-20 Token Scan', 'Smart Contract Health', 'PDF + Telegram Report'],
    },
    {
      name: 'TRON Scan',
      price: 'Free',
      features: ['TRC-20 Token Insights', 'Basic Risk Review', 'PDF + Telegram Report'],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-20 px-6 bg-black text-white"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-purple-400 mb-4">Our Pricing Plans</h1>
        <p className="text-gray-300 mb-12">
          Choose your scan type. Pay only for the network you want to analyze. TRON is 100% free.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-zinc-900 p-6 rounded-xl shadow-lg border border-zinc-700"
          >
            <h2 className="text-2xl font-bold text-purple-300 mb-2">{plan.name}</h2>
            <p className="text-3xl font-semibold text-green-400 mb-4">{plan.price}</p>
            <ul className="text-sm text-gray-300 space-y-2 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link href="/deep-scan">
              <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded font-medium">
                Start Scan
              </button>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/"
          className="inline-block mt-6 text-sm text-purple-400 hover:underline"
        >
          ← Back to homepage
        </Link>
      </div>
    </motion.div>
  );
}
