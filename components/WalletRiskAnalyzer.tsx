'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function WalletRiskAnalyzer({ wallet, chain }: { wallet: string; chain: string }) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<any>(null);

  const analyzeWallet = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/wallet-risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet, chain }),
      });
      const data = await res.json();
      if (res.ok) setSummary(data);
      else toast.error(data.error || 'Risk scan failed');
    } catch (err) {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={analyzeWallet}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 mb-4"
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Analyze Wallet Risk'}
      </button>

      {summary && (
        <div className="bg-zinc-800 p-4 rounded text-sm text-white space-y-2">
          <p>Tokens: {summary.tokenCount}</p>
          <p>High Risk Tokens: {summary.highRisk}</p>
          <p>Avg Risk Score: {summary.avgScore}/100</p>
        </div>
      )}
    </div>
  );
}
