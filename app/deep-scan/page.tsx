'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const fees = {
  eth: 1.5,
  bsc: 0.5,
  tron: 0,
};

export default function DeepScanPage() {
  const [wallet, setWallet] = useState('');
  const [chain, setChain] = useState('eth');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const isValidWallet = (addr: string) =>
    /^0x[a-fA-F0-9]{40}$/.test(addr) || /^T[a-zA-Z0-9]{33,34}$/.test(addr);

  const handleScan = async () => {
    if (!wallet || !isValidWallet(wallet)) {
      setError('Enter a valid Ethereum, BSC, or TRON wallet address');
      toast.error('Invalid wallet address');
      return;
    }

    setScanning(true);
    setError('');
    setResult(null);
    toast.loading('Scanning in progress...');

    try {
      const res = await fetch('/api/deepscan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet, chain }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Scan failed');
      setResult(data);
      toast.success('Scan complete');
    } catch (err: any) {
      toast.dismiss();
      setError(err.message || 'Something went wrong');
      toast.error(err.message || 'Scan failed');
    } finally {
      setScanning(false);
      toast.dismiss();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen py-12 px-4 bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center transition-colors duration-300"
    >
      <div className="w-full max-w-xl bg-zinc-900 p-6 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-purple-400 text-center mb-6">
          Deep Wallet Scanner
        </h1>

        <select
          value={chain}
          onChange={(e) => setChain(e.target.value)}
          className="w-full p-2 rounded bg-gray-900 border border-gray-700 mb-4"
        >
          <option value="eth">Ethereum (${fees.eth})</option>
          <option value="bsc">Binance Smart Chain (${fees.bsc})</option>
          <option value="tron">TRON (Free)</option>
        </select>

        <input
          type="text"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          placeholder="Wallet Address"
          className="w-full p-2 rounded bg-gray-900 border border-gray-700 mb-4"
        />

        <button
          onClick={handleScan}
          disabled={scanning}
          className="w-full bg-purple-600 hover:bg-purple-700 transition py-2 rounded mb-2 font-semibold"
        >
          {scanning ? 'Scanning...' : 'Start Deep Scan'}
        </button>

        <button
          onClick={() => router.push('/')}
          className="w-full bg-gray-700 hover:bg-gray-600 transition py-2 rounded text-sm"
        >
          ← Back to Homepage
        </button>

        {error && (
          <div className="w-full bg-red-800 text-white p-2 rounded mt-4 text-sm text-center">
            ❌ {error}
          </div>
        )}

        {result && (
          <div className="mt-6 bg-zinc-800 p-4 rounded text-sm space-y-2">
            <p className="text-green-400 font-semibold">
              ✅ {result.chain} scan complete
            </p>
            <p className="text-purple-300">Risk Score: {result.riskScore}</p>
            <p className="text-gray-400 text-xs">Wallet: {result.address}</p>
            <hr className="border-gray-700 my-2" />
            <p className="text-gray-400 font-medium">Last Transactions:</p>
            <ul className="list-disc pl-5 space-y-1">
              {result.transactions?.slice(0, 5).map((tx: any, idx: number) => (
                <li key={idx}>
                  <span className="text-green-400">{tx.symbol}</span> — {tx.amount} on {tx.date}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}
