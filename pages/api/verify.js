import fetch from 'node-fetch';

const RECEIVER_ADDRESS = {
  eth: process.env.VERIFY_ETH_ADDRESS,
  bsc: process.env.VERIFY_BNB_ADDRESS,
  tron: process.env.VERIFY_TRON_ADDRESS,
};

const REQUIRED_USD = {
  eth: 1.5,
  bsc: 0.5,
  tron: 0.5,
};

const API_KEYS = {
  eth: process.env.ETHERSCAN_API_KEY,
  bsc: process.env.BSCSCAN_API_KEY,
  tron: process.env.TRONSCAN_API_KEY,
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { wallet, chain, txHash } = req.body;

  if (!wallet || !chain || !txHash) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  const lowerChain = chain.toLowerCase();
  const receiver = RECEIVER_ADDRESS[lowerChain];
  const requiredUsd = REQUIRED_USD[lowerChain];
  const apiKey = API_KEYS[lowerChain];

  try {
    let isValid = false;

    if (lowerChain === 'eth' || lowerChain === 'bsc') {
      const baseUrl =
        lowerChain === 'eth'
          ? 'https://api.etherscan.io/api'
          : 'https://api.bscscan.com/api';

      const url = `${baseUrl}?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${apiKey}`;
      const txUrl = `${baseUrl}?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${apiKey}`;

      const [receiptRes, txRes] = await Promise.all([
        fetch(url),
        fetch(txUrl),
      ]);

      const receiptData = await receiptRes.json();
      const txData = await txRes.json();

      if (
        receiptData?.status === '1' &&
        receiptData.result?.status === '1' &&
        txData.result &&
        txData.result.to?.toLowerCase() === receiver.toLowerCase()
      ) {
        isValid = true;
      }
    } else if (lowerChain === 'tron') {
      const tronUrl = `https://apilist.tronscan.org/api/transaction-info?hash=${txHash}`;
      const tronRes = await fetch(tronUrl);
      const tronData = await tronRes.json();

      if (
        tronData.toAddress?.toLowerCase() === receiver.toLowerCase() &&
        tronData.confirmed === true
      ) {
        isValid = true;
      }
    }

    if (!isValid) {
      return res.status(402).json({ error: 'Invalid or unpaid transaction' });
    }

    // ✅ Send Telegram alert
    const botToken = process.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = process.env.VITE_TELEGRAM_CHAT_ID;
    if (botToken && chatId) {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: `✅ Verified Payment\nChain: ${chain.toUpperCase()}\nWallet: ${wallet}\nTX: ${txHash}`,
        }),
      });
    }

    return res.status(200).json({
      wallet,
      chain: chain.toUpperCase(),
      verified: true,
      txHash,
      paid: true,
      requiredUsd,
    });
  } catch (err) {
    console.error('[VERIFY ERROR]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
