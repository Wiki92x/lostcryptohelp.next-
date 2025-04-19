// ✅ /app/connect/page.tsx — Dynamic Tool-Based Payment Unlock
'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Button } from '@/components/ui/button';
import { Copy, Loader2, Wallet, ShieldCheck, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const MATIC_AMOUNT = '1.5';
const RECEIVER_ADDRESS = '0xa85f4DDE28941e41633b575D3a026A8B42887795';
const USDT_ADDRESS = 'TVH1roHbPn5qCj14Dy1GSVrB5XDcsjgEyX';

export default function ConnectPage() {
  const [wallet, setWallet] = useState('');
  const [status, setStatus] = useState<'idle' | 'paying' | 'done'>('idle');
  const [manualTxId, setManualTxId] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const searchParams = useSearchParams();
  const tool = searchParams.get('tool') || 'deep-scan';

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' }).then((accs: string[]) => {
        if (accs.length) setWallet(accs[0]);
      });
    }

    const tools = JSON.parse(localStorage.getItem('pro_tools') || '{}');
    if (tools[tool]) setUnlocked(true);
  }, [tool]);

  const handleMetaMaskPayment = async () => {
    if (!window.ethereum) return toast.error('MetaMask not found');
    setStatus('paying');
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: RECEIVER_ADDRESS,
        value: ethers.parseEther(MATIC_AMOUNT),
      });
      await tx.wait();
      toast.success('Payment Successful');

      const current = JSON.parse(localStorage.getItem('pro_tools') || '{}');
      const updated = { ...current, [tool]: true };
      localStorage.setItem('pro_tools', JSON.stringify(updated));
      setUnlocked(true);
    } catch {
      toast.error('Payment Failed');
    } finally {
      setStatus('idle');
    }
  };

  const handleManualSubmit = async () => {
    try {
      if (!manualTxId) return toast.error('Enter your TRC-20 transaction ID');
      await fetch('/api/manual-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet, txId: manualTxId, tool })
      });
      toast.success('Submitted! You will be unlocked shortly.');
    } catch {
      toast.error('Submission failed');
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground py-20 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold text-center text-blue-500">🔐 Unlock Premium: {tool}</h1>
        <p className="text-center text-muted-foreground max-w-xl mx-auto">
          Choose how you want to unlock: MetaMask or manual transfer (TRC-20).
        </p>

        {unlocked ? (
          <div className="text-center text-green-400">✅ Access already unlocked for this tool.</div>
        ) : (
          <>
            <section className="bg-card border border-border p-6 rounded-xl space-y-4 shadow">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-green-500">
                <Wallet size={18} /> Smart Wallet Payment (Polygon)
              </h2>
              <p className="text-sm text-muted-foreground">Pay {MATIC_AMOUNT} MATIC to unlock access to this tool.</p>
              <Button onClick={handleMetaMaskPayment} disabled={status === 'paying'}>
                {status === 'paying' ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <ShieldCheck size={16} className="mr-2" />}
                Pay with MetaMask
              </Button>
            </section>

            <section className="bg-card border border-border p-6 rounded-xl space-y-4 shadow">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-yellow-400">
                <Send size={18} /> Manual Payment (USDT TRC-20)
              </h2>
              <p className="text-sm text-muted-foreground">Send $5 USDT to this TRON address:</p>
              <div className="flex items-center gap-2 bg-muted p-3 rounded-lg font-mono text-sm">
                <span>{USDT_ADDRESS}</span>
                <Button size="icon" variant="ghost" onClick={() => navigator.clipboard.writeText(USDT_ADDRESS)}>
                  <Copy size={16} />
                </Button>
              </div>
              <input
                type="text"
                placeholder="Paste TRC-20 TX ID"
                value={manualTxId}
                onChange={(e) => setManualTxId(e.target.value)}
                className="w-full border border-border bg-background rounded px-4 py-2 text-sm"
              />
              <Button onClick={handleManualSubmit}>Submit TX for Verification</Button>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
