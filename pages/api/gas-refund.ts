import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import { RPC_ENDPOINTS } from '@/utils/rpcEndpoints';
import { validateAddress } from '@/utils/validators';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BLOCK_RANGE = 250;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { wallet, chain } = req.body;

  if (!wallet || !chain) return res.status(400).json({ error: 'Missing wallet or chain' });
  if (!validateAddress(wallet, chain)) return res.status(400).json({ error: 'Invalid address' });

  try {
    const provider = new ethers.JsonRpcProvider(RPC_ENDPOINTS[chain]);
    const latest = await provider.getBlockNumber();

    const blocks = await Promise.allSettled(
      Array.from({ length: BLOCK_RANGE }).map((_, idx) => provider.getBlock(latest - idx, true))
    );

    const refunds: any[] = [];

    for (const blockResult of blocks) {
      if (blockResult.status !== 'fulfilled') continue;
      const block = blockResult.value;

      for (const tx of block.transactions) {
        if (!tx.from || !wallet) continue;
        if (ethers.getAddress(tx.from) !== ethers.getAddress(wallet)) continue;

        const receipt = await provider.getTransactionReceipt(tx.hash);
        if (receipt?.status === 0 && tx.value.toString() === '0') {
          const gasUsed = receipt.gasUsed.toNumber();
          const gasPrice = tx.gasPrice?.toNumber() || 0;
          const refundAmount = (gasUsed * gasPrice) / 1e18;

          const refund = {
            txHash: tx.hash,
            block: tx.blockNumber,
            timestamp: block.timestamp,
            gasUsed,
            gasPrice,
            value: tx.value.toString(),
            reason: 'Failed TX burned gas with no value',
            chain,
            wallet,
            refundAmount,
            status: 'failed'
          };

          refunds.push(refund);
          await supabase.from('refunds').insert([refund]);
        }
      }
    }

    return res.status(200).json({ refunds });
  } catch (err: any) {
    console.error('[GasRefund Error]', err.message);
    return res.status(500).json({ error: 'Internal error' });
  }
}