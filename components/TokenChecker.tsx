'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Loader2 } from 'lucide-react';

export default function TokenChecker() {
  const [contract, setContract] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const checkToken = async () => {
    if (!contract) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(
        `https://api.gopluslabs.io/api/v1/token_security/1?contract_addresses=${contract}`
      );
      const data = await res.json();

      const tokenInfo = data.result?.[contract.toLowerCase()];
      if (!tokenInfo) throw new Error('Token not found or invalid');

      setResult(tokenInfo);
    } catch (err: any) {
      setError(err.message || 'Failed to check token');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-zinc-900 p-6 rounded-xl mt-10 shadow-md text-white"
    >
      <h2 className="text-2xl font-bold text-purple-400 mb-4 flex items-center gap-2">
        <ShieldAlert className="h-6 w-6 text-purple-400" />
        Token Risk Checker
      </h2>

      <input
        value={contract}
        onChange={(e) => setContract(e.target.value)}
        className="w-full p-2 rounded bg-zinc-800 text-white mb-3"
        placeholder="Enter token contract address"
      />

      <button
        onClick={checkToken}
        className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded flex items-center justify-center disabled:opacity-50"
        disabled={loading}
      >
        {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : 'Check Token'}
      </button>

      {error && (
        <div className="mt-4 p-2 bg-red-900 text-red-300 rounded text-sm">{error}</div>
      )}

      {result && (
        <div className="mt-5 bg-zinc-800 p-4 rounded text-sm space-y-2">
          <p>
            <strong>Name:</strong> {result.token_name}
          </p>
          <p>
            <strong>Symbol:</strong> {result.symbol}
          </p>
          <p>
            <strong>Total Supply:</strong> {result.total_supply}
          </p>
          <div>
            <strong>Risk Flags:</strong>
            <ul className="list-disc list-inside mt-1 text-red-400">
              {Object.entries(result).map(([key, value]) => {
                if (key.includes('is_') && value === '1') {
                  return (
                    <li key={key}>
                      {key.replace(/_/g, ' ').replace('is ', '').toUpperCase()}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}
    </motion.div>
  );
}