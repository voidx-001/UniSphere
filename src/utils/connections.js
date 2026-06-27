import { supabase } from '../lib/supabase.js';

export async function requestConnection(targetUserId) {
  const { data, error } = await supabase.rpc('request_connection', {
    target_user_id: targetUserId
  });

  if (error) throw error;
  return data;
}
