import { renderLanding } from '../pages/landing.js';
import { renderLogin } from '../pages/login.js';
import { renderRegister } from '../pages/register.js';
import { renderDashboard } from '../pages/dashboard.js';
import { renderSearch } from '../pages/search.js';
import { renderProfile } from '../pages/profile.js';
import { renderMessages } from '../pages/messages.js';
import { renderSettings } from '../pages/settings.js';
import { renderNotFound } from '../pages/not-found.js';
import { renderDiscover } from '../pages/discover.js';
import { renderNotifications } from '../pages/notifications.js';
import { renderConnections } from '../pages/connections.js';
import { renderConnectionRequests } from '../pages/connection-requests.js';
import { renderEditProfile } from '../pages/edit-profile.js';
import { renderResetPassword } from '../pages/reset-password.js';
import { renderPost } from '../pages/post.js';
import { getRouteDecision } from './auth-guard.js';
import { PROTECTED_ROUTES } from './routes.js';

const router = {
  routes: {
    '/': renderLanding,
    '/login': renderLogin,
    '/register': renderRegister,
    '/dashboard': renderDashboard,
    '/search': renderSearch,
    '/discover': renderDiscover,
    '/profile': renderProfile,
    '/messages': renderMessages,
    '/settings': renderSettings,
    '/notifications': renderNotifications,
    '/connections': renderConnections,
    '/connection-requests': renderConnectionRequests,
    '/edit-profile': renderEditProfile,
    '/reset-password': renderResetPassword,
    '/post': renderPost,
    '/404': renderNotFound
  },

  protectedRoutes: PROTECTED_ROUTES,

  navigate(path, addToHistory = true) {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    if (addToHistory) {
      history.pushState({}, '', normalizedPath);
    } else {
      history.replaceState({}, '', normalizedPath);
    }

    return this.handleRoute();
  },

  async handleRoute() {
    const path = window.location.pathname || '/';
    const hash = window.location.hash.slice(1);
    const route = this.routes[path] || renderNotFound;

    const user = typeof globalThis !== 'undefined' ? globalThis.__unisphereCurrentUser || null : null;
    const authReady = typeof globalThis !== 'undefined' ? Boolean(globalThis.__unisphereAuthReady) : true;
    const decision = getRouteDecision(path, user, authReady);

    if (decision === 'loading') {
      showAppLoading(app);
      return;
    }

    if (decision === 'login') {
      this.navigate('/login', false);
      return;
    }

    if (decision === 'dashboard') {
      this.navigate('/dashboard', false);
      return;
    }

    // Render the route
    const app = document.getElementById('app');
    if (typeof window.cleanupCurrentPage === 'function') {
      window.cleanupCurrentPage();
    }
    window.cleanupCurrentPage = null;
    app.innerHTML = '';
    app.className = 'page-enter';

    if (hash && typeof route === 'function') {
      await route(hash);
    } else {
      await route();
    }
  }
};

function showAppLoading(app) {
  app.className = '';
  app.innerHTML = `
    <div class="app-loading">
      <div class="app-loading-brand">
        <div class="logo-icon">
          <svg viewBox="0 0 32 32" fill="none" width="40" height="40">
            <circle cx="16" cy="16" r="14" stroke="url(#loadGrad)" stroke-width="2"/>
            <circle cx="10" cy="12" r="3" fill="url(#loadGrad)"/>
            <circle cx="22" cy="12" r="3" fill="url(#loadGrad)"/>
            <circle cx="16" cy="21" r="3" fill="url(#loadGrad)"/>
            <defs>
              <linearGradient id="loadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#3b82f6"/>
                <stop offset="100%" style="stop-color:#a855f7"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span class="app-loading-title">UniSphere</span>
      </div>
      <div class="spinner app-loading-spinner"></div>
      <p class="app-loading-text">Loading your workspace...</p>
    </div>
  `;
}

if (typeof window !== 'undefined') {
  window.router = router;
}

export { router };
