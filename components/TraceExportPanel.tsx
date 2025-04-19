// ✅ components/TraceExportPanel.tsx — Unified Export UI for DeepTrace
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function TraceExportPanel({ wallet, chain, riskScore, findings }: any) {
  const [downloading, setDownloading] = useState(false);
  const [pushing, setPushing] = useState(false);

  const downloadPDF = async () => {
    setDownloading(true);
    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet, chain, riskScore, findings })
      });
      const { filename } = await res.json();
      window.open(`/api/download-pdf?file=${filename}`, '_blank');
    } catch (e) {
      alert('PDF generation failed');
    } finally {
      setDownloading(false);
    }
  };

  const sendTelegram = async () => {
    setPushing(true);
    try {
      await fetch('/api/send-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet, chain, riskScore, findings })
      });
      alert('Pushed to Telegram');
    } catch (e) {
      alert('Telegram failed');
    } finally {
      setPushing(false);
    }
  };

  return (
    <div className="mt-6 bg-zinc-900 p-4 border border-zinc-700 rounded-xl">
      <h3 className="text-sm font-bold text-white mb-3">📦 Export This DeepTrace Report</h3>
      <div className="flex flex-wrap gap-3">
        <Button onClick={downloadPDF} disabled={downloading}>
          {downloading ? 'Generating PDF...' : '📄 Download PDF'}
        </Button>
        <Button variant="secondary" onClick={sendTelegram} disabled={pushing}>
          {pushing ? 'Pushing...' : '📤 Send to Telegram'}
        </Button>
        <a
          href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify({ wallet, chain, riskScore, findings }, null, 2))}`}
          download={`deeptrace-${wallet.slice(0, 6)}.json`}
          className="px-4 py-2 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-sm"
        >
          ⬇️ Download JSON
        </a>
      </div>
    </div>
  );
}
