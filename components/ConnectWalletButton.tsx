// ✅ components/ConnectWalletButton.tsx — Crystal UI + Wagmi + Motion
'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { motion } from 'framer-motion';
import { Copy } from 'lucide-react';
import { useState } from 'react';

export default function ConnectWalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, isLoading } = useConnect({ connector: new InjectedConnector() });
  const { disconnect } = useDisconnect();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <motion.div
      className="inline-flex items-center justify-center"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {isConnected ? (
        <div className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-500 px-4 py-2 rounded-full shadow-md text-white text-xs font-semibold">
          <span>
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          <button
            onClick={copyToClipboard}
            className="hover:opacity-80 transition-opacity"
            title="Copy address"
          >
            <Copy className="h-4 w-4" />
          </button>
          <button
            onClick={() => disconnect()}
            className="ml-2 text-white font-medium hover:underline underline-offset-4"
          >
            Disconnect
          </button>
          {copied && (
            <motion.span
              className="ml-2 text-green-300 text-xs"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Copied!
            </motion.span>
          )}
        </div>
      ) : (
        <button
          onClick={() => connect()}
          disabled={isLoading}
          className="px-4 py-2 rounded-full text-white text-sm font-medium bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-700 hover:to-fuchsia-600 shadow-glow transition-all"
        >
          {isLoading ? 'Connecting...' : '🔗 Connect Wallet'}
        </button>
      )}
    </motion.div>
  );
}