import { supabase } from '../lib/supabase.js';
import { escapeHtml, safeImageUrl } from '../utils/html.js';
import { router } from '../lib/router.js';
import { getUserProfile } from '../main.js';

export function renderSidebar() {
  const user = getUserProfile();

  const initials = user?.full_name?.split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'U';

  return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <div class="logo-icon">
            <svg viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="url(#grad)" stroke-width="2"/>
              <circle cx="10" cy="12" r="3" fill="url(#grad)"/>
              <circle cx="22" cy="12" r="3" fill="url(#grad)"/>
              <circle cx="16" cy="21" r="3" fill="url(#grad)"/>
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#3b82f6"/>
                  <stop offset="100%" style="stop-color:#a855f7"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span>UniSphere</span>
        </div>
        <button class="sidebar-toggle hide-tablet-up" onclick="toggleSidebar()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div class="sidebar-user">
        <div class="user-avatar">
          ${safeImageUrl(user?.profile_image)
            ? `<img src="${safeImageUrl(user.profile_image)}" alt="${escapeHtml(user.full_name)}">`
            : `<span>${initials}</span>`
          }
        </div>
        <div class="user-info">
          <span class="user-name">${escapeHtml(user?.full_name || 'Student')}</span>
          <span class="user-university">${escapeHtml(user?.university || 'University')}</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        <a href="/dashboard" class="nav-item ${window.location.pathname === '/dashboard' ? 'active' : ''}" onclick="navigateTo(event, '/dashboard')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
          </svg>
          <span>Dashboard</span>
        </a>
        <a href="/profile" class="nav-item ${window.location.pathname === '/profile' ? 'active' : ''}" onclick="navigateTo(event, '/profile')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span>My Profile</span>
        </a>
        <a href="/search" class="nav-item ${window.location.pathname === '/search' ? 'active' : ''}" onclick="navigateTo(event, '/search')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span>Find Students</span>
        </a>
        <a href="/messages" class="nav-item ${window.location.pathname === '/messages' ? 'active' : ''}" onclick="navigateTo(event, '/messages')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span>Messages</span>
          <span class="nav-badge hidden" id="message-badge">0</span>
        </a>
        <a href="/settings" class="nav-item ${window.location.pathname === '/settings' ? 'active' : ''}" onclick="navigateTo(event, '/settings')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          <span>Settings</span>
        </a>
      </nav>

      <div class="sidebar-footer">
        <button class="nav-item logout-btn" onclick="handleLogout()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <style>
      .sidebar {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        width: 280px;
        background: var(--bg-primary);
        border-right: 1px solid var(--border-color);
        display: flex;
        flex-direction: column;
        z-index: 100;
        transform: translateX(-100%);
        transition: transform var(--transition-base);
      }

      @media (min-width: 1024px) {
        .sidebar {
          transform: translateX(0);
        }
      }

      .sidebar.open {
        transform: translateX(0);
      }

      .sidebar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--space-4) var(--space-5);
        border-bottom: 1px solid var(--border-color);
      }

      .sidebar-logo {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        font-weight: 600;
        font-size: var(--font-size-lg);
        color: var(--text-primary);
      }

      .sidebar-toggle {
        color: var(--text-secondary);
        padding: var(--space-2);
        margin: calc(var(--space-2) * -1);
      }

      .sidebar-user {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        padding: var(--space-4) var(--space-5);
        border-bottom: 1px solid var(--border-color);
      }

      .user-avatar {
        width: 48px;
        height: 48px;
        border-radius: var(--radius-full);
        background: var(--gradient-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        overflow: hidden;
      }

      .user-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .user-info {
        min-width: 0;
      }

      .user-name {
        display: block;
        font-weight: 600;
        color: var(--text-primary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .user-university {
        display: block;
        font-size: var(--font-size-sm);
        color: var(--text-tertiary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .sidebar-nav {
        flex: 1;
        padding: var(--space-4) var(--space-3);
        overflow-y: auto;
      }

      .nav-item {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        padding: var(--space-3) var(--space-4);
        margin-bottom: var(--space-1);
        border-radius: var(--radius-lg);
        color: var(--text-secondary);
        font-weight: 500;
        transition: all var(--transition-fast);
        position: relative;
      }

      .nav-item svg {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
      }

      .nav-item:hover {
        background: var(--bg-tertiary);
        color: var(--text-primary);
      }

      .nav-item.active {
        background: var(--primary-50);
        color: var(--primary-600);
      }

      [data-theme="dark"] .nav-item.active {
        background: rgba(59, 130, 246, 0.15);
      }

      .nav-badge {
        margin-left: auto;
        padding: var(--space-1) var(--space-2);
        background: var(--error-500);
        color: white;
        border-radius: var(--radius-full);
        font-size: var(--font-size-xs);
        font-weight: 600;
        min-width: 20px;
        text-align: center;
      }

      .sidebar-footer {
        padding: var(--space-4) var(--space-3);
        border-top: 1px solid var(--border-color);
      }

      .logout-btn {
        color: var(--error-600);
      }

      .logout-btn:hover {
        background: var(--error-50);
      }

      [data-theme="dark"] .logout-btn:hover {
        background: rgba(239, 68, 68, 0.1);
      }
    </style>
  `;
}

export function setupSidebarHandlers() {
  window.navigateTo = (e, path) => {
    e.preventDefault();
    closeSidebar();
    router.navigate(path);
  };

  window.toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('hidden');
  };

  window.closeSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (window.innerWidth < 1024) {
      sidebar?.classList.remove('open');
      overlay?.classList.add('hidden');
    }
  };

  window.handleLogout = async () => {
    await supabase.auth.signOut();
    showToast('Logged out successfully', 'success');
    router.navigate('/');
  };
}
