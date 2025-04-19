'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function DaoPage() {
  const [wallet, setWallet] = useState('');
  const [chain, setChain] = useState('eth');
  const [type, setType] = useState('scam');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!wallet || !desc) return toast.error('All fields are required');
    setLoading(true);
    try {
      const res = await fetch('/api/dao/create-case', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet, chain, type, desc }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success('Submitted to DAO');
      setWallet('');
      setDesc('');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-4 pt-28 pb-20">
      <div className="max-w-xl mx-auto rounded-xl border border-[var(--border)] bg-[var(--muted)] p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-blue-500 mb-6">
          Submit a Risk or Scam Case
        </h1>

        <input
          type="text"
          placeholder="0x... or T..."
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-md border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] placeholder:text-zinc-500"
        />

        <select
          value={chain}
          onChange={(e) => setChain(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-md border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)]"
        >
          <option value="eth">Ethereum</option>
          <option value="bsc">BNB Smart Chain</option>
          <option value="tron">TRON</option>
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-md border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)]"
        >
          <option value="scam">Scam / Rugpull</option>
          <option value="loss">Asset Loss</option>
          <option value="phishing">Phishing / Fake Airdrop</option>
          <option value="other">Other</option>
        </select>

        <textarea
          rows={5}
          placeholder="Describe what happened in full detail..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-md border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] placeholder:text-zinc-500"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Case to DAO'}
        </button>
      </div>
    </div>
  );
}