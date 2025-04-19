// ✅ pages/api/ai-chat.ts — Final Streaming Fix
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';
import { Readable } from 'stream';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed');

  try {
    const buffers: Buffer[] = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }

    const body = JSON.parse(Buffer.concat(buffers).toString());
    const { message, model = 'llama3', memory, history = [] } = body;

    const contextPath = path.resolve(process.cwd(), 'data/traceai_context.json');
    const context = fs.readFileSync(contextPath, 'utf-8');

    const prompt = `${context}\n\n${history.join('\n')}\n\nUser: ${message}\nAI:`;

    const ollamaRes = await fetch(`http://localhost:11434/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        prompt,
        stream: true,
      }),
    });

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    const reader = ollamaRes.body!.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const text = decoder.decode(value);
      const lines = text.split('\n').filter(Boolean);

      for (const line of lines) {
        if (line === 'data: [DONE]') {
          res.write(`[DONE]\n`);
          break;
        }

        try {
          const json = JSON.parse(line.replace(/^data:\s*/, ''));
          if (json.response) {
            res.write(json.response);
          }
        } catch (err) {
          console.error('Stream JSON parse error:', err);
        }
      }
    }

    res.end();
  } catch (err) {
    console.error('AI Chat API Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}