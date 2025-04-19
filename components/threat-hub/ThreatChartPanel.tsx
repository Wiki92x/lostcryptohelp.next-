// ✅ components/threat-hub/ThreatChartPanel.tsx
'use client';

import { Bar } from 'react-chartjs-2';
import { useMemo } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ThreatChartPanel({ threats }: { threats: any[] }) {
  const chartData = useMemo(() => {
    const typeCounts: Record<string, number> = {};

    threats.forEach(t => {
      typeCounts[t.type] = (typeCounts[t.type] || 0) + 1;
    });

    const labels = Object.keys(typeCounts);
    const data = Object.values(typeCounts);

    return {
      labels,
      datasets: [
        {
          label: 'Threats by Type',
          data,
          backgroundColor: '#3B82F6',
          borderRadius: 6,
        },
      ],
    };
  }, [threats]);

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#94a3b8',
        },
      },
      x: {
        ticks: {
          color: '#94a3b8',
        },
      },
    },
  };

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 shadow w-full">
      <h2 className="text-lg font-semibold text-blue-400 mb-4">📊 Threat Types Overview</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}