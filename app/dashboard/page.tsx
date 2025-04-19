// ✅ Restored & Polished Dashboard — Safe, Familiar, Upgraded
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    // Replace with your actual API or keep as-is for now
    setStats({
      totalScans: 17000,
      totalRisks: 4500,
      totalRevokes: 920,
      dailyScans: [
        { date: '2025-04-11', count: 120 },
        { date: '2025-04-12', count: 175 },
        { date: '2025-04-13', count: 140 },
        { date: '2025-04-14', count: 110 },
        { date: '2025-04-15', count: 150 },
        { date: '2025-04-16', count: 165 },
        { date: '2025-04-17', count: 180 },
      ],
      topTokens: ['FAKETOKEN', 'RUGME', 'SCAMINU']
    });
  }, []);

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-10">📊 Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard title="Wallets Scanned" value={stats?.totalScans} color="text-blue-400" />
        <StatCard title="Threats Detected" value={stats?.totalRisks} color="text-red-400" />
        <StatCard title="Approvals Revoked" value={stats?.totalRevokes} color="text-yellow-300" />
      </div>

      <Card className="mb-10">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4">📈 Scans Per Day</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats?.dailyScans || []}>
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="count" fill="#60a5fa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4">⚠️ Most Flagged Tokens</h2>
          <ul className="list-disc pl-6 text-sm text-red-400">
            {stats?.topTokens?.map((token: string, i: number) => (
              <li key={i}>{token}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}

function StatCard({ title, value, color }: { title: string; value: number; color: string }) {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <h3 className="text-sm text-muted-foreground mb-1">{title}</h3>
        <p className={`text-3xl font-bold ${color}`}>{value?.toLocaleString()}</p>
      </CardContent>
    </Card>
  );
}
