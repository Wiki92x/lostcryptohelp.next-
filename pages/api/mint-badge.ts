// pages/api/mint-badge.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import contractAbi from '@/abis/ReputationBadge.json';

const CONTRACT_ADDRESS = '0xYourMainnetDeployedContract';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { walletAddress, score, metadataURI } = req.body;

  try {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL); // Mainnet RPC
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signer);

    const tx = await contract.mintBadge(walletAddress, score, metadataURI);
    await tx.wait();

    res.status(200).json({ success: true, txHash: tx.hash });
  } catch (err: any) {
    console.error('[MINT ERROR]', err);
    res.status(500).json({ success: false, error: err.message });
  }
}