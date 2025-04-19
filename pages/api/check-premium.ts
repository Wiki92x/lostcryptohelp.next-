// ✅ pages/api/check-premium.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { isPremiumUser } from '@/utils/accessControl';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { wallet } = req.query;

  if (!wallet || typeof wallet !== 'string') {
    return res.status(400).json({ error: 'Missing wallet' });
  }

  const premium = await isPremiumUser(wallet);
  return res.status(200).json({ premium });
}