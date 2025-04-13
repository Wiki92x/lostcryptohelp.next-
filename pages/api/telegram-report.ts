import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { result } = req.body;

  if (!result?.address || !result?.chain) {
    return res.status(400).json({ error: 'Missing scan result payload' });
  }

  const botToken = process.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.VITE_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return res.status(500).json({ error: 'Missing Telegram environment variables' });
  }

  const top = result.transactions?.[0]?.symbol || 'N/A';
  const txCount = result.transactions?.length || 0;

  const message = `📡 *Deep Scan Completed*\n\n` +
    `*Wallet:* \`${result.address}\`\n` +
    `*Chain:* ${result.chain}\n` +
    `*Risk Score:* ${result.riskScore}\n` +
    `*Top Token:* ${top}\n` +
    `*Transactions:* ${txCount}`;

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const json = await telegramRes.json();
    console.log('[Telegram Response]', json);

    if (!json.ok) {
      console.error('[Telegram Error]', json.description);
      return res.status(500).json({ error: 'Telegram send failed', details: json.description });
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('[Telegram Catch]', err.message);
    return res.status(500).json({ error: 'Telegram send failed', details: err.message });
  }
}
