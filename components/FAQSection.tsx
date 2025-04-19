'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const faqs = [
  {
    q: 'Is my wallet safe while scanning?',
    a: 'Yes. We only read public blockchain data. No approvals or private keys involved.',
  },
  {
    q: 'Why is TRON free but ETH/BSC are not?',
    a: 'ETH/BSC scans require gas and third-party APIs. TRON is free to fetch.',
  },
  {
    q: 'How do I get my scan report?',
    a: 'You’ll see results instantly. You can also download a PDF or send to Telegram.',
  },
  {
    q: 'Do you store or log scan data?',
    a: 'No. We don’t store or share any wallet or scan data. Everything is ephemeral.',
  },
];

export default function FAQSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <section
      className={`px-4 py-20 transition-colors duration-500 ${
        theme === 'light'
          ? 'bg-white text-black'
          : theme === 'dim'
          ? 'bg-[#10151f] text-white'
          : 'bg-[#0b0f1a] text-white'
      }`}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-8">FAQs</h2>

        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div
              key={i}
              className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                theme === 'light'
                  ? 'border-zinc-300 bg-zinc-100'
                  : theme === 'dim'
                  ? 'border-zinc-700 bg-zinc-800'
                  : 'border-zinc-800 bg-zinc-900'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left p-4 font-semibold flex justify-between items-center"
              >
                <span>{item.q}</span>
                <span className="text-xl">{openIndex === i ? '−' : '+'}</span>
              </button>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: openIndex === i ? 'auto' : 0 }}
                className={`overflow-hidden px-4 pb-4 text-sm transition-all duration-300`}
              >
                {openIndex === i && (
                  <p className="text-zinc-300 leading-relaxed mt-2">{item.a}</p>
                )}
              </motion.div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <a
            href="/deep-scan"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition shadow"
          >
            Start Deep Scan Now
          </a>
        </div>
      </div>
    </section>
  );
}