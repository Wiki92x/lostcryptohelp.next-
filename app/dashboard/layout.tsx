'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const cleanPath = path?.replace('/dashboard', '') || '/overview';

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-[80px] px-6 pb-10 bg-[var(--background)] text-[var(--foreground)]"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-400 mb-6">
          🔐 Dashboard
        </h1>

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-lg p-6">
          <div className="text-sm text-muted-foreground mb-4">
            Current Page: <span className="text-blue-400 font-medium">{cleanPath}</span>
          </div>

          {children}
        </div>
      </div>
    </motion.section>
  );
}