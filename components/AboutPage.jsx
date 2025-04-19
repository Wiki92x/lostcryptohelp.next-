// ✅ app/about/page.tsx — Crystal Enhanced UI + Motion + Theme Ready

'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <section className="min-h-screen px-4 py-16 md:px-10 lg:px-20 bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground transition-colors">
      <motion.div
        className="max-w-4xl mx-auto space-y-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-accent dark:text-blue-400 tracking-tight">
          🛡️ About LostCryptoHelp
        </h1>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-500 dark:text-blue-300">
            💼 What We Do
          </h2>
          <ul className="list-disc list-inside text-sm leading-relaxed text-muted-foreground space-y-2">
            <li>Detect risky token approvals and suspicious wallet behavior.</li>
            <li>Scan with GoPlus Security, blockchain explorers & AI contract analysis.</li>
            <li>Trigger real-time Telegram alerts — no emails, no spam, no trackers.</li>
            <li>Smart contract safety detection including presales & honeypots.</li>
            <li>Download clean PDF audit reports after every scan.</li>
            <li><span className="font-medium text-green-500">TRON</span> scans are free. <span className="text-yellow-500">ETH</span> & <span className="text-blue-500">BSC</span> use a crypto-native fee.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-500 dark:text-blue-300">
            🔒 Why People Trust Us
          </h2>
          <ul className="list-disc list-inside text-sm leading-relaxed text-muted-foreground space-y-2">
            <li>We never ask for your email, name, or private keys — ever.</li>
            <li>No PayPal, no Stripe, no KYC. Just connect your wallet and scan.</li>
            <li>We don’t log wallet scans or store user data.</li>
            <li>Everything runs client-side or on secure, encrypted infrastructure.</li>
            <li>Telegram alerts are encrypted, opt-in only, and 1-click to disable.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-500 dark:text-blue-300">
            📄 Legal, Privacy & Transparency
          </h2>
          <ul className="list-disc list-inside text-sm leading-relaxed text-muted-foreground space-y-2">
            <li>No wallets or scan results are stored on our servers.</li>
            <li>Audit PDFs are generated locally and never uploaded or saved.</li>
            <li>We use no analytics, cookies, or browser fingerprinting.</li>
            <li>Your blockchain data stays on-chain, and your privacy stays yours.</li>
            <li>We stand for radical transparency and crypto-native integrity.</li>
          </ul>
        </section>

        <div className="pt-10 text-sm text-center text-muted-foreground">
          <span className="text-xs opacity-70">© 2025 LostCryptoHelp · Built with trust, transparency, and pure code.</span>
        </div>
      </motion.div>
    </section>
  );
}