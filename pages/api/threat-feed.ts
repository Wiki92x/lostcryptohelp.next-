// ✅ /pages/api/threat-feed.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const mockThreats = [
  {
    id: 'threat-001',
    title: 'Fake Airdrop Drain (Ethereum)',
    riskLevel: 'high',
    source: '0xPhishingContract',
    tags: ['airdrop', 'scam', 'token-drainer'],
    date: new Date().toISOString(),
    url: 'https://etherscan.io/address/0xPhishingContract'
  },
  {
    id: 'threat-002',
    title: 'Malicious Approval on TRON',
    riskLevel: 'medium',
    source: 'TScamWalletABC',
    tags: ['approval', 'wallet-drain'],
    date: new Date().toISOString(),
    url: 'https://tronscan.org/#/address/TScamWalletABC'
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.headers['access_token'] !== process.env.NEXT_PUBLIC_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  res.status(200).json({ data: mockThreats });
}