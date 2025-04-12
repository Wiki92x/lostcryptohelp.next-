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
  }[];
}

export async function generatePDF(scan: ScanData): Promise<Blob> {
  const docDefinition = {
    content: [
      { text: 'Deep Scan Report', style: 'header' },
      { text: `Address: ${scan.address}` },
      { text: `Chain: ${scan.chain}` },
      { text: `Risk Score: ${scan.riskScore}` },
      '\nTransactions:\n',
      {
        table: {
          headerRows: 1,
          widths: ['auto', '*', '*'],
          body: [
            ['Date', 'Token', 'Risk Flags'],
            ...scan.transactions.length > 0
              ? scan.transactions.map(tx => [
                  tx.date,
                  `${tx.token} (${tx.symbol})`,
                  Object.keys(tx.risk_flags).length
                    ? Object.entries(tx.risk_flags).map(([k, v]) => `${k}: ${v}`).join(', ')
                    : 'None'
                ])
              : [['No transactions found', '', '']]
          ]
        },
        layout: 'lightHorizontalLines',
        style: 'table'
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        marginBottom: 10,
      },
      table: {
        margin: [0, 5, 0, 15],
      },
    }
  };

  return new Promise(resolve => {
    pdfMake.createPdf(docDefinition).getBlob(resolve);
  });
}
