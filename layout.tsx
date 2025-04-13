// app/layout.tsx
import './globals.css';
import { WagmiConfig } from 'wagmi';
import wagmiConfig from '@/lib/wagmiClient';
import ClientOnly from '@/components/ClientOnly';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'LostCryptoHelp 🚀',
  description: 'Your crypto safety dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <WagmiConfig config={wagmiConfig}>
          <ClientOnly>
            <Navbar />
            <main className="pt-20 px-4">{children}</main>
          </ClientOnly>
        </WagmiConfig>
      </body>
    </html>
  );
}
