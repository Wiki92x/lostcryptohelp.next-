// ✅ /pages/api/verify-payment.ts — Membership Payment Verifier (ETH/BSC/TRON)

import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyETHPayment, verifyBSCPayment, verifyTRONPayment } from '@/utils/validators';
import { notifyTelegram } from '@/lib/telegramHub';

const ADDRESS_MAP = {
  eth: '0xa85f4DDE28941e41633b575D3a026A8B42887795',
  bsc: '0xa85f4DDE28941e41633b575D3a026A8B42887795',
  tron: 'TVH1roHbPn5qCj14Dy1GSVrB5XDcsjgEyX',
};

const FEE_MAP = {
  eth: 1.5,
  bsc: 0.5,
  tron: 0.5,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { txHash, wallet, chain } = req.body;

  if (!txHash || !wallet || !chain) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    let validationResult = { isValid: false, amount: 0 };

    if (chain === 'eth') {
      validationResult = await verifyETHPayment(txHash, wallet, FEE_MAP.eth);
    } else if (chain === 'bsc') {
      validationResult = await verifyBSCPayment(txHash, wallet, FEE_MAP.bsc);
    } else if (chain === 'tron') {
      validationResult = await verifyTRONPayment(txHash, wallet, FEE_MAP.tron);
    } else {
      return res.status(400).json({ error: 'Unsupported chain' });
    }

    if (!validationResult.isValid) {
      return res.status(402).json({ error: 'Invalid or insufficient transaction' });
    }

    await notifyTelegram(
      `✅ *Membership Verified*\n\n🔗 *Chain:* ${chain}\n👛 *Wallet:* ${wallet}\n💸 *TX:* ${txHash}\n📥 *Amount:* ${validationResult.amount}`,
    );

    return res.status(200).json({ valid: true, amount: validationResult.amount });
  } catch (err: any) {
    console.error('❌ verify-payment API error:', err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}