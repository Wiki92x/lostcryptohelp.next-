'use client';

import React from 'react';
import { useTheme } from 'next-themes';

export default function TokenBadgeGroup({ tokens }: { tokens: any[] }) {
  const { resolvedTheme } = useTheme();

  if (!tokens?.length) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="mt-4 bg-[var(--card)] border border-[var(--border)] p-4 rounded-xl shadow-sm">
      <h3 className="text-purple-400 font-bold text-sm mb-3">🏷️ Token Exposure</h3>
      <div className="flex flex-wrap gap-2">
        {tokens.map((token, i) => (
          <span
            key={i}
            className={`px-3 py-1 rounded-full text-xs font-medium border ${
              isDark
                ? 'bg-zinc-800 text-zinc-100 border-zinc-700'
                : 'bg-zinc-100 text-zinc-800 border-zinc-300'
            }`}
          >
            {token.symbol} — {Number(token.balance).toFixed(4)}
          </span>
        ))}
      </div>
    </div>
  );
}