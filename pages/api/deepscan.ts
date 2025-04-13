import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const WHITELIST = [
  '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
  'TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf',
];

const RISK_WEIGHTS = {
  is_honeypot: 25,
  can_take_back_ownership: 20,
  hidden_owner: 15,
  slippage_modifiable: 10,
  owner_change_disabled: 10,
  trading_cooldown: 5,
};

function calculateRiskScore(riskFlags: Record<string, string>): number {
  return Object.entries(riskFlags)
    .reduce((total, [flag, value]) => total + (value === '1' ? RISK_WEIGHTS[flag] : 0), 0);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { wallet, chain } = req.body;
  if (!wallet || !chain) {
    return res.status(400).json({ error: 'Missing wallet or chain' });
  }

  if (WHITELIST.includes(wallet)) {
    return res.status(200).json({ message: 'Wallet is whitelisted. No payment required.' });
  }

  const apiKeys = {
    eth: process.env.ETHERSCAN_API_KEY || '',
    bsc: process.env.BSCSCAN_API_KEY || '',
    tron: process.env.TRONSCAN_API_KEY || '',
  };

  const baseUrls = {
    eth: 'https://api.etherscan.io/api',
    bsc: 'https://api.bscscan.com/api',
    tron: 'https://apilist.tronscan.org/api/transaction',
  };

  try {
    const apiUrl = `${baseUrls[chain]}?module=account&action=tokentx&address=${wallet}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKeys[chain]}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok || data.status !== '1') {
      throw new Error(data.result || 'Failed to fetch transaction data');
    }

    const transactions = data.result.slice(0, 10).map(tx => ({
      date: new Date(parseInt(tx.timeStamp) * 1000).toISOString().split('T')[0],
      transactionId: tx.hash,
      amount: (parseFloat(tx.value) / Math.pow(10, parseInt(tx.tokenDecimal))).toFixed(4) + ` ${tx.tokenSymbol}`,
      riskFlags: {}, // This should be calculated based on some criteria
      riskScore: calculateRiskScore({}) // Placeholder for actual risk calculation
    }));

    res.status(200).json({
      wallet,
      chain: chain.toUpperCase(),
      transactions,
      riskScore: transactions.reduce((acc, tx) => acc + tx.riskScore, 0) / transactions.length,
    });
  } catch (error) {
    console.error('[DeepScan Error]', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
