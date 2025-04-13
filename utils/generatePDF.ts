import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = (pdfFonts as any).vfs;

interface ScanData {
  address: string;
  chain: string;
  riskScore: string;
  transactions: {
    date: string;
    transactionId: string;
    amount: string;
    token: string;
    symbol: string;
    risk_flags: Record<string, string>;
    riskScore?: number;
  }[];
}

export async function generatePDF(scan: ScanData): Promise<Blob> {
  const txs = scan.transactions;

  const getTopToken = (): string => {
    const count: Record<string, number> = {};
    txs.forEach((tx) => {
      count[tx.symbol] = (count[tx.symbol] || 0) + 1;
    });
    return Object.entries(count).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
  };

  const getTopRiskToken = (): string => {
    const sorted = [...txs].sort((a, b) => (b.riskScore || 0) - (a.riskScore || 0));
    const top = sorted[0];
    return top ? `${top.symbol} (${top.riskScore}/100)` : 'N/A';
  };

  const aiSummary = `This wallet shows activity on ${scan.chain} with a risk score of ${scan.riskScore}. 
Top token: ${getTopToken()}. Highest risk token: ${getTopRiskToken()}. 
No major threats detected across the last ${txs.length} transactions.`;

  const docDefinition = {
    content: [
      { text: 'Deep Wallet Scan Report', style: 'header' },
      { text: `Wallet: ${scan.address}` },
      { text: `Chain: ${scan.chain}` },
      { text: `Risk Score: ${scan.riskScore}` },
      '\n',
      { text: 'AI Summary:', style: 'subheader' },
      { text: aiSummary, italics: true },
      '\n\n',
      {
        table: {
          headerRows: 1,
          widths: ['auto', '*', '*'],
          body: [
            ['Date', 'Token', 'Risk Flags'],
            ...txs.length
              ? txs.map((tx) => [
                  tx.date,
                  `${tx.token} (${tx.symbol})`,
                  Object.keys(tx.risk_flags).length
                    ? Object.entries(tx.risk_flags)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(', ')
                    : 'None',
                ])
              : [['No transactions found', '', '']],
          ],
        },
        layout: 'lightHorizontalLines',
        style: 'table',
      },
    ],
    styles: {
      header: {
        fontSize: 20,
        bold: true,
        marginBottom: 10,
        color: '#4ADE80',
      },
      subheader: {
        fontSize: 14,
        bold: true,
        marginBottom: 5,
      },
      table: {
        margin: [0, 5, 0, 15],
      },
    },
  };

  return new Promise((resolve) => {
    pdfMake.createPdf(docDefinition).getBlob(resolve);
  });
}