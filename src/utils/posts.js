import { supabase } from '../lib/supabase.js';

export async function fetchPosts(limit = 50) {
  const { data, error } = await supabase
    .from('posts_with_meta')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

export async function fetchPostsWithUserLike(currentUserId, limit = 50) {
  const { data: posts, error: postsError } = await supabase
    .from('posts_with_meta')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (postsError) throw postsError;
  if (!posts || posts.length === 0) return [];

  const postIds = posts.map(p => p.id);
  const { data: likes, error: likesError } = await supabase
    .from('post_likes')
    .select('post_id')
    .in('post_id', postIds)
    .eq('user_id', currentUserId);

  if (likesError) throw likesError;

  const likedSet = new Set((likes || []).map(l => l.post_id));
  return posts.map(post => ({
    ...post,
    is_liked: likedSet.has(post.id)
  }));
}

export async function createPost(content) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) throw new Error('Authentication required');

  const { data, error } = await supabase
    .from('posts')
    .insert([{ user_id: userData.user.id, content: content.trim() }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function toggleLike(postId) {
  const { data, error } = await supabase.rpc('toggle_post_like', {
    post_uuid: postId
  });

  if (error) throw error;
  return data;
}

export async function addComment(postId, content) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) throw new Error('Authentication required');

  const { data, error } = await supabase
    .from('post_comments')
    .insert([{ post_id: postId, user_id: userData.user.id, content: content.trim() }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function fetchComments(postId) {
  console.log('[fetchComments] start', postId);
  const { data: comments, error } = await supabase
    .from('post_comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  console.log('[fetchComments] result', { comments, error });
  if (error) throw error;
  if (!comments || comments.length === 0) return [];

  const userIds = [...new Set(comments.map(c => c.user_id))];
  if (userIds.length === 0) return comments;

  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id, full_name, username, profile_image')
    .in('id', userIds);

  if (profilesError) throw profilesError;

  const profileMap = new Map((profiles || []).map(p => [p.id, p]));
  return comments.map(comment => ({
    ...comment,
    profiles: profileMap.get(comment.user_id) || null
  }));
}

export async function deletePost(postId) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId);

  if (error) throw error;
}
