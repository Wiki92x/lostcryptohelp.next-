// ✅ components/dashboard/RefundLog.tsx — Final Version
'use client';

import { useEffect, useState } from 'react';
import { formatUnits } from 'viem';
import Link from 'next/link';
import { useAccount } from 'wagmi';

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

export default function RefundLog() {
  const { address } = useAccount();
  const [refunds, setRefunds] = useState<Refund[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!address) return;
    const fetchLog = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/refund-log?wallet=${address}`);
        const { refunds } = await res.json();
        setRefunds(refunds);
      } catch (err) {
        console.error('[Refund Log]', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLog();
  }, [address]);

  const getExplorer = (chain: string, hash: string) => {
    return {
      eth: `https://etherscan.io/tx/${hash}`,
      bsc: `https://bscscan.com/tx/${hash}`,
      tron: `https://tronscan.org/#/transaction/${hash}`,
    }[chain] || '#';
  };

  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-lg font-semibold text-blue-400">💸 Gas Refund Log</h3>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading refund history...</p>
      ) : refunds.length === 0 ? (
        <p className="text-sm text-muted-foreground">No refund history available.</p>
      ) : (
        <div className="space-y-3">
          {refunds.map((r, idx) => (
            <div
              key={idx}
              className="border border-zinc-700 bg-zinc-900/40 p-4 rounded-xl text-sm"
            >
              <div className="flex justify-between">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    r.status === 'success'
                      ? 'bg-green-500/20 text-green-400'
                      : r.status === 'failed'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {r.status.toUpperCase()}
                </span>
                <Link
                  href={getExplorer(r.chain, r.txHash)}
                  target="_blank"
                  className="text-blue-400 hover:underline"
                >
                  View TX
                </Link>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-zinc-400">Chain</p>
                  <p>{r.chain.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-zinc-400">Refund</p>
                  <p className="text-green-400">
                    +{r.refundAmount.toFixed(4)} {r.chain === 'tron' ? 'TRX' : 'ETH'}
                  </p>
                </div>
                <div>
                  <p className="text-zinc-400">Gas Used</p>
                  <p>{r.gasUsed}</p>
                </div>
                <div>
                  <p className="text-zinc-400">Gas Price</p>
                  <p>
                    {formatUnits(BigInt(r.gasPrice), r.chain === 'tron' ? 6 : 9)}{' '}
                    {r.chain === 'tron' ? 'SUN' : 'Gwei'}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-zinc-400">Reason</p>
                <p className="text-orange-300">{r.reason}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
