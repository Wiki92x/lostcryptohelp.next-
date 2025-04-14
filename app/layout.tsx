// app/layout.tsx

import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LostCryptoHelp – Protect Your Wallet from Scams',
  description:
    'Scan your crypto wallet for scam tokens, phishing contracts, and suspicious activity. No KYC. No signup.',
  metadataBase: new URL('https://lostcryptohelp.pro'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'LostCryptoHelp – Protect Your Wallet from Scams',
    description:
      'Scan your crypto wallet for scam tokens, phishing contracts, and suspicious activity. No KYC. No signup.',
    url: 'https://lostcryptohelp.pro',
    type: 'website',
    images: [
      {
        url: 'https://lostcryptohelp.pro/og-banner.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LostCryptoHelp – Protect Your Wallet from Scams',
    description:
      'Scan your crypto wallet for scam tokens, phishing contracts, and suspicious activity. No KYC. No signup.',
    images: ['https://lostcryptohelp.pro/og-banner.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
