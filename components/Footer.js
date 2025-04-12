import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">&copy; 2025 LostCryptoHelp. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <Link href="/about" className="hover:underline text-sm">About</Link>
          <Link href="/pricing" className="hover:underline text-sm">Pricing</Link>
          <Link href="/terms" className="hover:underline text-sm">Terms</Link>
          <Link href="/deep-scan" className="hover:underline text-sm">Deep Scan</Link>
        </div>
      </div>
    </footer>
  );
}