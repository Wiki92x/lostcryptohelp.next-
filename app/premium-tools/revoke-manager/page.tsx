'use client';

import { motion } from 'framer-motion';
import { FileWarning, ShieldCheck, Lock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Web3RevokeManager() {
  return (
    <main className="min-h-screen px-4 py-16 md:px-8 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-5xl mx-auto space-y-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-yellow-500 flex justify-center gap-2 items-center"
        >
          <ShieldCheck className="w-6 h-6 text-yellow-500" /> Web3 Revoke Manager
        </motion.h1>

        <div className="text-center text-sm text-muted-foreground max-w-2xl mx-auto space-y-2">
          <p>
            Token approvals let dApps access your tokens — even without asking again. If you forget to revoke, malicious contracts can drain funds with zero gas cost.
          </p>
          <div className="text-yellow-400 text-xs flex items-center justify-center gap-2">
            <Info className="w-4 h-4" />
            Always revoke unused token approvals after using DeFi, NFT or airdrop sites.
          </div>
        </div>

        {/* Token Approvals Block */}
        <section className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 space-y-6 shadow-md">
          <div className="space-y-2">
            <div className="text-lg font-medium flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-yellow-500" /> Active Token Approvals
            </div>
            <p className="text-sm text-muted-foreground">
              Detected contracts with token spending access. Revoke if suspicious.
            </p>
          </div>

          <div className="rounded-lg border border-[var(--border)] p-4 text-center text-sm text-muted-foreground">
            <ShieldCheck className="inline-block w-4 h-4 mr-1 text-green-500" />
            No risky token approvals found. Your wallet looks safe!
          </div>
        </section>

        {/* Monitoring Setup Block */}
        <section className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 space-y-6 shadow-md">
          <div className="space-y-2">
            <div className="text-lg font-medium flex items-center gap-2">
              <FileWarning className="w-5 h-5 text-yellow-500" /> Revoke Monitoring (Pro)
            </div>
            <p className="text-sm text-muted-foreground">
              Stay protected 24/7. Enable auto-scanning + get Telegram/email alerts for any new approval — before it’s too late.
            </p>
          </div>

          <Button
            variant="outline"
            size="lg"
            className="w-full max-w-xs mx-auto border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black animate-pulse"
          >
            <Lock size={16} className="mr-2" /> Unlock Monitoring (Pro)
          </Button>
        </section>
      </div>
    </main>
  );
}