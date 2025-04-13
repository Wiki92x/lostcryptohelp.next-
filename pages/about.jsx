'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Info, LockKeyhole, SearchCheck, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const AboutPage = () => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-6 py-12 bg-black text-white"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-purple-400 flex items-center gap-3">
          <ShieldCheck className="text-purple-300" /> About LostCryptoHelp
        </h1>

        {/* Intro */}
        <p className="text-lg text-gray-300 leading-relaxed">
          LostCryptoHelp is a real-time Web3 security platform built for everyday users —
          helping you avoid scams, rugpulls, token exploits, phishing contracts, and wallet-based vulnerabilities.
        </p>

        {/* What We Do */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl text-purple-300 font-semibold flex items-center gap-2">
            <SearchCheck /> What We Do
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>Scan wallets for risky approvals or malicious token access</li>
            <li>Analyze token risks using GoPlus Security & chain APIs</li>
            <li>Trigger real-time Telegram alerts — no emails, no spam</li>
            <li>Auto-check presale and smart contract safety</li>
            <li>View and download smart risk audit in PDF format</li>
            <li>TRON scans are free. BSC and ETH use pay-as-you-scan</li>
          </ul>
        </section>

        {/* Why People Trust Us */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl text-purple-300 font-semibold flex items-center gap-2">
            <Users /> Why People Trust Us
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>No PayPal, no Stripe, no KYC. Fully crypto-native</li>
            <li>Wallet-based access only. You control your data</li>
            <li>We don’t store wallets, transactions, or personal info</li>
            <li>Scan logic is on-chain or self-hosted (not third-party)</li>
            <li>Everything is opt-in. Telegram alerts are encrypted</li>
          </ul>
        </section>

        {/* Legal */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl text-purple-300 font-semibold flex items-center gap-2">
            <LockKeyhole /> Legal, Privacy & Transparency
          </h2>
          <p className="text-gray-300">
            We’re not a financial service, don’t guarantee token recovery, and don't offer legal advice.
            LostCryptoHelp operates as an open-source crypto utility platform. No user data is stored.
          </p>
          <p className="text-gray-400 text-sm italic">
            View our full{' '}
            <Link href="/terms" className="text-purple-400 underline hover:text-purple-200">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/pricing" className="text-purple-400 underline hover:text-purple-200">
              Pricing
            </Link>
            .
          </p>
        </section>

        {/* Call to action */}
        <div className="pt-6 border-t border-gray-700 text-center text-purple-400 font-semibold">
          Protect your wallet. Scan. Revoke. Survive. 🔒
        </div>

        {/* Back button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => router.push('/')}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-2 text-white rounded-xl transition"
          >
            ← Back to Homepage
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
