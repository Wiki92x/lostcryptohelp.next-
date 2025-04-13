'use client';

import { useEffect, useState } from 'react';
import { generatePDF } from '@/utils/generatePDF';
import { motion } from 'framer-motion';

interface Scan {
  address: string;
  chain: string;
  riskScore: string;
  timestamp: string;
  transactions: any[];
}

export default function ScanHistoryPage() {
  const [history, setHistory] = useState<Scan[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem('scanHistory');
    if (raw) {
      setHistory(JSON.parse(raw));
    }
  }, []);

  const handleDownload = (scan: Scan) => {
    generatePDF(scan);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen px-6 py-16 bg-black text-white"
    >
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-400 mb-8">🔁 Scan History</h1>

        {history.length === 0 ? (
          <p className="text-gray-500">No scans found yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-zinc-700">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-zinc-800 text-purple-300">
                <tr>
                  <th className="p-3">Wallet</th>
                  <th className="p-3">Chain</th>
                  <th className="p-3">Score</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-zinc-900">
                {history.map((scan, i) => (
                  <tr key={i} className="border-t border-zinc-800">
                    <td className="p-3 font-mono">{scan.address.slice(0, 10)}...</td>
                    <td className="p-3">{scan.chain}</td>
                    <td className={`p-3 font-bold ${parseInt(scan.riskScore) >= 70 ? 'text-red-500' : 'text-green-400'}`}>
                      {scan.riskScore}
                    </td>
                    <td className="p-3 text-gray-400">{scan.timestamp}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDownload(scan)}
                        className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
                      >
                        📄 PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
}
