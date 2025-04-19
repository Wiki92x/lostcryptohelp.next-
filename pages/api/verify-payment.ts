// ✅ /pages/api/verify-payment.ts — Validate On-Chain Payment by TX Hash

import type { NextApiRequest, NextApiResponse } from 'next';
import * as ethers from 'ethers';

const NETWORKS = {
  eth: {
    name: 'Ethereum',
    provider: new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`),
    address: '0xa85f4DDE28941e41633b575D3a026A8B42887795',
    requiredAmount: ethers.parseEther('0.0015'), // ≈ $5
  },
  bsc: {
    name: 'Binance Smart Chain',
    provider: new ethers.JsonRpcProvider('https://bsc-dataseed1.binance.org'),
    address: '0xa85f4DDE28941e41633b575D3a026A8B42887795',
    requiredAmount: ethers.parseUnits('0.5', 18), // ≈ $5
  },
  tron: {
    name: 'Tron',
    url: `https://api.trongrid.io/v1/transactions/`,
    address: 'TVH1roHbPn5qCj14Dy1GSVrB5XDcsjgEyX',
    requiredAmount: 0.5, // fallback for frontend check
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { chain, txHash } = req.body;
    if (!chain || !txHash) return res.status(400).json({ error: 'Missing required fields' });

    if (!['eth', 'bsc', 'tron'].includes(chain)) {
      return res.status(400).json({ error: 'Unsupported chain' });
    }

    if (chain === 'tron') {
      const response = await fetch(`${NETWORKS.tron.url}${txHash}`);
      const data = await response.json();
      const tx = data?.data?.[0];

      if (!tx) return res.status(404).json({ error: 'TRON TX not found' });

      const toAddressHex = tx?.raw_data?.contract?.[0]?.parameter?.value?.to_address;
      const expectedHex = ethers.getAddress(NETWORKS.tron.address).replace('T', '41');

      if (!toAddressHex || !toAddressHex.endsWith(expectedHex)) {
        return res.status(400).json({ error: 'TRON TX to wrong address' });
      }

      return res.status(200).json({ success: true });
    }

    const { provider, address, requiredAmount } = NETWORKS[chain];
    const tx = await provider.getTransaction(txHash);

    if (!tx) return res.status(404).json({ error: 'TX not found' });
    if (!tx.to || tx.to.toLowerCase() !== address.toLowerCase()) {
      return res.status(400).json({ error: 'TX recipient mismatch' });
    }
    if (tx.value < requiredAmount) {
      return res.status(400).json({ error: 'Insufficient payment amount' });
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('[Verify Payment Error]', err);
    return res.status(500).json({ error: err.message || 'Internal error' });
  }
}