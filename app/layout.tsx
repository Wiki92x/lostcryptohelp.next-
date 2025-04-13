'use client';

import '../styles/globals.css';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from '@/lib/wagmiClient';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <WagmiConfig config={wagmiConfig}>
          {children}
        </WagmiConfig>
      </body>
    </html>
  );
}
