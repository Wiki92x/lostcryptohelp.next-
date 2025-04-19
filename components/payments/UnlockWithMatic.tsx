'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Lock, Loader2 } from 'lucide-react';
import { ethers } from 'ethers';

const RECEIVER_WALLET = '0xa85f4DDE28941e41633b575D3a026A8B42887795'; // your wallet
const PAYMENT_AMOUNT = '0.05'; // MATIC or ETH
const NETWORK_CHAIN_ID = 137; // Polygon Mainnet

export default function UnlockWithMetaMask({ onUnlock }: { onUnlock: () => void }) {
  const [wallet, setWallet] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'paying' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.request({ method: 'eth_accounts' }).then((accs: string[]) => {
        if (accs.length) setWallet(accs[0]);
      });
    }
  }, []);

  const handlePayment = async () => {
    if (typeof window.ethereum === 'undefined') return alert('MetaMask not found');
    setStatus('paying');

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();

      if (network.chainId !== BigInt(NETWORK_CHAIN_ID)) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x89' }], // 137 hex for Polygon
        });
      }

      const tx = await signer.sendTransaction({
        to: RECEIVER_WALLET,
        value: ethers.parseEther(PAYMENT_AMOUNT),
      });

      await tx.wait();
      setStatus('success');
      onUnlock();
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="rounded-lg border bg-muted p-4 space-y-4">
      <div className="text-sm font-medium text-muted-foreground">Pay with MetaMask</div>

      {status === 'success' ? (
        <div className="flex items-center text-green-500 gap-2">
          <CheckCircle className="w-5 h-5" /> Payment complete!
        </div>
      ) : (
        <Button onClick={handlePayment} disabled={status === 'paying'}>
          {status === 'paying' ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Lock className="w-4 h-4 mr-2" />
          )}
          Unlock Pro Access
        </Button>
      )}
    </div>
  );
}