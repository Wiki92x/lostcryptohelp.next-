// app/layout.tsx
import '../styles/globals.css';
import { WagmiConfig } from 'wagmi';
import wagmiConfig from '@/lib/wagmiClient';
import ClientOnly from '@/components/ClientOnly';
import Navbar from '@/components/Navbar'; // ✅ make sure this exists

export const metadata = {
  title: 'LostCryptoHelp',
  description: 'Your crypto safety dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <WagmiConfig config={wagmiConfig}>
          <ClientOnly>
            <Navbar />
            <main className="pt-16">{children}</main>
          </ClientOnly>
        </WagmiConfig>
      </body>
    </html>
  );
}
