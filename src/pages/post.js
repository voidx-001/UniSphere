import { router } from '../lib/router.js';
import { supabase } from '../lib/supabase.js';
import { getUserProfile, getCurrentUser } from '../main.js';
import { renderSidebar, setupSidebarHandlers } from '../components/sidebar.js';
import { renderHeader, setupHeaderHandlers } from '../components/header.js';
import { showToast } from '../utils/toast.js';
import { escapeHtml, safeImageUrl } from '../utils/html.js';
import { fetchComments, addComment } from '../utils/posts.js';
import { requestConnection } from '../utils/connections.js';

export async function renderPost() {
  const app = document.getElementById('app');
  const currentUser = getUserProfile();

  if (!currentUser) {
    router.navigate('/login');
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  if (!postId) {
    router.navigate('/dashboard');
    return;
  }

  app.innerHTML = `
    <div class="dashboard-layout">
      ${renderSidebar()}
      <div class="main-content with-sidebar">
        <div id="sidebar-overlay" class="sidebar-overlay hidden" onclick="closeSidebar()"></div>
        ${renderHeader('Post')}
        <main class="page-main">
          <div class="container container-feed">
            <div id="post-detail-container">
              <div class="loading-container">
                <div class="loading-skeleton"></div>
                <div class="loading-skeleton"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  `;

  setupSidebarHandlers();
  setupHeaderHandlers();

  await loadPostDetail(postId, currentUser);
}

async function loadPostDetail(postId, currentUser) {
  const container = document.getElementById('post-detail-container');
  console.log('[post] loading detail for', postId);

  try {
    const { data: post, error: postError } = await supabase
      .from('posts_with_meta')
      .select('*')
      .eq('id', postId)
      .single();

    console.log('[post] post result', { post, postError });

    if (postError || !post) {
      container.innerHTML = renderNotFoundState();
      return;
    }

    const { data: likeData } = await supabase
      .from('post_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', currentUser.id)
      .maybeSingle();

    post.is_liked = Boolean(likeData);
    console.log('[post] like data', { likeData });

    const comments = await fetchComments(postId);
    console.log('[post] comments', { comments });

    container.innerHTML = `
      ${renderPostCard(post)}
      <div class="comments-section card slide-up" style="animation-delay: 0.1s">
        <h3 class="comments-title">Comments (${comments.length})</h3>
        <form id="comment-form" class="comment-form">
          <div class="form-group">
            <textarea id="comment-text" class="form-input" rows="2" maxlength="1000" placeholder="Write a comment..." required></textarea>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary btn-sm">Post comment</button>
          </div>
        </form>
        <div class="comments-list" id="comments-list">
          ${comments.length > 0
            ? comments.map(renderComment).join('')
            : '<p class="empty-text">No comments yet. Be the first to comment!</p>'
          }
        </div>
      </div>
    `;

    setupCommentForm(postId);
  } catch (e) {
    container.innerHTML = renderErrorState();
  }
}

function renderPostCard(post) {
  const initials = post.author_name?.split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'S';

  const timeAgo = formatTimeAgo(post.created_at);
  const likeClass = post.is_liked ? 'post-action-btn active' : 'post-action-btn';

  return `
    <article class="post-card social-post slide-up">
      <header class="post-header">
        <button class="post-author" onclick="viewProfile('${post.user_id}')">
          <div class="composer-avatar">
            ${safeImageUrl(post.author_profile_image)
              ? `<img src="${safeImageUrl(post.author_profile_image)}" alt="${escapeHtml(post.author_name)}">`
              : `<span>${initials}</span>`
            }
          </div>
          <div class="post-author-info">
            <strong>${escapeHtml(post.author_name)}</strong>
            <span class="post-meta">@${escapeHtml(post.author_username || 'student')} · ${escapeHtml(post.author_university || 'University')}</span>
          </div>
        </button>
        <span class="post-time">${timeAgo}</span>
      </header>
      <div class="post-content">${escapeHtml(post.content)}</div>
      <div class="post-stats">${post.likes_count || 0} likes · ${post.comments_count || 0} comments</div>
      <footer class="post-actions">
        <button type="button" class="${likeClass}" onclick="togglePostLike(event, '${post.id}')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${post.is_liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          ${post.is_liked ? 'Liked' : 'Like'}
        </button>
        <button type="button" class="post-action-btn" onclick="connectWith(event, '${post.user_id}')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
          Connect
        </button>
      </footer>
    </article>
  `;
}

function renderComment(comment) {
  const profile = comment.profiles;
  const initials = profile?.full_name?.split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'S';

  return `
    <div class="comment-item">
      <div class="composer-avatar avatar-sm">
        ${safeImageUrl(profile?.profile_image)
          ? `<img src="${safeImageUrl(profile.profile_image)}" alt="${escapeHtml(profile.full_name)}">`
          : `<span>${initials}</span>`
        }
      </div>
      <div class="comment-body">
        <div class="comment-bubble">
          <strong>${escapeHtml(profile?.full_name || 'Student')}</strong>
          <p>${escapeHtml(comment.content)}</p>
        </div>
        <span class="comment-time">${formatTimeAgo(comment.created_at)}</span>
      </div>
    </div>
  `;
}

function setupCommentForm(postId) {
  const form = document.getElementById('comment-form');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const textarea = document.getElementById('comment-text');
    const text = textarea?.value.trim();
    if (!text) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Posting...';

    try {
      await addComment(postId, text);
      showToast('Comment posted!', 'success');
      await loadPostDetail(postId, getUserProfile());
    } catch (err) {
      showToast(err.message || 'Unable to post comment.', 'error');
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Post comment';
    }
  });
}

function renderNotFoundState() {
  return `
    <div class="empty-state-card">
      <h4>Post not found</h4>
      <p>This post may have been deleted or the link is invalid.</p>
      <button class="btn btn-primary" onclick="window.router.navigate('/dashboard')">Back to feed</button>
    </div>
  `;
}

function renderErrorState() {
  return `
    <div class="empty-state-card">
      <h4>Unable to load post</h4>
      <p>Something went wrong while loading this post.</p>
      <button class="btn btn-primary" onclick="window.router.navigate('/dashboard')">Back to feed</button>
    </div>
  `;
}

function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
