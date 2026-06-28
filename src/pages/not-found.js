import { renderSidebar, setupSidebarHandlers } from '../components/sidebar.js';
import { renderHeader, setupHeaderHandlers } from '../components/header.js';
import { router } from '../lib/router.js';

export async function renderNotFound() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="dashboard-layout">
      ${renderSidebar()}
      <div class="main-content with-sidebar">
        <div id="sidebar-overlay" class="sidebar-overlay hidden" onclick="closeSidebar()"></div>
        ${renderHeader('Page Not Found')}
        <main class="settings-main">
          <div class="container">
            <div class="empty-state fade-in">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M3 12h18"/>
                <path d="M12 3v18"/>
                <circle cx="12" cy="12" r="9"/>
              </svg>
              <h4>Page not found</h4>
              <p>The page you requested does not exist or may have moved.</p>
              <button class="btn btn-primary" onclick="window.router.navigate('/dashboard')">Go Home</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  `;

  setupSidebarHandlers();
  setupHeaderHandlers();
}
