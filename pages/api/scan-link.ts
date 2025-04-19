// ✅ pages/api/scan-link.ts — Safe Phishing Link Verifier
import type { NextApiRequest, NextApiResponse } from 'next';

const scamDomains = [
  'phishingwallet.net',
  'malicious-airdrop.com',
  'walletdrain.xyz',
  'suspicious-token.io',
  'fakeclaimdrop.org',
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url || typeof url !== 'string' || !url.startsWith('http')) {
    return res.status(400).json({ error: 'Invalid or missing URL' });
  }

  const isScam = scamDomains.some((domain) => url.includes(domain));

  return res.status(200).json({
    url,
    status: isScam ? 'danger' : 'safe',
    isScam,
    reason: isScam
      ? '⚠️ This link matches known phishing/malicious domains.'
      : '✅ This link does not match known scam sources.',
  });
}