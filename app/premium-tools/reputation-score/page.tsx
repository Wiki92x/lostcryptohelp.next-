'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, TrendingUp, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReputationScorePage() {
  const [wallet, setWallet] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const runCheck = async () => {
    setLoading(true);
    setTimeout(() => {
      setScore(723);
      setLoading(false);
    }, 1200);
  };

  const scoreLevel = (score: number) => {
    if (score >= 850) return 'Elite';
    if (score >= 700) return 'Trusted';
    if (score >= 500) return 'Neutral';
    return 'Risky';
  };

  const scoreColor = (score: number) => {
    if (score >= 850) return 'text-purple-400';
    if (score >= 700) return 'text-green-400';
    if (score >= 500) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <main className="min-h-screen px-6 py-20 bg-background text-foreground">
      <div className="max-w-4xl mx-auto space-y-10">
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-center text-orange-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Web3 Reputation Score
        </motion.h1>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Analyze trust score based on wallet behavior and interactions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <input
            type="text"
            placeholder="Wallet Address"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            className="w-full sm:w-96 px-4 py-2 rounded-md border bg-card text-foreground border-zinc-700"
          />
          <Button disabled={loading || !wallet} onClick={runCheck}>
            {loading ? 'Checking...' : 'Check Score'}
          </Button>
        </div>

        {score !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 mt-10 space-y-6"
          >
            <div className="text-center">
              <div className="text-lg font-semibold">
                Reputation Score:
                <span className={`ml-2 ${scoreColor(score)}`}>{score}/1000</span>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Status: <span className="font-medium text-foreground">{scoreLevel(score)}</span>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <ul className="space-y-2">
                <li>✅ Wallet Age: 15 months</li>
                <li>✅ Interacted with 8+ legit DeFi protocols</li>
                <li>❌ Flagged for 1 rugpull token in past 90d</li>
                <li>✅ Gas usage patterns indicate active user</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500 hover:text-black">
                <BadgeCheck size={16} className="mr-2" /> Claim Reputation Badge NFT
              </Button>

              <Button variant="ghost" className="text-blue-400 text-xs">
                Download Scorecard (PDF)
              </Button>
            </div>

            <div className="text-center text-xs text-muted-foreground">
              <Lock size={12} className="inline mr-1" /> Full behavior history and on-chain proof available in Pro
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
} 
