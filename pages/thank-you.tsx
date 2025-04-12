import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import { generatePDF } from '../utils/generatePDF';

interface ScanResult {
  address: string;
  chain: string;
  riskScore: string;
  transactions: Array<{ date: string; transactionId: string; amount: string }>;
}

const chains = [
  { id: 'eth', name: 'Ethereum ($1.5 USD)' },
  { id: 'bsc', name: 'Binance Smart Chain ($0.5 USD)' },
  { id: 'tron', name: 'TRON (Free)' },
];

export default function DeepScanPage() {
  const [wallet, setWallet] = useState('');
  const [chain, setChain] = useState('eth');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    toast.dismiss();
  }, []);

  const handleScanWithTelegram = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/deepscan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet, chain, telegramAlert: true }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Scan failed');

      localStorage.setItem('scanResult', JSON.stringify(data));
      toast.success('Scan completed! Redirecting...');
      router.push('/thank-you');
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 ${darkMode ? 'bg-gray-900' : 'bg-black'} text-${darkMode ? 'gray-200' : 'white'}`}>
      <button
        className="absolute top-5 right-5"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <SunIcon className="h-6 w-6 text-gray-300" /> : <MoonIcon className="h-6 w-6 text-gray-300" />}
      </button>
      <div className="max-w-xl w-full p-6 rounded-2xl shadow-lg bg-zinc-900">
        <h1 className="text-3xl font-bold text-center text-purple-400 mb-6">Deep Wallet Scanner</h1>
        <select className="w-full mb-4 p-2 bg-zinc-800 rounded text-white" value={chain} onChange={(e) => setChain(e.target.value)}>
          {chains.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input type="text" placeholder="Wallet Address" className="w-full mb-4 p-2 bg-zinc-800 rounded text-white" value={wallet} onChange={(e) => setWallet(e.target.value)} />
        <button className={`w-full py-2 bg-purple-600 hover:bg-purple-700 rounded flex justify-center items-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleScanWithTelegram} disabled={loading}>
          {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div> : 'Scan with Telegram Alert'}
        </button>
        <button className="w-full mt-2 py-2 bg-gray-600 hover:bg-gray-700 rounded" onClick={() => router.push('/')}>← Back to Homepage</button>
        {error && <div className="mt-4 p-2 text-red-500 bg-red-900 rounded">{error}</div>}
      </div>
    </div>
  );
}
