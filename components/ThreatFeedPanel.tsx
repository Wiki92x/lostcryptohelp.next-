// ✅ components/ThreatFeed.tsx — Realtime Web3 Threat Feed Section
'use client';

import { AlertCircle, ShieldX, Ban, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';

const mockFeed = [
  {
    type: 'Approval Revoked',
    address: '0x1a9...d3f7',
    token: 'FAKETOKEN',
    level: 'High',
    chain: 'Ethereum'
  },
  {
    type: 'Rugpull Flagged',
    address: '0x7b2...ff99',
    token: 'SCAMINU',
    level: 'Critical',
    chain: 'BSC'
  },
  {
    type: 'Phishing Domain Linked',
    address: '0x342...dc91',
    token: 'None',
    level: 'Moderate',
    chain: 'Ethereum'
  },
  {
    type: 'Token Freeze Triggered',
    address: '0x123...abcd',
    token: 'STUCKETH',
    level: 'Medium',
    chain: 'Polygon'
  },
];

export default function ThreatFeed() {
  const [feed, setFeed] = useState<any[]>([]);

  useEffect(() => {
    // Simulate fetch
    setTimeout(() => {
      setFeed(mockFeed);
    }, 500);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'Approval Revoked':
        return <ShieldX className="text-yellow-400 w-4 h-4" />;
      case 'Rugpull Flagged':
        return <Ban className="text-red-500 w-4 h-4" />;
      case 'Phishing Domain Linked':
        return <AlertCircle className="text-orange-400 w-4 h-4" />;
      default:
        return <AlertCircle className="text-zinc-400 w-4 h-4" />;
    }
  };

  return (
    <section className="bg-zinc-950 px-6 py-12 border-t border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Threat Feed</h2>
      <div className="max-w-5xl mx-auto space-y-4 text-sm">
        {feed.map((item, i) => (
          <div key={i} className="flex items-start gap-3 bg-zinc-900 rounded-lg px-4 py-3 border border-zinc-800">
            {getIcon(item.type)}
            <div className="flex-1">
              <p className="text-white">
                <span className="font-medium text-blue-400">{item.type}</span> — address{' '}
                <span className="text-zinc-300 font-mono">{item.address}</span> on {item.chain}
                {item.token !== 'None' && (
                  <span> involving <span className="text-red-400 font-semibold">{item.token}</span></span>
                )}
              </p>
              <p className="text-xs text-zinc-500 mt-1">Severity Level: {item.level}</p>
            </div>
            <a
              href={`https://etherscan.io/address/${item.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-xs flex items-center gap-1"
            >
              View <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
