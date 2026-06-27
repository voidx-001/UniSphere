import { getUserProfile } from '../main.js';
import { toggleTheme, getTheme } from '../utils/theme.js';

export function renderHeader(title = '', showSearch = false) {
  const user = getUserProfile();

  const initials = user?.full_name?.split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'U';

  return `
    <header class="header">
      <div class="header-left">
        <button class="menu-toggle hide-tablet-up" onclick="toggleSidebar()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        ${title ? `<h1 class="page-title">${title}</h1>` : ''}
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

      <div class="header-right">
        <button class="header-icon" onclick="handleThemeToggle()" title="Toggle theme">
          <svg class="sun-icon ${getTheme() === 'dark' ? 'hidden' : ''}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <svg class="moon-icon ${getTheme() === 'light' ? 'hidden' : ''}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>

        <button class="header-icon" onclick="window.router.navigate('/messages')" title="Messages">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </button>

        <div class="header-user" onclick="window.router.navigate('/settings')">
          <div class="avatar avatar-sm">
            ${user?.profile_image
              ? `<img src="${user.profile_image}" alt="${user.full_name}">`
              : `<span>${initials}</span>`
            }
          </div>
        </div>
      </div>
    </header>

    <style>
      .header {
        position: sticky;
        top: 0;
        z-index: 50;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-4);
        padding: var(--space-4) var(--space-6);
        background: var(--bg-primary);
        border-bottom: 1px solid var(--border-color);
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: var(--space-4);
      }

      .menu-toggle {
        color: var(--text-secondary);
        padding: var(--space-2);
        margin: calc(var(--space-2) * -1);
      }

      .page-title {
        font-size: var(--font-size-xl);
        font-weight: 600;
        color: var(--text-primary);
      }

      .header-search {
        flex: 1;
        max-width: 400px;
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

      .header-right {
        display: flex;
        align-items: center;
        gap: var(--space-2);
      }

      .header-icon {
        position: relative;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-secondary);
        border-radius: var(--radius-lg);
        transition: all var(--transition-fast);
      }

      .header-icon:hover {
        background: var(--bg-tertiary);
        color: var(--text-primary);
      }

      .header-user {
        cursor: pointer;
        padding: var(--space-1);
      }

      @media (max-width: 767px) {
        .header {
          padding: var(--space-3) var(--space-4);
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
}
