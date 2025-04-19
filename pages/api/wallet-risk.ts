// ✅ pages/api/wallet-risk.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidAddress } from '@/utils/validators';
import { fetchEtherscanLabel, getWalletAge } from '@/utils/explorers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { address, chain } = req.body;
  if (!address || !chain || !isValidAddress(address, chain)) {
    return res.status(400).json({ error: 'Invalid address or chain' });
  }

  try {
    const label = await fetchEtherscanLabel(address, chain); // 🧠 optional labels
    const age = await getWalletAge(address, chain); // 📅 account age

    const risk_score =
      label?.includes('Phish') || label?.includes('Scam') ? 90 :
      label?.includes('DEX') || label?.includes('Proxy') ? 60 :
      age < 30 ? 70 : 20;

    return res.status(200).json({
      address,
      chain,
      risk_score,
      label: label || 'EOA',
      age,
    });
  } catch (err: any) {
    console.error('[WalletRisk Error]', err);
    return res.status(500).json({ error: err.message || 'Internal error' });
  }
}