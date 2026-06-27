import { renderLanding } from '../pages/landing.js';
import { renderLogin } from '../pages/login.js';
import { renderRegister } from '../pages/register.js';
import { renderDashboard } from '../pages/dashboard.js';
import { renderSearch } from '../pages/search.js';
import { renderProfile } from '../pages/profile.js';
import { renderMessages } from '../pages/messages.js';
import { renderSettings } from '../pages/settings.js';
import { getCurrentUser, getUserProfile } from '../main.js';

export const router = {
  routes: {
    '/': renderLanding,
    '/login': renderLogin,
    '/register': renderRegister,
    '/dashboard': renderDashboard,
    '/search': renderSearch,
    '/profile': renderProfile,
    '/messages': renderMessages,
    '/settings': renderSettings
  },

  protectedRoutes: ['/dashboard', '/search', '/profile', '/messages', '/settings'],

  navigate(path, addToHistory = true) {
    if (addToHistory) {
      history.pushState({}, '', path);
    }
    this.handleRoute();
  },

  async handleRoute() {
    const path = window.location.pathname;
    const hash = window.location.hash.slice(1);
    const route = this.routes[path] || renderLanding;

    // Check protected routes
    const user = await getCurrentUser();
    if (this.protectedRoutes.includes(path) && !user) {
      this.navigate('/login', false);
      return;
    }

    // Redirect logged-in users away from auth pages
    if ((path === '/login' || path === '/register') && user) {
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
