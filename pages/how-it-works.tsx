import Head from 'next/head';
import HowItWorks from '@/components/HowItWorks';

export default function HowItWorksPage() {
  return (
    <>
      <Head>
        <title>How LostCryptoHelp Works</title>
        <meta
          name="description"
          content="Learn how to use LostCryptoHelp to scan your crypto wallet, detect scam tokens, and get real-time alerts."
        />
      </Head>
      <HowItWorks />
    </>
  );
}
