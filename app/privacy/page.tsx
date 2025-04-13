'use client';

import Head from 'next/head';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | LostCryptoHelp</title>
        <meta
          name="description"
          content="Learn how LostCryptoHelp protects your privacy, secures your data, and keeps your wallet scans anonymous."
        />
      </Head>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen py-20 px-6 bg-[var(--background)] text-[var(--foreground)]"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-purple-500 mb-6">Privacy Policy</h1>

          <p className="mb-6 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            Your privacy is important to us. This policy explains how we handle information when you use LostCryptoHelp.
          </p>

          <ul className="list-disc pl-6 space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <li><strong>No Personal Data Collected:</strong> We do not ask for names, emails, phone numbers, or KYC information. Scans are initiated anonymously via your wallet address only.</li>

            <li><strong>No Wallet Keys Ever Stored:</strong> We do not access, collect, or store your private keys, seed phrases, or login credentials.</li>

            <li><strongBlockchain Visibility Only:</strong> Wallet scans use publicly available blockchain data from services such as GoPlus Security APIs or native chain explorers.</li>

            <li><strong>Self-Hosted Logic:</strong> Most of our scanning logic runs either on-chain or is self-hosted. No wallet history or tokens are saved after processing.</li>

            <li><strong>Report Handling:</strong> PDF scan reports are generated client-side in your browser. We do not store or retain the contents of any report. Telegram alerts are encrypted and only sent with your explicit opt-in.</li>

            <li><strong>Payment Information:</strong> We do not store or process fiat payment data. All purchases are done via wallet interactions on supported chains (ETH, BSC, TRON).</li>

            <li><strong>Cookies & Analytics:</strong> We do not use tracking cookies, fingerprinting, or third-party analytics. We believe in zero-surveillance security tooling.</li>

            <li><strong>Third-Party APIs:</strong> Some features rely on third-party security providers like GoPlus. We do not control how they handle data and recommend reviewing their respective policies.</li>

            <li><strong>Data Requests:</strong> As we do not collect personal data, we do not store anything that can be erased or exported under GDPR or CCPA. You may reach out if you believe data was shared by mistake.</li>
          </ul>

          <p className="mt-8 text-xs text-gray-500 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </motion.section>
    </>
  );
}
