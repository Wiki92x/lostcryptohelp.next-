import { useEffect, useState } from 'react';

export default function ScanHistory() {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    // Simulated scan history data
    const mockHistory = [
      { wallet: '0xabc123...', score: 5, status: 'Scam', time: '2025-04-03 10:12' },
      { wallet: '0x456def...', score: 2, status: 'Safe', time: '2025-04-03 09:47' },
      { wallet: 'bnb1xyz...', score: 4, status: 'Warning', time: '2025-04-03 09:15' },
    ];
    setScans(mockHistory);
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Safe':
        return 'bg-green-500 text-white';
      case 'Warning':
        return 'bg-yellow-500 text-black';
      case 'Scam':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-400 mb-10 text-center">📜 Scan History</h1>

        <div className="overflow-x-auto rounded-2xl shadow-xl border border-gray-700">
          <table className="min-w-full bg-gray-900 rounded-xl overflow-hidden">
            <thead className="text-sm text-gray-300 uppercase bg-gray-800 border-b border-gray-700">
              <tr>
                <th className="p-4 text-left">Wallet</th>
                <th className="p-4 text-left">Risk Score</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Scanned At</th>
              </tr>
            </thead>
            <tbody>
              {scans.map((scan, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-800 transition border-b border-gray-800 last:border-none"
                >
                  <td className="p-4 font-mono text-sm">{scan.wallet}</td>
                  <td className="p-4">{scan.score}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(scan.status)}`}
                    >
                      {scan.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400">{scan.time}</td>
                </tr>
              ))}
              {scans.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-500">
                    No scan history found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
