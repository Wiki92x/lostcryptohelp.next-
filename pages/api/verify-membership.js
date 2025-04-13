import fetch from 'node-fetch';

const addresses = {
  eth: process.env.VERIFY_ETH_ADDRESS,
  bsc: process.env.VERIFY_BNB_ADDRESS,
  tron: process.env.VERIFY_TRON_ADDRESS,
};

const requiredUsd = {
  eth: 25,
  bsc: 10,
  tron: 10,
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { txHash, chain } = req.body;
  if (!txHash || !chain || !addresses[chain]) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    if (chain === 'tron') {
      const tronRes = await fetch(`https://apilist.tronscan.org/api/transaction-info?hash=${txHash}`);
      const tronData = await tronRes.json();
      const to = tronData?.trigger_info?.to_address;
      const amount = parseFloat(tronData?.trigger_info?.amount_str || '0') / 1e6;

      if (to === addresses.tron && amount >= requiredUsd.tron) {
        await sendTelegram(txHash, chain, amount);
        return res.status(200).json({ success: true });
      }
    }

    if (chain === 'bsc' || chain === 'eth') {
      const url = chain === 'bsc'
        ? `https://api.bscscan.com/api?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${process.env.BSCSCAN_API_KEY}`
        : `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${process.env.ETHERSCAN_API_KEY}`;

      const ethRes = await fetch(url);
      const ethData = await ethRes.json();
      const tx = ethData.result;

      const to = tx.to?.toLowerCase();
      const value = parseInt(tx.value) / 1e18;

      if (to === addresses[chain] && value >= requiredUsd[chain]) {
        await sendTelegram(txHash, chain, value);
        return res.status(200).json({ success: true });
      }
    }

    return res.status(400).json({ error: 'Invalid transaction or underpaid' });
  } catch (err) {
    return res.status(500).json({ error: 'Verification failed', detail: err.message });
  }
}

async function sendTelegram(txHash, chain, amount) {
  const token = process.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.VITE_TELEGRAM_CHAT_ID;

  if (token && chatId) {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: `✅ New Membership\nChain: ${chain.toUpperCase()}\nTX: ${txHash}\nAmount: $${amount}`,
      }),
    });
  }
}
