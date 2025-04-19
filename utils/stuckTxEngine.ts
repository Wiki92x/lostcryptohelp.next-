// ✅ utils/stuckTxEngine.ts — Detects Pending/Stuck Transactions
import { ethers } from 'ethers';
import { RPC_ENDPOINTS } from './rpcEndpoints';

export async function findStuckTransactions(wallet: string, chain: string) {
  const rpc = RPC_ENDPOINTS[chain];
  const provider = new ethers.JsonRpcProvider(rpc);
  const findings: { title: string; severity: string; recommendation: string }[] = [];

  try {
    const txCount = await provider.getTransactionCount(wallet, 'latest');
    const pendingCount = await provider.getTransactionCount(wallet, 'pending');

    const isStuck = pendingCount > txCount;

    if (isStuck) {
      findings.push({
        title: 'Pending Transaction Detected',
        severity: 'medium',
        recommendation: 'A transaction is stuck in mempool. Speed up or cancel it via your wallet.',
      });
    }

    return findings;
  } catch (err: any) {
    console.error('[StuckTx Engine]', err.message);
    return [];
  }
}