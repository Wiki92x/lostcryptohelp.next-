// ✅ /pages/api/airdrop-check.ts — Airdrop Eligibility Scanner API
import type { NextApiRequest, NextApiResponse } from 'next';
import { validateWallet } from '@/utils/walletValidators';

const MOCK_ELIGIBILITY = {
  layerzero: {
    eligible: true,
    reason: 'Bridged > 5 TXs via Stargate',
  },
  arbitrum: {
    eligible: false,
    reason: 'No early transactions found',
  },
  zkSync: {
    eligible: true,
    reason: 'Used zkSync Era and bridged funds',
  },
  starknet: {
    eligible: false,
    reason: 'Insufficient volume on StarkNet Alpha',
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { wallet } = req.body;

    if (!wallet || !validateWallet(wallet)) {
      return res.status(400).json({ error: 'Invalid wallet address' });
    }

    // 🚀 Simulate airdrop check logic (replace with real logic or APIs later)
    return res.status(200).json({
      wallet,
      eligibility: MOCK_ELIGIBILITY,
    });
  } catch (err: any) {
    console.error('❌ Airdrop Check Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
