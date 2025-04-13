'use client';

import { createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { mainnet, bsc, polygon } from 'wagmi/chains';

// Prevents build-time SSR error on Netlify
const isBrowser = typeof window !== 'undefined';

let wagmiConfig: any = undefined;

if (isBrowser) {
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
