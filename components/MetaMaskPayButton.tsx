'use client';

import { Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MetaMaskPayButton({
  onClick,
  disabled = false,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 hover:brightness-110 text-white font-semibold rounded-xl shadow-md transition-all"
    >
      <span className="bg-white/20 p-1 rounded-full">
        <Wallet className="w-5 h-5" />
      </span>
      Pay with MetaMask
    </Button>
  );
}