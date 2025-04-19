// ✅ lib/WagmiProvider.tsx
'use client';

import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { mainnet, bsc, polygon, arbitrum, optimism } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [mainnet, bsc, polygon, arbitrum, optimism],
  [publicProvider()]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient
});

export function WagmiProvider({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}