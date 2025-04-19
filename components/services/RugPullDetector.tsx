// ✅ components/services/RugPullDetector.tsx
'use client';

import { useState, useEffect } from 'react';
import { useNetwork } from 'wagmi';
import { ChevronDown, AlertTriangle, Lock, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface SecurityFlags {
  is_open_source: string;
  is_proxy: string;
  is_mintable: string;
  is_whitelisted: string;
  owner_address: string;
  creator_address: string;
  lp_holder_count: string;
  total_supply: string;
  trust_list: string;
  risk_score: number;
  contract_verified: boolean;
}

export default function RugPullDetector() {
  const [token, setToken] = useState('');
  const [chain, setChain] = useState('eth');
  const [loading, setLoading] = useState(false);
  const [flags, setFlags] = useState<SecurityFlags | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { chain: activeChain } = useNetwork();

  const detectRugPull = async () => {
    if (!token.match(/^0x[a-fA-F0-9]{40}$/) && !token.match(/^T[a-zA-Z0-9]{33}$/)) {
      toast.error('Invalid contract address');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/rugpull-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          token,
          chain,
          chainId: activeChain?.id 
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      
      const data = await res.json();
      setFlags(data);
      toast.success('Security analysis complete');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevel = (score: number) => {
    if (score > 80) return 'Critical Risk';
    if (score > 50) return 'High Risk';
    if (score > 20) return 'Medium Risk';
    return 'Low Risk';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <select
          value={chain}
          onChange={(e) => setChain(e.target.value)}
          className="w-full md:w-32 p-2 rounded-lg bg-zinc-800 border border-zinc-700"
        >
          <option value="eth">ETH</option>
          <option value="bsc">BSC</option>
          <option value="tron">TRON</option>
        </select>
        
        <input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Token Contract Address"
          className="w-full p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm"
        />
        
        <button
          onClick={detectRugPull}
          className="w-full md:w-auto bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg flex items-center gap-2 justify-center"
          disabled={loading}
        >
          {loading ? (
            <span className="animate-spin">↻</span>
          ) : (
            <AlertTriangle size={16} />
          )}
          {loading ? 'Analyzing...' : 'Detect Rug Pull'}
        </button>
      </div>

      {flags && (
        <div className="bg-zinc-800/50 p-6 rounded-xl border border-zinc-700 space-y-6">
          {/* Risk Summary */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <AlertTriangle className="text-red-400" />
                Security Report
              </h3>
              <span className={`px-3 py-1 rounded-full ${
                flags.risk_score > 80 ? 'bg-red-500/30 text-red-300' :
                flags.risk_score > 50 ? 'bg-orange-500/30 text-orange-300' :
                'bg-green-500/30 text-green-300'
              }`}>
                {getRiskLevel(flags.risk_score)}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Risk Score: {flags.risk_score}/100</span>
                <span>Last Updated: 5 mins ago</span>
              </div>
              <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 to-orange-500" 
                  style={{ width: `${flags.risk_score}%` }}
                />
              </div>
            </div>
          </div>

          {/* Contract Details */}
          <div className="space-y-4">
            <div 
              className="cursor-pointer flex items-center justify-between"
              onClick={() => setExpandedSection(expandedSection === 'contract' ? null : 'contract')}
            >
              <h4 className="flex items-center gap-2">
                <Lock size={16} />
                Contract Risks
              </h4>
              <ChevronDown className={`transform transition-transform ${
                expandedSection === 'contract' ? 'rotate-180' : ''
              }`} />
            </div>
            
            {expandedSection === 'contract' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-zinc-700/20 rounded-lg">
                  <p className="text-zinc-400">Open Source</p>
                  <p className={flags.is_open_source === '1' ? 'text-green-400' : 'text-red-400'}>
                    {flags.is_open_source === '1' ? 'Verified' : 'Unverified'}
                  </p>
                </div>
                <div className="p-3 bg-zinc-700/20 rounded-lg">
                  <p className="text-zinc-400">Proxy Contract</p>
                  <p className={flags.is_proxy === '1' ? 'text-red-400' : 'text-green-400'}>
                    {flags.is_proxy === '1' ? 'Detected' : 'None'}
                  </p>
                </div>
                <div className="p-3 bg-zinc-700/20 rounded-lg">
                  <p className="text-zinc-400">Mintable</p>
                  <p className={flags.is_mintable === '1' ? 'text-red-400' : 'text-green-400'}>
                    {flags.is_mintable === '1' ? 'Yes' : 'No'}
                  </p>
                </div>
                <div className="p-3 bg-zinc-700/20 rounded-lg">
                  <p className="text-zinc-400">Owner Balance</p>
                  <p className={Number(flags.owner_balance) > 0 ? 'text-red-400' : 'text-green-400'}>
                    {flags.owner_balance || 'Unknown'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Liquidity & Holders */}
          <div className="space-y-4">
            <div 
              className="cursor-pointer flex items-center justify-between"
              onClick={() => setExpandedSection(expandedSection === 'liquidity' ? null : 'liquidity')}
            >
              <h4 className="flex items-center gap-2">
                <Users size={16} />
                Liquidity & Distribution
              </h4>
              <ChevronDown className={`transform transition-transform ${
                expandedSection === 'liquidity' ? 'rotate-180' : ''
              }`} />
            </div>
            
            {expandedSection === 'liquidity' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-zinc-700/20 rounded-lg">
                  <p className="text-zinc-400">Top Holder Control</p>
                  <p className={Number(flags.top10_holder) > 90 ? 'text-red-400' : 'text-yellow-400'}>
                    {flags.top10_holder || 'Unknown'}%
                  </p>
                </div>
                <div className="p-3 bg-zinc-700/20 rounded-lg">
                  <p className="text-zinc-400">Liquidity Locked</p>
                  <p className={flags.lp_lock === '1' ? 'text-green-400' : 'text-red-400'}>
                    {flags.lp_lock === '1' ? 'Yes' : 'No'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Contract Links */}
          <div className="flex flex-wrap gap-4 text-sm">
            <Link
              href={`https://${chain === 'bsc' ? 'bscscan.com' : 'etherscan.io'}/address/${token}`}
              target="_blank"
              className="text-blue-400 hover:underline"
            >
              View Contract
            </Link>
            <Link
              href={`https://dexscreener.com/${chain}/${token}`}
              target="_blank"
              className="text-blue-400 hover:underline"
            >
              View Liquidity
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}