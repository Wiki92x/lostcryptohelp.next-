// ✅ components/DeepScanResult.tsx (DeepScan v2.0 UI Upgrade)
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Send, Unlock, Lock } from 'lucide-react';
import { generatePDF } from '@/utils/generatePDF';
import toast from 'react-hot-toast';

export default function DeepScanResult({ result }: { result: any }) {
  const [unlocked, setUnlocked] = useState(result?.chain === 'TRON');
  const [verifying, setVerifying] = useState(false);
  const [txHash, setTxHash] = useState('');

  const handleUnlock = async () => {
    setVerifying(true);
    try {
      const res = await fetch('/api/verify-tron', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ txHash }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('✅ Verified! Report unlocked');
        setUnlocked(true);
      } else {
        toast.error(data.reason || '❌ Invalid payment');
      }
    } catch {
      toast.error('❌ Verification failed');
    } finally {
      setVerifying(false);
    }
  };

  const handlePDF = () => {
    if (!result) return;
    generatePDF(result);
    toast.success('📄 PDF downloaded');
  };

  const handleTelegram = async () => {
    try {
      const res = await fetch('/api/telegram-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wallet: result.address,
          chain: result.chain,
          riskScore: result.riskScore,
          txCount: result.transactions.length,
          topToken: result.transactions?.[0]?.symbol || '',
        }),
      });
      if (res.ok) {
        toast.success('📲 Sent to Telegram');
      } else {
        toast.error('❌ Telegram failed');
      }
    } catch {
      toast.error('❌ Telegram request error');
    }
  };

  if (!result) return null;

  return (
    <div className="mt-8 bg-zinc-900 p-6 rounded-xl shadow-xl text-white">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-purple-400">🧠 DeepScan Summary</h2>
        <p className="text-sm text-gray-400">Wallet: {result.address}</p>
        <p className="text-sm text-gray-400">Chain: {result.chain}</p>
        <p className="text-sm text-gray-400">Risk Score: {result.riskScore}</p>
      </div>

      {result.chain === 'TRON' && !unlocked && (
        <div className="bg-red-900 border border-red-500 p-4 rounded mb-4">
          <p className="text-red-300 font-medium mb-2">🔒 Full Report Locked</p>
          <p className="text-sm mb-2">To unlock, send <strong>0.5 USDT</strong> to:</p>
          <p className="font-mono text-sm text-green-300 break-all">TM6HGn9p9ZEo525PATPZanYCA4W9nQezTv</p>
          <input
            type="text"
            placeholder="Paste TX Hash here"
            className="mt-3 w-full p-2 bg-zinc-800 rounded text-sm"
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
          />
          <Button onClick={handleUnlock} className="mt-3 w-full bg-green-600 hover:bg-green-700">
            {verifying ? 'Verifying...' : 'Unlock Full Report'} <Unlock className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {unlocked && (
        <>
          <div className="flex justify-between gap-4 mt-4">
            <Button onClick={handlePDF} className="w-full bg-blue-700 hover:bg-blue-800">
              Download PDF <Download className="ml-2 h-4 w-4" />
            </Button>
            <Button onClick={handleTelegram} className="w-full bg-teal-700 hover:bg-teal-800">
              Send to Telegram <Send className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-purple-300 mb-2">🧾 Transactions</h3>
            <div className="overflow-x-auto text-sm">
              <table className="min-w-full text-left border border-zinc-700">
                <thead className="bg-zinc-800 text-purple-400">
                  <tr>
                    <th className="py-2 px-3">Date</th>
                    <th className="py-2 px-3">Token</th>
                    <th className="py-2 px-3">Amount</th>
                    <th className="py-2 px-3">TX Hash</th>
                  </tr>
                </thead>
                <tbody>
                  {result.transactions.map((tx, idx) => (
                    <tr key={idx} className="border-t border-zinc-700">
                      <td className="py-2 px-3">{tx.date}</td>
                      <td className="py-2 px-3">{tx.symbol}</td>
                      <td className="py-2 px-3">{tx.amount}</td>
                      <td className="py-2 px-3 font-mono truncate">{tx.transactionId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
