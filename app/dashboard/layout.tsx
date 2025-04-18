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
      className="min-h-screen bg-black text-white px-6 py-10"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-400 mb-6">
          🔐 Dashboard
        </h1>

        <div className="bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg p-6">
          <div className="text-sm text-gray-400 mb-4">
            Current Page: <span className="text-purple-300 font-medium">{cleanPath}</span>
          </div>

          {/* Content injected here */}
          {children}
        </div>
      </div>
    </motion.section>
  );
}
