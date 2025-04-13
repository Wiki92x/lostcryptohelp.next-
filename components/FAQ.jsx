// ✅ components/FAQ.tsx
'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'Is LostCryptoHelp really free?',
    answer: 'TRON scans are 100% free. Ethereum and BSC scans require a small crypto-native fee per scan to support infrastructure.',
  },
  {
    question: 'How does payment verification work?',
    answer: 'After sending the required fee, the system verifies your transaction hash on-chain. Once confirmed, you can unlock full reports instantly.',
  },
  {
    question: 'Which blockchains are supported?',
    answer: 'We currently support Ethereum (ETH), Binance Smart Chain (BSC), and TRON networks. More chains coming soon.',
  },
  {
    question: 'Will I receive updates after submitting a report?',
    answer: 'Yes. Telegram alerts are sent in real time. You can also manually re-check wallets using our scanner for updated results.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-20 px-6 bg-[#0b0e14] text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-purple-500 mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full text-left flex justify-between items-center p-5 font-medium text-lg text-purple-400 hover:bg-zinc-800 transition"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transform transition-transform ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5 text-gray-300 text-sm leading-relaxed"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
