'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'lucide-react';

export default function ThankYouPage() {
  const [result, setResult] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('scanResult');
    if (stored) setResult(JSON.parse(stored));
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">No scan result found. Please run a scan first.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-purple-400">🔍 Scan Complete</h1>
        <p className="text-gray-300">Here are the results of your wallet scan:</p>

        <div className="bg-zinc-900 p-4 rounded-lg space-y-2">
          <div><span className="font-semibold">Wallet:</span> {result.address}</div>
          <div><span className="font-semibold">Chain:</span> {result.chain}</div>
          <div><span className="font-semibold">Risk Score:</span> {result.riskScore}</div>
        </div>

        <h2 className="text-xl font-semibold mt-6 text-purple-300">📋 Recent Transactions</h2>
        <table className="w-full text-sm text-left border border-gray-700 rounded-md overflow-hidden">
          <thead className="bg-gray-800 text-purple-200">
            <tr>
              <th className="p-2">Date</th>
              <th className="p-2">Token</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Tx Hash</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900">
            {result.transactions.map((tx: any, i: number) => (
              <tr key={i} className="border-t border-gray-700">
                <td className="p-2">{tx.date}</td>
                <td className="p-2">{tx.token} ({tx.symbol})</td>
                <td className="p-2">{tx.amount}</td>
                <td className="p-2">
                  <a
                    href={`https://${
                      result.chain.toLowerCase() === 'eth'
                        ? 'etherscan.io'
                        : result.chain.toLowerCase() === 'bsc'
                        ? 'bscscan.com'
                        : 'tronscan.org'
                    }/tx/${tx.transactionId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {tx.transactionId.slice(0, 6)}...{tx.transactionId.slice(-4)}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={() => router.push('/')}
          className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
        >
          <ArrowLeft className="inline-block mr-2" size={18} />
          Back to Homepage
        </button>
      </div>
    </div>
  );
}
