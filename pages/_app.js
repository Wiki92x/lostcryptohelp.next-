// pages/_app.js
import '@/styles/globals.css';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import { WagmiConfig } from 'wagmi';
import wagmiConfig from '@/lib/wagmiClient';
import Navbar from '@/components/Navbar'; // ✅
import Footer from '@/components/Footer'; // ✅

export default function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !wagmiConfig) return null;

  return (
    <WagmiConfig config={wagmiConfig}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <Head>
          <title>LostCryptoHelp</title>
          <meta
            name="description"
            content="Scan your crypto wallet for scam tokens, fake approvals, phishing, and contract risks. Ethereum, BSC, TRON supported."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar /> {/* ✅ Injected */}
        <main className="min-h-screen bg-black text-white">
          <Component {...pageProps} />
        </main>
        <Footer /> {/* ✅ Injected */}

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </ThemeProvider>
    </WagmiConfig>
  );
}
