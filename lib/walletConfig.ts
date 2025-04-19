// ✅ lib/walletConfig.ts — Full working version for Web3 wagmiConfig setup

import { configureChains, createConfig } from 'wagmi';
import { mainnet, polygon, bsc } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [mainnet, polygon, bsc],
  [publicProvider()]
);

export const walletConfig = createConfig({
  autoConnect: true,
  connectors: [], // You can add MetaMask, WalletConnect, etc., here if needed
  publicClient,
});

export { chains };