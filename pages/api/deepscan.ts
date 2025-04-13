import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const WHITELIST = [
  '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', // ETH test
  '0x0d8775f648430679a709e98d2b0cb6250d2887ef', // BSC test
  'TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf'          // TRON test
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { wallet, chain, telegramAlert } = req.body;

  if (!wallet || !chain) {
    return res.status(400).json({ error: 'Missing wallet or chain' });
  }

  const apiKeys: Record<string, string> = {
    eth: process.env.ETHERSCAN_API_KEY || '',
    bsc: process.env.BSCSCAN_API_KEY || '',
    tron: '' // Not needed for TRON
  };

  const baseUrls: Record<string, string> = {
    eth: 'https://api.etherscan.io/api',
    bsc: 'https://api.bscscan.com/api',
    tron: 'https://apilist.tronscan.org/api/transaction',
  };

  const isWhitelisted = WHITELIST.includes(wallet);
  const requiresPayment = chain !== 'tron' && !isWhitelisted;

  if (requiresPayment) {
    return res.status(402).json({
      error: 'Payment required for scan',
      payment: {
        eth: '0xYourEthPaymentAddressHere',
        bsc: '0xYourBscPaymentAddressHere',
        amount: chain === 'eth' ? '1.5' : '0.5',
        currency: chain.toUpperCase()
      }
    });
  }

  try {
    // TRON SCAN LOGIC
    if (chain === 'tron') {
      const tronRes = await fetch(`${baseUrls.tron}?sort=-timestamp&count=true&limit=10&start=0&address=${wallet}`);
      const data = await tronRes.json();

      const transactions = data.data.slice(0, 10).map((tx: any) => ({
        date: tx.block_timestamp?.split(' ')[0],
        transactionId: tx.hash,
        amount: tx.amount || 'N/A',
        token: tx.tokenInfo?.tokenName || 'Unknown',
        symbol: tx.tokenInfo?.tokenSymbol || '',
        risk_flags: {} // 🔐 Risk detection not available for TRON yet
      }));

      return res.status(200).json({
        address: wallet,
        chain: 'TRON',
        riskScore: 'Preview Only — Full Report Requires Upgrade',
        transactions
      });
    }

    // ETH / BSC LOGIC
    const url = `${baseUrls[chain]}?module=account&action=tokentx&address=${wallet}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKeys[chain]}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== '1') {
      return res.status(500).json({ error: 'Scan failed', message: data.message });
    }

    const topTransfers = data.result.slice(0, 10);
    const transfers = [];

    for (const tx of topTransfers) {
      const contract = tx.contractAddress?.toLowerCase();

      // GoPlus API - Token Security Flags
      const riskRes = await fetch(`https://api.gopluslabs.io/api/v1/token_security/1?contract_addresses=${contract}`);
      const riskData = await riskRes.json();
      const riskFlags = riskData.result?.[contract] || {};

      transfers.push({
        date: new Date(parseInt(tx.timeStamp) * 1000).toISOString().split('T')[0],
        transactionId: tx.hash,
        amount: (parseFloat(tx.value) / 10 ** parseInt(tx.tokenDecimal)).toFixed(4),
        token: tx.tokenName,
        symbol: tx.tokenSymbol,
        risk_flags: riskFlags
      });
    }

    return res.status(200).json({
      address: wallet,
      chain: chain.toUpperCase(),
      riskScore: '100/100 (High Risk)', // Placeholder
      transactions: transfers
    });
  } catch (err: any) {
    console.error('[DeepScan Error]', err);
    return res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
}
