import { configureChains, createConfig } from 'wagmi';
import { mainnet, polygon, bsc, arbitrum, optimism } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [mainnet, polygon, bsc, arbitrum, optimism],
  [publicProvider()]
);

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
});

export { chains };