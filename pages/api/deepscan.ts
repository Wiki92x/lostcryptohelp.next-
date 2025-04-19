// ✅ pages/api/deepscan.ts — Final Synced Version
import type { NextApiRequest, NextApiResponse } from 'next';
import { deepScan } from '@/utils/deepScanEngine';
import { isPremiumUser } from '@/utils/accessControl';
import { sendScanAlert } from '@/utils/telegramHub';
import { saveScanToSupabase } from '@/utils/scanLogger';
import { validateAddress } from '@/utils/validators';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { wallet, chain } = req.body;

  if (!wallet || !chain) return res.status(400).json({ error: 'Missing wallet or chain' });
  if (!validateAddress(wallet, chain)) return res.status(400).json({ error: 'Invalid address format' });

  try {
    const result = await deepScan(wallet, chain);

    await sendScanAlert(result);               // ✅ Telegram alert
    await saveScanToSupabase(wallet, chain);   // ✅ Supabase history

    return res.status(200).json(result);
  } catch (err: any) {
    console.error('[DEEPSCAN API ERROR]', err);
    return res.status(500).json({ error: 'Scan failed' });
  }
}