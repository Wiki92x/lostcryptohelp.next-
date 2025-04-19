// ✅ components/TransactionFlowDiagram.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

type TxNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  risk: 'low' | 'medium' | 'high' | 'extreme';
};

type TxEdge = {
  from: string;
  to: string;
};

const nodes: TxNode[] = [
  { id: 'wallet1', label: 'Wallet A', x: 50, y: 120, risk: 'low' },
  { id: 'contract1', label: 'Smart Contract', x: 250, y: 120, risk: 'medium' },
  { id: 'wallet2', label: 'Wallet B', x: 450, y: 120, risk: 'high' }
];

const edges: TxEdge[] = [
  { from: 'wallet1', to: 'contract1' },
  { from: 'contract1', to: 'wallet2' }
];

const riskColor = {
  low: 'bg-green-500',
  medium: 'bg-yellow-400',
  high: 'bg-red-500',
  extreme: 'bg-red-800'
};

export default function TransactionFlowDiagram() {
  return (
    <div className="w-full overflow-x-auto p-4 rounded-xl bg-background dark:bg-dark-background border border-border dark:border-zinc-700">
      <svg viewBox="0 0 600 240" className="w-full h-[200px]">
        {edges.map((edge, idx) => {
          const from = nodes.find(n => n.id === edge.from)!;
          const to = nodes.find(n => n.id === edge.to)!;
          return (
            <motion.path
              key={idx}
              d={`M ${from.x + 80},${from.y} Q ${(from.x + to.x) / 2},${from.y - 60} ${to.x},${to.y}`}
              stroke="#7c3aed"
              fill="transparent"
              strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: idx * 0.2 }}
            />
          );
        })}
        {nodes.map((node) => (
          <g key={node.id}>
            <motion.rect
              x={node.x}
              y={node.y - 30}
              width="120"
              height="60"
              rx="12"
              className="fill-white dark:fill-zinc-800 stroke-zinc-300 dark:stroke-zinc-600 stroke-[1.5] shadow-md"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            />
            <text
              x={node.x + 60}
              y={node.y}
              textAnchor="middle"
              className="text-sm font-semibold fill-zinc-900 dark:fill-zinc-200"
              dominantBaseline="middle"
            >
              {node.label}
            </text>
            <foreignObject x={node.x + 85} y={node.y - 40} width="40" height="40">
              <motion.div
                className={`text-xs text-white rounded-full px-2 py-1 ${riskColor[node.risk]}`}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {node.risk.toUpperCase()}
              </motion.div>
            </foreignObject>
          </g>
        ))}
      </svg>
    </div>
  );
}