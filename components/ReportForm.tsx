'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

interface ReportFormProps {
  txHash?: string;
  chain?: string;
  method?: string;
}

export default function ReportForm({ txHash, chain, method }: ReportFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    wallet: '',
    message: '',
  });

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          txHash,
          chain,
          method,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('✅ Report submitted successfully.');
        setFormData({ name: '', wallet: '', message: '' });
      } else {
        setStatus('❌ Failed to send report.');
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Error submitting report.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto space-y-6 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl p-6 shadow-lg"
    >
      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-purple-400 dark:border-purple-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>

      {/* Wallet */}
      <div>
        <label className="block text-sm font-medium mb-1">Wallet Address</label>
        <input
          type="text"
          name="wallet"
          value={formData.wallet}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-purple-400 dark:border-purple-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium mb-1">What happened?</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full px-4 py-2 rounded-lg border border-purple-400 dark:border-purple-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-purple-700 hover:bg-purple-800 transition text-white font-semibold tracking-wide disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit Report'}
      </button>

      {/* Status Message */}
      {status && (
        <p
          className={`mt-4 text-sm font-medium ${
            status.includes('✅') ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {status}
        </p>
      )}
    </form>
  );
}
