// ✅/lib/blockchain.ts
import { ethers } from 'ethers';

interface SimulationResult {
  success: boolean;
  gasEstimate?: number;
  error?: string;
}

interface RiskData {
  risk_score: number;
  is_approval_risky: boolean;
  gas_estimate: number;
  last_updated: string;
}

export async function simulateRevoke(params: {
  chainId?: number;
  owner: string;
  token: string;
  spender: string;
}): Promise<SimulationResult> {
  try {
    const provider = new ethers.JsonRpcProvider(getRpcUrl(params.chainId));
    const contract = new ethers.Contract(
      params.token,
      ['function allowance(address,address) view returns (uint256)'],
      provider
    );

    const [allowance, gasPrice] = await Promise.all([
      contract.allowance(params.owner, params.spender),
      provider.getFeeData(),
    ]);

    return {
      success: allowance > 0,
      gasEstimate: Number(ethers.formatUnits(gasPrice?.gasPrice || 0, 'gwei')) * 21000,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Simulation failed',
    };
  }
}

export async function fetchRiskData(contract: string, chain: string): Promise<RiskData> {
  try {
    const chainId = {
      eth: 1,
      bsc: 56,
      tron: 728126428,
    }[chain];

    const response = await fetch(
      `https://api.gopluslabs.io/api/v1/token_security/${chainId}?contract_addresses=${contract}`
    );
    
    const data = await response.json();
    return {
      risk_score: data.result?.[contract]?.risk_score || 0,
      is_approval_risky: data.result?.[contract]?.is_open_source === '1',
      gas_estimate: 0.5, // Default gas estimate
      last_updated: new Date().toISOString(),
    };
  } catch (error) {
    return {
      risk_score: 100,
      is_approval_risky: true,
      gas_estimate: 0.5,
      last_updated: new Date().toISOString(),
    };
  }
}

function getRpcUrl(chainId?: number): string {
  const rpcs = {
    1: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
    56: 'https://bsc-dataseed.binance.org/',
    728126428: 'https://api.trongrid.io/',
  };
  
  return rpcs[chainId as keyof typeof rpcs] || rpcs[1];
}