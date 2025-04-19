'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, Zap, Gift, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const features = [
  {
    title: 'Wallet Graph Visualizer',
    icon: <ShieldCheck className="w-5 h-5 text-blue-500" />,
    description: 'Visualize wallet connections, TXs, and CEX interactions.',
    path: '/premium-tools/graph-visualizer',
    tiers: {
      free: '3 scans/day',
      pro: 'Unlimited scans + PDF export',
      premium: 'Cross-chain, JSON export, Telegram alert',
    },
  },
  {
    title: 'Lost Funds Claim Assistant',
    icon: <FileText className="w-5 h-5 text-green-500" />,
    description: 'Auto-generate claim files for scam incidents.',
    path: '/premium-tools/claim-assistant',
    tiers: {
      free: 'TX Summary',
      pro: 'Full PDF Report',
      premium: 'AI Legal Form + Telegram Analyst Support',
    },
  },
  {
    title: 'Web3 Revoke Manager',
    icon: <Zap className="w-5 h-5 text-yellow-500" />,
    description: 'Scan and revoke malicious smart contract approvals.',
    path: '/premium-tools/revoke-manager',
    tiers: {
      free: 'Manual revoke',
      pro: 'Scheduler + Alerts',
      premium: 'Auto-monitor + Gasless Telegram Revoker',
    },
  },
  {
    title: 'Airdrop Sniper + Dashboard',
    icon: <Gift className="w-5 h-5 text-purple-500" />,
    description: 'Detect airdrop eligibility across major chains.',
    path: '/premium-tools/airdrop-sniper',
    tiers: {
      free: '1 chain only',
      pro: 'All chains + Claim reminder',
      premium: 'PDF Farm Plan + Early Leak Alerts',
    },
  },
  {
    title: 'Web3 Reputation Score',
    icon: <Star className="w-5 h-5 text-orange-500" />,
    description: 'Generate trust scores based on wallet activity.',
    path: '/premium-tools/reputation-score',
    tiers: {
      free: 'Score + Labels',
      pro: 'Score history + Trust Badge',
      premium: 'NFT ID + Booster PDF',
    },
  },
];

export default function PremiumToolsPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen px-4 py-20 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-5xl mx-auto space-y-12">
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-center text-blue-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Premium Tools Dashboard
        </motion.h1>

        {features.map((f, index) => (
          <Card
            key={index}
            className="bg-zinc-900 border border-zinc-700 shadow-lg text-white"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  {f.icon}
                  <h3 className="text-xl font-semibold">{f.title}</h3>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    setExpandedIndex(expandedIndex === index ? null : index)
                  }
                >
                  {expandedIndex === index ? 'Collapse' : 'View Tiers'}
                </Button>
              </div>
              <p className="text-sm text-zinc-400 mb-2">{f.description}</p>

              {expandedIndex === index && (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {Object.entries(f.tiers).map(([tier, detail]) => (
                    <div
                      key={tier}
                      className="p-4 bg-zinc-800 rounded-xl border border-zinc-600"
                    >
                      <h4 className="font-semibold capitalize text-blue-400 mb-1">
                        {tier} tier
                      </h4>
                      <p className="text-sm text-zinc-300">{detail}</p>
                    </div>
                  ))}
                  <div className="col-span-full text-center pt-4">
                    <Link href={f.path}>
                      <Button variant="default" size="lg" className="bg-blue-600 hover:bg-blue-700">
                        🚀 Launch Tool
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}