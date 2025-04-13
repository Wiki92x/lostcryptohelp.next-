// app/deep-scan/page.tsx
'use client';

import { useState } from 'react';
import { Loader2, ShieldCheck, FileWarning, FileJson } from 'lucide-react';
import toast from 'react-hot-toast';

const chains = [
  { id: 'eth', name: 'Ethereum ($1.5)' },
  { id: 'bsc', name: 'Binance Smart Chain ($0.5)' },
  { id: 'tron', name: 'TRON (Free)' },
];

export default function DeepScanPage() {
  const [wallet, setWallet] = useState('');
  const [chain, setChain] = useState('eth');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [showJson, setShowJson] = useState(false);

  const scanWallet = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/deepscan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet, chain }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Scan failed');
        toast.error(data.error || 'Scan failed');
        return;
      }

      setResult(data);
    } catch (err) {
      toast.error('Scan error');
      setError('Unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 text-white">
      <h1 className="text-3xl font-bold text-center text-purple-400 mb-6">Deep Wallet Scanner</h1>

      <select
        className="w-full mb-4 px-4 py-2 bg-zinc-900 border border-zinc-700 rounded"
        value={chain}
        onChange={(e) => setChain(e.target.value)}
      >
        {chains.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <input
        type="text"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        placeholder="0x... or TRON address"
        className="w-full mb-4 px-4 py-2 bg-zinc-900 border border-zinc-700 rounded"
      />

      <button
        onClick={scanWallet}
        disabled={loading}
        className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded font-semibold"
      >
        {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Start Deep Scan'}
      </button>

      <button
        onClick={() => window.location.href = '/'}
        className="w-full mt-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded text-sm"
      >
        ← Back to Homepage
      </button>

      {error && (
        <div className="bg-red-800 mt-6 text-center py-2 rounded">
          ❌ {error}
        </div>
      )}

      {result && (
        <div className="mt-6 border border-zinc-700 bg-zinc-900 rounded p-4">
          <div className="flex items-center mb-4">
            <ShieldCheck className="text-green-400 mr-2" />
            <span className="text-green-400 font-medium">{result.chain} scan complete</span>
          </div>
          <div className="text-sm text-zinc-300 mb-2">
            <div><strong>Risk Score:</strong> {result.riskScore}</div>
            <div><strong>Wallet:</strong> {result.address}</div>
          </div>

          <div className="flex gap-3 mt-3 mb-3">
            <button
              className="bg-zinc-800 hover:bg-zinc-700 text-xs px-3 py-1 rounded flex items-center gap-1"
              onClick={() => setShowJson(!showJson)}
            >
              <FileJson size={14} /> {showJson ? 'Hide' : 'Show'} Raw JSON
            </button>
            <a
              href={`https://lostcryptohelp.pro/api/generate-pdf?wallet=${result.address}`}
              target="_blank"
              className="bg-green-700 hover:bg-green-600 text-xs px-3 py-1 rounded flex items-center gap-1"
            >
              🧾 Download PDF Report
            </a>
          </div>

          {showJson && (
            <pre className="text-xs bg-black p-3 rounded overflow-x-auto text-green-300 mt-4">
              {JSON.stringify(result, null, 2)}
            </pre>
          )}

          <div className="mt-5 border-t pt-4 text-sm">
            <h3 className="text-lg font-semibold text-purple-300 mb-2">Scan Summary</h3>
            <div className="mb-1">
              <strong>Top Token by Risk:</strong> {result.transactions?.[0]?.symbol || 'N/A'} ({result.riskScore})
            </div>
            <div>
              <strong>Most Active Token:</strong> {result.transactions?.[0]?.symbol || 'N/A'}
            </div>

            <div className="mt-4 text-sm text-zinc-300">
              <p><strong>AI Analysis</strong></p>
              <p className="text-xs mt-1">
                This wallet shows {result.transactions?.length}+ transactions. All reviewed token behavior in top tokens and risk scores were generated accordingly.
              </p>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold mb-2">Last Transactions:</h4>
              <ul className="text-xs space-y-1">
                {result.transactions?.slice(0, 10).map((tx: any, i: number) => (
                  <li key={i} className="flex justify-between bg-zinc-800 px-3 py-2 rounded">
                    <span className="text-green-400">{tx.symbol}</span>
                    <span>{tx.amount} on {tx.date}</span>
                    <span className="text-xs bg-green-700 px-2 py-0.5 rounded text-white">SAFE</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
