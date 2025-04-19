// ✅ pages/api/stuck-fix.ts — Final Version (Real ETH/BSC + TRON Mock Fallback)
import type { NextApiRequest, NextApiResponse } from 'next';
import { RPC_ENDPOINTS } from '@/utils/rpcEndpoints';
import { validateAddress } from '@/utils/validators';
import { ethers } from 'ethers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { wallet, chain } = req.body;

  if (!wallet || !chain) return res.status(400).json({ error: 'Missing wallet or chain' });
  if (!validateAddress(wallet, chain)) return res.status(400).json({ error: 'Invalid address' });

  try {
    if (chain === 'tron') {
      // Fallback mock response for TRON
      return res.status(200).json({ stuck: [] });
    }

    const rpc = RPC_ENDPOINTS[chain];
    const provider = new ethers.JsonRpcProvider(rpc);

    const txCount = await provider.getTransactionCount(wallet, 'latest');
    const pendingCount = await provider.getTransactionCount(wallet, 'pending');

    const isStuck = pendingCount > txCount;

    if (!isStuck) {
      return res.status(200).json({ stuck: [] });
    }

    const pending = await provider.send('txpool_content', []);
    const userPending = pending?.pending?.[wallet.toLowerCase()];

    const stuckTxs: any[] = [];

    if (userPending) {
      for (const nonce in userPending) {
        const tx = userPending[nonce][0];

        stuckTxs.push({
          hash: tx.hash,
          nonce: parseInt(nonce),
          gasPrice: BigInt(tx.gasPrice).toString(),
          maxPriorityFeePerGas: tx.maxPriorityFeePerGas ? BigInt(tx.maxPriorityFeePerGas).toString() : null,
          maxFeePerGas: tx.maxFeePerGas ? BigInt(tx.maxFeePerGas).toString() : null,
          to: tx.to,
          value: tx.value,
          status: 'stuck',
          suggestedAction: 'speedup or cancel',
          expiration: Math.floor(Date.now() / 1000) + 900,
          chain,
        });
      }
    }

    return res.status(200).json({ stuck: stuckTxs });
  } catch (err: any) {
    console.error('[StuckTx Error]', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
