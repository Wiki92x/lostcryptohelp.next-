'use client';
import React from 'react';

export default function PaymentModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-zinc-900 text-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-purple-400 mb-4">🔒 Payment Required</h2>
        <p className="text-sm mb-3">
          This scan requires a one-time payment for ETH/BSC chains.
        </p>
        <div className="mb-4 space-y-2">
          <div>
            <p className="text-xs text-gray-400">💰 Ethereum Address</p>
            <p className="font-mono text-sm text-green-400">0x6a160Bb6a9Bea759b43De6ce735978992ad81b7D</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">💰 BSC Address</p>
            <p className="font-mono text-sm text-green-400">0x6a160Bb6a9Bea759b43De6ce735978992ad81b7D</p>
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-4">
          Please send the required fee and try again. Make sure to include correct gas fees.
        </p>

        <button onClick={onClose} className="w-full bg-purple-600 hover:bg-purple-700 rounded py-2 mt-2">
          Got it, Close
        </button>
      </div>
    </div>
  );
}