// ✅ /app/admin/manual-requests/page.tsx — Admin Panel to Review Manual Unlocks
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, Trash2 } from 'lucide-react';

interface ManualRequest {
  id: string;
  wallet: string;
  txId: string;
  timestamp: string;
  verified?: boolean;
}

export default function ManualRequestsDashboard() {
  const [requests, setRequests] = useState<ManualRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/manual-payment?admin=true')
      .then((res) => res.json())
      .then((data) => setRequests(data.requests || []))
      .finally(() => setLoading(false));
  }, []);

  const handleApprove = async (id: string) => {
    await fetch(`/api/manual-payment?id=${id}`, { method: 'PUT' });
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, verified: true } : r)));
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/manual-payment?id=${id}`, { method: 'DELETE' });
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">🛠 Manual Payment Requests</h1>

      {loading ? (
        <div className="flex justify-center pt-12">
          <Loader2 className="animate-spin text-blue-500 w-6 h-6" />
        </div>
      ) : requests.length === 0 ? (
        <p className="text-muted-foreground text-sm">No pending manual requests.</p>
      ) : (
        <div className="space-y-6">
          {requests.map((req) => (
            <div
              key={req.id}
              className="border border-border p-4 rounded-xl bg-card shadow flex flex-col md:flex-row justify-between gap-4"
            >
              <div>
                <p className="text-sm">
                  <strong>Wallet:</strong> {req.wallet}
                </p>
                <p className="text-sm">
                  <strong>TX ID:</strong> {req.txId}
                </p>
                <p className="text-xs text-muted-foreground">Submitted: {new Date(req.timestamp).toLocaleString()}</p>
              </div>

              <div className="flex items-center gap-2">
                {!req.verified ? (
                  <Button variant="outline" onClick={() => handleApprove(req.id)}>
                    <CheckCircle className="w-4 h-4 mr-2" /> Approve
                  </Button>
                ) : (
                  <span className="text-green-500 text-sm flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Verified
                  </span>
                )}
                <Button variant="ghost" onClick={() => handleDelete(req.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
