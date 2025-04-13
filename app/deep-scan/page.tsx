// pages/deepscan.page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const fees = {
  eth: 1.5,
  bsc: 0.5,
  tron: 0,
};

const paymentAddresses = {
  eth: '0xa85f4DDE28941e41633b575D3a026A8B42887795',
  bsc: '0xa85f4DDE28941e41633b575D3a026A8B42887795',
  tron: 'TVH1roHbPn5qCj14Dy1GSVrB5XDcsjgEyX',
};

export default function DeepScanPage() {
  const [wallet, setWallet] = useState('');
  const [chain, setChain] = useState('eth');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [showPayment, setShowPayment] = useState(false);
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
    setShowPayment(false);
    toast.loading('Scanning in progress...');

    try {
      const res = await fetch('/api/deepscan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet, chain }),
      });

      const data = await res.json();

      if (res.status === 402) {
        setShowPayment(true);
        toast.dismiss();
        toast.error('Payment required');
        return;
      }

      if (!res.ok) throw new Error(data.error || 'Scan failed');
      setResult(data);
      toast.success('Scan complete');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      toast.error(err.message || 'Scan failed');
    } finally {
      setScanning(false);
      toast.dismiss();
    }
  };

  const handleVerifyPayment = async () => {
    toast.loading('Verifying payment...');
    try {
      const res = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet, chain }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Verification failed');
      setResult(data);
      setShowPayment(false);
      toast.success('Payment verified. Scan complete.');
    } catch (err: any) {
      toast.dismiss();
      toast.error(err.message || 'Verification failed');
    } finally {
      toast.dismiss();
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-900 text-white flex flex-col items-center justify-center">
      <div className="w-full max-w-xl bg-zinc-800 p-6 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6">Deep Wallet Scanner</h1>

        <select
          value={chain}
          onChange={(e) => setChain(e.target.value)}
          className="w-full p-2 rounded bg-zinc-700 mb-4"
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
          className="w-full p-2 rounded bg-zinc-700 mb-4"
        />

        <button
          onClick={handleScan}
          disabled={scanning}
          className="w-full bg-purple-600 hover:bg-purple-700 transition py-2 rounded mb-2 font-semibold"
        >
          {scanning ? 'Scanning...' : 'Start Deep Scan'}
        </button>

        {showPayment && (
          <div className="mt-4 bg-red-800 text-white p-4 rounded text-sm">
            <p>Please pay <strong>${fees[chain]}</strong> to:</p>
            <p className="break-all">{paymentAddresses[chain]}</p>
            <button
              onClick={handleVerifyPayment}
              className="w-full bg-green-600 hover:bg-green-700 py-2 rounded mt-2"
            >
              Verify Payment
            </button>
          </div>
        )}

        {error && (
          <div className="mt-4 bg-red-700 text-white p-2 rounded text-sm">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-4 bg-zinc-700 p-4 rounded text-sm">
            <p className="font-bold">Scan Results:</p>
            <p>Address: {result.address}</p>
            <p>Chain: {result.chain}</p>
            <p>Risk Score: {result.riskScore}</p>
            {result.transactions.map((tx, index) => (
              <div key={index} className="mt-2">
                <p>{tx.date} - {tx.transactionId} - {tx.amount}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
