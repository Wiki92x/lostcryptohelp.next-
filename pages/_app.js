import '@/styles/globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from '@/lib/wagmiClient'; // ✅ named export
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <WagmiConfig config={wagmiConfig}>
        <Head>
          <title>LostCryptoHelp</title>
          <meta
            name="description"
            content="Scan your crypto wallet for scam tokens, phishing links, fake approvals, and malicious contracts. Ethereum, BNB & TRON supported — No login, No KYC."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
          <Navbar />
          <main className="flex-1 pt-20 px-4 sm:px-6 md:px-8">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1f2937',
              color: '#f9fafb',
              fontSize: '14px',
              borderRadius: '8px',
            },
          }}
        />
      </WagmiConfig>
    </ThemeProvider>
  );
}