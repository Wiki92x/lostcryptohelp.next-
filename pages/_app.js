import '@/styles/globals.css';
import ThemeProviderWrapper from '@/components/ThemeProviderWrapper';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { WagmiConfig } from 'wagmi';
import wagmiConfig from '@/lib/wagmiClient';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProviderWrapper>
      <WagmiConfig config={wagmiConfig}>
        <Head>
          <title>LostCryptoHelp</title>
          <meta name="description" content="Scan your crypto wallet for scam tokens, fake approvals, phishing, and contract risks." />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 min-h-screen">
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
    </ThemeProviderWrapper>
  );
}
