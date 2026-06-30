import { router } from '../lib/router.js';
import { renderSidebar, setupSidebarHandlers } from '../components/sidebar.js';
import { renderHeader, setupHeaderHandlers } from '../components/header.js';
import { getUserProfile } from '../main.js';
import { supabase } from '../lib/supabase.js';
import { escapeHtml, safeImageUrl } from '../utils/html.js';
import { showToast } from '../utils/toast.js';

let notificationsChannel = null;
let currentFilter = 'all';

export async function renderNotifications() {
  const app = document.getElementById('app');
  const profile = getUserProfile();

  if (!profile) {
    router.navigate('/login');
    return;
  }

  app.innerHTML = `
    <div class="dashboard-layout">
      ${renderSidebar()}
      <div class="main-content with-sidebar">
        <div id="sidebar-overlay" class="sidebar-overlay hidden" onclick="closeSidebar()"></div>
        ${renderHeader('Notifications')}
        <main class="page-main">
          <div class="container container-narrow">
              <div class="page-card glass-card slide-up">
                <div class="section-header section-header-stacked">
                  <div>
                    <h1 class="page-title">Notifications</h1>
                    <p class="section-subtitle">Stay on top of messages, connections, and activity.</p>
                  </div>
                  <div class="section-actions">
                    <button class="btn btn-secondary btn-sm" id="mark-all-read" onclick="markAllNotificationsRead()">
                      Mark all read
                    </button>
                  </div>
                </div>

              <div class="tabs" role="tablist">
                <button class="tab-item ${currentFilter === 'all' ? 'active' : ''}" onclick="setNotificationFilter('all')" role="tab" aria-selected="${currentFilter === 'all'}">
                  All
                </button>
                <button class="tab-item ${currentFilter === 'unread' ? 'active' : ''}" onclick="setNotificationFilter('unread')" role="tab" aria-selected="${currentFilter === 'unread'}">
                  Unread
                  <span class="tab-badge hidden" id="unread-count-tab">0</span>
                </button>
              </div>

              <div id="notifications-content" class="notifications-content">
                <div class="skeleton-list">
                  ${[1, 2, 3].map(() => `
                    <div class="skeleton-item">
                      <div class="skeleton-avatar"></div>
                      <div class="skeleton-lines">
                        <div class="skeleton-line"></div>
                        <div class="skeleton-line short"></div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  `;

  setupSidebarHandlers();
  setupHeaderHandlers();
  await loadNotifications();
  subscribeToNotifications(profile.id);
}

async function loadNotifications() {
  const profile = getUserProfile();
  if (!profile) return;

  const contentEl = document.getElementById('notifications-content');
  if (!contentEl) return;

  try {
    let query = supabase
      .from('notifications')
      .select('*, actor:profiles!notifications_actor_id_fkey(full_name, username, profile_image)')
      .eq('user_id', profile.id)
      .order('created_at', { ascending: false });

    if (currentFilter === 'unread') {
      query = query.eq('read', false);
    }

    const { data: notifications, error } = await query;

    if (error) throw error;

    updateUnreadBadge(notifications);
    contentEl.innerHTML = renderNotificationsList(notifications || []);
  } catch (error) {
    console.error('Failed to load notifications:', error);
    contentEl.innerHTML = renderErrorState();
  }
}

function renderNotificationsList(notifications) {
  if (notifications.length === 0) {
    return renderEmptyState();
  }

  return `
    <div class="notifications-list">
      ${notifications.map(n => renderNotificationItem(n)).join('')}
    </div>
  `;
}

function renderNotificationItem(notification) {
  const actor = notification.actor || {};
  const initials = actor.full_name?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U';
  const time = formatNotificationTime(notification.created_at);
  const unreadClass = notification.read ? '' : 'unread';
  const icon = notificationIcon(notification.type);

  return `
    <div class="notification-item ${unreadClass}" data-id="${notification.id}">
      <div class="notification-avatar" onclick="openNotification('${notification.id}', '${escapeHtml(notification.link || '')}')">
        ${safeImageUrl(actor.profile_image)
          ? `<img src="${safeImageUrl(actor.profile_image)}" alt="${escapeHtml(actor.full_name || '')}">`
          : `<span>${initials}</span>`
        }
        <div class="notification-type-icon">${icon}</div>
      </div>
      <div class="notification-body" onclick="openNotification('${notification.id}', '${escapeHtml(notification.link || '')}')">
        <div class="notification-title">${escapeHtml(notification.title)}</div>
        ${notification.body ? `<p class="notification-text">${escapeHtml(notification.body)}</p>` : ''}
        <span class="notification-time">${time}</span>
      </div>
      <div class="notification-actions">
        ${!notification.read ? `
          <button class="notification-action" onclick="markNotificationRead('${notification.id}', event)" title="Mark as read">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="12" r="3" fill="currentColor"/>
            </svg>
          </button>
        ` : ''}
        <button class="notification-action" onclick="deleteNotification('${notification.id}', event)" title="Delete">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  `;
}

function notificationIcon(type) {
  const icons = {
    connection_request: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="3"/><path d="M20 8v6"/><path d="M23 11h-6"/></svg>`,
    connection_accepted: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    message: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    post_like: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
    post_comment: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`
  };
  return icons[type] || icons.message;
}

function renderEmptyState() {
  return `
    <div class="empty-state-card">
      <div class="empty-state-icon">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      </div>
      <h3 class="empty-state-title">No notifications</h3>
      <p class="empty-state-text">
        ${currentFilter === 'unread'
          ? 'You have read all your notifications.'
          : 'When someone connects, messages, or interacts with your posts, you will see it here.'}
      </p>
    </div>
  `;
}

function renderErrorState() {
  return `
    <div class="empty-state-card">
      <div class="empty-state-icon">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <h3 class="empty-state-title">Could not load notifications</h3>
      <p class="empty-state-text">Please try again in a moment.</p>
      <button class="btn btn-secondary btn-sm" onclick="loadNotifications()">Retry</button>
    </div>
  `;
}

function updateUnreadBadge(notifications) {
  const unreadCount = (notifications || []).filter(n => !n.read).length;
  const tabBadge = document.getElementById('unread-count-tab');
  if (tabBadge) {
    tabBadge.textContent = unreadCount;
    tabBadge.classList.toggle('hidden', unreadCount === 0);
  }

  // Also update global header/sidebar badges
  updateGlobalUnreadBadge(unreadCount);
}

function updateGlobalUnreadBadge(count) {
  const headerBadge = document.getElementById('header-notification-badge');
  const sidebarBadge = document.getElementById('sidebar-notification-badge');

  if (headerBadge) {
    headerBadge.classList.toggle('hidden', count === 0);
  }
  if (sidebarBadge) {
    sidebarBadge.textContent = count > 99 ? '99+' : count;
    sidebarBadge.classList.toggle('hidden', count === 0);
  }
}

async function markNotificationRead(id, event) {
  event?.stopPropagation();
  const profile = getUserProfile();
  if (!profile) return;

  try {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id)
      .eq('user_id', profile.id);

    if (error) throw error;
    await loadNotifications();
  } catch (error) {
    console.error('Failed to mark notification read:', error);
    showToast('Could not update notification', 'error');
  }
}

async function markAllNotificationsRead() {
  const profile = getUserProfile();
  if (!profile) return;

  try {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', profile.id)
      .eq('read', false);

    if (error) throw error;
    await loadNotifications();
    showToast('All notifications marked as read', 'success');
  } catch (error) {
    console.error('Failed to mark all read:', error);
    showToast('Could not mark all as read', 'error');
  }
}

async function deleteNotification(id, event) {
  event?.stopPropagation();
  const profile = getUserProfile();
  if (!profile) return;

  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', id)
      .eq('user_id', profile.id);

    if (error) throw error;
    await loadNotifications();
  } catch (error) {
    console.error('Failed to delete notification:', error);
    showToast('Could not delete notification', 'error');
  }
}

async function openNotification(id, link) {
  await markNotificationRead(id, null);
  if (link) {
    router.navigate(link);
  }
}

function setNotificationFilter(filter) {
  currentFilter = filter;
  loadNotifications();
}

function subscribeToNotifications(userId) {
  if (notificationsChannel) {
    supabase.removeChannel(notificationsChannel);
    notificationsChannel = null;
  }

  notificationsChannel = supabase
    .channel(`notifications:${userId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`
      },
      () => {
        loadNotifications();
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`
      },
      () => {
        loadNotifications();
      }
    )
    .subscribe();
}

function formatNotificationTime(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffSeconds = Math.floor((now - date) / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

window.loadNotifications = loadNotifications;
window.markNotificationRead = markNotificationRead;
window.markAllNotificationsRead = markAllNotificationsRead;
window.deleteNotification = deleteNotification;
window.openNotification = openNotification;
window.setNotificationFilter = setNotificationFilter;
