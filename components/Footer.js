import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black text-gray-500 dark:text-gray-400 py-6 border-t border-gray-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Copyright */}
        <p className="text-xs md:text-sm text-center md:text-left">
          © {new Date().getFullYear()}{' '}
          <span className="text-purple-600 dark:text-purple-400 font-semibold">LostCryptoHelp</span>. All rights reserved.
        </p>

        {/* Footer Nav */}
        <div className="flex flex-wrap justify-center md:justify-end gap-4 text-xs md:text-sm">
          <Link href="/about" className="hover:text-purple-500 dark:hover:text-purple-300 transition">About</Link>
          <Link href="/pricing" className="hover:text-purple-500 dark:hover:text-purple-300 transition">Pricing</Link>
          <Link href="/terms" className="hover:text-purple-500 dark:hover:text-purple-300 transition">Terms</Link>
          <Link href="/deep-scan" className="hover:text-purple-500 dark:hover:text-purple-300 transition">Deep Scan</Link>
        </div>
      </div>
    </footer>
  );
}
