'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function TronUnlockPanel({ wallet }: { wallet: string }) {
  const [txHash, setTxHash] = useState('');
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!txHash.trim()) return toast.error('Enter TX hash');
    setLoading(true);
    try {
      const res = await fetch('/api/verify-tron', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ txHash }),
      });
      const json = await res.json();

      if (json.success) {
        setVerified(true);
        toast.success('TRON payment verified');
        await fetch('/api/telegram-report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            wallet,
            chain: 'TRON',
            txHash,
          }),
        });
      } else {
        toast.error(json.reason || 'Verification failed');
      }
    } catch (err) {
      toast.error('Error verifying TRON payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#111827] text-white p-6 rounded-lg shadow-md border border-purple-600 mt-8 max-w-xl mx-auto">
      <h2 className="text-lg font-bold mb-2">🔓 Unlock Full TRON Report</h2>
      <p className="text-sm text-gray-400 mb-4">
        Send at least <b>0.5 USDT (TRC-20)</b> to the address below, then paste your transaction hash.
      </p>
      <div className="bg-gray-800 px-4 py-2 rounded mb-4 text-sm break-all font-mono">
        {process.env.NEXT_PUBLIC_VERIFY_TRON_ADDRESS || 'TM6HGn9p9ZEo525PATPZanYCA4W9nQezTv'}
      </div>

      <input
        type="text"
        className="w-full px-4 py-2 rounded bg-black border border-gray-600 text-sm mb-3"
        placeholder="Paste TRC-20 Transaction Hash"
        value={txHash}
        onChange={(e) => setTxHash(e.target.value)}
        disabled={verified}
      />

      {!verified ? (
        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 transition px-4 py-2 rounded text-sm font-semibold"
        >
          {loading ? 'Verifying...' : 'Verify Payment'}
        </button>
      ) : (
        <div className="text-green-400 text-sm mt-3">
          ✅ Payment Verified. You can now download your report.
        </div>
      )}

      {verified && (
        <div className="mt-6 space-x-3">
          <button className="bg-blue-600 px-4 py-2 rounded text-sm hover:bg-blue-700">
            📄 Download PDF
          </button>
          <button className="bg-green-600 px-4 py-2 rounded text-sm hover:bg-green-700">
            📩 Send to Telegram
          </button>
        </div>
      )}
    </div>
  );
}
