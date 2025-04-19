// ✅ utils/scanLogger.ts — Fully Safe Fallback Version
import { createClient } from '@supabase/supabase-js';

export async function saveScanToSupabase(wallet: string, chain: string) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // ✅ Debug log
  console.log('[Supabase URL]', supabaseUrl);
  console.log('[Supabase KEY]', supabaseKey?.slice(0, 10) + '...');

  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase environment variables are missing. Skipping save.');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  await supabase.from('cases').insert({
    wallet,
    chain,
    type: 'deep-scan',
    created_at: new Date().toISOString(),
  });
}