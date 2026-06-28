import { getUserProfile } from '../main.js';
import { toggleTheme, getTheme } from '../utils/theme.js';
import { showToast } from '../utils/toast.js';

export function renderHeader(title = '', showSearch = false) {
  const user = getUserProfile();
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const canGoBack = typeof window !== 'undefined' && window.location.pathname !== '/' && window.location.pathname !== '/dashboard';

  const initials = user?.full_name?.split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'U';

  return `
    <header class="header">
      <div class="app-bar">
        <div class="app-bar-left">
          <button class="menu-toggle hide-tablet-up" onclick="toggleSidebar()" aria-label="Open menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <a href="/dashboard" class="brand" onclick="navigateTo(event, '/dashboard')">
            <span class="brand-mark">U</span>
            <span class="brand-label">UniSphere</span>
          </a>
        </div>

        <div class="app-bar-center">
          ${title ? `<h1 class="page-title">${title}</h1>` : `<p class="brand-subtitle">Connect with students across campus</p>`}
        </div>

        <div class="app-bar-actions">
          <button class="header-icon" onclick="navigateTo(event, '/search')" title="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
          </button>
          <button class="header-icon" onclick="window.router.navigate('/notifications')" title="Notifications">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </button>
          <div class="header-user" onclick="window.router.navigate('/settings')" title="View profile">
            <div class="avatar avatar-sm">
              ${user?.profile_image
                ? `<img src="${user.profile_image}" alt="${user.full_name}">`
                : `<span>${initials}</span>`
              }
            </div>
          </div>
        </div>
      </div>

      ${showSearch ? `
        <div class="header-search hide-tablet">
          <div class="search-input">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input type="text" id="header-search" placeholder="Search students..." onclick="window.router.navigate('/search')">
          </div>
        </div>
      ` : ''}
    </header>

    <nav class="bottom-nav" aria-label="Primary navigation">
      <a href="/dashboard" class="bottom-nav-item ${currentPath === '/dashboard' ? 'active' : ''}" onclick="navigateTo(event, '/dashboard')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
          <path d="M9 22V12h6v10"/>
        </svg>
        <span>Home</span>
      </a>
      <a href="/search" class="bottom-nav-item ${currentPath === '/search' ? 'active' : ''}" onclick="navigateTo(event, '/search')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
        </svg>
        <span>Discover</span>
      </a>
      <a href="/messages" class="bottom-nav-item ${currentPath === '/messages' ? 'active' : ''}" onclick="navigateTo(event, '/messages')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <span>Messages</span>
      </a>
      <button type="button" class="bottom-nav-item bottom-nav-button" onclick="window.router.navigate('/notifications')" title="Notifications">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        <span>Notifications</span>
      </button>
      <a href="/profile" class="bottom-nav-item ${currentPath === '/profile' ? 'active' : ''}" onclick="navigateTo(event, '/profile')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span>Profile</span>
      </a>
    </nav>

    <style>
      .header {
        position: sticky;
        top: 0;
        z-index: 50;
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
        background: var(--bg-primary);
        border-bottom: 1px solid var(--border-color);
      }

      .app-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-4);
        padding: var(--space-4) var(--space-6);
        min-height: 72px;
      }

      .app-bar-left,
      .app-bar-actions {
        display: flex;
        align-items: center;
        gap: var(--space-3);
      }

      .app-bar-center {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .brand {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        font-weight: 700;
        color: var(--text-primary);
        text-decoration: none;
      }

      .brand-mark {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        border-radius: var(--radius-full);
        background: var(--gradient-primary);
        color: white;
        font-size: 0.95rem;
      }

      .brand-label {
        font-size: var(--font-size-lg);
      }

      .brand-subtitle {
        margin: 0;
        font-size: var(--font-size-sm);
        color: var(--text-secondary);
      }

      .page-title {
        font-size: var(--font-size-xl);
        font-weight: 700;
        color: var(--text-primary);
        margin: 0;
      }

      .header-search {
        padding: 0 var(--space-6) var(--space-4);
      }

      .search-input {
        position: relative;
      }

      .search-input svg {
        position: absolute;
        left: var(--space-3);
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-muted);
      }

      .search-input input {
        width: 100%;
        padding: var(--space-2) var(--space-3);
        padding-left: 40px;
        background: var(--bg-tertiary);
        border: 1px solid transparent;
        border-radius: var(--radius-lg);
        color: var(--text-primary);
        transition: all var(--transition-fast);
      }

      .search-input input:focus {
        outline: none;
        background: var(--bg-primary);
        border-color: var(--border-focus);
      }

      .search-input input::placeholder {
        color: var(--text-muted);
      }

      .header-icon,
      .header-user {
        width: 44px;
        height: 44px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-lg);
        background: var(--bg-tertiary);
        color: var(--text-secondary);
        transition: all var(--transition-fast);
      }

      .header-icon:hover,
      .header-user:hover {
        background: var(--bg-primary);
        color: var(--text-primary);
      }

      .header-user {
        padding: var(--space-1);
      }

      .header-user .avatar img,
      .header-user .avatar span {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .bottom-nav {
        position: fixed;
        inset: auto 0 0 0;
        z-index: 55;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-1);
        padding: var(--space-2) var(--space-3);
        padding-bottom: calc(var(--space-2) + env(safe-area-inset-bottom, 0px));
        background: var(--bg-glass-strong);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-top: 1px solid var(--border-color);
      }

      .bottom-nav-item {
        flex: 1;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        padding: var(--space-2) 0;
        color: var(--text-secondary);
        text-decoration: none;
        font-size: var(--font-size-xs);
        border-radius: var(--radius-xl);
        transition: background var(--transition-fast), color var(--transition-fast);
      }

      .bottom-nav-item.active,
      .bottom-nav-button:hover {
        color: var(--primary-600);
      }

      .bottom-nav-item:hover {
        background: var(--bg-tertiary);
      }

      .bottom-nav-item svg {
        width: 20px;
        height: 20px;
      }

      .bottom-nav-button {
        border: none;
        background: transparent;
        cursor: pointer;
        width: 100%;
      }

      .main-content {
        padding-bottom: calc(76px + var(--space-4) + env(safe-area-inset-bottom, 0px));
      }

      @media (min-width: 768px) and (max-width: 1023px) {
        .app-bar-center .page-title {
          font-size: var(--font-size-lg);
        }

        .brand-label {
          display: none;
        }
      }

      @media (min-width: 1024px) {
        .bottom-nav {
          display: none;
        }

        .main-content {
          padding-bottom: 0;
        }
      }

      @media (max-width: 767px) {
        .app-bar {
          padding: var(--space-3) var(--space-4);
        }

        .page-title {
          font-size: var(--font-size-lg);
        }
      }
    </style>
  `;
}

export function setupHeaderHandlers() {
  window.handleThemeToggle = () => {
    const newTheme = toggleTheme();
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    if (newTheme === 'dark') {
      sunIcon?.classList.add('hidden');
      moonIcon?.classList.remove('hidden');
    } else {
      sunIcon?.classList.remove('hidden');
      moonIcon?.classList.add('hidden');
    }
  };

  window.showNotifications = () => {
    showToast('Notifications are coming soon', 'info');
  };
}
