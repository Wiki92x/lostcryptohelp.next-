// ✅ utils/telegramHub.ts
import axios from 'axios';

export async function sendScanAlert(result: any) {
  const { wallet, riskScore, findings, chain } = result;

  const message = [
    `🚨 *DeepScan Completed*`,
    ``,
    `*Wallet:* \`${wallet}\``,
    `*Chain:* ${chain.toUpperCase()}`,
    `*Risk Score:* ${riskScore}/100`,
    ``,
    findings?.length
      ? findings.map((f: any) => `• *${f.title}* - _${f.severity}_`).join('\n')
      : `✅ No significant threats found.`,
  ].join('\n');

  try {
    await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown'
    });
  } catch (err: any) {
    console.error('[Telegram Alert Error]', err.response?.data || err.message);
  }
}