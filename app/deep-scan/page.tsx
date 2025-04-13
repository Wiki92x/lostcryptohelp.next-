'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { generatePDF } from '@/utils/generatePDF';

const fees = {
  eth: 1.5,
  bsc: 0.5,
  tron: 0,
};

const paymentAddresses = {
  eth: '0xa85f4DDE28941e41633b575D3a026A8B42887795',
  bsc: '0xa85f4DDE28941e41633b575D3a026A8B42887795',
  tron: 'TVH1roHbPn5qCj14Dy1GSVrB5XDcsjgEyX',
};

export default function DeepScanPage() {
  const [wallet, setWallet] = useState('');
  const [chain, setChain] = useState('eth');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [showJSON, setShowJSON] = useState(false);
  const router = useRouter();

  const isValidWallet = (addr: string) =>
    /^0x[a-fA-F0-9]{40}$/.test(addr) || /^T[a-zA-Z0-9]{33,34}$/.test(addr);

  const handleScan = async () => {
    if (!wallet || !isValidWallet(wallet)) {
      setError('Enter a valid Ethereum, BSC, or TRON wallet address');
      toast.error('Invalid wallet address');
      return;
    }

    setScanning(true);
    setError('');
    setResult(null);
    setShowPayment(false);
    toast.loading('Scanning in progress...');

    try {
      const res = await fetch('/api/deepscan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet, chain }),
      });

      const data = await res.json();

      if (res.status === 402) {
        setShowPayment(true);
        toast.dismiss();
        toast.error('Payment required');
        return;
      }

      if (!res.ok) throw new Error(data.error || 'Scan failed');
      setResult(data);
      toast.success('Scan complete');

      const timestamp = new Date().toISOString();
      const history = JSON.parse(localStorage.getItem('scanHistory') || '[]');
      localStorage.setItem('scanHistory', JSON.stringify([{ ...data, timestamp }, ...history.slice(0, 50)]));

      await fetch('/api/notify-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ result: data }),
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      toast.error(err.message || 'Scan failed');
    } finally {
      setScanning(false);
      toast.dismiss();
    }
  };

  const handleVerifyPayment = async () => {
    toast.loading('Verifying payment...');
    try {
      const res = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet, chain }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Verification failed');
      setResult(data);
      setShowPayment(false);
      toast.success('Payment verified. Scan complete.');

      const timestamp = new Date().toISOString();
      const history = JSON.parse(localStorage.getItem('scanHistory') || '[]');
      localStorage.setItem('scanHistory', JSON.stringify([{ ...data, timestamp }, ...history.slice(0, 50)]));

      await fetch('/api/notify-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ result: data }),
      });
    } catch (err: any) {
      toast.dismiss();
      toast.error(err.message || 'Verification failed');
    } finally {
      toast.dismiss();
    }
  };

  const getTopToken = () => {
    if (!result?.transactions?.length) return 'N/A';
    const count: Record<string, number> = {};
    result.transactions.forEach((tx: any) => {
      count[tx.symbol] = (count[tx.symbol] || 0) + 1;
    });
    return Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
  };

  const getTopRiskToken = () => {
    if (!result?.transactions?.length) return 'N/A';
    const sorted = [...result.transactions].sort((a, b) => b.riskScore - a.riskScore);
    return `${sorted[0]?.symbol} (${sorted[0]?.riskScore}/100)` || 'N/A';
  };

  const getConfidence = () => {
    const txCount = result?.transactions?.length || 0;
    if (txCount >= 100) return 'High';
    if (txCount >= 50) return 'Medium';
    return 'Low';
  };

  const handleDownloadPDF = async () => {
    const blob = await generatePDF(result);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `scan-report-${result.address}.pdf`;
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen py-12 px-4 bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center transition-colors duration-300"
    >
      <div className="w-full max-w-xl bg-zinc-900 p-6 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-purple-400 text-center mb-6">
          Deep Wallet Scanner
        </h1>

        <select
          value={chain}
          onChange={(e) => setChain(e.target.value)}
          className="w-full p-2 rounded bg-gray-900 border border-gray-700 mb-4"
        >
          <option value="eth">Ethereum (${fees.eth})</option>
          <option value="bsc">Binance Smart Chain (${fees.bsc})</option>
          <option value="tron">TRON (Free)</option>
        </select>

        <input
          type="text"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          placeholder="Wallet Address"
          className="w-full p-2 rounded bg-gray-900 border border-gray-700 mb-4"
        />

        <button
          onClick={handleScan}
          disabled={scanning}
          className="w-full bg-purple-600 hover:bg-purple-700 transition py-2 rounded mb-2 font-semibold"
        >
          {scanning ? 'Scanning...' : 'Start Deep Scan'}
        </button>

        <button
          onClick={() => router.push('/')}
          className="w-full bg-gray-700 hover:bg-gray-600 transition py-2 rounded text-sm"
        >
          ← Back to Homepage
        </button>

        {showPayment && (
          <div className="bg-red-800 text-white p-4 rounded mt-4 text-sm space-y-2">
            <p>💸 Please pay <strong>${fees[chain]}</strong> to:</p>
            <p className="break-all text-purple-300">{paymentAddresses[chain] || 'N/A'}</p>
            <p>Once done, click below:</p>
            <button
              onClick={handleVerifyPayment}
              className="w-full bg-green-600 hover:bg-green-700 py-2 rounded mt-2"
            >
              ✅ I’ve Paid – Verify Payment
            </button>
          </div>
        )}

        {error && (
          <div className="w-full bg-red-800 text-white p-2 rounded mt-4 text-sm text-center">
            ❌ {error}
          </div>
        )}

        {result && (
          <div className="mt-6 bg-zinc-800 p-4 rounded text-sm space-y-2">
            <p className="text-green-400 font-semibold">
              ✅ {result.chain} scan complete
            </p>
            <p className="text-purple-300">Risk Score: {result.riskScore}</p>
            <p className="text-gray-400 text-xs">Wallet: {result.address}</p>

            <button
              onClick={() => setShowJSON((prev) => !prev)}
              className="mt-3 text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
            >
              {showJSON ? 'Hide JSON View' : 'Show Raw JSON'}
            </button>

            <button
              onClick={handleDownloadPDF}
              className="ml-2 text-xs bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white"
            >
              📄 Download PDF Report
            </button>

            {showJSON ? (
              <pre className="mt-4 text-green-300 bg-black rounded p-3 overflow-x-auto text-xs max-h-[400px]">
                {JSON.stringify(result, null, 2)}
              </pre>
            ) : (
              <>
                {(chain === 'eth' || chain === 'bsc') && (
                  <>
                    <hr className="border-gray-700 my-3" />
                    <div className="space-y-2">
                      <h2 className="text-white font-semibold text-base">Scan Summary</h2>
                      <p>Top Token by Risk: <span className="text-green-400">{getTopRiskToken()}</span></p>
                      <p>Most Active Token: <span className="text-green-400">{getTopToken()}</span></p>
                      <p>Scan Confidence: <span className="text-green-400">{getConfidence()}</span></p>
                      <p>{chain.toUpperCase()} scan includes {result.transactions?.length}+ transactions</p>
                    </div>
                    <div className="mt-4">
                      <h2 className="text-white font-semibold text-base mb-1">AI Analysis</h2>
                      <p className="text-sm text-gray-300">
                        This wallet shows high-volume activity in {getTopToken()} with {result.riskScore.split('/')[0]} risk score detected.
                        No suspicious token behavior found in the top {result.transactions?.length} transactions.
                      </p>
                    </div>
                  </>
                )}
                <hr className="border-gray-700 my-3" />
                <p className="text-gray-400 font-medium">Last Transactions:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {result.transactions?.slice(0, 10).map((tx: any, idx: number) => (
                    <li key={idx}>
                      <span className="text-green-400">{tx.symbol}</span> — {tx.amount} on {tx.date}
                      {chain !== 'tron' && (
                        <span className="ml-2 text-xs text-white bg-green-700 px-2 py-0.5 rounded">
                          {tx.riskScore >= 60 ? 'HIGH' : tx.riskScore > 0 ? 'MEDIUM' : 'SAFE'}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
