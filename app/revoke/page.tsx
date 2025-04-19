'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import useRevoke from '@/hooks/useRevoke';

interface ApprovalItem {
  contract: string;
  spender: string;
  token: string;
}

export default function RevokePage() {
  const { address, isConnected } = useAccount();
  const { revoking, revokeAccess, result, error } = useRevoke();
  const [approvals, setApprovals] = useState<ApprovalItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  const fetchApprovals = async () => {
    if (!address) return;
    setLoading(true);
    setFetchError('');
    try {
      const res = await fetch(`/api/approvals?wallet=${address}`);
      if (!res.ok) throw new Error('Failed to fetch approvals');
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('Unexpected response format');
      setApprovals(data);
    } catch (err: any) {
      console.error(err);
      setFetchError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected) {
      fetchApprovals();
    }
  }, [isConnected]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold text-purple-500 mb-4">Revoke Access</h1>

      {!isConnected ? (
        <p className="text-red-400">Please connect your wallet to continue.</p>
      ) : loading ? (
        <p>🔄 Loading approvals...</p>
      ) : fetchError ? (
        <div className="text-red-500">
          {fetchError}
          <button
            onClick={fetchApprovals}
            className="ml-4 underline text-purple-400"
          >
            Retry
          </button>
        </div>
      ) : approvals.length === 0 ? (
        <p className="text-green-400">✅ No active approvals found.</p>
      ) : (
        <div className="space-y-4">
          {approvals.map((item, index) => (
            <div
              key={index}
              className="border border-purple-600 p-4 rounded-md bg-gray-900"
            >
              <p><strong>Contract:</strong> {item.contract}</p>
              <p><strong>Spender:</strong> {item.spender}</p>
              <p><strong>Token:</strong> {item.token}</p>
              <button
                disabled={revoking || !address}
                onClick={() => address && revokeAccess(address, 'eth')}
                className="mt-3 px-4 py-2 bg-red-600 rounded hover:bg-red-700 disabled:opacity-50"
              >
                {revoking ? 'Revoking...' : 'Revoke Access'}
              </button>
            </div>
          ))}
        </div>
      )}

      {result && <p className="mt-4 text-green-400">{result}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
