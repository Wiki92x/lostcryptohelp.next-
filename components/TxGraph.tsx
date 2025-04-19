'use client';

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { useTheme } from 'next-themes';

export default function TxGraph({ txs }: { txs: any[] }) {
  const { resolvedTheme } = useTheme();

  if (!txs?.length) return null;

  const data = txs.slice(0, 20).map((tx, i) => ({
    index: i + 1,
    value: Number(tx.value || 0) / 1e18,
  }));

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="mt-4 bg-[var(--card)] border border-[var(--border)] p-4 rounded-xl shadow-inner">
      <h3 className="text-blue-400 font-bold text-sm mb-2">📊 Transaction Flow</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="index" stroke={isDark ? '#ccc' : '#444'} />
          <YAxis stroke={isDark ? '#ccc' : '#444'} />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#18181b' : '#fff',
              borderColor: isDark ? '#3f3f46' : '#e5e7eb',
              borderRadius: '8px',
              fontSize: '13px',
            }}
            labelStyle={{ color: isDark ? '#e5e7eb' : '#111827' }}
          />
          <Line type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}