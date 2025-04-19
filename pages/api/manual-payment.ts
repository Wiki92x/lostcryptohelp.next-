// ✅ /pages/api/manual-payment.ts — Handles Manual TRC20 Payments
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

// In-memory store for demo (replace with DB in production)
let manualPayments: any[] = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'POST') {
    const { wallet, txId } = req.body;
    if (!wallet || !txId) return res.status(400).json({ error: 'Missing wallet or txId' });

    const record = {
      id: uuidv4(),
      wallet,
      txId,
      timestamp: new Date().toISOString(),
      verified: false,
    };

    manualPayments.push(record);
    return res.status(200).json({ success: true });
  }

  if (method === 'GET') {
    if (req.query.admin === 'true') {
      return res.status(200).json({ requests: manualPayments });
    } else {
      return res.status(403).json({ error: 'Unauthorized' });
    }
  }

  if (method === 'PUT') {
    const id = req.query.id;
    if (!id) return res.status(400).json({ error: 'Missing ID' });

    manualPayments = manualPayments.map((req) =>
      req.id === id ? { ...req, verified: true } : req
    );
    return res.status(200).json({ success: true });
  }

  if (method === 'DELETE') {
    const id = req.query.id;
    if (!id) return res.status(400).json({ error: 'Missing ID' });

    manualPayments = manualPayments.filter((req) => req.id !== id);
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
