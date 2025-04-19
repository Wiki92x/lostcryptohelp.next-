// app/dashboard/DashboardClient.tsx
'use client';

import { useAccount } from 'wagmi';

export default function DashboardClient() {
  const { address, isConnected } = useAccount();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <p>Status: {isConnected ? `Connected: ${address}` : 'Not Connected'}</p>
    </div>
  );
}
