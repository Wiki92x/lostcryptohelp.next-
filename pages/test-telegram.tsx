'use client';

import { useEffect } from 'react';

export default function TestTelegramPage() {
  useEffect(() => {
    const simulateTelegramPing = async () => {
      const testPayload = {
        result: {
          address: '0xtestwalletdeadbeef',
          chain: 'ETH',
          riskScore: '8/100',
          transactions: [
            {
              symbol: 'FAKE',
              token: 'Fake Token',
              amount: '1234',
              date: '2025-04-13',
            },
          ],
        },
      };

      const res = await fetch('/api/telegram-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testPayload),
      });

      const data = await res.json();
      console.log('[TEST RESULT]', data);
      alert(JSON.stringify(data));
    };

    simulateTelegramPing();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <h1 className="text-2xl font-bold">Sending Telegram Test...</h1>
    </div>
  );
}
