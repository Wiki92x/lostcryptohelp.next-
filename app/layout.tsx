import '../styles/globals.css'; // ✅ Correct path for your setup

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LostCryptoHelp – Protect Your Wallet from Scams',
  description: 'Scan your crypto wallet for scam tokens, phishing contracts, and suspicious activity. No KYC. No signup.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://lostcryptohelp.pro" />
        <meta property="og:title" content="LostCryptoHelp – Protect Your Wallet from Scams" />
        <meta property="og:description" content="Scan your crypto wallet for scam tokens, phishing contracts, and suspicious activity. No KYC. No signup." />
        <meta property="og:url" content="https://lostcryptohelp.pro" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://lostcryptohelp.pro/og-banner.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LostCryptoHelp – Protect Your Wallet from Scams" />
        <meta name="twitter:description" content="Scan your crypto wallet for scam tokens, phishing contracts, and suspicious activity. No KYC. No signup." />
        <meta name="twitter:image" content="https://lostcryptohelp.pro/og-banner.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
