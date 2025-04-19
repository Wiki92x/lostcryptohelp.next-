// ✅ components/Footer.tsx — Final Polished Web3 Footer w/ Clean Link Structure

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-950 text-white border-t border-zinc-800 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">LostCryptoHelp</h2>
          <p className="text-sm text-zinc-400 mb-3">
            Protect your wallets from scams, malicious tokens, phishing & more.
          </p>
          <p className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} LostCryptoHelp. All rights reserved.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-blue-400 mb-3">Explore</h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li><Link href="/deep-scan" className="hover:text-blue-400">Deep Scan</Link></li>
            <li><Link href="/report" className="hover:text-blue-400">Submit Scam</Link></li>
            <li><Link href="/scan-history" className="hover:text-blue-400">Scan History</Link></li>
            <li><Link href="/tools" className="hover:text-blue-400">Toolbox</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-blue-400 mb-3">Legal</h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li><Link href="/terms" className="hover:text-blue-400">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-blue-400">Privacy Policy</Link></li>
            <li><Link href="/legal" className="hover:text-blue-400">Legal Hub</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-blue-400 mb-3">Follow</h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>
              <a
                href="https://t.me/lostcryptohelp"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >Telegram</a>
            </li>
            <li>
              <a
                href="https://x.com/lostcryptohelp"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >X (Twitter)</a>
            </li>
            <li>
              <a
                href="mailto:support@lostcryptohelp.pro"
                className="hover:text-blue-400"
              >support@lostcryptohelp.pro</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
