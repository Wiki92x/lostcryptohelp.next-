// pages/api/notify-telegram.t
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const { result } = req.body;
  if (!result || !result.address || !result.chain) {
    return res.status(400).json({ error: 'Missing scan result' });
  }

  const botToken = process.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.VITE_TELEGRAM_CHAT_ID;

  const top = result.transactions?.[0]?.symbol || 'N/A';
  const txCount = result.transactions?.length || 0;

  const message = `🧠 Deep Scan Completed

Wallet: ${result.address}
Chain: ${result.chain}
Risk Score: ${result.riskScore}
Top Token: ${top}
TX Count: ${txCount}

Visit: https://lostcryptohelp.pro`;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Telegram error', err);
    return res.status(500).json({ error: 'Telegram failed' });
  }
}