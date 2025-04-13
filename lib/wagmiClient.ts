'use client';

import { createConfig, http, webSocket } from 'wagmi';
import { mainnet, bsc, polygon } from 'wagmi/chains';

const wagmiConfig = createConfig({
  autoConnect: true,
  chains: [mainnet, bsc, polygon],
  publicClient: http(),
  webSocketPublicClient: webSocket(),
});

export default wagmiConfig;
