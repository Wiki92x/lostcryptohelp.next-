// ✅ components/AIChatPanel.tsx — With Smart Suggestions

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { marked } from 'marked';

const MODELS = ['llama3', 'mistral', 'codellama'];

export default function AIChatPanel() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<any[]>([{
    role: 'ai',
    content:
      "👋 Hi, I'm **TraceAI** — your crypto forensic assistant. Ask me anything about wallets, tokens, scams, and risk analysis."
  }]);
  const [model, setModel] = useState('llama3');
  const [memory, setMemory] = useState(true);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent, preset?: string) => {
    if (e) e.preventDefault();
    const query = preset || input;
    if (!query.trim()) return;
    const userMessage = { role: 'user', content: query };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSuggestions([]);
    setLoading(true);

    const res = await fetch('/api/ai-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: query,
        model,
        memory,
        history: memory ? messages.map(m => m.content) : [],
      })
    });

    if (!res.body) return;

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let aiMessage = '';
    setMessages(prev => [...prev, { role: 'ai', content: '' }]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(Boolean);

      for (const line of lines) {
        if (line === 'data: [DONE]') break;
        try {
          const json = JSON.parse(line.replace(/^data:\s*/, ''));
          if (json.token) {
            aiMessage += json.token;
            setMessages(prev => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                ...updated[updated.length - 1],
                content: aiMessage
              };
              return updated;
            });
          }
        } catch (err) {
          console.error('Stream parse error:', err);
        }
      }
    }

    setLoading(false);
    setSuggestions([
      'How do I scan my wallet?',
      'How does premium work?',
      'What if I detect a scam token?'
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 w-[360px] bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl z-50">
      <div className="p-3 border-b border-zinc-700 flex justify-between items-center">
        <h2 className="text-blue-400 font-semibold">🤖 Ask TraceAI</h2>
        <div className="flex items-center gap-2">
          <select
            className="bg-zinc-800 text-sm text-white px-2 py-1 rounded border border-zinc-600"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            {MODELS.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <label className="flex items-center gap-1 text-xs text-zinc-400">
            <input
              type="checkbox"
              checked={memory}
              onChange={() => setMemory(!memory)}
              className="accent-blue-500"
            />
            Memory
          </label>
        </div>
      </div>

      <div
        ref={chatRef}
        className="h-64 overflow-y-auto space-y-3 p-3 bg-zinc-800 text-sm"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`px-4 py-2 rounded-lg whitespace-pre-wrap leading-relaxed ${
              m.role === 'user'
                ? 'text-white bg-blue-600 self-end text-right'
                : 'text-zinc-200 bg-zinc-700 self-start'
            }`}
            dangerouslySetInnerHTML={{ __html: marked.parse(m.content) }}
          />
        ))}
      </div>

      {suggestions.length > 0 && (
        <div className="px-3 py-2 space-y-1 bg-zinc-950 border-t border-zinc-700">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSubmit(undefined, s)}
              className="w-full text-left text-sm text-blue-400 hover:underline"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex border-t border-zinc-700">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask TraceAI a crypto question..."
          className="flex-1 bg-zinc-900 text-white px-4 py-2 rounded-bl focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 px-4 py-2 text-white font-semibold rounded-br hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
}