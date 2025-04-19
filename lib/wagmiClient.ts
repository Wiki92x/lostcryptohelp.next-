// lib/wagmiClient.ts
'use client';

import { createConfig, configureChains } from 'wagmi';
import { mainnet, polygon, bsc } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

const { chains, publicClient } = configureChains(
  [mainnet, polygon, bsc],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id === mainnet.id) {
          return { http: `https://eth.llamarpc.com` };
        }
        if (chain.id === polygon.id) {
          return { http: `https://polygon-rpc.com` };
        }
        if (chain.id === bsc.id) {
          return { http: `https://bsc-dataseed.binance.org` };
        }
        return null;
      },
    }),
  ]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
});

export default wagmiConfig;
