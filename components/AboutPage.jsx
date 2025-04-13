'use client';
import { ShieldCheck, Eye, Lock } from 'lucide-react';

export default function AboutPageContent() {
  return (
    <section className="min-h-screen bg-[var(--background)] text-[var(--foreground)] py-16 px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-purple-500 flex items-center gap-2 mb-8">
          <ShieldCheck className="w-6 h-6" /> About LostCryptoHelp
        </h1>

        <div className="space-y-12">

          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-500 flex items-center gap-2 mb-2">
              <Eye className="w-5 h-5" /> What We Do
            </h2>
            <ul className="list-disc list-inside text-sm sm:text-base space-y-1 text-gray-800 dark:text-gray-300">
              <li>Scan wallets for risky approvals or malicious token access</li>
              <li>Analyze token risks using GoPlus Security & chain APIs</li>
              <li>Trigger real-time Telegram alerts — no emails, no spam</li>
              <li>Auto-check presale and smart contract safety</li>
              <li>Download smart risk audit in PDF format</li>
              <li>TRON scans are free. ETH & BSC use pay-as-you-scan</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-500 flex items-center gap-2 mb-2">
              <Lock className="w-5 h-5" /> Why People Trust Us
            </h2>
            <ul className="list-disc list-inside text-sm sm:text-base space-y-1 text-gray-800 dark:text-gray-300">
              <li>No PayPal, no Stripe, no KYC. Fully crypto-native</li>
              <li>Wallet-based access only — you control your data</li>
              <li>No storage of transactions or personal info</li>
              <li>Scan logic is on-chain or self-hosted (not 3rd-party)</li>
              <li>Opt-in only — Telegram alerts are encrypted</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-500 mb-2">📜 Legal, Privacy & Transparency</h2>
            <ul className="list-disc list-inside text-sm sm:text-base space-y-1 text-gray-800 dark:text-gray-300">
              <li>No wallets or data stored on our servers</li>
              <li>Reports are encrypted and purged after delivery</li>
              <li>No cookies, no analytics, no trackers</li>
              <li>We believe in security through transparency</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
