import '@/styles/globals.css';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevents hydration mismatch
  if (!mounted) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <Head>
        <title>LostCryptoHelp</title>
        <meta name="description" content="Scan your crypto wallet for scam tokens, fake approvals, phishing, and contract risks. Ethereum, BSC, TRON supported." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
        },
      }} />

      <Component {...pageProps} />
    </ThemeProvider>
  );
}