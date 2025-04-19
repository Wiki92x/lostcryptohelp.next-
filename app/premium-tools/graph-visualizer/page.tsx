'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, RefreshCw, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GraphVisualizerPage() {
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState('');

  const handleScan = async () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // Simulated loading delay
  };

  return (
    <main className="min-h-screen px-6 py-20 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-5xl mx-auto space-y-10">
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-center text-blue-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Wallet Graph Visualizer
        </motion.h1>

        <p className="text-center text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Visualize wallet connections, transaction paths, CEX trails, and contract risks.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <input
            type="text"
            placeholder="Enter wallet address"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            className="w-full sm:w-96 px-4 py-2 rounded-md border bg-[var(--card)] text-[var(--foreground)] border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button disabled={loading || !wallet} onClick={handleScan}>
            {loading ? (
              <RefreshCw className="animate-spin w-4 h-4 mr-2" />
            ) : (
              <ShieldCheck className="w-4 h-4 mr-2" />
            )}
            Generate Graph
          </Button>
        </div>

        <div className="border border-[var(--border)] bg-[var(--card)] rounded-xl p-6 mt-10">
          <div className="text-center text-muted-foreground">
            {loading ? 'Generating graph preview...' : 'Graph output will be displayed here.'}
          </div>
          {!loading && (
            <div className="mt-6 h-64 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 text-sm">
              (Graph Placeholder)
            </div>
          )}
        </div>

        <div className="pt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            className="flex items-center gap-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            <Lock size={16} /> Unlock Cross-Chain Graph (Pro)
          </Button>
        </div>
      </div>
    </main>
  );
}