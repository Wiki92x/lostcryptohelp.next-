import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--background)] text-[var(--foreground)] py-8 px-4 border-t border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <p className="text-xs md:text-sm">
          © {year} <span className="text-purple-400 font-semibold">LostCryptoHelp</span>. All rights reserved.
        </p>

        <nav className="flex flex-wrap justify-center gap-4 text-xs md:text-sm">
          <Link href="/about" className="hover:text-purple-400 transition">About</Link>
          <Link href="/pricing" className="hover:text-purple-400 transition">Pricing</Link>
          <Link href="/deep-scan" className="hover:text-purple-400 transition">Deep Scan</Link>
          <Link href="/terms" className="hover:text-purple-400 transition">Terms</Link>
          <Link href="/legal" className="hover:text-purple-400 transition">Legal</Link>
        </nav>
      </div>
    </footer>
  );
}
