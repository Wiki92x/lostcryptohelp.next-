'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import toast from 'react-hot-toast';

const plans = [
  {
    name: 'Basic',
    price: '5',
    chain: 'bsc',
    features: ['Access TRON & BSC reports', 'Telegram alerts', 'PDF export'],
  },
  {
    name: 'Pro',
    price: '10',
    chain: 'eth',
    features: ['All Basic features', 'ETH + Cross-chain deep scans', 'Unlimited access'],
  },
];

export default function MembershipPage() {
  const { address } = useAccount();
  const [txHash, setTxHash] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleVerify = async (chain: string) => {
    if (!txHash || !address) return toast.error('Missing details');
    setSubmitting(true);

    try {
      const res = await fetch(`/api/verify-membership`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chain, txHash, wallet: address }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success('Membership Activated!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-16 bg-black text-white">
      <h1 className="text-3xl font-bold text-center text-purple-400 mb-10">Membership Plans</h1>
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div key={plan.name} className="bg-zinc-900 border border-zinc-700 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-purple-300">{plan.name} - ${plan.price}</h2>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              {plan.features.map((f, i) => (
                <li key={i}>• {f}</li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 mt-3">Send ${plan.price} in {plan.chain.toUpperCase()} to:</p>
            <p className="text-sm text-green-400 break-all mb-4">
              {plan.chain === 'eth' ? '0xa85f4DDE28941e41633b575D3a026A8B42887795' : '0xa85f4DDE28941e41633b575D3a026A8B42887795'}
            </p>
            <input
              type="text"
              placeholder="Your TX Hash"
              value={txHash}
              onChange={(e) => setTxHash(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800 mb-3"
            />
            <button
              onClick={() => handleVerify(plan.chain)}
              disabled={submitting}
              className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded"
            >
              {submitting ? 'Verifying...' : 'Activate Membership'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
