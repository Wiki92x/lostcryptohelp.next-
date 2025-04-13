'use client';

import '../styles/globals.css';
import { WagmiConfig } from 'wagmi';
import wagmiConfig from '@/lib/wagmiClient'; // ✅ default import

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {wagmiConfig ? (
          <WagmiConfig config={wagmiConfig}>
            {children}
          </WagmiConfig>
        ) : (
          children // fallback render during SSR
        )}
      </body>
    </html>
  );
}
