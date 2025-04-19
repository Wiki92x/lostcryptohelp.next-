// ✅ /app/pricing/page.tsx — Enhanced Pricing Page with Upsells, Params, Tooltips
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

export default function PricingPage() {
  const tiers = [
    {
      chain: 'TRON Scan',
      price: 'Free',
      perks: [
        'Wallet Address Report',
        'Low Risk Badge',
        'Basic Alert Summary',
      ],
      button: {
        label: 'Get Started',
        link: '/deep-scan?chain=tron',
      },
      note: 'Only scans last 10 transactions. Upgrade for full analysis.',
      highlight: 'border-green-400 text-green-400',
    },
    {
      chain: 'BSC DeepScan',
      price: '$0.50',
      perks: [
        'AI Risk Score',
        'Telegram Alerts',
        'Rugpull Detector',
        'Stuck TX Fixer',
      ],
      button: {
        label: 'Get Started',
        link: '/connect?plan=bsc',
      },
      highlight: 'border-blue-400 text-blue-400',
    },
    {
      chain: 'ETH DeepScan',
      price: '$1.50',
      perks: [
        'NFT Risk Breakdown',
        'Gas Refund Check',
        'AI Summary + PDF Report',
        'Telegram Sync',
      ],
      button: {
        label: 'Get Started',
        link: '/connect?plan=eth',
      },
      highlight: 'border-yellow-400 text-yellow-300',
    },
  ];

  return (
    <main className="min-h-screen pt-20 px-4 bg-background text-foreground">
      <div className="max-w-5xl mx-auto text-center py-12">
        <h1 className="text-3xl font-bold mb-2">💰 Pricing Tiers</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Affordable crypto-native plans. No KYC. No subscriptions. Pay-per-use.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto pb-20">
        {tiers.map((tier, i) => (
          <div
            key={i}
            className={`rounded-xl border p-6 shadow-md bg-card hover:shadow-lg transition-all ${tier.highlight}`}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                {tier.chain}
                <Info className="w-4 h-4 opacity-60" />
              </h2>
              <span className="text-lg font-bold">{tier.price}</span>
            </div>
            <ul className="text-sm text-muted-foreground mb-4 space-y-2">
              {tier.perks.map((perk, j) => (
                <li key={j}>✅ {perk}</li>
              ))}
            </ul>
            <Link href={tier.button.link}>
              <Button className="w-full">{tier.button.label}</Button>
            </Link>
            {tier.note && (
              <p className="text-xs text-yellow-500 mt-2">⚠ {tier.note}</p>
            )}
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground pb-10">
        * Pricing reflects current operational costs (compute + storage). Payments accepted in ETH, BNB, or TRX.
      </p>
    </main>
  );
}