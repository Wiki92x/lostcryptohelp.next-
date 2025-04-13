import Head from 'next/head';
import Link from 'next/link';

export default function LegalHub() {
  return (
    <>
      <Head>
        <title>Legal Hub - LostCryptoHelp</title>
        <meta name="description" content="Legal documents and disclaimers for LostCryptoHelp" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-12 text-sm text-gray-300">
        <h1 className="text-3xl font-bold text-white mb-6">Legal Hub</h1>

        <p className="mb-6">
          The following documents outline the legal framework, user responsibilities, and platform protections
          in place for users of LostCryptoHelp. This hub is designed to ensure transparency and compliance with
          global standards.
        </p>

        <ul className="list-disc list-inside space-y-4">
          <li>
            <Link href="/terms" className="text-blue-400 hover:underline">
              Terms of Service
            </Link>
            <p className="ml-4 text-gray-400">
              Binding agreement outlining platform use, disclaimers, and user responsibilities.
            </p>
          </li>

          <li>
            <Link href="/privacy" className="text-blue-400 hover:underline">
              Privacy Policy
            </Link>
            <p className="ml-4 text-gray-400">
              Explanation of what data is collected, stored, and how we safeguard user privacy.
            </p>
          </li>

          <li>
            <Link href="/compliance" className="text-blue-400 hover:underline">
              Global Compliance Notice
            </Link>
            <p className="ml-4 text-gray-400">
              Important legal disclosures and compliance opt-outs for different countries.
            </p>
          </li>

          <li>
            <Link href="/disclaimer" className="text-blue-400 hover:underline">
              AI & Risk Disclaimer
            </Link>
            <p className="ml-4 text-gray-400">
              Clarifies the limitations of AI-based reports and wallet scan accuracy.
            </p>
          </li>
        </ul>

        <p className="mt-10 text-gray-400">Last updated: April 13, 2025</p>
      </div>
    </>
  );
}
