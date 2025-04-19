'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export default function ReportPage() {
  const { theme } = useTheme();
  const [wallet, setWallet] = useState('');
  const [issue, setIssue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!wallet || !issue) {
      toast.error('Please complete all fields');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet, issue }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit');
      toast.success('📝 Report submitted');
      setWallet('');
      setIssue('');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 bg-[var(--background)] text-[var(--foreground)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto p-8 rounded-xl shadow-xl border border-[var(--border)] bg-[var(--card)]"
      >
        <h1 className="text-3xl font-bold text-blue-500 mb-6 text-center">Submit Incident Report</h1>

        <div className="space-y-4">
          <input
            type="text"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            placeholder="Your wallet address"
            className="w-full p-3 rounded-lg bg-[var(--input)] border border-[var(--border)] placeholder:text-zinc-400"
          />

          <textarea
            rows={6}
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            placeholder="Describe what happened in detail..."
            className="w-full p-3 rounded-lg bg-[var(--input)] border border-[var(--border)] placeholder:text-zinc-400"
          />

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Report'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}