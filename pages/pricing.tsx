// pages/pricing.tsx

import Head from 'next/head';
import PricingPage from '@/components/PricingPage';

export default function Pricing() {
  return (
    <>
      <Head>
        <title>Pricing | LostCryptoHelp</title>
        <meta
          name="description"
          content="Choose a wallet scan plan: Ethereum, BSC or TRON. Only pay for what you use. Full token risk reports and real-time alerts."
        />
        <meta property="og:title" content="Pricing | LostCryptoHelp" />
        <meta property="og:description" content="Choose your wallet scan type. Ethereum and BSC reports with token risk, GoPlus flags, and alerts." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lostcryptohelp.pro/pricing" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <PricingPage />
        </div>
      </div>
    </>
  );
}
