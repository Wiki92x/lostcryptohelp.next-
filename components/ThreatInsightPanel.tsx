// ✅ components/ThreatInsightPanel.tsx — AI-Powered Insight Summary
'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function ThreatInsightPanel({ wallet, chain }: { wallet: string; chain: string }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/ai-insight', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ wallet, chain })
        });
        const data = await res.json();
        setSummary(data.summary);
      } catch {
        setSummary('⚠️ Insight unavailable at this time.');
      } finally {
        setLoading(false);
      }
    };

    if (wallet && chain) fetchSummary();
  }, [wallet, chain]);

  return (
    <div className="mt-8 bg-zinc-900 p-4 border border-zinc-700 rounded-xl">
      <h3 className="text-sm font-bold text-purple-300 mb-2">🧠 AI-Powered Threat Summary</h3>
      {loading ? (
        <div className="flex items-center gap-2 text-zinc-400">
          <Loader2 className="animate-spin" size={16} /> Generating summary...
        </div>
      ) : (
        <p className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">{summary}</p>
      )}
    </div>
  );
}
