import type { NextApiRequest, NextApiResponse } from 'next';

const TELEGRAM_BOT_TOKEN = process.env.VITE_TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.VITE_TELEGRAM_CHAT_ID!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { wallet, chain, transfers, risky, email } = req.body;

  try {
    // Send Telegram alert
    const message = `🚨 *New Deep Scan Alert* 🚨
🧾 *Wallet:* \`${wallet}\`
🔗 *Chain:* ${chain.toUpperCase()}
🔁 *Total Transfers:* ${transfers}
⚠️ *Risky Tokens:* ${risky}

_LostCryptoHelp Scan Service_`;

    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    // Placeholder: Send email alert (implement next)
    if (email) {
      console.log(`📧 Would send report to: ${email}`);
      // Add logic here to trigger your email service (e.g., SendGrid, Resend, etc.)
    }

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send alert' });
  }
}