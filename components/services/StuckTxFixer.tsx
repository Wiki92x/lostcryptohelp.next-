// ✅ components/services/StuckTxFixer.tsx
'use client';

import { useState, useEffect } from 'react';
import { useAccount, useNetwork, usePublicClient } from 'wagmi';
import { formatEther, parseEther, parseUnits } from 'viem';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface StuckTx {
  hash: string;
  chain: string;
  nonce: number;
  gasPrice: bigint;
  maxPriorityFeePerGas?: bigint;
  maxFeePerGas?: bigint;
  status: 'pending' | 'stuck' | 'replaced';
  suggestedAction: 'speedup' | 'cancel' | 'ignore';
  expiration: number;
  value: string;
  to?: string;
}

export default function StuckTxFixer({ wallet, chain }: { wallet: string; chain: string }) {
  const [loading, setLoading] = useState(false);
  const [stuckTxs, setStuckTxs] = useState<StuckTx[]>([]);
  const { address } = useAccount();
  const { chain: activeChain } = useNetwork();
  const publicClient = usePublicClient();

  const getExplorerUrl = (txHash: string) => {
    const explorers = {
      eth: `https://etherscan.io/tx/${txHash}`,
      bsc: `https://bscscan.com/tx/${txHash}`,
      tron: `https://tronscan.org/#/transaction/${txHash}`
    };
    return explorers[chain] || '#';
  };

  const fetchStuckTransactions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/stuck-fix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          wallet,
          chain,
          chainId: activeChain?.id
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      
      const { stuck } = await res.json();
      setStuckTxs(stuck);
      if (stuck.length === 0) toast.success('No stuck transactions found');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to fetch TXs');
    } finally {
      setLoading(false);
    }
  };

  const handleFix = async (tx: StuckTx, action: 'speedup' | 'cancel') => {
    try {
      const gasPrice = await publicClient.getGasPrice();
      const newGasPrice = gasPrice * 130n / 100n; // +30%

      const txData = {
        to: tx.to,
        nonce: tx.nonce,
        value: parseEther(tx.value),
        gasPrice: newGasPrice,
        chainId: activeChain?.id
      };

      if (action === 'cancel') {
        txData.to = address;
        txData.value = 0n;
      }

      const hash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [txData]
      });

      toast.success(
        <Link href={getExplorerUrl(hash)} target="_blank" className="text-blue-400 hover:underline">
          {action} transaction submitted
        </Link>
      );
      
      setStuckTxs(prev => prev.filter(t => t.hash !== tx.hash));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Transaction failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Stuck Transaction Fixer</h3>
        <button
          onClick={fetchStuckTransactions}
          className="flex items-center gap-2 text-sm bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="animate-spin">↻</span>
              Scanning...
            </>
          ) : (
            'Check Stuck Transactions'
          )}
        </button>
      </div>

      {stuckTxs.length > 0 ? (
        <div className="space-y-4">
          {stuckTxs.map((tx, index) => (
            <div key={index} className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    tx.status === 'pending' ? 'bg-yellow-500/30 text-yellow-300' :
                    tx.status === 'stuck' ? 'bg-red-500/30 text-red-300' :
                    'bg-green-500/30 text-green-300'
                  }`}>
                    {tx.status.toUpperCase()}
                  </span>
                  <Link
                    href={getExplorerUrl(tx.hash)}
                    target="_blank"
                    className="text-blue-400 hover:underline text-sm"
                  >
                    View Transaction
                  </Link>
                </div>
                <div className="flex gap-2">
                  {tx.suggestedAction === 'speedup' && (
                    <button
                      onClick={() => handleFix(tx, 'speedup')}
                      className="px-3 py-1.5 text-sm bg-green-600/30 hover:bg-green-500/40 rounded-lg"
                    >
                      🚀 Speed Up
                    </button>
                  )}
                  {tx.suggestedAction === 'cancel' && (
                    <button
                      onClick={() => handleFix(tx, 'cancel')}
                      className="px-3 py-1.5 text-sm bg-red-600/30 hover:bg-red-500/40 rounded-lg"
                    >
                      ❌ Cancel
                    </button>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-zinc-400">Nonce</p>
                  <p>{tx.nonce}</p>
                </div>
                <div>
                  <p className="text-zinc-400">Gas Price</p>
                  <p>
                    {formatUnits(tx.gasPrice, 'gwei')} Gwei
                  </p>
                </div>
                <div>
                  <p className="text-zinc-400">Value</p>
                  <p>{formatEther(BigInt(tx.value))} ETH</p>
                </div>
                <div>
                  <p className="text-zinc-400">Expires In</p>
                  <p>{Math.floor((tx.expiration - Date.now()/1000)/60)} mins</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 text-center bg-zinc-800/20 rounded-xl">
          <p className="text-zinc-400">
            {loading ? 'Scanning blockchain...' : 'No stuck transactions detected'}
          </p>
        </div>
      )}
    </div>
  );
}