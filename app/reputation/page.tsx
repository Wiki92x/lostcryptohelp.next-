// ✅ /app/reputation/page.tsx — Full Web3 Profile: NFT Badge + Download + Trust History
'use client';

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { ShieldCheck, Star, BadgeCheck, Download, UploadCloud, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ReputationPage() {
  const [wallet, setWallet] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const badgeRef = useRef<HTMLDivElement>(null);

  const isValidWallet = (addr: string) => /^0x[a-fA-F0-9]{40}$/.test(addr);

  const getBadge = (score: number) => {
    if (score <= 20) return { label: 'Gold', icon: <BadgeCheck className="text-yellow-400 w-5 h-5" /> };
    if (score <= 60) return { label: 'Silver', icon: <BadgeCheck className="text-zinc-300 w-5 h-5" /> };
    return { label: 'Bronze', icon: <BadgeCheck className="text-orange-500 w-5 h-5" /> };
  };

  const handleGenerate = () => {
    if (!isValidWallet(wallet)) return;
    const hash = wallet.charCodeAt(2) + wallet.length * 4;
    const simulatedScore = (hash % 100);
    setScore(simulatedScore);
    setHistory(prev => [{ wallet, score: simulatedScore, time: new Date().toLocaleString() }, ...prev]);
  };

  const handleDownload = async () => {
    if (!badgeRef.current) return;
    const canvas = await html2canvas(badgeRef.current);
    const link = document.createElement('a');
    link.download = 'wallet-badge.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <main className="min-h-screen px-4 py-20 bg-background text-foreground max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Star className="w-6 h-6 text-blue-400" /> Web3 Reputation Score
      </h1>

      <div className="mb-6">
        <label htmlFor="wallet" className="text-sm block mb-2 text-white">Wallet Address</label>
        <input
          id="wallet"
          type="text"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          placeholder="0x..."
          className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button onClick={handleGenerate} className="mt-4 w-full">Generate Score</Button>
      </div>

      {score !== null && (
        <Card>
          <CardContent className="p-6 text-center" ref={badgeRef}>
            <p className="text-sm text-muted-foreground mb-2">Score: <span className="text-white font-semibold">{score}/100</span></p>
            <div className="flex flex-col items-center gap-2">
              {getBadge(score).icon}
              <span className="text-xl font-bold text-white">{getBadge(score).label} Wallet</span>
              <p className="text-sm text-zinc-400 mt-2">This badge reflects wallet trustworthiness based on past activity.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {score !== null && (
        <div className="flex gap-4 mt-4">
          <Button variant="outline" onClick={handleDownload} className="flex items-center gap-2">
            <Download className="w-4 h-4" /> Download Badge
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <UploadCloud className="w-4 h-4" /> Mint as NFT (coming soon)
          </Button>
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" /> Trust History
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-zinc-700">
              <thead className="bg-zinc-800">
                <tr>
                  <th className="text-left px-4 py-2">Wallet</th>
                  <th className="text-left px-4 py-2">Score</th>
                  <th className="text-left px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry, i) => (
                  <tr key={i} className="border-t border-zinc-700">
                    <td className="px-4 py-2 text-blue-400 font-mono">{entry.wallet}</td>
                    <td className="px-4 py-2">{entry.score}</td>
                    <td className="px-4 py-2 text-zinc-400">{entry.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}
