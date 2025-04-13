// pages/terms.tsx

import Head from 'next/head';

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>Terms of Service - LostCryptoHelp</title>
        <meta name="description" content="Terms of service for LostCryptoHelp platform" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-12 text-sm text-gray-300">
        <h1 className="text-3xl font-bold text-white mb-6">Terms of Service</h1>

        <p className="mb-4">
          Welcome to LostCryptoHelp.pro. By accessing or using our tools, platform, or services,
          you agree to be bound by these Terms of Service (“Terms”). If you do not agree with any
          part, you must not use this platform.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-2">1. AI-Powered Tool Disclaimer</h2>
        <p className="mb-4">
          LostCryptoHelp leverages AI to generate automated wallet scans, risk scores, and token
          classifications. These outputs are speculative, informational, and may contain errors,
          hallucinations, or incomplete analysis. You acknowledge that these reports do not
          constitute factual verification or financial advice.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-2">2. No Affiliation or Endorsement</h2>
        <p className="mb-4">
          LostCryptoHelp is not affiliated, endorsed, or associated with Trust Wallet, MetaMask,
          Binance, Ethereum Foundation, or any blockchain protocol, wallet, or exchange provider.

        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-2">3. Informational Use Only</h2>
        <p className="mb-4">
          All tools provided are for educational and forensic insight only. We do not offer token
          recovery, wallet unlocking, or guaranteed fund retrieval. Use of this software is at your
          sole risk.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-2">4. User Responsibility & Compliance</h2>
        <p className="mb-4">
          You are solely responsible for your use of this platform and ensuring compliance with
          applicable local laws, regulations, or financial rules in your jurisdiction. LostCryptoHelp
          makes no warranties of legal suitability in your region.

        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-2">5. Jurisdiction & Arbitration</h2>
        <p className="mb-4">
          Any disputes arising out of this agreement will be resolved through binding arbitration
          under international rules. LostCryptoHelp operates as a decentralized utility and
          disclaim jurisdictional enforcement. Users waive the right to join class action lawsuits
          or claims.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-2">6. Refunds & Payment Terms</h2>
        <p className="mb-4">
          All payments for scans, reports, alerts, or services are final. We do not offer refunds
          for completed scans, failed lookups, or user errors. Payments are considered
          donations-for-access to decentralized tools.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-2">7. Platform-as-Utility</h2>
        <p className="mb-4">
          LostCryptoHelp is a software interface for publicly available blockchain data. It does not
          act as a financial institution, investment advisor, security provider, or recovery agent.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-2">8. Data Logging</h2>
        <p className="mb-4">
          We may log wallet addresses, scan requests, or error messages to improve platform
          performance. We do not collect private keys, passwords, or user identity. No KYC is
          performed.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-2">9. International Legal Shield</h2>
        <p className="mb-4">
          You acknowledge that LostCryptoHelp is operated independently of any registered business
          entity and does not fall under specific country-level financial regulation. You release
          the creators from liability in all jurisdictions, including the US, EU, UAE, UK, and India.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-2">10. Changes to Terms</h2>
        <p className="mb-4">
          We may update these Terms from time to time without notice. Continued use of the platform
          constitutes acceptance of the latest Terms.
        </p>

        <p className="mt-6 text-gray-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </>
  );
}
