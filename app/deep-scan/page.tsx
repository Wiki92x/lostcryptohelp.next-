'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, RotateCcw, Ban, AlertTriangle, Lock } from 'lucide-react';

import TokenRevoker from '@/components/services/TokenRevoker';
import RugPullDetector from '@/components/services/RugPullDetector';
import GasRefundChecker from '@/components/services/GasRefundChecker';
import StuckTxFixer from '@/components/services/StuckTxFixer';
import JsonViewer from '@/components/JsonViewer';
import InsightSummary from '@/components/InsightSummary';

export default function DeepScanPage() {
  const [wallet, setWallet] = useState('');
  const [chain, setChain] = useState('eth');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const isValidWallet = (addr: string) =>
    /^0x[a-fA-F0-9]{40}$/.test(addr) || /^T[a-zA-Z0-9]{33,34}$/.test(addr) || /\.eth$/.test(addr);

  useEffect(() => {
    const input = document.getElementById('wallet-input');
    input && input.focus();
  }, []);

  const handleScan = async () => {
    if (!wallet || !isValidWallet(wallet)) {
      setError('Please enter a valid wallet address.');
      return;
    }

    setScanning(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/deepscan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet, chain })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Scan failed');
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-[var(--background)] text-[var(--foreground)] px-4 pb-20">
      <div className="max-w-6xl mx-auto pt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Panel */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-green-400" /> DeepTrace Forensic Scanner
          </h1>

          <select
            value={chain}
            onChange={(e) => setChain(e.target.value)}
            className="w-full p-2 rounded border bg-[var(--background)] border-zinc-400 mb-4"
          >
            <option value="eth">Ethereum</option>
            <option value="bsc">BNB Chain</option>
            <option value="tron">TRON</option>
          </select>

          <label htmlFor="wallet-input" className="text-sm font-medium text-white block mb-1">
            Wallet Address
          </label>
          <input
            id="wallet-input"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            placeholder="e.g. 0x742d...f44e or vitalik.eth"
            className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          />
          <p className="text-xs text-muted-foreground mb-4">
            Supports ENS and standard Ethereum addresses. No data is stored.
          </p>

          <button
            onClick={handleScan}
            disabled={!isValidWallet(wallet) || scanning}
            className="w-full py-3 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow"
          >
            {scanning ? 'Scanning...' : 'Start Wallet Scan'}
          </button>

          <button
            onClick={() => setWallet('0x742d35Cc6634C0532925a3b844Bc454e4438f44e')}
            className="w-full py-3 mt-2 rounded border border-blue-600 text-blue-400 hover:bg-blue-950"
          >
            Load Demo Wallet
          </button>

          {error && <p className="mt-4 text-red-500">{error}</p>}

          {result && (
            <div className="mt-8 animate-fade space-y-6">
              {/* Summary */}
              <div className="bg-zinc-800 rounded-xl shadow-lg p-6 border border-zinc-700">
                <h2 className="text-xl font-semibold text-green-400 mb-2">Risk Score: {result.risk_score || 0}/100</h2>
                <div className="text-sm text-zinc-300 mb-1">Scan completed {new Date().toLocaleTimeString()}</div>
                <div className="text-xs text-zinc-500 mb-4">
                  {result.risk_score <= 10
                    ? '🟢 Gold Wallet'
                    : result.risk_score <= 40
                    ? '🟡 Silver Wallet'
                    : '🔴 Bronze Wallet'}
                </div>
              </div>

              <InsightSummary result={result} />

              <div className="mt-6">
                <h2 className="font-bold text-zinc-200 text-md mb-2">Full JSON Result:</h2>
                <JsonViewer data={result} />
              </div>
            </div>
          )}

          {/* Tool Features */}
          <div className="mt-12 space-y-10">
            <div>
              <h2 className="text-lg font-bold text-yellow-400 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" /> Token Revoker
              </h2>
              <TokenRevoker wallet={wallet} chain={chain} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-orange-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Rug Pull Detector
              </h2>
              <RugPullDetector />
            </div>

            <div>
              <h2 className="text-lg font-bold text-red-400 mb-2 flex items-center gap-2">
                <RotateCcw className="w-4 h-4" /> Gas Refund Checker
              </h2>
              <GasRefundChecker wallet={wallet} chain={chain} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-pink-400 mb-2 flex items-center gap-2">
                <Ban className="w-4 h-4" /> Stuck TX Fixer
              </h2>
              <StuckTxFixer wallet={wallet} chain={chain} />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
            <h3 className="text-blue-400 font-semibold text-sm">Address of the Day</h3>
            <p className="text-sm text-zinc-400">
              0xAbc...123 has interacted with top 10 DeFi protocols safely for 900+ days.
            </p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
            <h3 className="text-purple-400 font-semibold text-sm">Token of the Day</h3>
            <p className="text-sm text-zinc-400">$SAFE is gaining cross-chain trust and transparency.</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
            <h3 className="text-yellow-300 font-semibold text-sm">Did You Know?</h3>
            <p className="text-sm text-zinc-400">Even unused dApps can leave approvals. Revoke them often.</p>
          </div>
        </div>
      </div>
    </div>
  );
}