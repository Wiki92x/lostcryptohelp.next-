import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const WHITELIST = [
  '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
  'TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf',
];

const RISK_WEIGHTS: Record<string, number> = {
  is_honeypot: 25,
  can_take_back_ownership: 20,
  hidden_owner: 15,
  slippage_modifiable: 10,
  owner_change_disabled: 10,
  trading_cooldown: 5,
};

function calculateRiskScore(riskFlags: Record<string, string>): number {
  return Object.entries(RISK_WEIGHTS).reduce((total, [flag, weight]) => {
    return total + (riskFlags[flag] === '1' ? weight : 0);
  }, 0);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { wallet, chain } = req.body;

  if (!wallet || !chain) {
    res.status(400).json({ error: 'Missing wallet or chain' });
    return;
  }

  const apiKeys: Record<string, string> = {
    eth: process.env.ETHERSCAN_API_KEY || '',
    bsc: process.env.BSCSCAN_API_KEY || '',
    tron: '',
  };

  const baseUrls: Record<string, string> = {
    eth: 'https://api.etherscan.io/api',
    bsc: 'https://api.bscscan.com/api',
    tron: 'https://apilist.tronscan.org/api/transaction',
  };

  const isWhitelisted = WHITELIST.includes(wallet);
  const requiresPayment = chain !== 'tron' && !isWhitelisted;

  if (requiresPayment) {
    res.status(402).json({
      error: 'Payment required for scan',
      payment: {
        eth: '0xYourEthPaymentAddressHere',
        bsc: '0xYourBscPaymentAddressHere',
        amount: chain === 'eth' ? '1.5' : '0.5',
        currency: chain.toUpperCase(),
      },
    });
    return;
  }

  try {
    if (chain === 'tron') {
      const tronRes = await fetch(
        `${baseUrls.tron}?sort=-timestamp&count=true&limit=50&start=0&address=${wallet}`
      );
      const data = await tronRes.json();

      const transactions = data.data.map((tx: any) => ({
        date: tx.block_timestamp?.split(' ')[0],
        transactionId: tx.hash,
        amount: tx.amount,
        token: tx.tokenInfo?.tokenName || 'Unknown',
        symbol: tx.tokenInfo?.tokenSymbol || '',
        risk_flags: {},
        riskScore: 0,
      }));

      await sendTelegramAlert(wallet, 'TRON', 0, 'TRX', transactions.length);

      res.status(200).json({
        address: wallet,
        chain: 'TRON',
        riskScore: 'Preview Only — Full Report Requires Upgrade',
        transactions,
      });
      return;
    }

    const url = `${baseUrls[chain]}?module=account&action=tokentx&address=${wallet}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKeys[chain]}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== '1') {
      res.status(500).json({ error: 'Scan failed', message: data.message });
      return;
    }

    const topTransfers = data.result.slice(0, 100);
    const transfers = [];

    for (const tx of topTransfers) {
      const contract = tx.contractAddress?.toLowerCase();
      const riskRes = await fetch(`https://api.gopluslabs.io/api/v1/token_security/1?contract_addresses=${contract}`);
      const riskData = await riskRes.json();
      const riskFlags = riskData.result?.[contract] || {};
      const tokenRiskScore = calculateRiskScore(riskFlags);

      transfers.push({
        date: new Date(parseInt(tx.timeStamp) * 1000).toISOString().split('T')[0],
        transactionId: tx.hash,
        amount: (parseFloat(tx.value) / 10 ** parseInt(tx.tokenDecimal)).toFixed(4),
        token: tx.tokenName,
        symbol: tx.tokenSymbol,
        risk_flags: riskFlags,
        riskScore: tokenRiskScore,
      });
    }

    const averageScore = Math.round(
      transfers.reduce((sum, t) => sum + (t.riskScore || 0), 0) / transfers.length
    );

    const topToken = transfers.sort((a, b) => b.riskScore - a.riskScore)[0]?.symbol || 'N/A';

    await sendTelegramAlert(wallet, chain.toUpperCase(), averageScore, topToken, transfers.length);

    res.status(200).json({
      address: wallet,
      chain: chain.toUpperCase(),
      riskScore: `${averageScore}/100`,
      transactions: transfers,
    });
  } catch (err: any) {
    console.error('[DeepScan Error]', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
}

async function sendTelegramAlert(wallet: string, chain: string, score: number, token: string, txCount: number) {
  const bot = process.env.VITE_TELEGRAM_BOT_TOKEN;
  const chat = process.env.VITE_TELEGRAM_CHAT_ID;
  if (!bot || !chat) return;

  const msg = `🧠 *Deep Scan Completed*\n\nWallet: \`${wallet}\`\nChain: ${chain}\nRisk Score: ${score}/100\nTop Token: ${token}\nTransactions: ${txCount}`;

  await fetch(`https://api.telegram.org/bot${bot}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chat,
      text: msg,
      parse_mode: 'Markdown',
    }),
  });
}
