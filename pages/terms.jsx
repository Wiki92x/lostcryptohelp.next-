'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ScrollText, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <div className="flex items-center mb-6 text-purple-400 gap-2">
          <ScrollText className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Terms of Service</h1>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-gray-300">
          <p>
            Welcome to LostCryptoHelp. By using our website and services, you agree to the following terms. Please read them carefully.
          </p>

          <h2 className="text-lg font-semibold text-purple-300">1. Service Description</h2>
          <p>
            LostCryptoHelp provides blockchain analysis tools including wallet deep scans and token risk detection. We leverage real-time APIs and security scoring to offer helpful insights into wallet activity.
          </p>

          <h2 className="text-lg font-semibold text-purple-300">2. Payment Policy</h2>
          <p>
            Our services are offered with a tiered pricing model. Some chains (like TRON) are scanned for free, while others (ETH/BSC) may require a small fee. You will always be informed about pricing before scanning.
          </p>

          <h2 className="text-lg font-semibold text-purple-300">3. Whitelisted Addresses</h2>
          <p>
            We offer automatic free access for owner/partner addresses which are securely whitelisted inside our system. Other users must pay prior to scanning via USDT transfer.
          </p>

          <h2 className="text-lg font-semibold text-purple-300">4. Legal & Compliance</h2>
          <p>
            LostCryptoHelp is not a registered financial or compliance authority. We do not provide investment advice. All results and risk scores are estimated based on public blockchain APIs.
          </p>

          <h2 className="text-lg font-semibold text-purple-300">5. Privacy & Security</h2>
          <p>
            We do not store any wallet addresses or scan results on our servers. Everything is processed in real-time and securely discarded after delivery. Our Telegram alerts are also encrypted via official bot API.
          </p>

          <h2 className="text-lg font-semibold text-purple-300">6. Use At Own Risk</h2>
          <p>
            We are not liable for any decisions made based on our reports. Users are responsible for verifying and validating blockchain data independently.
          </p>
        </div>

        <button
          onClick={() => router.push('/')}
          className="mt-10 flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Homepage
        </button>
      </motion.div>
    </div>
  );
}