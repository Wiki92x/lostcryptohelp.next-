// pages/report.jsx
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';

const ReportForm = dynamic(() => import('../components/ReportForm'), { ssr: false });

export default function ReportPage() {
  return (
    <>
      <Head>
        <title>Submit a Crypto Report | LostCryptoHelp</title>
        <meta
          name="description"
          content="Flag scams, suspicious tokens or wallet addresses anonymously. Reports go straight to Telegram alerts."
        />
      </Head>
      <div className="min-h-screen bg-black text-white py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto"
        >
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-purple-400 flex justify-center items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-red-500" />
              Submit a Crypto Report
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              Flag a scam project, malicious wallet, fake contract, or suspicious token. Your submission is anonymous.
            </p>
          </div>

          <ReportForm />
        </motion.div>
      </div>
    </>
  );
}
