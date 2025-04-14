// lib/walletConfig.ts
import { configureChains, createConfig } from 'wagmi';
import { mainnet, bsc, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

export function getWalletConfig() {
  const { publicClient, webSocketPublicClient } = configureChains(
    [mainnet, bsc, polygon],
    [publicProvider()] // avoid using broken/undefined providers at build
  );

  return createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
  });
}
