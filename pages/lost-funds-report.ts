// ✅ /pages/api/lost-funds-report.ts — Lost Funds Claim Generator (Final)

import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { generatePDFReport } from '@/utils/pdfGenerator';
import { sendTelegramAlert } from '@/utils/telegramHub';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { wallet, txHash, chain, issue } = req.body;

    if (!wallet || !txHash || !chain || !issue) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // ✅ Log to Supabase
    const { error } = await supabase.from('lost_reports').insert([
      {
        wallet,
        tx_hash: txHash,
        chain,
        issue,
        created_at: new Date().toISOString()
      }
    ]);
    if (error) throw error;

    // 🧠 Generate PDF (if applicable)
    const pdfUrl = await generatePDFReport({ wallet, txHash, chain, issue });

    // 🚨 Send to Telegram (optional)
    await sendTelegramAlert({
      type: 'LostFundsReport',
      message: `📢 New Lost Funds Report\n\n🔗 Chain: ${chain}\n💸 Wallet: ${wallet}\n🔍 TX: ${txHash}\n🧾 Issue: ${issue}`,
    });

    return res.status(200).json({
      message: 'Report saved and processed',
      pdf: pdfUrl || null
    });
  } catch (err: any) {
    console.error('❌ Lost Funds API Error:', err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}