import { useState } from 'react';
import { ethers } from 'ethers';
import ABI from '@/abis/ReputationBadge.json';
import { toast } from 'react-hot-toast';

const CONTRACT_ADDRESS = '0xYourDeployedContractAddressHere';

export function useBadgeMinter() {
  const [minting, setMinting] = useState(false);

  const mint = async (wallet: string, score: number, metadataURI: string) => {
    try {
      setMinting(true);

      if (!(window as any).ethereum) throw new Error("Wallet not found");
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      toast.loading('Minting badge...', { id: 'minting' });
      const tx = await contract.mintBadge(wallet, score, metadataURI);
      await tx.wait();
      toast.success('Badge minted 🎉', { id: 'minting' });
    } catch (err: any) {
      toast.error(`Mint failed: ${err.message}`);
    } finally {
      setMinting(false);
    }
  };

  return { mint, minting };
}