'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShieldCheck, FileText, Zap, Gift, Star, Wallet } from 'lucide-react';

const ALL_CATEGORIES = ['All', 'Security', 'Legal', 'Rewards', 'Identity'];

export default function HomePage() {
  const [activeTag, setActiveTag] = useState('All');
  const [recentScan, setRecentScan] = useState('0x742d...8f44');
  const [wallet, setWallet] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        }
      });

      // Listen for wallet change
      window.ethereum.on?.('accountsChanged', (accounts: string[]) => {
        setWallet(accounts[0] || null);
      });
    }
  }, []);

  const tools = [
    {
      title: 'DeepScan Wallet Scanner',
      desc: 'Analyze wallets for risks, approvals, and known scam patterns.',
      icon: <ShieldCheck className="text-blue-400" />,
      tag: 'Security',
      stats: '🔥 1.2k scans today',
      link: '/deep-scan',
    },
    {
      title: 'Lost Funds Claim Assistant',
      desc: 'Submit Web3 incident reports and auto-generate legal documents.',
      icon: <FileText className="text-green-400" />,
      tag: 'Legal',
      stats: '🧾 320 claims filed',
      link: '/premium-tools/claim-assistant',
    },
    {
      title: 'Web3 Revoke Manager',
      desc: 'Instantly revoke shady token approvals across chains.',
      icon: <Zap className="text-yellow-300" />,
      tag: 'Security',
      stats: '⚠️ 580 approvals revoked',
      link: '/premium-tools/revoke-manager',
    },
    {
      title: 'Airdrop Sniper + Dashboard',
      desc: 'See what airdrops you’re eligible for and track your wallets.',
      icon: <Gift className="text-purple-400" />,
      tag: 'Rewards',
      stats: '🎁 67 new airdrops',
      link: '/premium-tools/airdrop-sniper',
    },
    {
      title: 'Web3 Reputation Score',
      desc: 'Generate trust scores and claim your Verified Web3 badge.',
      icon: <Star className="text-orange-400" />,
      tag: 'Identity',
      stats: '⭐ 3.4k wallets rated',
      link: '/premium-tools/reputation-score',
    },
  ];

  const filteredTools = activeTag === 'All' ? tools : tools.filter(tool => tool.tag === activeTag);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* 🎯 Hero */}
      <section className="py-24 px-6 text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-blue-400 mb-6 drop-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Protect Your Web3 Wallet Instantly
        </motion.h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-3">
          Real-time scans. Zero KYC. Rugpull protection built for crypto-native users.
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          🧠 Powered by AI wallet intelligence · 🛡️ 100% private · No login required
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <Link href="/deep-scan">
            <Button size="lg" className="px-8 py-4 text-base">
              🚀 Start Deep Scan
            </Button>
          </Link>
          <Link href="/deep-scan?wallet=0x742d35Cc...f44e">
            <Button size="lg" variant="outline" className="px-8 py-4 text-base">
              🧪 Try Sample Wallet
            </Button>
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          Join <span className="font-semibold text-white">17,000+</span> users protecting over{' '}
          <span className="font-semibold text-white">$25M</span> in crypto assets
        </p>

        {/* ✅ MetaMask Status */}
        <div className="mt-6 flex justify-center">
          {wallet ? (
            <div className="flex items-center gap-2 text-sm text-green-400 bg-zinc-900 px-4 py-2 rounded-lg border border-green-500 font-mono">
              <Wallet size={16} /> Connected: {wallet.slice(0, 6)}...{wallet.slice(-4)}
            </div>
          ) : (
            <div className="text-yellow-400 text-sm">🔌 MetaMask not connected</div>
          )}
        </div>
      </section>

      {/* 🟢 Live Scan Marquee */}
      <section className="bg-zinc-950 py-3 text-sm text-center text-zinc-400">
        🟢 Just scanned: <span className="text-blue-400 font-mono">{recentScan}</span> · No threats detected
      </section>

      {/* 🧰 Filterable Tool Grid */}
      <section className="bg-zinc-950 py-20 px-6">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">
          🛠 What Can You Do Here?
        </h2>

        <div className="flex justify-center gap-2 flex-wrap mb-10">
          {ALL_CATEGORIES.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3 py-1 rounded-full border text-sm transition ${
                activeTag === tag
                  ? 'bg-blue-500 text-white'
                  : 'border-zinc-700 text-zinc-400 hover:bg-zinc-800'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredTools.map((tool, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-6 shadow-lg hover:shadow-blue-500/20 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-zinc-800 p-2 rounded-full group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{tool.title}</h3>
                </div>
                <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded-md">
                  {tool.tag}
                </span>
              </div>
              <p className="text-sm text-zinc-400 mb-4">{tool.desc}</p>
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>{tool.stats}</span>
                <Link href={tool.link} className="text-blue-400 hover:underline">
                  Start Now →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🧠 CTA Section */}
      <section className="py-20 px-6 text-center">
        <h3 className="text-xl font-semibold text-muted-foreground mb-4">
          New threats are emerging every day — don’t get left behind.
        </h3>
        <Link href="/threat-hub">
          <Button variant="outline" className="text-blue-500">
            🧠 Visit Threat Intel Hub
          </Button>
        </Link>
      </section>
    </main>
  );
}