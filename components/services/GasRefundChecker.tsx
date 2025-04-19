'use client';

import { useState } from 'react';
import { useNetwork } from 'wagmi';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { formatUnits } from 'viem';

interface Refund {
  txHash: string;
  chain: string;
  gasUsed: number;
  gasPrice: number;
  value: string;
  block: number;
  timestamp: number;
  reason: string;
  refundAmount: number;
  status: 'pending' | 'failed' | 'success';
}

export default function GasRefundChecker({ wallet, chain }: { wallet: string; chain: string }) {
  const [loading, setLoading] = useState(false);
  const [refunds, setRefunds] = useState<Refund[]>([]);
  const { chain: activeChain } = useNetwork();

  const getExplorerUrl = (txHash: string) => {
    const explorers = {
      eth: `https://etherscan.io/tx/${txHash}`,
      bsc: `https://bscscan.com/tx/${txHash}`,
      tron: `https://tronscan.org/#/transaction/${txHash}`,
    };
    return explorers[chain] || '#';
  };

  const checkGasRefunds = async () => {
    setLoading(true);
    setRefunds([]); // Reset previous state
    try {
      const res = await fetch('/api/gas-refund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet, chain, chainId: activeChain?.id }),
      });

      if (!res.ok) throw new Error(await res.text());

      const { refunds } = await res.json();
      setRefunds(refunds);

      if (refunds.length === 0) toast.success('No refundable transactions found');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to check gas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Gas Optimization</h3>
        <button
          onClick={checkGasRefunds}
          className="flex items-center gap-2 text-sm bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="animate-spin">↻</span>
              Analyzing...
            </>
          ) : (
            'Check Refund Opportunities'
          )}
        </button>
      </div>

      {loading ? (
        <div className="p-6 text-center bg-zinc-800/20 rounded-xl">
          <p className="text-zinc-400">Analyzing transactions... If stuck, refresh and retry.</p>
        </div>
      ) : refunds.length > 0 ? (
        <div className="space-y-4">
          {refunds.map((refund, index) => (
            <div key={index} className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      refund.status === 'failed'
                        ? 'bg-red-500/30 text-red-300'
                        : refund.status === 'pending'
                        ? 'bg-yellow-500/30 text-yellow-300'
                        : 'bg-green-500/30 text-green-300'
                    }`}
                  >
                    {refund.status.toUpperCase()}
                  </span>
                  <Link
                    href={getExplorerUrl(refund.txHash)}
                    target="_blank"
                    className="text-blue-400 hover:underline text-sm"
                  >
                    View Transaction
                  </Link>
                </div>
                <span className="text-sm text-green-400">
                  +{refund.refundAmount.toFixed(4)} {chain === 'tron' ? 'TRX' : 'ETH'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-zinc-400">Gas Used</p>
                  <p>{refund.gasUsed.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-zinc-400">Gas Price</p>
                  <p>
                    {formatUnits(BigInt(refund.gasPrice), chain === 'tron' ? 6 : 9)}{' '}
                    {chain === 'tron' ? 'SUN' : 'Gwei'}
                  </p>
                </div>
                <div>
                  <p className="text-zinc-400">Block</p>
                  <p>{refund.block.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-zinc-400">Date</p>
                  <p>{new Date(refund.timestamp * 1000).toLocaleDateString()}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-zinc-400">Reason</p>
                  <p className="text-orange-300">{refund.reason}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 text-center bg-zinc-800/20 rounded-xl">
          <p className="text-zinc-400">No refund opportunities found</p>
        </div>
      )}
    </div>
  );
}