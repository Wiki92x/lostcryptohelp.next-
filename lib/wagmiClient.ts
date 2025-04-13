'use client';

import { createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { mainnet, bsc, polygon } from 'wagmi/chains';

let wagmiConfig = undefined;

if (typeof window !== 'undefined') {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet, bsc, polygon], // 👉 add or change chains as needed
    [publicProvider()]
  );

  wagmiConfig = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
  });
}

export default wagmiConfig;
