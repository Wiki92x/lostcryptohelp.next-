// ✅ components/TraceAIWidget.tsx — Final TraceAI Widget with Fixed Icon

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';

const MODELS = ['llama3', 'mistral', 'codellama'];

export default function TraceAIWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content:
        "👋 Hi, I'm **TraceAI** — your crypto forensic assistant. Ask me anything about wallets, tokens, scams, and risk analysis."
    }
  ]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState('llama3');
  const [memory, setMemory] = useState(true);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      chatRef.current?.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/ai-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: input,
        model,
        messages: memory ? messages : [userMessage]
      })
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder('utf-8');
    let aiText = '';
    setMessages((prev) => [...prev, { role: 'ai', content: '' }]);

    while (reader) {
      const { value, done } = await reader.read();
      if (done) break;
      aiText += decoder.decode(value, { stream: true });
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].content = aiText;
        return [...updated];
      });
    }

    setLoading(false);
  };

  const resetChat = () => {
    setMessages([
      {
        role: 'ai',
        content:
          "👋 Hi, I'm **TraceAI** — your crypto forensic assistant. Ask me anything about wallets, tokens, scams, and risk analysis."
      }
    ]);
  };

  return (
    <>
      {!open && (
        <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-2 hover:scale-105 transition"
        title="Chat with TraceAI"
      >
        <img
          src="/traceai-icon.png"
          alt="TraceAI"
          className="w-12 h-12 rounded-full shadow-xl"
        />
      </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 w-96 max-w-full z-50 rounded-xl bg-zinc-900 border border-zinc-700 shadow-xl">
          <div className="flex justify-between items-center px-4 py-2 bg-zinc-800 rounded-t-xl border-b border-zinc-700">
            <div className="flex items-center gap-2">
              <Image src="/traceai-icon.png" alt="TraceAI Icon" width={20} height={20} />
              <span className="text-blue-400 font-semibold text-sm">Ask TraceAI</span>
            </div>
            <div className="flex gap-2 items-center">
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="bg-zinc-800 text-white text-xs border border-zinc-700 px-1 py-0.5 rounded"
              >
                {MODELS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <label className="flex items-center gap-1 text-xs text-white">
                <input
                  type="checkbox"
                  checked={memory}
                  onChange={() => setMemory(!memory)}
                />
                Memory
              </label>
              <button onClick={resetChat} className="text-zinc-400 hover:text-white text-xs" title="Reset">
                <RefreshCw size={14} />
              </button>
              <button onClick={() => setOpen(false)} className="text-zinc-400 hover:text-white text-xs" title="Close">
                <X size={16} />
              </button>
            </div>
          </div>

          <div ref={chatRef} className="h-64 overflow-y-auto space-y-2 px-4 py-2 bg-zinc-900">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm whitespace-pre-wrap px-3 py-2 rounded-lg ${
                  m.role === 'user'
                    ? 'bg-blue-600 text-white text-right'
                    : 'bg-zinc-800 text-zinc-200 text-left'
                }`}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex border-t border-zinc-700 p-2 bg-zinc-900 rounded-b-xl">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask TraceAI..."
              className="flex-1 px-3 py-2 rounded-l bg-zinc-800 text-white focus:outline-none text-sm"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 rounded-r font-semibold hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? '...' : 'Send'}
            </button>
          </form>
        </div>
      )}
    </>
  );
}