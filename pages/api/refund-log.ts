// ✅ pages/api/refund-log.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { wallet } = req.query;

  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  if (!wallet || typeof wallet !== 'string') return res.status(400).json({ error: 'Missing wallet' });

  const { data, error } = await supabase
    .from('refunds')
    .select('*')
    .eq('wallet', wallet.toLowerCase())
    .order('timestamp', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ refunds: data });
}