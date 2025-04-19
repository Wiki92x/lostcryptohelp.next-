'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function MembershipForm() {
  const [chain, setChain] = useState('eth');
  const [txHash, setTxHash] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  const handleVerify = async () => {
    if (!txHash) return toast.error('Enter TX Hash');

    try {
      const res = await fetch(`/api/verify-membership`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chain, txHash }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Verification failed');
      toast.success('Access granted');
      setUnlocked(true);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-zinc-900 p-6 rounded-xl text-white">
      <h1 className="text-2xl font-bold text-purple-400 mb-4">🎟️ Membership Access</h1>

      <select
        className="w-full p-2 mb-4 bg-zinc-800 rounded"
        value={chain}
        onChange={(e) => setChain(e.target.value)}
      >
        <option value="eth">Ethereum ($25)</option>
        <option value="bsc">BNB ($10)</option>
        <option value="tron">TRON ($10)</option>
      </select>

      <input
        type="text"
        placeholder="Enter Payment TX Hash"
        className="w-full p-2 mb-4 bg-zinc-800 rounded"
        value={txHash}
        onChange={(e) => setTxHash(e.target.value)}
      />

      <button
        onClick={handleVerify}
        className="w-full py-2 bg-green-600 hover:bg-green-700 rounded mb-4"
      >
        🔐 Verify & Unlock Access
      </button>

      {unlocked && (
        <div className="text-green-400 font-semibold text-center">
          ✅ Membership unlocked. Access granted!
        </div>
      )}
    </div>
  );
}
