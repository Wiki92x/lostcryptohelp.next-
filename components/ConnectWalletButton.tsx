'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Button } from '@/components/ui/button'; // Or just use a native button

export default function ConnectWalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isLoading, pendingConnector } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-400">Connected:</span>
        <code className="text-purple-400 font-mono text-sm">{address?.slice(0, 6)}...{address?.slice(-4)}</code>
        <button onClick={() => disconnect()} className="text-red-500 underline text-sm">
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => connect()}
      disabled={isLoading}
      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg transition"
    >
      {isLoading ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}
