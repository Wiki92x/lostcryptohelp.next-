import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// TEMP fallback to bypass missing modules
// Replace these with real ones later once you restore them
const isPremiumUser = async (_wallet: string) => true;
const analyzeSmartContractAI = async (code: string) => `AI Summary of contract:\n\n${code.slice(0, 300)}...`;
const sendAIScanToTelegram = async (_wallet: string, _token: string, _summary: string) => {};
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || 'demo';
const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY || 'demo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { token, chain, wallet } = req.body;

  if (!token || !chain || !wallet) {
    return res.status(400).json({ error: 'Missing token, chain, or wallet' });
  }

  // 🔐 Access control (will always allow for now)
  const isPremium = await isPremiumUser(wallet);
  if (!isPremium) {
    return res.status(403).json({ error: 'Access denied. Upgrade to Premium to use this feature.' });
  }

  try {
    const explorerURL = {
      eth: `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${token}&apikey=${ETHERSCAN_API_KEY}`,
      bsc: `https://api.bscscan.com/api?module=contract&action=getsourcecode&address=${token}&apikey=${BSCSCAN_API_KEY}`,
    }[chain];

    if (!explorerURL) return res.status(400).json({ error: 'Unsupported chain' });

    const { data } = await axios.get(explorerURL);
    const code = data.result?.[0]?.SourceCode;

    if (!code || code.trim() === '') {
      return res.status(404).json({ error: 'Smart contract is not verified on chain explorer' });
    }

    const summary = await analyzeSmartContractAI(code);

    await sendAIScanToTelegram(wallet, token, summary);

    return res.status(200).json({ summary });
  } catch (err: any) {
    console.error('[Analyze Contract Error]', err.message);
    return res.status(500).json({ error: 'AI analysis failed', message: err.message });
  }
}