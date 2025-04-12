// ✅ app/deep-scan/page.tsx (Final Version)
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { generatePDF } from '../utils/generatePDF';

interface ScanResult {
  address: string;
  chain: string;
  riskScore: string;
  transactions: Array<{
    date: string;
    transactionId: string;
    amount: string;
    token: string;
    symbol: string;
    risk_flags: Record<string, any>;
  }>;
}

const chains = [
  { id: 'eth', name: 'Ethereum ($1.5)' },
  { id: 'bsc', name: 'Binance Smart Chain ($0.5)' },
  { id: 'tron', name: 'TRON (Free)' },
];

export default function DeepScanPage() {
  const [wallet, setWallet] = useState('');
  const [chain, setChain] = useState('eth');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const router = useRouter();

  useEffect(() => {
    toast.dismiss();
  }, []);

  const handleScan = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/deepscan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet, chain }),
      });

      const data = await res.json();

      if (res.status === 402) {
        setShowPayment(true);
        toast.error('Payment required');
        return;
      }

      if (!res.ok) throw new Error(data.error || 'Scan failed');

      setResult(data);
      localStorage.setItem('scanResult', JSON.stringify(data));
      router.push('/thank-you');
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    if (!result) return;
    try {
      generatePDF(result);
      toast.success('PDF downloaded');
    } catch (err) {
      toast.error('PDF failed');
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-black text-white flex flex-col items-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl w-full bg-zinc-900 p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-purple-400 text-center mb-6">Deep Wallet Scanner</h1>

        <select className="w-full p-2 mb-4 bg-zinc-800 rounded" value={chain} onChange={(e) => setChain(e.target.value)}>
          {chains.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <input
          type="text"
          placeholder="Wallet Address"
          className="w-full p-2 mb-4 bg-zinc-800 rounded"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
        />

        <button
          onClick={handleScan}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded mb-2"
        >
          {loading ? 'Scanning...' : 'Run Deep Scan'}
        </button>

        {showPayment && (
          <div className="bg-red-800 text-white p-4 rounded text-sm">
            <p className="mb-1">🔒 This scan requires payment.</p>
            <p>💸 Send <strong>$1.5 (ETH)</strong> or <strong>$0.5 (BSC)</strong> to:</p>
            <p className="mt-1 break-all">0xYourEthPaymentAddress / 0xYourBscPaymentAddress</p>
          </div>
        )}

        {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}

        {result && (
          <div className="mt-6 bg-zinc-800 p-4 rounded">
            <h2 className="text-xl font-semibold text-purple-300">Scan Summary</h2>
            <p>Wallet: {result.address}</p>
            <p>Chain: {result.chain}</p>
            <p>Risk Score: {result.riskScore}</p>
            <button onClick={downloadReport} className="w-full mt-4 bg-green-600 hover:bg-green-700 py-2 rounded">
              📥 Download PDF
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
