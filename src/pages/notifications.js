import { router } from '../lib/router.js';
import { renderSidebar, setupSidebarHandlers } from '../components/sidebar.js';
import { renderHeader, setupHeaderHandlers } from '../components/header.js';
import { getUserProfile } from '../main.js';

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
          <div class="container">
            <div class="page-card glass-card slide-up">
              <div class="section-header">
                <div>
                  <h3>Notifications</h3>
                  <p class="section-subtitle">Stay on top of new messages and connection activity.</p>
                </div>
              </div>
              <div class="notifications-list">
                <div class="notification-item">
                  <strong>New connection request</strong>
                  <p>Someone wants to connect with you. Open connection requests to respond.</p>
                </div>
                <div class="notification-item">
                  <strong>Message received</strong>
                  <p>Check your inbox for the latest conversation updates.</p>
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
}
