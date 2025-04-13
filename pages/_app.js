// ✅ pages/_app.js
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import { WagmiConfig } from 'wagmi';
import wagmiConfig from '@/lib/wagmiClient';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

export default function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !wagmiConfig) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
      <WagmiConfig config={wagmiConfig}>
        <Head>
          <title>LostCryptoHelp</title>
          <meta
            name="description"
            content="Scan your crypto wallet for scam tokens, fake approvals, phishing, and contract risks. Ethereum, BSC, TRON supported."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="bg-white text-black dark:bg-black dark:text-white transition-colors duration-300 min-h-screen">
          <Navbar />
          <main className="pt-16 px-4">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>

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
    </ThemeProvider>
  );
}
