// ✅ utils/gasRefundEngine.ts — Real Gas Refund/Overpayment Analyzer
import { ethers } from 'ethers';
import { RPC_ENDPOINTS } from './rpcEndpoints';

export async function getGasRefunds(wallet: string, chain: string) {
  const rpc = RPC_ENDPOINTS[chain];
  const provider = new ethers.JsonRpcProvider(rpc);
  const findings: { title: string; severity: string; recommendation: string }[] = [];

  try {
    const currentBlock = await provider.getBlockNumber();
    const blockRange = 1500;
    let failedCount = 0;

    // Scan recent blocks for failed TXs from this wallet
    for (let i = currentBlock; i > currentBlock - blockRange; i--) {
        const block = await provider.getBlock(i, true); // ✅ second arg true fetches transactions
      for (const tx of block.transactions) {
        if (tx.from?.toLowerCase() !== wallet.toLowerCase()) continue;
        try {
          const receipt = await provider.getTransactionReceipt(tx.hash);
          if (receipt && receipt.status === 0) {
            failedCount++;
            findings.push({
              title: `Failed Transaction`,
              severity: 'medium',
              recommendation: `TX ${tx.hash.slice(0, 10)}... failed and burned gas. Consider checking if any bridge/gas refund applies.`,
            });
          }
        } catch (e) {
          continue;
        }
      }
    }

    // Optional: If a lot of failed TXs, flag as gas refund opportunity
    if (failedCount >= 2) {
      findings.push({
        title: 'Multiple Failed Transactions',
        severity: 'high',
        recommendation: 'Check for possible gas refunds or adjust your TXs for better success.',
      });
    }

    return findings;
  } catch (err: any) {
    console.error('[GasRefund Engine]', err.message);
    return [];
  }
}
export async function getRefundableTransactions(wallet: string, chain: string) {
    // simplified fallback mock for now
    return [
      {
        title: 'Gas Overpayment Detected',
        severity: 'low',
        recommendation: 'Claim refund via LayerZero portal',
      }
    ];
  }