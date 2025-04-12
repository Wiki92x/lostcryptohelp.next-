import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Info, Settings, Zap } from 'lucide-react';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-4 py-10 text-white bg-black"
    >
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-purple-400 flex items-center gap-3">
          <ShieldCheck className="text-purple-300" /> About LostCryptoHelp
        </h1>

        <p>
          LostCryptoHelp is a real-time Web3 security platform built for the people — not institutions.
          We help everyday crypto users avoid rugpulls, token scams, approval exploits, phishing contracts, and malicious wallets.
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">What We Do</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Scan any wallet for risky approvals or malicious token access</li>
              <li>Auto-audit smart contracts and presale launches</li>
              <li>Revoke scam contract access directly from your wallet</li>
              <li>Track whale movements, sniper bots, phishing links</li>
              <li>Check NFT assets for blacklist/stolen tags</li>
              <li>Trigger real-time alerts via Telegram — no emails, no spam</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">Why You Can Trust Us</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>No KYC, no account needed — wallet-based access only</li>
              <li>We don’t store your wallet data or scan history</li>
              <li>No third-party trackers — everything runs on self-hosted infra</li>
              <li>Encrypted Telegram alerts (opt-in only)</li>
              <li>Open-source logic will be released to ensure trust</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">How It Works</h2>
            <p className="text-gray-300 mb-2">
              Users select a blockchain, paste their wallet address, and hit scan. Our backend queries multiple block explorers (ETH, BSC, TRON),
              fetches token transfer activity, then runs token security analysis through GoPlusLabs.
            </p>
            <p className="text-gray-300">
              Results show token metadata, risk flags, and links. You can download the report or receive it via Telegram instantly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">Pricing & Legal</h2>
            <p className="text-gray-300 mb-1">
              TRON scans are free. ETH and BSC scans cost a small fee to support infrastructure. There’s no subscription or upsell.
              Our platform is non-custodial and doesn’t access or manage your funds.
            </p>
            <p className="text-gray-400 text-sm">
              * LostCryptoHelp is not a registered entity and offers tools for educational use only. Use of this platform is at your own risk. <br />
              Read our <Link href="/terms" className="underline">Terms of Service</Link> for more legal info.
            </p>
          </section>

          <div className="pt-8">
            <Link href="/pricing" className="text-purple-400 hover:underline flex items-center gap-1">
              <Zap className="h-4 w-4" /> View Pricing & Payment Info
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
