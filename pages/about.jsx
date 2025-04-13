'use client';
import { ShieldCheck, Eye, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-12 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-purple-500 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6" />
          About LostCryptoHelp
        </h1>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          LostCryptoHelp is a real-time Web3 security platform built for everyday users — helping you avoid scams,
          rugpulls, token exploits, phishing contracts, and wallet-based vulnerabilities.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-purple-400 flex items-center gap-2 mb-2">
            <Eye className="h-5 w-5" />
            What We Do
          </h2>
          <ul className="list-disc pl-6 text-gray-500 dark:text-gray-300 space-y-1">
            <li>Scan wallets for risky approvals or malicious token access</li>
            <li>Analyze token risks using GoPlus Security & chain APIs</li>
            <li>Trigger real-time Telegram alerts — no emails, no spam</li>
            <li>Auto-check presale and smart contract safety</li>
            <li>View and download smart risk audit in PDF format</li>
            <li>TRON scans are free. BSC and ETH use pay-as-you-scan</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-purple-400 flex items-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5" />
            Why People Trust Us
          </h2>
          <ul className="list-disc pl-6 text-gray-500 dark:text-gray-300 space-y-1">
            <li>No PayPal, no Stripe, no KYC. Fully crypto-native</li>
            <li>Wallet-based access only. You control your data</li>
            <li>We don’t store wallets, transactions, or personal info</li>
            <li>Scan logic is on-chain or self-hosted (not third-party)</li>
            <li>Everything is opt-in. Telegram alerts are encrypted</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
