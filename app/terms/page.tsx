// app/terms/page.tsx
'use client';

import Head from 'next/head';
import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms of Service | LostCryptoHelp</title>
        <meta
          name="description"
          content="Please read these terms before using LostCryptoHelp's crypto wallet scanning tools and services."
        />
      </Head>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen py-20 px-6 bg-[var(--background)] text-[var(--foreground)]"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-purple-500 mb-6">Terms of Service</h1>

          <p className="mb-6 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            By accessing or using LostCryptoHelp, you agree to be bound by the following terms and conditions. Please read them carefully.
          </p>

          <ul className="list-disc pl-6 space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <li><strong>No Financial Advice:</strong> LostCryptoHelp provides risk scores and insights for informational purposes only. We do not offer investment or financial advice. Users should make independent decisions before acting on any information.</li>

            <li><strong>No Wallet Storage:</strong> We never store your private keys, seed phrases, or wallet login credentials. Wallet access is performed via read-only blockchain APIs.</li>

            <li><strong>Privacy First:</strong> We do not collect personally identifiable information. Optional user-submitted data (e.g., for reports) is encrypted and automatically purged after delivery.</li>

            <li><strong>Third-Party Integrations:</strong> LostCryptoHelp may use services such as GoPlus Security, blockchain explorers, or Telegram APIs. We do not control the accuracy or availability of external services and are not responsible for third-party data.</li>

            <li><strong>Scan Accuracy & Liability:</strong> While we strive for accurate risk detection, blockchain data can change rapidly. We do not guarantee scan accuracy, completeness, or real-time results. Use at your own risk.</li>

            <li><strong>Payment Terms:</strong> TRON scans are free. ETH and BSC scans use pay-per-scan credits. Payments are non-refundable once the scan is initiated.</li>

            <li><strong>Intellectual Property:</strong> All content, code, and branding are the property of LostCryptoHelp and may not be copied, modified, or reused without permission.</li>

            <li><strong>Prohibited Use:</strong> You agree not to use our platform for illegal, abusive, or fraudulent purposes, including phishing, data scraping, or violating blockchain terms.</li>

            <li><strong>Modifications:</strong> We reserve the right to update these Terms of Service at any time. Continued use of the platform constitutes acceptance of the updated terms.</li>

            <li><strong>Jurisdiction:</strong> LostCryptoHelp is governed by applicable international and cyber laws. Disputes may be subject to binding arbitration where legally permissible.</li>
          </ul>

          <p className="mt-8 text-xs text-gray-500 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </motion.section>
    </>
  );
}
