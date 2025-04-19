// ✅ utils/generatePDF.ts — DeepTrace Report Generator with JSON output
import PDFDocument from 'pdfkit';
import { writeFileSync, writeFile } from 'fs';
import path from 'path';
import type { ScanFinding } from './types';

export async function generateScanPDF(
  wallet: string,
  chain: string,
  riskScore: number,
  findings: ScanFinding[]
): Promise<string> {
  const doc = new PDFDocument({ margin: 40 });
  const filename = `deeptrace-${wallet.slice(0, 6)}.pdf`;
  const filePath = path.join('/tmp', filename);
  const stream = doc.pipe(writeFileSync(filePath, ''));

  // Header
  doc.fontSize(20).fillColor('#4F46E5').text('🔍 DeepTrace Forensic Report', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).fillColor('#000').text(`Wallet: ${wallet}`);
  doc.text(`Chain: ${chain}`);
  doc.text(`Risk Score: ${riskScore}/100`);
  doc.moveDown();

  // Findings
  findings.forEach((finding, i) => {
    doc.fontSize(13).fillColor('#111').text(`${i + 1}. ${finding.title}`, { underline: true });
    doc.fontSize(11).fillColor('#333').text(`→ ${finding.recommendation}`);
    doc.moveDown();
  });

  doc.end();
  return filePath;
}

// 🧠 Optional: also export raw JSON file alongside PDF
export async function exportScanJSON(
  wallet: string,
  chain: string,
  riskScore: number,
  findings: ScanFinding[]
): Promise<string> {
  const filename = `deeptrace-${wallet.slice(0, 6)}.json`;
  const filePath = path.join('/tmp', filename);

  await writeFile(
    filePath,
    JSON.stringify({ wallet, chain, riskScore, findings }, null, 2),
    () => {}
  );

  return filePath;
}