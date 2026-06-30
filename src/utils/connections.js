import { supabase } from '../lib/supabase.js';

export async function requestConnection(targetUserId) {
  if (!targetUserId) throw new Error('Missing target user id');

  // Use direct table insert/update instead of relying on an RPC existing
  // in every environment.
  const currentUser = (await supabase.auth.getUser()).data?.user;
  const requesterId = currentUser?.id;
  if (!requesterId) throw new Error('Authentication required');

  // Upsert into connections to avoid duplicates (unique: (requester_id, receiver_id)).
  // If a record already exists, keep existing status when it's already pending/accepted.
  const { data, error } = await supabase
    .from('connections')
    .upsert(
      {
        requester_id: requesterId,
        receiver_id: targetUserId,
        status: 'pending'
      },
      {
        onConflict: 'requester_id,receiver_id',
        ignoreDuplicates: false
      }
    )
    .select('status')
    .single();

  if (error) throw error;
  return data?.status || 'pending';
}

