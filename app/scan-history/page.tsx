'use client';

import { useEffect, useState } from 'react';

interface ScanItem {
  wallet: string;
  chain: string;
  score: string;
  scannedAt: string;
}

export default function ScanHistory() {
  const [history, setHistory] = useState<ScanItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('scanHistory');
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-500 mb-4">Scan History</h1>

        {history.length === 0 ? (
          <p className="text-gray-400">No scans recorded yet.</p>
        ) : (
          <div className="overflow-x-auto bg-zinc-900 p-4 rounded-xl border border-purple-600 shadow-lg">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="text-gray-400 border-b border-gray-700">
                <tr>
                  <th className="py-2 pr-4">Wallet</th>
                  <th className="py-2 pr-4">Chain</th>
                  <th className="py-2 pr-4">Risk Score</th>
                  <th className="py-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, idx) => (
                  <tr key={idx} className="border-t border-gray-800">
                    <td className="py-2 pr-4 font-mono">{item.wallet}</td>
                    <td className="py-2 pr-4">{item.chain}</td>
                    <td
                      className={`py-2 pr-4 font-semibold ${
                        item.score.includes('High') ? 'text-red-500' : 'text-green-400'
                      }`}
                    >
                      {item.score}
                    </td>
                    <td className="py-2 text-gray-400">{item.scannedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}