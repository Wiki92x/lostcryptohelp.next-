// ✅ ThreatStatsPanel.tsx — Animated Stats Display (Dark/Neon Ready)
'use client';

import { motion } from 'framer-motion';
import { ShieldAlert, Activity, Zap } from 'lucide-react';

const stats = [
  {
    icon: <ShieldAlert className="text-red-500 w-5 h-5" />, label: 'Active Threats', value: '217'
  },
  {
    icon: <Zap className="text-yellow-400 w-5 h-5" />, label: 'AI Detections (24h)', value: '58'
  },
  {
    icon: <Activity className="text-green-500 w-5 h-5" />, label: 'Avg. Response Time', value: '1.2s'
  },
];

export default function ThreatStatsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full"
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          className="rounded-xl border border-zinc-700 bg-zinc-900 text-white p-4 shadow-lg hover:border-blue-500 transition duration-300"
        >
          <div className="flex items-center gap-3">
            {stat.icon}
            <div className="text-sm text-zinc-400">{stat.label}</div>
          </div>
          <div className="text-2xl font-bold mt-2 text-blue-400">{stat.value}</div>
        </div>
      ))}
    </motion.div>
  );
}
