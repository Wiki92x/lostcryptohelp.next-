// ✅ app/layout.tsx
import '@/styles/globals.css';
import { WagmiConfig } from 'wagmi';
import wagmiConfig from '@/lib/wagmiClient';
import ThemeProviderWrapper from '@/components/ThemeProviderWrapper';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'; // <- ✅ Add this

export const metadata = {
  title: 'LostCryptoHelp',
  description: 'Scan wallets, detect scams, protect crypto',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
        <ThemeProviderWrapper>
          <WagmiConfig config={wagmiConfig}>
            <Navbar />
            <main className="pt-20 px-4">{children}</main>
            <Footer /> {/* ✅ Add this line */}
          </WagmiConfig>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
