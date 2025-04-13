// ✅ app/scan-history/page.tsx
'use client';

import { useEffect, useState } from 'react';

export default function ScanHistory() {
  const [scans, setScans] = useState([
    { wallet: '0xabc123...', score: 5, status: 'Scam', time: '2025-04-03 10:12' },
    { wallet: '0x456def...', score: 2, status: 'Safe', time: '2025-04-03 09:47' },
    { wallet: 'bnb1xyz...', score: 4, status: 'Warning', time: '2025-04-03 09:15' },
  ]);

  useEffect(() => {
    // Future: Fetch real data here
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-12 transition-colors">
      <h1 className="text-3xl font-bold mb-6 text-purple-400 text-center">📜 Scan History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-zinc-900 rounded-md shadow-md text-sm">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="p-3">Wallet</th>
              <th className="p-3">Risk Score</th>
              <th className="p-3">Status</th>
              <th className="p-3">Scanned At</th>
            </tr>
          </thead>
          <tbody>
            {scans.map((scan, index) => (
              <tr key={index} className="hover:bg-zinc-800">
                <td className="p-3">{scan.wallet}</td>
                <td className="p-3">{scan.score}</td>
                <td className="p-3">{scan.status}</td>
                <td className="p-3">{scan.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
