'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    question: 'Is this platform safe to use?',
    answer: 'Yes, we never store your wallet data. Everything is analyzed client-side or via secure APIs.',
  },
  {
    question: 'How do I get my PDF report?',
    answer: 'After your scan, you can download the report instantly with a single click.',
  },
  {
    question: 'Do I need to connect my wallet?',
    answer: 'No wallet connection required. Just paste any public address and scan.',
  },
  {
    question: 'What chains are supported?',
    answer: 'Ethereum, Binance Smart Chain (BSC), and TRON are currently supported.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-20 px-4 bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-purple-500 text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData.map((item, i) => (
            <div key={i} className="border border-zinc-700 rounded-lg overflow-hidden">
              <button
                onClick={() => toggle(i)}
                className="w-full text-left px-5 py-4 bg-zinc-900 hover:bg-zinc-800 focus:outline-none flex justify-between items-center"
              >
                <span className="text-lg font-medium text-purple-300">{item.question}</span>
                <span className="text-xl text-purple-400">{openIndex === i ? '−' : '+'}</span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 py-3 text-sm text-gray-300 bg-zinc-800"
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
