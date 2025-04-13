'use client';

import '../styles/globals.css';
import { WagmiConfig } from 'wagmi';
import wagmiConfig from '@/lib/wagmiClient';
import ClientOnly from '@/components/ClientOnly'; // ✅ make sure the path is correct

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <ClientOnly>
          {wagmiConfig ? (
            <WagmiConfig config={wagmiConfig}>
              {children}
            </WagmiConfig>
          ) : (
            children
          )}
        </ClientOnly>
      </body>
    </html>
  );
}
