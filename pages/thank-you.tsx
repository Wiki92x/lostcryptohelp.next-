// pages/thank-you.tsx
'use client';

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThankYouPage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.prefetch('/');
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 bg-black text-white text-center"
    >
      <CheckCircle className="h-16 w-16 text-green-400 mb-4" />
      <h1 className="text-3xl font-bold mb-2 text-purple-400">Scan Submitted!</h1>
      <p className="text-gray-300 mb-6 max-w-md">
        Your wallet scan has been submitted successfully. You’ll receive Telegram alerts (if opted), and your PDF report will be ready shortly.
      </p>
      <button
        onClick={() => router.push('/')}
        className="bg-purple-600 hover:bg-purple-700 px-6 py-2 text-white rounded-xl transition"
      >
        ← Back to Homepage
      </button>
    </motion.div>
  );
}
