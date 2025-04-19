import { MapPinned } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThreatMapPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl shadow-md border border-zinc-700 bg-gradient-to-br from-zinc-900 to-zinc-800 p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <MapPinned className="text-blue-400 w-5 h-5" />
        <h2 className="text-lg font-semibold text-blue-300">
          🌍 Global Threat Map
        </h2>
      </div>
      <div className="relative overflow-hidden rounded-xl border border-zinc-600 h-64">
        <iframe
          title="Threat Map"
          src="https://threatmap.checkpoint.com/ThreatPortal/livemap.html"
          className="absolute top-0 left-0 w-full h-full border-none"
          loading="lazy"
        ></iframe>
      </div>
    </motion.div>
  );
}
