// ✅ components/services/TokenRevoker.tsx
'use client';

import { useState, useEffect } from 'react';
import { useNetwork, useAccount } from 'wagmi';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import { simulateRevoke, fetchRiskData } from '@/lib/blockchain';
import RiskBadge from '@/components/ui/RiskBadge';

interface Approval {
  token: string;
  symbol: string;
  spender: string;
  amount: string;
  riskScore: number;
  lastInteracted: string;
  contract: string;
}

export default function TokenRevoker({ wallet, chain }: { wallet: string; chain: string }) {
  const [loading, setLoading] = useState(true);
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const { chain: activeChain } = useNetwork();
  const { address } = useAccount();

  const getExplorerUrl = (txHash: string) => {
    const explorers = {
      eth: `https://etherscan.io/tx/${txHash}`,
      bsc: `https://bscscan.com/tx/${txHash}`,
      tron: `https://tronscan.org/#/transaction/${txHash}`
    };
    return explorers[chain] || '#';
  };

  const fetchApprovals = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/revoke-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet, chain }),
      });

      if (!response.ok) throw new Error('Failed to fetch approvals');
      
      const { approvals } = await response.json();
      const withRisk = await Promise.all(
        approvals.map(async (approval: Approval) => ({
          ...approval,
          ...await fetchRiskData(approval.contract, chain)
        }))
      );

      setApprovals(withRisk.filter((a: Approval) => a.riskScore > 30));
      if (withRisk.length === 0) toast.success('No high-risk approvals found 🎉');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load approvals');
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async (approval: Approval) => {
    try {
      // Simulation first
      const simulated = await simulateRevoke({
        chainId: activeChain?.id,
        owner: address!,
        token: approval.contract,
        spender: approval.spender
      });

      if (!simulated.success) {
        return toast.error(`Revoke would fail: ${simulated.error}`);
      }

      // Execute revoke
      const tx = await revokeApproval({
        chainId: activeChain?.id,
        owner: address!,
        token: approval.contract,
        spender: approval.spender
      });

      toast.loading(
        <a href={getExplorerUrl(tx.hash)} target="_blank" rel="noopener noreferrer" 
           className="text-blue-400 hover:underline">
          Confirm revoke in wallet...
        </a>
      );

      const receipt = await tx.wait();
      toast.success(
        <div>
          <p>Approval revoked successfully!</p>
          <a href={getExplorerUrl(receipt.transactionHash)} 
             className="text-xs text-blue-300 hover:underline">
            View transaction
          </a>
        </div>
      );
      await fetchApprovals();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Revoke failed');
    }
  };

  useEffect(() => {
    if (wallet) fetchApprovals();
  }, [wallet, chain]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Token Approvals</h3>
        <button
          onClick={fetchApprovals}
          className="flex items-center gap-2 text-sm bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="animate-spin">↻</span>
              Refreshing...
            </>
          ) : (
            'Refresh Approvals'
          )}
        </button>
      </div>

      {approvals.length > 0 ? (
        <div className="space-y-4">
          {approvals.map((approval, index) => (
            <div key={index} className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <RiskBadge score={approval.riskScore} />
                  <div>
                    <p className="font-medium">{approval.symbol}</p>
                    <p className="text-xs text-zinc-400">{approval.token}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRevoke(approval)}
                  className="px-3 py-1.5 text-sm bg-red-600/30 hover:bg-red-500/40 rounded-lg flex items-center gap-2"
                >
                  <span className="text-red-300">Revoke</span>
                  <span className="text-xs text-zinc-400">
                    ~${(approval.gasEstimate || 0.5).toFixed(2)}
                  </span>
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-zinc-400">Approved Amount</p>
                  <p className="font-mono">
                    {approval.amount === 'unlimited' ? (
                      <span className="text-red-400">Unlimited</span>
                    ) : (
                      ethers.formatUnits(approval.amount, approval.decimals)
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-zinc-400">Last Interaction</p>
                  <p>{new Date(approval.lastInteracted).toLocaleDateString()}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-zinc-400">Spender Contract</p>
                  <a
                    href={`${getExplorerUrl(approval.spender)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline text-xs break-all"
                  >
                    {approval.spender}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 text-center bg-zinc-800/20 rounded-xl">
          <p className="text-zinc-400">No high-risk token approvals found</p>
        </div>
      )}
    </div>
  );
}