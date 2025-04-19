// ✅ utils/txHistoryFetchers.ts — Real Chain TX Fetchers
import axios from 'axios';

export async function fetchEthTxs(address: string) {
  const key = process.env.ETHERSCAN_API_KEY!;
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=200&sort=desc&apikey=${key}`;
  const res = await axios.get(url);
  return res.data.result || [];
}

export async function fetchBscTxs(address: string) {
  const key = process.env.BSCSCAN_API_KEY!;
  const url = `https://api.bscscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=200&sort=desc&apikey=${key}`;
  const res = await axios.get(url);
  return res.data.result || [];
}

export async function fetchTronTxs(address: string) {
  const key = process.env.TRONSCAN_API_KEY!;
  const url = `https://apilist.tronscanapi.com/api/transaction?sort=-timestamp&count=true&limit=200&start=0&address=${address}`;
  const res = await axios.get(url, {
    headers: { 'TRON-PRO-API-KEY': key },
  });
  return res.data.data || [];
}