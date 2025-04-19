// ✅ /app/membership/page.tsx — Finalized Membership Tiers Page

'use client';

import { useState } from 'react';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$0',
    highlight: 'Free forever',
    features: ['TRON scan access', 'Limited AI summaries', 'Basic Telegram alerts'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$10 (BSC)',
    highlight: 'One-time wallet unlock',
    features: ['BSC scans', 'Stuck TX + Rugpull tools', 'JSON + Telegram exports'],
  },
  {
    id: 'elite',
    name: 'Elite',
    price: '$25 (ETH)',
    highlight: 'Full access',
    features: ['All features unlocked', 'AI PDF reports', 'Priority Telegram alerts'],
  },
];

export default function MembershipPage() {
  const [selected, setSelected] = useState('starter');

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] py-16 px-6">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-500">🧬 Membership Access</h1>
        <p className="text-sm text-zinc-400 mt-2">
          Choose a wallet membership to unlock advanced tools, risk reports, and secure insights.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelected(plan.id)}
            className={`border rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
              selected === plan.id ? 'border-green-400 shadow-glow' : 'border-zinc-700'
            } bg-zinc-900 hover:border-blue-500`}
          >
            <h2 className="text-2xl font-semibold text-white mb-1">{plan.name}</h2>
            <p className="text-sm text-zinc-400 mb-2">{plan.highlight}</p>
            <div className="text-3xl font-bold text-blue-400 mb-4">{plan.price}</div>
            <ul className="text-sm text-zinc-300 space-y-2 mb-6">
              {plan.features.map((feat, i) => (
                <li key={i}>✅ {feat}</li>
              ))}
            </ul>
            <button
              disabled={selected !== plan.id}
              className={`w-full py-2 rounded-lg font-semibold ${
                selected === plan.id
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              {plan.price === '$0' ? 'Activated' : 'Pay & Activate'}
            </button>
          </div>
        ))}
      </div>

      <div className="text-xs text-center text-zinc-500 mt-12">
        Need help? Contact us via Telegram at @lostcryptohelp_bot
      </div>
    </div>
  );
}