// ✅ utils/validators.ts

export function validateAddress(address: string, chain: string): boolean {
  if (!address || typeof address !== 'string') return false;

  if (chain === 'tron') {
    return /^T[a-zA-Z0-9]{33,34}$/.test(address);
  }

  return /^0x[a-fA-F0-9]{40}$/.test(address); // Ethereum/BSC
}