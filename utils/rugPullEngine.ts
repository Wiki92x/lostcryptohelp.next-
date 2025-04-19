// ✅ utils/rugPullEngine.ts — Real Rug Pull Risk Detection
import axios from 'axios';

export async function checkRugPullAPI(token: string, chain: string) {
  const findings: { title: string; severity: string; recommendation: string }[] = [];

  const apiMap: Record<string, string> = {
    eth: `https://api.gopluslabs.io/api/v1/token_security/eth?contract_addresses=${token}`,
    bsc: `https://api.gopluslabs.io/api/v1/token_security/bsc?contract_addresses=${token}`,
    tron: `https://api.gopluslabs.io/api/v1/token_security/trx?contract_addresses=${token}`,
  };

  const url = apiMap[chain];
  if (!url) return findings;

  try {
    const { data } = await axios.get(url);
    const result = data.result?.[token.toLowerCase()];
    if (!result) return findings;

    if (result.can_take_back_ownership === '1') {
      findings.push({
        title: 'Owner Can Take Back Ownership',
        severity: 'high',
        recommendation: 'This contract has a backdoor for reclaiming control. Avoid investing.',
      });
    }

    if (result.is_mintable === '1') {
      findings.push({
        title: 'Mint Function Detected',
        severity: 'high',
        recommendation: 'Owner can mint new tokens. Check tokenomics carefully.',
      });
    }

    if (result.is_proxy === '1') {
      findings.push({
        title: 'Proxy Contract Detected',
        severity: 'medium',
        recommendation: 'Implementation can be swapped. Ensure trust in the upgrade path.',
      });
    }

    if (result.is_open_source === '0') {
      findings.push({
        title: 'Source Code Not Verified',
        severity: 'medium',
        recommendation: 'Avoid interacting with non-transparent contracts.',
      });
    }

    return findings;
  } catch (err: any) {
    console.error('[RugPull Engine]', err.message);
    return [];
  }
}