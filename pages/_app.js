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
          <meta name="description" content="Scan your wallet for scam risks" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
        <Toaster position="top-right" />
      </WagmiConfig>
    </ThemeProviderWrapper>
  );
}
