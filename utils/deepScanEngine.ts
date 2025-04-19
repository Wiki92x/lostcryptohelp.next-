// ✅ utils/deepScanEngine.ts — Final Version with Real TX Fetch + Risk Analysis
import { fetchEthTxs, fetchBscTxs, fetchTronTxs } from './txHistoryFetchers';
import { analyzeTransactions } from './txAnalyzer';
import { getRefundableTransactions } from './gasRefundEngine';
import { checkRugPullAPI } from './rugPullEngine';
import { findStuckTransactions } from './stuckTxEngine';

export async function deepScan(wallet: string, chain: string) {
  let riskScore = 0;
  const findings: any[] = [];
  let txs: any[] = [];

  // 1. Pull 200+ Real Transactions
  if (chain === 'eth') txs = await fetchEthTxs(wallet);
  if (chain === 'bsc') txs = await fetchBscTxs(wallet);
  if (chain === 'tron') txs = await fetchTronTxs(wallet);

  // 2. Run Analytics on Transactions
  const insights = analyzeTransactions(txs);
  if (insights.length) {
    insights.forEach(insight => {
      if (!findings.some(f => f.title === insight.title)) {
        findings.push(insight);
        riskScore += 5;
      }
    });
  }

  // 3. Gas Refund Checker
  const refunds = await getRefundableTransactions(wallet, chain);
  refunds.forEach(refund => {
    if (!findings.some(f => f.title === refund.title)) {
      findings.push(refund);
      riskScore += 5;
    }
  });

  // 4. Rug Pull Detector
  const rugRisk = await checkRugPullAPI(wallet, chain);
  rugRisk.forEach(risk => {
    if (!findings.some(f => f.title === risk.title)) {
      findings.push(risk);
      riskScore += 7;
    }
  });

  // 5. Stuck TX Fixer
  const stuck = await findStuckTransactions(wallet, chain);
  stuck.forEach(tx => {
    if (!findings.some(f => f.title === tx.title)) {
      findings.push(tx);
      riskScore += 10;
    }
  });

  return {
    wallet,
    chain,
    riskScore,
    findings,
    txs,
    summary: {
      totalTxs: txs.length,
      firstTx: txs[txs.length - 1]?.timeStamp,
      lastTx: txs[0]?.timeStamp,
    },
  };
}