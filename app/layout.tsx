// ✅ app/layout.tsx — Cleaned Global Layout with Wagmi + Theme Support
import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { WagmiProvider } from '@/lib/WagmiProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TraceAIWidget from '@/components/TraceAIWidget';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LostCryptoHelp | Web3 Wallet Scanner & Scam Detector',
  description:
    'AI-powered forensic wallet scanner for ETH, BSC, and TRON. Revoke tokens, detect scam contracts, and secure your crypto in seconds.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <WagmiProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <div className="min-h-screen flex flex-col transition-colors duration-500 bg-[var(--background)] text-[var(--foreground)]">
              <Navbar />
              <main className="flex-1 relative">{children}</main>
              <Footer />
              <TraceAIWidget />
            </div>
          </ThemeProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}