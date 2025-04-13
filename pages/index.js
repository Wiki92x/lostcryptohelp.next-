import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          LostCryptoHelp 🚀
        </h1>
        <p className="text-lg text-gray-400 max-w-xl mx-auto">
          Welcome to your crypto safety dashboard. Scan wallets. Detect scams. Stay protected.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <Link href="/deep-scan">
            <button className="px-6 py-3 rounded-xl text-white bg-purple-600 hover:bg-purple-700 transition font-semibold shadow-md">
              Deep Scan
            </button>
          </Link>
          <Link href="/connect">
            <button className="px-6 py-3 rounded-xl bg-gray-800 text-white hover:bg-gray-700 transition font-semibold shadow-md">
              Connect Wallet
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
