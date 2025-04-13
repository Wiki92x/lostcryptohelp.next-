import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { name, wallet, message } = req.body;

  if (!wallet || !message) {
    return res.status(400).json({ error: 'Wallet and message are required' });
  }

  const botToken = process.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.VITE_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return res.status(500).json({ error: 'Telegram bot not configured' });
  }

  const text = `🚨 *Suspicious Activity Reported*\n\n👤 *Name:* ${name || 'Anonymous'}\n🔗 *Wallet:* \`${wallet}\`\n📝 *Message:* ${message}`;

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown'
      })
    });

    const json = await tgRes.json();
    if (!json.ok) {
      return res.status(500).json({ error: 'Telegram error', detail: json.description });
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('[Telegram Report Error]', err.message);
    return res.status(500).json({ error: 'Internal error', details: err.message });
  }
}
