'use client';
import { useState } from 'react';

export default function ReportPage() {
  const [form, setForm] = useState({ name: '', wallet: '', message: '' });

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-12 transition-colors duration-300">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-red-500 mb-4">🚨 Submit a Crypto Report</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
          Flag a scam project, malicious wallet, fake contract, or suspicious token. Reports are anonymous and sent to our Telegram bot.
        </p>

        <form className="bg-zinc-900 dark:bg-zinc-800 p-6 rounded-xl shadow space-y-4">
          <input
            className="w-full border border-gray-600 rounded p-2 bg-[var(--background)] text-[var(--foreground)]"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="w-full border border-gray-600 rounded p-2 bg-[var(--background)] text-[var(--foreground)]"
            placeholder="Wallet Address"
            value={form.wallet}
            onChange={(e) => setForm({ ...form, wallet: e.target.value })}
          />
          <textarea
            className="w-full border border-gray-600 rounded p-2 bg-[var(--background)] text-[var(--foreground)]"
            placeholder="What happened?"
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          <button
            type="submit"
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded text-white font-semibold"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}
