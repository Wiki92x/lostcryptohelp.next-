import { configureChains, createConfig } from 'wagmi';
import { mainnet, polygon, bsc, arbitrum } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, bsc, arbitrum],
  [
    publicProvider({
      rpc: (chain) => {
        switch (chain.id) {
          case 1:
            return { http: 'https://eth.llamarpc.com' };
          case 56:
            return { http: 'https://bsc-dataseed.binance.org' };
          case 137:
            return { http: 'https://polygon-rpc.com' };
          case 42161:
            return { http: 'https://arb1.arbitrum.io/rpc' };
          default:
            throw new Error(`Unsupported chain ${chain.id}`);
        }
      },
    }),
  ]
);

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});
