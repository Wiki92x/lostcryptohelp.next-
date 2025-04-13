'use client';

import { createConfig, configureChains } from 'wagmi';
import { mainnet, polygon, bsc } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

let wagmiConfig;

if (typeof window !== 'undefined') {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet, polygon, bsc],
    [publicProvider()]
  );

  wagmiConfig = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
  });
}

export default wagmiConfig;
