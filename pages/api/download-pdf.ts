// ✅ pages/api/download-pdf.ts — Serve Forensic PDF from /tmp
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { file } = req.query;

  if (!file || typeof file !== 'string') {
    return res.status(400).json({ error: 'Missing file name' });
  }

  const filePath = path.join('/tmp', file);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  const fileStream = fs.createReadStream(filePath);
  res.setHeader('Content-Disposition', `attachment; filename=${file}`);
  res.setHeader('Content-Type', 'application/pdf');
  fileStream.pipe(res);
}
