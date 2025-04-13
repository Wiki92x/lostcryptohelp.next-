'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import toast from 'react-hot-toast';
import { Loader2, Send } from 'lucide-react';

interface ReportFormProps {
  txHash?: string;
  chain?: string;
  method?: string;
}

export default function ReportForm({ txHash, chain, method }: ReportFormProps) {
  const [formData, setFormData] = useState({ name: '', wallet: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    toast.dismiss();

    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, txHash, chain, method }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success('✅ Report submitted successfully.');
        setFormData({ name: '', wallet: '', message: '' });
      } else {
        toast.error('❌ Failed to send report.');
      }
    } catch (err) {
      toast.error('❌ Error submitting report.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900/80 border border-zinc-700 rounded-xl p-6 shadow-md backdrop-blur"
    >
      <div className="mb-4">
        <label className="block mb-1 text-sm text-gray-300 font-medium">Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-purple-500 bg-black rounded text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
          placeholder="Anonymous or Nickname"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm text-gray-300 font-medium">Wallet Address</label>
        <input
          name="wallet"
          value={formData.wallet}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-purple-500 bg-black rounded text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
          placeholder="0x123... or TRON address"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm text-gray-300 font-medium">What happened?</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full px-3 py-2 border border-purple-500 bg-black rounded text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
          placeholder="Explain what happened in detail..."
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center items-center gap-2 py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded text-white font-medium transition disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Submit Report
          </>
        )}
      </button>
    </form>
  );
}
