'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Button } from '@/components/ui/button'; // Assuming this now exists ✅

export default function ConnectWalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, isLoading } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  return (
    <div>
      {isConnected ? (
        <div className="flex items-center gap-3">
          <span className="text-green-400 text-sm font-mono">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
          <Button
            onClick={() => disconnect()}
            variant="outline"
            className="text-red-500 border-red-500 hover:bg-red-600 hover:text-white"
          >
            Disconnect
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => connect()}
          disabled={isLoading}
          className="bg-purple-600 hover:bg-purple-700 text-white transition"
        >
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      )}
    </div>
  );
}
