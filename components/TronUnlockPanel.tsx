// components/DeepScanResult.jsx
import React, { useState } from 'react';
import { generatePDF } from '@/utils/generatePDF';

export default function DeepScanResult({ scanData, chain }) {
  const [unlocked, setUnlocked] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');

  const handleVerifyTron = async () => {
    setVerifying(true);
    setError('');

    try {
      const res = await fetch('/api/verify-tron', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ txHash }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setUnlocked(true);
      } else {
        setError(data.reason || 'Verification failed');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setVerifying(false);
    }
  };

  const handleDownloadPDF = async () => {
    const pdfBlob = await generatePDF(scanData);
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'deep-scan-report.pdf';
    link.click();
  };

  const handleSendTelegram = async () => {
    await fetch('/api/telegram-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(scanData),
    });
    alert('Report sent via Telegram');
  };

  const isTron = chain === 'tron';

  return (
    <div className="bg-white dark:bg-black p-6 rounded-xl shadow-xl max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Deep Scan Result</h2>

      {isTron && !unlocked && (
        <div className="mb-6 border border-yellow-400 rounded p-4 bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
          <p className="mb-2 font-medium">Free preview limited to last 10 transactions.</p>
          <p className="mb-4">Want full report? Please unlock below:</p>
          <input
            className="w-full border px-3 py-2 rounded text-black"
            placeholder="Enter your TRON TX hash"
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
          />
          <button
            onClick={handleVerifyTron}
            disabled={verifying}
            className="mt-3 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            {verifying ? 'Verifying...' : 'Verify & Unlock'}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      )}

      {(unlocked || chain !== 'tron') && (
        <div className="space-y-4">
          <div className="flex gap-4">
            <button
              onClick={handleDownloadPDF}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Download PDF
            </button>
            <button
              onClick={handleSendTelegram}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Send to Telegram
            </button>
          </div>
          {/* Render full scan data below */}
          <div className="overflow-x-auto mt-6 text-sm">
            <table className="w-full border border-gray-300 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="p-2">Date</th>
                  <th className="p-2">Token</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Score</th>
                </tr>
              </thead>
              <tbody>
                {scanData.transactions.map((tx, i) => (
                  <tr key={i} className="border-t border-gray-200 dark:border-gray-600">
                    <td className="p-2">{tx.date}</td>
                    <td className="p-2">{tx.token} ({tx.symbol})</td>
                    <td className="p-2">{tx.amount}</td>
                    <td className="p-2">{tx.riskScore}/100</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
