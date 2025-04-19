// ✅ /pages/api/ai-insight.ts — Premium-Only AI Insight (Ollama + OpenRouter fallback)
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { OpenAI } from 'openai';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { wallet, chain, findings } = req.body;
  if (!wallet || !chain || !findings) return res.status(400).json({ error: 'Missing data' });

  const premium = await isPremiumUser(wallet);
  if (!premium) {
    return res.status(403).json({ error: 'AI Insight is for premium members only.' });
  }

  try {
    const prompt = `Analyze the following blockchain wallet findings for risk and behavior:\n\n${JSON.stringify(findings, null, 2)}\n\nProvide a concise AI-powered risk summary.`;

    let aiInsight = '';

    try {
      // 🧠 Preferred: OpenRouter if credits are available
      const routerRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'openai/gpt-4-turbo',
          messages: [{ role: 'user', content: prompt }],
        })
      });

      const json = await routerRes.json();
      if (json.choices) {
        aiInsight = json.choices[0].message.content;
      } else throw new Error('OpenRouter failed');

    } catch (err) {
      // 🆘 Fallback: Local Ollama
      const ollamaRes = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'mistral', prompt })
      });

      const data = await ollamaRes.json();
      aiInsight = data.response || 'AI summary not available.';
    }

    // Log the usage
    await supabase.from('ai_logs').insert([{ wallet, chain, aiInsight, feature: 'ai-insight' }]);

    return res.status(200).json({ aiInsight });
  } catch (err: any) {
    console.error('[OpenRouter AI Insight Error]', err);
    return res.status(500).json({ error: err.message || 'AI generation failed' });
  }
}
