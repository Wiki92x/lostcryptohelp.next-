'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ScrollText, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        {/* Title */}
        <div className="flex items-center gap-3 text-purple-400">
          <ScrollText className="w-6 h-6" />
          <h1 className="text-3xl font-bold">Terms of Service</h1>
        </div>

        {/* Content */}
        <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
          <p>
            Welcome to LostCryptoHelp. By using our website and services, you agree to the following terms. Please read them carefully.
          </p>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-300">1. Service Description</h2>
            <p>
              LostCryptoHelp provides blockchain analysis tools including wallet deep scans and token risk detection.
              We leverage real-time APIs and security scoring to offer helpful insights into wallet activity.
            </p>

            <h2 className="text-lg font-semibold text-purple-300">2. Payment Policy</h2>
            <p>
              Some chains (like TRON) are scanned for free, while others (ETH/BSC) may require a small fee. You'll always
              be informed about pricing before scanning.
            </p>

            <h2 className="text-lg font-semibold text-purple-300">3. Whitelisted Addresses</h2>
            <p>
              Owner/partner addresses may be whitelisted for free access. Other users must pay via crypto before scanning.
            </p>

            <h2 className="text-lg font-semibold text-purple-300">4. Legal & Compliance</h2>
            <p>
              We are not a registered financial or compliance authority. All results are estimations based on public blockchain APIs.
            </p>

            <h2 className="text-lg font-semibold text-purple-300">5. Privacy & Security</h2>
            <p>
              We don’t store wallet addresses or scan results. All data is processed in real-time and discarded securely.
              Telegram alerts are encrypted via official bot API.
            </p>

            <h2 className="text-lg font-semibold text-purple-300">6. Use At Your Own Risk</h2>
            <p>
              We are not liable for decisions made using our tools. Users are responsible for verifying all data independently.
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="pt-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Homepage
          </button>
        </div>
      </motion.div>
    </div>
  );
}
