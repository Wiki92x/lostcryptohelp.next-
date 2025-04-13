// pages/index.js
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>LostCryptoHelp 🚀</title>
        <meta
          name="description"
          content="Scan your crypto wallet for scams, fake approvals, and token risks"
        />
      </Head>

      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-500">
          LostCryptoHelp 🚀
        </h1>
        <p className="text-gray-400 mb-8 text-center max-w-xl">
          Welcome to your crypto safety dashboard. Scan wallets. Detect scams. Stay protected.
        </p>
        <div className="flex gap-4">
          <Link href="/deep-scan">
            <span className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition cursor-pointer">
              Deep Scan
            </span>
          </Link>
          <Link href="/connect">
            <span className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition cursor-pointer">
              Connect Wallet
            </span>
          </Link>
        </div>
      </main>
    </>
  );
}
