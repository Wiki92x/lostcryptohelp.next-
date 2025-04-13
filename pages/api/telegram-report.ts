try {
  const telegramRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'Markdown',
    }),
  });

  const json = await telegramRes.json();
  console.log('[Telegram Response]', json);

  if (!json.ok) throw new Error(json.description || 'Telegram failed');

  return res.status(200).json({ success: true });
} catch (err: any) {
  console.error('[Telegram Error]', err.message);
  return res.status(500).json({ error: 'Telegram send failed', details: err.message });
}
