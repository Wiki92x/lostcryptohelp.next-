// utils/generatePDF.ts
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Initialize fonts
(pdfMake as any).vfs = (pdfFonts as any).vfs;


interface ScanData {
  address: string;
  chain: string;
  riskScore: string;
  transactions: Array<{
    date?: string;
    transactionId?: string;
    amount?: string;
    token?: string;
  }>;
}

export const generatePDF = (data: ScanData) => {
  try {
    const docDefinition = {
      content: [
        { text: 'DeepScan Report', style: 'header' },
        { text: `Address: ${data.address || 'N/A'}`, margin: [0, 10, 0, 5] },
        { text: `Chain: ${data.chain || 'Unknown'}`, margin: [0, 0, 0, 10] },
        { text: `Risk Score: ${data.riskScore || 'Not Available'}`, margin: [0, 0, 0, 20] },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', 'auto'],
            body: [
              ['Date', 'Transaction ID', 'Amount'],
              ...(data.transactions?.length > 0 
                ? data.transactions.map(tx => [
                    tx.date || 'Unknown',
                    tx.transactionId?.substring(0, 12) + '...' || 'N/A',
                    tx.amount || '0'
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
          alignment: 'center',
          margin: [0, 0, 0, 10]
        },
        table: {
          margin: [0, 5, 0, 15],
          fontSize: 10
        }
      },
      defaultStyle: {
        font: 'Helvetica'
      }
    };

    pdfMake.createPdf(docDefinition).download(`deepscan-${data.address.substring(0, 8)}.pdf`);
  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw new Error('Failed to generate PDF report');
  }
};
