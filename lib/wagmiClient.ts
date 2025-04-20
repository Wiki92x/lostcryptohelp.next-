'use client';

import { configureChains, createClient } from 'wagmi';
import { mainnet, bsc, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [mainnet, bsc, polygon],
  [publicProvider()]
);

const wagmiClient = createClient({
  autoConnect: true,
  provider,
});

export default wagmiClient;
