// ✅ utils/scanUtils.ts — Final Version

import { ethers } from 'ethers';

export function normalizeAddress(address: string, chain: string): string {
  if (!address) throw new Error('Missing address');

  if (chain === 'tron') {
    if (!/^T[a-zA-Z0-9]{33,34}$/.test(address)) throw new Error('Invalid TRON address');
    return address;
  }

  try {
    return ethers.getAddress(address.trim().toLowerCase());
  } catch {
    throw new Error('Invalid EVM address');
  }
}
