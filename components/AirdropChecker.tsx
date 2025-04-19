'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function AirdropChecker({ wallet }: { wallet: string }) {
  const [loading, setLoading] = useState(false);
  const [eligible, setEligible] = useState<any[]>([]);

  const checkAirdrops = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/airdrop-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet }),
      });
      const data = await res.json();
      if (res.ok) setEligible(data.projects || []);
      else toast.error(data.error || 'No airdrops found');
    } catch (err) {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={checkAirdrops}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 mb-4"
        disabled={loading}
      >
        {loading ? 'Checking...' : 'Check Airdrop Eligibility'}
      </button>

      {eligible.length > 0 && (
        <div className="space-y-2 bg-zinc-800 p-4 rounded text-sm text-white">
          {eligible.map((p, i) => (
            <div key={i} className="border-b border-zinc-700 pb-2">
              🎁 Eligible: {p.name} — Reward: {p.reward}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
