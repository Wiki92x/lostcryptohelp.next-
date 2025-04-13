// lib/wagmiClient.ts
'use client';

import { createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { mainnet, bsc, polygon } from 'wagmi/chains';

// ✅ Only run on client to avoid SSR crash
let wagmiConfig: ReturnType<typeof createConfig> | undefined = undefined;

if (typeof window !== 'undefined') {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet, bsc, polygon],
    [publicProvider()]
  );

  wagmiConfig = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
  });
}

export default wagmiConfig;
