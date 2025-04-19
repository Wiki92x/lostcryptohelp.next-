'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { usePremiumUser } from '@/hooks/usePremiumUser';
import { Loader2 } from 'lucide-react';

export default function AIContractScanner() {
  const { address } = useAccount();
  const isPremium = usePremiumUser(address || '');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [chain, setChain] = useState('eth');
  const [summary, setSummary] = useState('');

  const scan = async () => {
    setLoading(true);
    const res = await fetch('/api/analyze-contract', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wallet: address, token, chain }),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.error || 'Scan failed');
    setSummary(data.summary);
    setLoading(false);
  };

  if (!isPremium) {
    return (
      <div className="bg-zinc-800/30 border border-zinc-700 p-6 rounded-xl text-center">
        <h3 className="text-xl font-semibold mb-2">🔐 Premium Required</h3>
        <p className="text-zinc-400 mb-4">
          AI Smart Contract Scan is only available to Premium users.
        </p>
        <a
          href="/pricing"
          className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 text-white px-5 py-2 rounded-lg"
        >
          Upgrade to Premium
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter Token Contract Address"
          className="flex-1 p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm"
        />
        <button
          onClick={scan}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm"
        >
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Scan'}
        </button>
      </div>

      {summary && (
        <div className="bg-zinc-900 border border-zinc-700 p-4 rounded-xl text-sm whitespace-pre-wrap">
          {summary}
        </div>
      )}
    </div>
  );
}