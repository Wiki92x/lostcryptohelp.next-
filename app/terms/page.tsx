// ✅ app/terms/page.tsx (Exact With Build)
'use client';

import { motion } from 'framer-motion';
import Head from 'next/head';

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms | LostCryptoHelp</title>
        <meta
          name="description"
          content="Terms and conditions for using LostCryptoHelp crypto wallet scanning services."
        />
      </Head>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen py-20 px-6 bg-[var(--background)] text-[var(--foreground)]"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-purple-400">Terms & Conditions</h1>

          <p>
            By accessing and using LostCryptoHelp, you agree to our terms outlined below. We
 do not store wallet addresses or private data.
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>No KYC or account signup is required.</li>
            <li>Wallet scans are based on public blockchain data.</li>
            <li>Paid scans are non-refundable once started.</li>
            <li>PDF reports are for informational use only.</li>
            <li>LostCryptoHelp is not liable for trading decisions based on scans.</li>
          </ul>

          <p>
            For any legal concerns or partnership inquiries, please contact our support team via Telegram.
          </p>
        </div>
      </motion.section>
    </>
  );
}
