'use client';

import { motion } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Rocket, ArrowLeft, Wallet } from 'lucide-react';

export default function ConnectPage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Connect Wallet | LostCryptoHelp</title>
        <meta
          name="description"
          content="Connect your wallet to unlock scan tools, detect scams, and access Web3 protection."
        />
      </Head>

      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-zinc-900 p-8 rounded-2xl shadow-xl max-w-md w-full text-center"
        >
          <h1 className="text-3xl font-bold text-purple-400 mb-2 flex items-center justify-center gap-2">
            Connect Your Wallet <Rocket className="w-6 h-6 text-purple-300" />
          </h1>
          <p className="text-gray-400 text-sm mb-6">
            Connect to your wallet to unlock deep scan, scam protection and Web3 tools.
          </p>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => alert('🦊 Connect logic goes here!')}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded flex items-center justify-center gap-2 font-semibold"
          >
            <Wallet className="w-5 h-5" />
            Connect Wallet
          </motion.button>

          <button
            onClick={() => router.push('/dashboard')}
            className="mt-4 text-sm text-purple-400 hover:underline flex items-center justify-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </motion.div>
      </div>
    </>
  );
}
