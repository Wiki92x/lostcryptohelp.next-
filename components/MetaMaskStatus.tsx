'use client';

import { useEffect, useState } from 'react';
import { BadgeCheck, PlugZap } from 'lucide-react';

export default function MetaMaskStatus() {
  const [wallet, setWallet] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        }
      });

      // Optional: Auto-update on account switch
      window.ethereum.on?.('accountsChanged', (accounts: string[]) => {
        setWallet(accounts[0] || null);
      });
    }
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 w-fit">
      {wallet ? (
        <>
          <BadgeCheck className="text-green-400 w-4 h-4" />
          <span className="text-green-300 font-mono">
            {wallet.slice(0, 6)}...{wallet.slice(-4)}
          </span>
          <span className="text-zinc-400">connected</span>
        </>
      ) : (
        <>
          <PlugZap className="text-yellow-400 w-4 h-4 animate-pulse" />
          <span className="text-yellow-300">MetaMask not connected</span>
        </>
      )}
    </div>
  );
}