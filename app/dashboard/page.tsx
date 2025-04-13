'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('scanHistory');
    if (data) setHistory(JSON.parse(data));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-400 mb-4">🔎 Scan History</h1>
        {history.length === 0 ? (
          <p className="text-gray-500">No scans found.</p>
        ) : (
          <table className="w-full text-sm mt-6 border-t border-zinc-800">
            <thead>
              <tr className="text-gray-400 text-left">
                <th className="py-2 pr-4">Wallet</th>
                <th className="py-2 pr-4">Chain</th>
                <th className="py-2 pr-4">Score</th>
                <th className="py-2 pr-4">Top Token</th>
                <th className="py-2">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, idx) => (
                <tr key={idx} className="border-b border-zinc-800 text-white">
                  <td className="py-2 pr-4 font-mono">{item.address.slice(0, 8)}...</td>
                  <td className="py-2 pr-4">{item.chain}</td>
                  <td className="py-2 pr-4">{item.riskScore}</td>
                  <td className="py-2 pr-4">
                    {(() => {
                      const count: Record<string, number> = {};
                      item.transactions.forEach((tx: any) => {
                        count[tx.symbol] = (count[tx.symbol] || 0) + 1;
                      });
                      return Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
                    })()}
                  </td>
                  <td className="py-2 text-gray-400 text-xs">{item.timestamp.split('T')[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
