'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export default function ConnectPage() {
  const { address, isConnected } = useAccount();
  const { connect, isLoading } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
          Connect Wallet
        </h1>
        <p className="text-gray-400 mb-6">
          Connect your wallet to start scanning and managing your crypto safety.
        </p>

        {isConnected ? (
          <div className="space-y-4">
            <div className="text-green-400 font-mono text-sm">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </div>
            <button
              onClick={() => disconnect()}
              className="w-full py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition"
            >
              Disconnect Wallet
            </button>
          </div>
        ) : (
          <button
            onClick={() => connect()}
            className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition"
          >
            {isLoading ? 'Connecting...' : 'Connect Wallet'}
          </button>
        )}
      </div>
    </main>
  );
}
