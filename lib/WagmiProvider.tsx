'use client'

import React from 'react'
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'
import { Chain } from 'wagmi'

// ✅ Hardcoded ETH Mainnet config to avoid import bugs
const ethereumMainnet = {
  id: 1,
  name: 'Ethereum Mainnet',
  network: 'mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.ankr.com/eth'],
      webSocket: ['wss://eth.llamarpc.com'],
    },
    public: {
      http: ['https://rpc.ankr.com/eth'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://etherscan.io',
    },
  },
}

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ethereumMainnet],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: chain.rpcUrls.default.http[0],
      }),
    }),
    publicProvider(),
  ]
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})

export function WagmiProvider({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>
}