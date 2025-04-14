import { NextRequest } from 'next/server';
import fetch from 'node-fetch';

const RECEIVERS = {
  bsc: '0xa85f4DDE28941e41633b575D3a026A8B42887795',
  eth: '0xa85f4DDE28941e41633b575D3a026A8B42887795',
};

const PRICES = {
  bsc: 5,
  eth: 10,
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { txHash, chain, wallet } = body;

  if (!txHash || !wallet || !RECEIVERS[chain]) {
    return new Response(JSON.stringify({ error: 'Missing parameters' }), { status: 400 });
  }

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

    if (to !== RECEIVERS[chain].toLowerCase()) throw new Error('Incorrect recipient');
    if (from !== wallet.toLowerCase()) throw new Error('Sender mismatch');
    if (value < PRICES[chain]) throw new Error('Insufficient amount');

    return new Response(JSON.stringify({ success: true, message: 'Verified' }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Verification failed' }), { status: 500 });
  }
}
