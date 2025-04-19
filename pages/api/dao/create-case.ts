import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { sendTelegramAlert } from '@/lib/telegramHub'; // ✅ New Hub Integration

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { wallet, chain, type, desc } = req.body;

    console.log('🧪 Incoming body:', { wallet, chain, type, desc });

    if (!wallet || !chain || !type || !desc) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { error } = await supabase.from('cases').insert([
      {
        wallet,
        chain,
        type,
        description: desc,
        status: 'pending',
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('❌ Supabase insert error:', error);
      return res.status(500).json({ error: error.message });
    }

    console.log('✅ Supabase insert successful');

    try {
      await sendTelegramAlert({
        feature: 'DAO Case Submitted',
        wallet,
        chain,
        type,
        description: desc,
      });
      console.log('📨 Telegram alert sent');
    } catch (telegramErr: any) {
      console.error('❌ Telegram alert failed:', telegramErr.message);
    }

    return res.status(200).json({ message: 'Case submitted successfully' });
  } catch (err: any) {
    console.error('❌ DAO API fatal error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}