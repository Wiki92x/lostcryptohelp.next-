// ✅/lib/risk.js
export async function checkRisk(contractAddress, chain) {
    try {
      const chainId = {
        eth: 1,
        bsc: 56,
        tron: 728126428,
      }[chain];
  
      const response = await fetch(
        `https://api.gopluslabs.io/api/v1/token_security/${chainId}?contract_addresses=${contractAddress}`
      );
      
      const data = await response.json();
      return {
        risk_score: data.result?.[contractAddress]?.risk_score || 0,
        gas_estimate: data.result?.[contractAddress]?.gas_estimate || 0.5,
        last_updated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Risk check failed:', error);
      return {
        risk_score: 100,
        gas_estimate: 0.5,
        last_updated: new Date().toISOString()
      };
    }
  }