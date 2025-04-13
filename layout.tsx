'use client';

import '../styles/globals.css';
import { WagmiConfig } from 'wagmi';
import wagmiConfig from '@/lib/wagmiClient';
import ClientOnly from '@/components/ClientOnly';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <ClientOnly>
          <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
        </ClientOnly>
      </body>
    </html>
  );
}
