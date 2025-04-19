// ✅ components/ui/glowcard.tsx — Reusable Futuristic Glow Card Wrapper

'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function GlowCard({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative rounded-xl border border-zinc-700 bg-zinc-900/80 backdrop-blur-md p-6 shadow-[0_0_30px_#00FFFF25] transition-all hover:shadow-[0_0_40px_#00FFFF66]"
    >
      <div className="absolute inset-0 rounded-xl border border-cyan-400/20 pointer-events-none" />
      {children}
    </motion.div>
  );
}