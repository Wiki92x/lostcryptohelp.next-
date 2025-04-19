// ✅ /app/tools/page.tsx — Final Synced Version with Dark Neon Theme

'use client';

const tools = [
  { id: 1, title: 'Multi-chain Wallet Scanner', desc: 'Scan any ETH, BSC, or TRON wallet for scam tokens.' },
  { id: 2, title: 'Smart Contract AI Audit', desc: 'Analyze smart contracts for risks using GPT & pattern detection.' },
  { id: 3, title: 'Rugpull Detector', desc: 'Detect malicious token logic, LP drainers, and scam owners.' },
  { id: 4, title: 'Wallet Risk Score + Labels', desc: 'Instantly score and label wallet behavior using AI.' },
  { id: 5, title: 'Watchlist & Alerts', desc: 'Add wallets to monitor and receive Telegram notifications.' },
  { id: 6, title: 'Sniping & MEV Monitor', desc: 'Track snipe bots and frontrunners on-chain.' },
  { id: 7, title: 'Whale Tracking', desc: 'Identify large wallet movements and token accumulation.' },
  { id: 8, title: 'AI Portfolio Analyzer', desc: 'Breakdown token exposure, risk zones and hidden assets.' },
  { id: 9, title: 'Phishing + Scam Detector', desc: 'Scan suspicious links, fake airdrops, and phishing sites.' },
  { id: 10, title: 'NFT Stolen Tracker', desc: 'Flag NFT theft cases and trace flagged OpenSea items.' },
  { id: 11, title: 'Honeypot Token Scanner', desc: 'Detect non-sellable tokens and honeypot scams.' },
  { id: 12, title: 'Presale Radar & Launch Watcher', desc: 'Track stealth launches, top pre-sales, and new pairs.' },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen px-6 py-20 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-500">LostCryptoHelp Tools</h1>
        <p className="text-sm text-zinc-400 mt-2">Explore all features built to protect your wallet & track the market.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="rounded-2xl border border-zinc-700 p-5 bg-zinc-900 hover:border-blue-400 hover:shadow-glow transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-mono text-zinc-400">#{tool.id.toString().padStart(2, '0')}</span>
              <span className="text-xs bg-blue-800 text-white px-2 py-0.5 rounded-full">Tool</span>
            </div>
            <h2 className="text-lg font-semibold text-white">{tool.title}</h2>
            <p className="text-sm text-zinc-400 mt-2">{tool.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center text-xs text-zinc-500 mt-10">
        Built with privacy-first design. Telegram alerts enabled. No login. No KYC.
      </div>
    </div>
  );
}

