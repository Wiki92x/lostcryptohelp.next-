// ✅ app/report/page.tsx
'use client';

import ReportForm from '@/components/ReportForm';
import { motion } from 'framer-motion';
import Head from 'next/head';

export default function ReportPage() {
  return (
    <>
      <Head>
        <title>Report Suspicious Token | LostCryptoHelp</title>
        <meta
          name="description"
          content="Submit a scam report or suspicious contract. LostCryptoHelp investigates and alerts the community."
        />
      </Head>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen py-20 px-6 bg-[var(--background)] text-[var(--foreground)]"
      >
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-bold text-purple-400">Report Suspicious Activity</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Submit scam tokens, phishing contracts, or rugpull attempts. Help protect others.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <ReportForm />
        </div>
      </motion.section>
    </>
  );
}
