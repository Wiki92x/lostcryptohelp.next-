// app/providers.tsx
'use client';

import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { mainnet, bsc, polygon } from 'wagmi/chains';

const { publicClient } = configureChains([mainnet, bsc, polygon], [publicProvider()]);

const config = createConfig({
  autoConnect: true,
  publicClient,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
