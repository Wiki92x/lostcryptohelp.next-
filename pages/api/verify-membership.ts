// ✅ /pages/api/verify-membership.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { checkUserTier } from '@/utils/tier';
import { sendTelegramAlert } from '@/lib/telegramHub';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { wallet } = req.body;
  if (!wallet) return res.status(400).json({ error: 'Missing wallet address' });

  try {
    const { data, error } = await supabase
      .from('memberships')
      .select('tier')
      .eq('wallet', wallet.toLowerCase())
      .single();

    if (error) {
      console.error('❌ Supabase fetch error:', error);
      return res.status(500).json({ error: 'Failed to check membership' });
    }

    const tier = checkUserTier(data?.tier);
    await sendTelegramAlert(`📣 Membership verified:\n\n👛 Wallet: ${wallet}\n🏷 Tier: ${tier}`);

    return res.status(200).json({ tier });
  } catch (err: any) {
    console.error('❌ Membership verification error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}