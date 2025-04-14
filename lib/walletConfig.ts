// lib/walletConfig.ts
'use client';

import { configureChains, createConfig } from 'wagmi';
import { mainnet, bsc, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const isSSR = typeof window === 'undefined';

export const walletConfig = !isSSR
  ? createConfig(
      configureChains(
        [mainnet, bsc, polygon],
        [publicProvider()]
      )
    )
  : null;
