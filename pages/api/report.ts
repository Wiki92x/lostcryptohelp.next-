// ✅ /pages/api/report.ts — FINAL VERSION WITH TELEGRAM HUB

import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { sendTelegramAlert } from '@/lib/telegramHub';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { wallet, chain, email, issue, detail } = req.body;

    if (!wallet || !chain || !issue || !detail) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log('📨 Report Submitted:', { wallet, chain, issue });

    const { error } = await supabase.from('reports').insert([
      {
        wallet,
        chain,
        email,
        issue,
        detail,
        status: 'open',
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('❌ Supabase insert error (report):', error);
      return res.status(500).json({ error: error.message });
    }

    await sendTelegramAlert({
      feature: 'User Report',
      wallet,
      chain,
      type: issue,
      description: detail.slice(0, 500),
      extra: email ? `📧 ${email}` : '',
    });

    return res.status(200).json({ message: 'Report submitted successfully' });
  } catch (err: any) {
    console.error('❌ Report API error:', err);
    return res.status(500).json({ error: err.message || 'Unexpected server error' });
  }
}