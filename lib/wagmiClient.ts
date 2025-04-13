'use client';

import { createConfig, configureChains } from 'wagmi';
import { mainnet, polygon, bsc } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, bsc],
  [publicProvider()]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

export default wagmiConfig;
