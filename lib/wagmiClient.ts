'use client';

import { createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { mainnet, bsc, polygon } from 'wagmi/chains';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, bsc, polygon],
  [publicProvider()]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

export default wagmiConfig;
