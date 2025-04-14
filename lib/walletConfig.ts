'use client';

import { configureChains, createConfig } from 'wagmi';
import { mainnet, bsc } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

export const getWalletConfig = () => {
  if (typeof window === 'undefined') return null;

  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet, bsc],
    [publicProvider()]
  );

  return createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
  });
};
