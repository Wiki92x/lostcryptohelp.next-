'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function TokenRevoker({ wallet, chain }: { wallet: string; chain: string }) {
  const [loading, setLoading] = useState(false);
  const [approvals, setApprovals] = useState<any[]>([]);

  const fetchApprovals = async () => {
    if (!wallet || !chain) {
      toast.error('Wallet or chain not provided.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/revoke-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet, chain }),
      });
      const data = await res.json();

      if (res.ok) {
        setApprovals(data.approvals || []);
        if (!data.approvals || data.approvals.length === 0) {
          toast.success('No risky approvals found');
        }
      } else {
        toast.error(data.error || 'Error loading approvals');
      }
    } catch (err) {
      toast.error('Failed to load approvals');
    } finally {
      setLoading(false);
    }
  };

  const revoke = async (token: string) => {
    toast.success(`Revoke not live — mock: ${token}`);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={fetchApprovals}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        disabled={loading}
      >
        {loading ? 'Scanning approvals...' : 'Scan Token Approvals'}
      </button>

      {approvals.length > 0 && (
        <div className="space-y-3">
          {approvals.map((item, idx) => (
            <div
              key={idx}
              className="bg-zinc-800 p-3 rounded flex justify-between items-center border border-zinc-700"
            >
              <div className="text-sm">
                <p className="font-medium text-white">{item.token}</p>
                <p className="text-zinc-400 text-xs">Spender: {item.spender}</p>
              </div>
              <button
                onClick={() => revoke(item.token)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
              >
                Revoke
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}