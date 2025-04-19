'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

interface ScanRecord {
  wallet: string;
  chain: string;
  timestamp: string;
}

export default function ScanHistoryPage() {
  const [history, setHistory] = useState<ScanRecord[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('scanHistory');
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-500 mb-6 flex items-center gap-2">
          <FaSearch className="text-xl" /> Scan History
        </h1>

        {history.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center text-zinc-400 py-20"
          >
            No scans found in this browser.
          </motion.div>
        ) : (
          <div className="bg-[var(--card)] border border-[var(--border)] shadow-md rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[var(--muted)] text-left">
                <tr>
                  <th className="px-4 py-3">Wallet</th>
                  <th className="px-4 py-3">Chain</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {history.map((record, idx) => (
                  <tr key={idx} className="border-t border-[var(--border)]">
                    <td className="px-4 py-3 text-blue-400">{record.wallet}</td>
                    <td className="px-4 py-3 uppercase">{record.chain}</td>
                    <td className="px-4 py-3 text-sm text-zinc-400">
                      {new Date(record.timestamp).toLocaleString()}
                    </td>
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