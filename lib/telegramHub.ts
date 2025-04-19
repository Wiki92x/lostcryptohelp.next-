// ✅ lib/telegramHub.ts — Centralized Telegram Alert Hub
import fetch from 'node-fetch';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

type AlertType =
  | 'DeepScan Result'
  | 'DAO Case Submitted'
  | 'Membership Activated'
  | 'ScamLink Detected'
  | 'Refund Claim Submitted';

export async function sendTelegramAlert(type: AlertType, payload: Record<string, any>) {
  const message = formatMessage(type, payload);

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
    }),
  });

  const data = await res.json();
  if (!data.ok) {
    console.error('❌ Telegram send error:', data);
    throw new Error(data.description || 'Telegram alert failed');
  }

  console.log(`📨 Telegram alert sent: [${type}]`);
}

// 🧠 Dynamic formatter
function formatMessage(type: AlertType, data: Record<string, any>) {
  switch (type) {
    case 'DeepScan Result':
      return `🛡️ *New DeepScan Result*\n\n👛 Wallet: \`${data.wallet}\`\n📊 Risk Score: ${data.risk_score}\n💰 Tokens: ${data.token_count}\n📅 ${new Date().toLocaleString()}`;
    case 'DAO Case Submitted':
      return `📬 *New DAO Case Submitted*\n\n🔗 Chain: ${data.chain}\n📌 Type: ${data.type}\n👛 Wallet: \`${data.wallet}\`\n📝 Desc: ${data.description}`;
    case 'Membership Activated':
      return `💎 *New Membership Activated*\n\n👛 Wallet: \`${data.wallet}\`\n🏷️ Tier: ${data.tier}\n💳 TX Hash: ${data.txHash}`;
    case 'ScamLink Detected':
      return `🚨 *Phishing Link Detected*\n\n🔗 URL: ${data.url}\n🧠 Score: ${data.score}`;
    case 'Refund Claim Submitted':
      return `💸 *Refund Claim Submitted*\n\n👛 Wallet: \`${data.wallet}\`\n📝 Note: ${data.note || '—'}`;
    default:
      return `📡 *New Alert*\n\n${JSON.stringify(data, null, 2)}`;
  }
}