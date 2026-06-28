import { createClient } from '@supabase/supabase-js';

const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};
const supabaseUrl = env.VITE_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const isSupabaseConfigured = Boolean(env.VITE_SUPABASE_URL && env.VITE_SUPABASE_ANON_KEY);

const isBrowserRuntime = typeof window !== 'undefined' && typeof document !== 'undefined';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: isBrowserRuntime,
    persistSession: isBrowserRuntime
  },
  realtime: {
    enabled: isBrowserRuntime
  }
});

if (!isSupabaseConfigured && typeof console !== 'undefined' && console.warn) {
  console.warn('Supabase environment variables are missing. The app will run in a degraded mode until VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are configured.');
}
