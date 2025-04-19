'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function TronUnlockPanel({ wallet, transactions, riskScore }: any) {
  const [txHash, setTxHash] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleVerify = async () => {
    if (!txHash) return toast.error('Enter your TRON transaction hash');
    setVerifying(true);
    try {
      const res = await fetch('/api/verify-tron', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ txHash }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Payment verified. Report unlocked.');
        setUnlocked(true);
      } else {
        toast.error(data.reason || 'Verification failed');
      }
    } catch (err) {
      toast.error('Verification error');
    } finally {
      setVerifying(false);
    }
  };

  const handleTelegram = async () => {
    await fetch('/api/telegram-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wallet, chain: 'TRON', riskScore, txCount: transactions.length }),
    });
    toast.success('Sent to Telegram');
  };

  const handleDownload = async () => {
    const res = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: wallet, chain: 'TRON', riskScore, transactions }),
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tron-scan-report.pdf';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-700 rounded-md p-4 mt-6 space-y-4">
      {transactions?.length > 0 && (
        <div>
          <p className="font-semibold text-purple-400 mb-2">🔍 Last 10 TRON Transactions:</p>
          <ul className="text-sm max-h-40 overflow-auto bg-zinc-800 text-white p-2 rounded">
            {transactions.slice(0, 10).map((tx: any, idx: number) => (
              <li key={idx} className="py-1 border-b border-zinc-700">
                {tx.hash?.slice(0, 24)}... ↗ {tx.contractRet}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!unlocked ? (
        <>
          <p className="font-medium">🔓 Unlock Full TRON Report</p>
          <input
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white"
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
            placeholder="Enter TRC-20 TX hash"
          />
          <button
            onClick={handleVerify}
            disabled={verifying}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            {verifying ? 'Verifying...' : 'Verify Payment'}
          </button>
        </>
      ) : (
        <>
          <p className="text-green-400 font-semibold">✅ Verified. You can now download the full report or send it to Telegram.</p>
          <div className="flex space-x-4 mt-2">
            <button
              onClick={handleDownload}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Download PDF
            </button>
            <button
              onClick={handleTelegram}
              className="bg-green-600 text-white px-4