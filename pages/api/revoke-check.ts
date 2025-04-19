// ✅ pages/api/revoke-check.ts — Token Approval Scanner
import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import { RPC_ENDPOINTS } from '@/utils/rpcEndpoints';
import { validateAddress } from '@/utils/validators';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { wallet, chain } = req.body;
  if (!wallet || !chain) return res.status(400).json({ error: 'Missing wallet or chain' });
  if (!validateAddress(wallet, chain)) return res.status(400).json({ error: 'Invalid wallet address' });

  try {
    const provider = new ethers.JsonRpcProvider(RPC_ENDPOINTS[chain]);
    const erc20Abi = [
      'function allowance(address owner, address spender) view returns (uint256)',
      'function symbol() view returns (string)',
      'function decimals() view returns (uint8)',
    ];

    const highRiskSpenders = [
      '0x1111111254EEB25477B68fb85Ed929f73A960582', // 1inch
      '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f', // UniswapV2
      '0xE592427A0AEce92De3Edee1F18E0157C05861564', // UniswapV3
    ];

    const tokenList = [
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC
      '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI
      '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT
    ];

    const approvals = [];

    for (const token of tokenList) {
      const contract = new ethers.Contract(token, erc20Abi, provider);
      const symbol = await contract.symbol();
      const decimals = await contract.decimals();

      for (const spender of highRiskSpenders) {
        const allowance = await contract.allowance(wallet, spender);
        const readable = Number(ethers.formatUnits(allowance, decimals));

        if (readable > 0) {
          approvals.push({ token, symbol, spender, allowance: readable });
        }
      }
    }

    return res.status(200).json({ approvals });
  } catch (err: any) {
    console.error('[TokenApprovalCheck Error]', err);
    return res.status(500).json({ error: err.message || 'Internal error' });
  }
}
