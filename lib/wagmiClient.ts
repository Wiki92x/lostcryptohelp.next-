'use client';

import { createConfig, configureChains } from 'wagmi';
import { mainnet, polygon, bsc } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

const { chains, publicClient } = configureChains(
  [mainnet, polygon, bsc],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        switch (chain.id) {
          case mainnet.id:
            return { http: 'https://eth.llamarpc.com' };
          case polygon.id:
            return { http: 'https://polygon-rpc.com' };
          case bsc.id:
            return { http: 'https://bsc-dataseed.binance.org' };
          default:
            return null;
        }
      },
    }),
  ]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
});

export default wagmiConfig;
export { chains };