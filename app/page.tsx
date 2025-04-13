'use client';

import HeroSection from '@/components/HeroSection';
import WhyUsSection from '@/components/WhyUsSection';
import HowItWorks from '@/components/HowItWorks';
import FAQ from '@/components/FAQ';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <HeroSection />
      <WhyUsSection />
      <HowItWorks />

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 px-6 bg-zinc-950 text-white text-center dark:bg-zinc-950 bg-white"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-purple-400">
            Ready to scan your wallet?
          </h2>
          <p className="text-gray-400 text-lg">
            No login. No KYC. Just pure on-chain wallet risk detection.
          </p>
          <Link href="/deep-scan">
            <button className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-xl text-white font-semibold shadow">
              🚀 Start Deep Scan
            </button>
          </Link>
        </div>
      </motion.section>

      <FAQ />
    </main>
  );
}
