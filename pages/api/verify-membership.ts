import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const RECEIVERS = {
  bsc: '0xa85f4DDE28941e41633b575D3a026A8B42887795',
  eth: '0xa85f4DDE28941e41633b575D3a026A8B42887795',
};

const PRICES = {
  bsc: 5,
  eth: 10,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { txHash, chain, wallet } = req.body;
  if (!txHash || !wallet || !RECEIVERS[chain]) return res.status(400).json({ error: 'Missing parameters' });

  try {
    const url =
      chain === 'bsc'
        ? `https://api.bscscan.com/api?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${process.env.BSCSCAN_API_KEY}`
        : `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${process.env.ETHERSCAN_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    const to = data.result.to?.toLowerCase();
    const from = data.result.from?.toLowerCase();
    const value = parseInt(data.result.value, 16) / 1e18;

    if (to !== RECEIVERS[chain].toLowerCase()) throw new Error('Payment not sent to correct address');
    if (from !== wallet.toLowerCase()) throw new Error('Sender wallet mismatch');
    if (value < PRICES[chain]) throw new Error('Insufficient amount');

    // Optional: save membership to DB here

    return res.status(200).json({ success: true, message: 'Verified' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Verification failed' });
  }
}
