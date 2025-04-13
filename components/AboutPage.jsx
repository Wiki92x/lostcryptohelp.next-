'use client';

import { ShieldCheck, Eye, Lock, ScrollText } from 'lucide-react';

export default function AboutPageContent() {
  return (
    <section className="min-h-screen bg-[var(--background)] text-[var(--foreground)] py-16 px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-16">
        <h1 className="text-4xl font-bold text-purple-500 flex items-center gap-2">
          <ShieldCheck className="w-7 h-7" /> About LostCryptoHelp
        </h1>

        {/* What We Do */}
        <div>
          <h2 className="text-2xl font-semibold text-purple-400 flex items-center gap-2 mb-4">
            <Eye className="w-5 h-5" /> What We Do
          </h2>
          <ul className="list-disc list-inside text-base leading-relaxed text-gray-800 dark:text-gray-300 space-y-2">
            <li>Detect risky token approvals and suspicious wallet behavior.</li>
            <li>Scan with GoPlus Security, blockchain explorers & AI contract analysis.</li>
            <li>Trigger real-time Telegram alerts — no emails, no spam, no trackers.</li>
            <li>Smart contract safety detection including presales & honeypots.</li>
            <li>Download clean PDF audit reports after every scan.</li>
            <li>TRON scans are 100% free. ETH & BSC use a one-time, crypto-native fee.</li>
          </ul>
        </div>

        {/* Why People Trust Us */}
        <div>
          <h2 className="text-2xl font-semibold text-purple-400 flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5" /> Why People Trust Us
          </h2>
          <ul className="list-disc list-inside text-base leading-relaxed text-gray-800 dark:text-gray-300 space-y-2">
            <li>We never ask for your email, name, or private keys — ever.</li>
            <li>No PayPal, no Stripe, no KYC. Just connect your wallet and scan.</li>
            <li>We don’t log wallet scans or store user data.</li>
            <li>Everything runs client-side or on secure, encrypted infrastructure.</li>
            <li>Telegram alerts are encrypted, opt-in only, and 1-click to disable.</li>
          </ul>
        </div>

        {/* Legal, Privacy & Transparency */}
        <div>
          <h2 className="text-2xl font-semibold text-purple-400 flex items-center gap-2 mb-4">
            <ScrollText className="w-5 h-5" /> Legal, Privacy & Transparency
          </h2>
          <ul className="list-disc list-inside text-base leading-relaxed text-gray-800 dark:text-gray-300 space-y-2">
            <li>No wallets or scan results are stored on our servers.</li>
            <li>Audit PDFs are generated locally and never uploaded or saved.</li>
            <li>We use no analytics, cookies, or browser fingerprinting.</li>
            <li>Your blockchain data stays on-chain, and your privacy stays yours.</li>
            <li>We stand for radical transparency and crypto-native integrity.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
