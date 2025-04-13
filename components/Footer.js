import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-6 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <p className="text-xs md:text-sm">
          © {new Date().getFullYear()} <span className="text-purple-400 font-semibold">LostCryptoHelp</span>. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm">
          <Link href="/about" className="hover:text-purple-400 transition">About</Link>
          <Link href="/pricing" className="hover:text-purple-400 transition">Pricing</Link>
          <Link href="/terms" className="hover:text-purple-400 transition">Terms</Link>
          <Link href="/deep-scan" className="hover:text-purple-400 transition">Deep Scan</Link>
        </div>
      </div>
    </footer>
  );
}
