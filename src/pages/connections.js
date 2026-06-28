import { getUserProfile } from '../main.js';
import { supabase } from '../lib/supabase.js';
import { router } from '../lib/router.js';
import { renderSidebar, setupSidebarHandlers } from '../components/sidebar.js';
import { renderHeader, setupHeaderHandlers } from '../components/header.js';
import { showToast } from '../utils/toast.js';
import { escapeHtml, safeImageUrl } from '../utils/html.js';
import { renderPageLoading } from '../components/loading.js';

export async function renderConnections() {
  const app = document.getElementById('app');
  const profile = getUserProfile();

  if (!profile) {
    router.navigate('/login');
    return;
  }

  // Show loading state
  app.innerHTML = `
    <div class="dashboard-layout">
      ${renderSidebar()}
      <div class="main-content with-sidebar">
        <div id="sidebar-overlay" class="sidebar-overlay hidden" onclick="closeSidebar()"></div>
        ${renderHeader('My Connections')}
        <main class="page-main">
          <div class="container">
            ${renderPageLoading('Loading connections...')}
          </div>
        </main>
      </div>
    </div>
  `;
  setupSidebarHandlers();
  setupHeaderHandlers();

  const { data, error } = await supabase
    .from('connections')
    .select(`
      id,
      status,
      requester_id,
      receiver_id,
      profiles!connections_requester_id_fkey(id, full_name, username, university, department, profile_image),
      profiles_receiver!connections_receiver_id_fkey(id, full_name, username, university, department, profile_image)
    `)
    .or(`requester_id.eq.${profile.id},receiver_id.eq.${profile.id}`)
    .eq('status', 'accepted');

  const connections = (data || []).map((item) => {
    const otherProfile = item.requester_id === profile.id
      ? item.profiles_receiver
      : item.profiles;
    return { ...item, otherProfile };
  });

  app.innerHTML = `
    <div class="dashboard-layout">
      ${renderSidebar()}
      <div class="main-content with-sidebar">
        <div id="sidebar-overlay" class="sidebar-overlay hidden" onclick="closeSidebar()"></div>
        ${renderHeader('My Connections')}
        <main class="page-main">
          <div class="container">
            <div class="page-card glass-card slide-up">
              <div class="section-header">
                <div>
                  <h3>My Connections</h3>
                  <p class="section-subtitle">Keep track of the people you’re collaborating with.</p>
                </div>
              </div>
              <div class="connections-list">
                ${connections.length > 0
                  ? connections.map((connection) => renderConnectionRow(connection, profile.id)).join('')
                  : '<p class="empty-text">You have no accepted connections yet.</p>'}
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

function renderConnectionRow(connection, currentUserId) {
  const profile = connection.otherProfile;
  const initials = profile?.full_name?.split(' ')
    .map((name) => name[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'S';

  return `
    <div class="connection-row">
      <div class="connection-user">
        <div class="avatar avatar-md">
          ${safeImageUrl(profile?.profile_image)
            ? `<img src="${safeImageUrl(profile.profile_image)}" alt="${escapeHtml(profile.full_name)}">`
            : `<span>${initials}</span>`}
        </div>
        <div>
          <h4>${escapeHtml(profile?.full_name || 'Student')}</h4>
          <p>${escapeHtml(profile?.university || 'University')} · ${escapeHtml(profile?.department || 'Department')}</p>
        </div>
      </div>
      <div class="connection-actions">
        <button class="btn btn-secondary btn-sm" onclick="window.router.navigate('/messages?user=${profile?.id}')">Message</button>
        <button class="btn btn-ghost btn-sm" onclick="removeConnection('${connection.id}')">Remove</button>
      </div>
    </div>
  `;
}

if (typeof window !== 'undefined') {
  window.removeConnection = async (connectionId) => {
  const { error } = await supabase
    .from('connections')
    .delete()
    .eq('id', connectionId);

  if (error) {
    showToast('Unable to remove this connection right now.', 'error');
  } else {
    showToast('Connection removed.', 'success');
    window.router.navigate('/connections');
  }
};
}
