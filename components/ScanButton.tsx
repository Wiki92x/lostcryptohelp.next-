// ✅ components/ScanButton.tsx — Web3 UX Enhanced Version

'use client';

import { Loader2, ScanEye } from 'lucide-react';
import { motion } from 'framer-motion';

type Props = {
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
};

export default function ScanButton({ onClick, loading, disabled }: Props) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      disabled={loading || disabled}
      onClick={onClick}
      className={`w-full sm:w-auto px-6 py-3 text-sm sm:text-base font-semibold rounded-lg flex items-center justify-center gap-2
        transition-colors duration-300 shadow-sm
        ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
        text-white`}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin w-5 h-5" />
          Scanning...
        </>
      ) : (
        <>
          <ScanEye className="w-5 h-5" />
          Start Deep Scan
        </>
      )}
    </motion.button>
  );
}