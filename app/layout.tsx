// app/layout.tsx
import './globals.css';
import { WagmiConfig } from 'wagmi';
import wagmiConfig from '@/lib/wagmiClient';
import ThemeProviderWrapper from '@/components/ThemeProviderWrapper';
import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'LostCryptoHelp',
  description: 'Scan wallets, detect scams, protect crypto',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 min-h-screen">
        <ThemeProviderWrapper>
          <WagmiConfig config={wagmiConfig}>
            <Navbar />
            <main className="pt-20 px-4">{children}</main>
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: '#333',
                  color: '#fff',
                },
              }}
            />
          </WagmiConfig>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
