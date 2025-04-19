'use client';

import { createConfig, configureChains } from 'wagmi';
import { mainnet, polygon, bsc, arbitrum, optimism } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [mainnet, polygon, bsc, arbitrum, optimism],
  [publicProvider()]
);

export const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors: [],
});