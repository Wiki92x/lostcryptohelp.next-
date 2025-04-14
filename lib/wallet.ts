'use client';

import { configureChains, createConfig } from 'wagmi';
import { mainnet, bsc, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

export const getWalletConfig = () => {
  if (typeof window === 'undefined') return null; // ⛔ Server-side guard

  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet, bsc, polygon],
    [publicProvider()]
  );

  return createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
  });
};
