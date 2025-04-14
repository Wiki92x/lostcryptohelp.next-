// lib/wagmi.ts
'use client';

import { createConfig, configureChains } from 'wagmi';
import { mainnet, polygon, bsc, arbitrum } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, bsc, arbitrum],
  [publicProvider()] // No arguments
);

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});
