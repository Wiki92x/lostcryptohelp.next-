'use client';
import { ReactNode } from 'react';
import { WagmiConfig } from 'wagmi';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthProvider } from '@/components/AuthContext';
import { WalletProvider } from '@/components/WalletManager';
import { walletConfig } from '@/lib/walletConfig';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={walletConfig}>
      <ThemeProvider>
        <AuthProvider>
          <WalletProvider>{children}</WalletProvider>
        </AuthProvider>
      </ThemeProvider>
    </WagmiConfig>
  );
}