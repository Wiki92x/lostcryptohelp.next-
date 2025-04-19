'use client';

import { motion } from 'framer-motion';
import { Gift, Zap, Clock3, Lock, EyeOff, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockChains = [
  {
    name: 'LayerZero',
    eligible: true,
    txCount: 32,
    walletAge: '12m',
    reward: '$420',
    snapshot: 'May 18'
  },
  {
    name: 'Arbitrum',
    eligible: false,
    txCount: 2,
    walletAge: '3m',
    reward: null,
    snapshot: 'TBD'
  },
  {
    name: 'ZkSync',
    eligible: true,
    txCount: 15,
    walletAge: '8m',
    reward: '$260',
    snapshot: 'June 1'
  },
  {
    name: 'StarkNet',
    eligible: false,
    txCount: 0,
    walletAge: '1m',
    reward: null,
    snapshot: 'TBD'
  }
];

export default function AirdropSniperDashboard() {
  return (
    <div className="min-h-screen px-6 py-16 md:py-24 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-5xl mx-auto space-y-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-4xl font-bold text-center text-purple-500 dark:text-purple-400"
        >
          Airdrop Sniper + Eligibility Dashboard
        </motion.h1>

        <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto">
          Check if your wallet qualifies for airdrops across top chains. Never miss out on free tokens again.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {mockChains.map((chain, i) => (
            <motion.div
              key={chain.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="border border-[var(--border)] bg-[var(--card)] p-5 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Gift className="text-pink-500 w-5 h-5" />
                  <h3 className="font-semibold text-lg">{chain.name}</h3>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    chain.eligible
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-400 text-black dark:text-white'
                  }`}
                >
                  {chain.eligible ? 'Eligible' : 'Not Yet'}
                </span>
              </div>

              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" /> TX Count: {chain.txCount}
                </div>
                <div className="flex items-center gap-2">
                  <Clock3 className="w-4 h-4" /> Wallet Age: {chain.walletAge}
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  {chain.eligible ? (
                    <span className="text-green-500 font-medium">Estimated Reward: {chain.reward}</span>
                  ) : (
                    <span className="text-muted-foreground flex items-center gap-1">
                      <EyeOff className="w-4 h-4" /> Unlock reward insight
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  Snapshot: <span className="font-medium">{chain.snapshot}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center pt-10">
          <Button
            variant="outline"
            size="lg"
            className="flex items-center gap-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition animate-pulse"
          >
            <Lock size={16} /> Unlock Full Airdrop Plan (Premium)
          </Button>
          <p className="text-xs text-muted-foreground mt-2">Unlock reward insights, alerts, and claim tracking for all chains.</p>
        </div>
      </div>
    </div>
  );
}