'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAccount, useWalletClient } from 'wagmi';
import { BadgeCheck, Download, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ethers } from 'ethers';
import { REPUTATION_BADGE_ABI } from '@/lib/abi/reputationBadge';

const CONTRACT_ADDRESS = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4';

export default function ReputationScorePage() {
  const [wallet, setWallet] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [minting, setMinting] = useState(false);
  const [minted, setMinted] = useState(false);

  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  const runCheck = () => {
    setLoading(true);
    setTimeout(() => {
      setScore(723);
      setLoading(false);
    }, 1000);
  };

  const handleMint = async () => {
    if (!walletClient || !address) return;

    try {
      setMinting(true);
      const signer = await walletClient.getSigner();

      const contract = new ethers.Contract(CONTRACT_ADDRESS, REPUTATION_BADGE_ABI, signer);

      const metadataURI = 'ipfs://badge-rep-723'; // Placeholder
      const tx = await contract.mintBadge(address, score, metadataURI);
      await tx.wait();

      setMinted(true);
    } catch (err) {
      console.error(err);
      alert('Mint failed — are you the owner wallet?');
    } finally {
      setMinting(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-20 bg-background text-foreground">
      <div className="max-w-4xl mx-auto space-y-10">
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-center text-orange-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Web3 Reputation Score
        </motion.h1>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Analyze trust score based on wallet behavior and interactions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <input
            type="text"
            placeholder="Wallet Address"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            className="w-full sm:w-96 px-4 py-2 rounded-md border bg-card text-foreground border-zinc-700"
          />
          <Button disabled={loading || !wallet} onClick={runCheck}>
            {loading ? 'Checking...' : 'Check Score'}
          </Button>
        </div>

        {score !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 mt-10 space-y-4"
          >
            <div className="text-center text-lg font-semibold">
              Reputation Score: <span className="text-green-400">{score}/1000</span>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Status: Trusted
            </div>
            <ul className="text-sm text-green-500 list-disc list-inside space-y-1">
              <li>✅ Wallet Age: 15 months</li>
              <li>✅ Interacted with 8+ legit DeFi protocols</li>
              <li>❌ Flagged for 1 rugpull token in past 90d</li>
              <li>✅ Gas usage patterns indicate active user</li>
            </ul>

            {!minted ? (
              <Button
                className="mt-4"
                variant="outline"
                disabled={!isConnected || minting}
                onClick={handleMint}
              >
                {minting ? 'Minting Badge...' : '🟢 Claim Reputation Badge NFT'}
              </Button>
            ) : (
              <div className="text-center text-green-400 flex items-center justify-center gap-2">
                <BadgeCheck className="w-5 h-5" /> Badge successfully minted!
              </div>
            )}

            <div className="text-center pt-4">
              <Button variant="secondary">
                <Download className="w-4 h-4 mr-2" />
                Download Scorecard (PDF)
              </Button>
            </div>

            <div className="text-xs text-center text-muted-foreground pt-4">
              🔒 Full history and proof available in Pro dashboard
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}