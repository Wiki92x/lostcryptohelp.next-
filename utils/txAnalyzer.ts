// ✅ utils/txAnalyzer.ts — Real TX Pattern Analyzer

interface Finding {
    title: string;
    severity: 'low' | 'medium' | 'high';
    recommendation: string;
  }
  
  export function analyzeTransactions(txs: any[]): Finding[] {
    const findings: Finding[] = [];
  
    // 1. Unlimited USDT Approvals
    const usdtApprovals = txs.filter(
      (tx) =>
        tx.input?.toLowerCase().includes('095ea7b3') &&
        tx.to?.toLowerCase().includes('usdt')
    );
  
    if (usdtApprovals.length >= 1) {
      findings.push({
        title: 'Unlimited USDT Approval',
        severity: 'high',
        recommendation: 'Revoke this approval using the Token Revoker tool.',
      });
    }
  
    // 2. Gas Overpayment Detection
    const gasOverpayments = txs.filter((tx) => {
      const gasUsed = Number(tx.gasUsed || tx.gas);
      const gasLimit = Number(tx.gas);
      return gasUsed < gasLimit * 0.6;
    });
  
    if (gasOverpayments.length >= 2) {
      findings.push({
        title: 'Gas Overpayment Detected',
        severity: 'low',
        recommendation: 'Review recent failed transactions and consider claiming refunds via LayerZero or similar tools.',
      });
    }
  
    // 3. Suspicious Proxy / Factory Contract Interactions
    const scamPatterns = txs.filter(
      (tx) =>
        tx.input?.startsWith('0x') &&
        tx.value === '0' &&
        /proxy|factory/i.test(tx.to || '')
    );
  
    if (scamPatterns.length >= 1) {
      findings.push({
        title: 'Suspicious Transaction Detected',
        severity: 'medium',
        recommendation: 'Avoid interacting with unknown proxy or factory contracts. Use extra caution.',
      });
    }
  
    return findings;
  }