// components/TronUnlockPanel.tsx
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  onUnlock: () => void;
}

export default function TronUnlockPanel({ onUnlock }: Props) {
  const [txHash, setTxHash] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const verifyPayment = async () => {
    if (!txHash.trim()) return setError('Please enter a transaction hash');
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/verify-tron.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ txHash }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success('TRON payment verified!');
        onUnlock();
      } else {
        setError(data.reason || 'Payment verification failed');
      }
    } catch (err) {
      setError('Network error during verification');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-crystalDark border border-purple-600 rounded-lg p-4 mt-6">
      <p className="text-lg font-semibold mb-2 text-white">🔓 Unlock Full TRON Report</p>
      <p className="text-sm text-crystalText mb-4">
        To access the full PDF report, send at least <strong>0.5 USDT (TRC-20)</strong> to: <br />
        <span className="font-mono text-highlight">TM6HGn9p9ZEo525PATPZanYCA4W9nQezTv</span><br />
        and paste your transaction hash below to unlock.
      </p>

      <input
        type="text"
        placeholder="Enter TRC-20 transaction hash"
        className="w-full p-2 rounded bg-zinc-900 text-white border border-gray-700 mb-2"
        value={txHash}
        onChange={(e) => setTxHash(e.target.value)}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        onClick={verifyPayment}
        disabled={loading}
        className="bg-highlight text-black font-bold py-2 px-4 rounded mt-2 hover:bg-white"
      >
        {loading ? 'Verifying...' : 'Verify & Unlock'}
      </button>
    </div>
  );
}
