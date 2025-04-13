
// ✅ /pages/api/verify-tron.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { txHash } = req.body;
  const receiver = process.env.VERIFY_TRON_ADDRESS;

  if (!txHash || !receiver) {
    return res.status(400).json({ error: 'Missing txHash or receiver address' });
  }

  try {
    const response = await fetch(
      \`https://apilist.tronscan.org/api/transaction-info?hash=\${txHash}\`
    );
    const data = await response.json();

    const tokenTransfer = data.trigger_info || {};
    const to = tokenTransfer.to_address;
    const amount = parseFloat(tokenTransfer.amount_str || '0') / 1e6;
    const tokenName = tokenTransfer.tokenName;

    if (
      to === receiver &&
      amount >= 0.5 &&
      tokenName.toUpperCase().includes('USDT')
    ) {
      return res.status(200).json({ success: true, txHash, amount, tokenName });
    } else {
      return res.status(400).json({ success: false, reason: 'Invalid payment details' });
    }
  } catch (err) {
    console.error('[TRON VERIFY ERROR]', err);
    return res.status(500).json({ error: 'Verification failed', detail: err.message });
  }
}
