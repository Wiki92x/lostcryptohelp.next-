// pages/_app.js
import '@/styles/globals.css';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import { WagmiConfig } from 'wagmi';
import wagmiConfig from '@/lib/wagmiClient';

export default function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 🧪 Prevent hydration mismatch for theme
  if (!mounted) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
      <WagmiConfig config={wagmiConfig}>
        <Head>
          <title>LostCryptoHelp</title>
          <meta
            name="description"
            content="Scan your crypto wallet for scam tokens, fake approvals, phishing, and contract risks."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />

        <Component {...pageProps} />
      </WagmiConfig>
    </ThemeProvider>
  );
}
