// pages/connect.js

import Head from 'next/head';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import Link from 'next/link';

export default function ConnectPage() {
  const { address, isConnected } = useAccount();
  const { connect, isLoading } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  return (
    <>
      <Head>
        <title>Connect Wallet | LostCryptoHelp</title>
      </Head>
      <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-400 mb-4">
          Connect Your Wallet 🚀
        </h1>
        <p className="text-gray-400 text-center max-w-md mb-8">
          Connect to your wallet to unlock deep scan, scam protection and web3 tools.
        </p>

        {isConnected ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-gray-800 text-green-400 px-4 py-2 rounded-full text-sm">
              Connected: {address.slice(0, 6)}...{address.slice(-4)}
            </div>
            <button
              onClick={disconnect}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded transition"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={() => connect()}
            disabled={isLoading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded transition"
          >
            {isLoading ? 'Connecting...' : 'Connect Wallet'}
          </button>
        )}

        <Link href="/">
          <span className="mt-10 text-sm text-purple-400 hover:underline">
            ← Back to Dashboard
          </span>
        </Link>
      </div>
    </>
  );
}
