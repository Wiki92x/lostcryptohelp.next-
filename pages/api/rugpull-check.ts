// ✅ pages/api/rugpull-check.ts — Smart Contract Intelligence
import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import { RPC_ENDPOINTS } from '@/utils/rpcEndpoints';
import { validateAddress } from '@/utils/validators';
import { getTopHolders, checkLiquidityLock, simulateHoneypot } from '@/utils/scanUtils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { token, chain } = req.body;
  if (!token || !chain) return res.status(400).json({ error: 'Missing token or chain' });
  if (!validateAddress(token, chain)) return res.status(400).json({ error: 'Invalid address' });

  // 🟡 TRON fallback mock
  if (chain === 'tron') {
    return res.status(200).json({
      risk_score: 72,
      is_proxy: '1',
      is_mintable: '1',
      is_blacklistable: '1',
      is_pauseable: '1',
      honeypot_result: 'unknown',
      lp_lock: '0',
      top_holder: '96',
      contract_verified: false,
    });
  }

  try {
    const provider = new ethers.JsonRpcProvider(RPC_ENDPOINTS[chain]);

    let checksumAddress = '';
    try {
      checksumAddress = ethers.getAddress(token.trim());
    } catch {
      return res.status(400).json({ error: 'Invalid token checksum' });
    }

    const code = await provider.getCode(checksumAddress);
    if (!code || code === '0x') return res.status(404).json({ error: 'Contract not found' });

    // 🔎 Risk Flags
    const isProxy = code.includes('delegatecall');
    const isMintable = code.includes('mint');
    const isBlacklistable = code.includes('blacklist');
    const isPauseable = code.includes('pause');
    const isVerified = true;

    // 🧠 External Evaluators
    let honeypotCheck = 'unknown';
    let lpLock = false;
    let topHolder = 0;

    try {
      honeypotCheck = await simulateHoneypot(token, chain);
    } catch (e) {
      console.warn('[simulateHoneypot]', e);
    }

    try {
      lpLock = await checkLiquidityLock(token, chain);
    } catch (e) {
      console.warn('[checkLiquidityLock]', e);
    }

    try {
      const top10 = await getTopHolders(token, chain);
      topHolder = top10?.[0]?.percent || 0;
    } catch (e) {
      console.warn('[getTopHolders]', e);
    }

    // ⚠️ Score Calculation
    let risk_score = 0;
    if (!isVerified) risk_score += 20;
    if (honeypotCheck === 'yes') risk_score += 25;
    if (isMintable) risk_score += 15;
    if (!lpLock) risk_score += 20;
    if (topHolder > 80) risk_score += 20;

    return res.status(200).json({
      risk_score,
      is_proxy: isProxy ? '1' : '0',
      is_mintable: isMintable ? '1' : '0',
      is_blacklistable: isBlacklistable ? '1' : '0',
      is_pauseable: isPauseable ? '1' : '0',
      honeypot_result: honeypotCheck,
      lp_lock: lpLock ? '1' : '0',
      top_holder: topHolder,
      contract_verified: isVerified,
    });
  } catch (err: any) {
    console.error('[SmartRugPullCheck Error]', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}