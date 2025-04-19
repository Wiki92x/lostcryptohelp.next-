'use client';

import { useEffect, useState } from 'react';
import TxGraph from '@/components/TxGraph';
import TokenBadgeGroup from '@/components/TokenBadgeGroup';

export default function InsightSummary({ result }: { result: any }) {
  const [summary, setSummary] = useState('Loading AI insight...');
  const [gated, setGated] = useState(false);

  useEffect(() => {
    const fetchInsight = async () => {
      try {
        const res = await fetch('/api/ai-insight', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            wallet: result.wallet,
            chain: result.chain,
            findings: result.findings,
          }),
        });
        const data = await res.json();
        if (res.status === 403) {
          setGated(true);
          setSummary('🔒 Upgrade to Premium to unlock AI insight.');
        } else {
          setSummary(data.aiInsight || 'AI insight unavailable.');
        }
      } catch {
        setSummary('AI insight unavailable.');
      }
    };

    fetchInsight();
  }, [result]);

  return (
    <div className="space-y-6 mt-8">
      <div className="rounded-xl p-5 border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] shadow-sm">
        <h2 className="text-md font-semibold text-pink-400 mb-2">🧠 AI Insight Summary</h2>
        <p className="text-sm mb-3 text-[var(--muted-foreground)]">{summary}</p>

        {gated && (
          <a
            href="/pricing"
            className="inline-block mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
          >
            View Membership Plans
          </a>
        )}
      </div>

      {result?.txs?.length > 0 && <TxGraph txs={result.txs} />}
      {result?.tokens?.length > 0 && <TokenBadgeGroup tokens={result.tokens} />}
    </div>
  );
}
