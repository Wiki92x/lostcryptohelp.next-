import { NextRequest } from 'next/server';

const addresses = {
  eth: process.env.VERIFY_ETH_ADDRESS?.toLowerCase(),
  bsc: process.env.VERIFY_BNB_ADDRESS?.toLowerCase(),
  tron: process.env.VERIFY_TRON_ADDRESS,
};

const requiredUsd = {
  eth: 25,
  bsc: 10,
  tron: 10,
};

export async function POST(req: NextRequest) {
  try {
    const { txHash, chain } = await req.json();

    if (!txHash || !chain || !addresses[chain]) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (chain === 'tron') {
      const tronRes = await fetch(`https://apilist.tronscan.org/api/transaction-info?hash=${txHash}`);
      const tronData = await tronRes.json();
      const to = tronData?.trigger_info?.to_address;
      const amount = parseFloat(tronData?.trigger_info?.amount_str || '0') / 1e6;

      if (to === addresses.tron && amount >= requiredUsd.tron) {
        await sendTelegram(txHash, chain, amount);
        return Response.json({ success: true });
      }
    }

    if (chain === 'eth' || chain === 'bsc') {
      const apiKey = chain === 'eth' ? process.env.ETHERSCAN_API_KEY : process.env.BSCSCAN_API_KEY;
      const url = `https://api.${chain === 'eth' ? 'etherscan' : 'bscscan'}.com/api?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${apiKey}`;
      const ethRes = await fetch(url);
      const ethData = await ethRes.json();

      const tx = ethData.result;
      const to = tx?.to?.toLowerCase();
      const value = parseInt(tx.value) / 1e18;

      if (to === addresses[chain] && value >= requiredUsd[chain]) {
        await sendTelegram(txHash, chain, value);
        return Response.json({ success: true });
      }
    }

    return Response.json({ error: 'Invalid transaction or underpaid' }, { status: 400 });
  } catch (err: any) {
    return Response.json({ error: 'Verification failed', detail: err.message }, { status: 500 });
  }
}

async function sendTelegram(txHash: string, chain: string, amount: number) {
  const token = process.env.VITE_TELEGRAM_BOT_TOKEN!;
  const chatId = process.env.VITE_TELEGRAM_CHAT_ID!;

  if (token && chatId) {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: `✅ New Membership\nChain: ${chain.toUpperCase()}\nTX: ${txHash}\nAmount: $${amount}`,
      }),
    });
  }
}
