import { getUserProfile } from '../main.js';
import { supabase } from '../lib/supabase.js';
import { router } from '../lib/router.js';
import { renderSidebar, setupSidebarHandlers } from '../components/sidebar.js';
import { renderHeader, setupHeaderHandlers } from '../components/header.js';
import { showToast } from '../utils/toast.js';
import { escapeHtml, safeImageUrl } from '../utils/html.js';

export async function renderConnectionRequests() {
  const app = document.getElementById('app');
  const profile = getUserProfile();

  if (!profile) {
    router.navigate('/login');
    return;
  }

  const { data, error } = await supabase
    .from('connections')
    .select(`
      id,
      requester_id,
      receiver_id,
      status,
      profiles!connections_requester_id_fkey(id, full_name, username, university, department, profile_image)
    `)
    .or(`requester_id.eq.${profile.id},receiver_id.eq.${profile.id}`)
    .in('status', ['pending']);

  const received = (data || []).filter((item) => item.receiver_id === profile.id);
  const sent = (data || []).filter((item) => item.requester_id === profile.id);

  app.innerHTML = `
    <div class="dashboard-layout">
      ${renderSidebar()}
      <div class="main-content with-sidebar">
        <div id="sidebar-overlay" class="sidebar-overlay hidden" onclick="closeSidebar()"></div>
        ${renderHeader('Connection Requests')}
        <main class="page-main">
          <div class="container">
            <div class="page-card glass-card slide-up">
              <div class="section-header">
                <div>
                  <h3>Connection Requests</h3>
                  <p class="section-subtitle">Manage incoming and outgoing requests.</p>
                </div>
              </div>
              <div class="request-sections">
                <section>
                  <h4>Received</h4>
                  <div class="connections-list">
                    ${received.length > 0
                      ? received.map((item) => renderRequestCard(item, 'received')).join('')
                      : '<p class="empty-text">No incoming requests yet.</p>'}
                  </div>
                </section>
                <section>
                  <h4>Sent</h4>
                  <div class="connections-list">
                    ${sent.length > 0
                      ? sent.map((item) => renderRequestCard(item, 'sent')).join('')
                      : '<p class="empty-text">No outgoing requests yet.</p>'}
                  </div>
                </section>
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

function renderRequestCard(request, kind) {
  const profile = request.profiles;
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
        ${kind === 'received'
          ? `<button class="btn btn-primary btn-sm" onclick="handleRequestAction('${request.id}', 'accept')">Accept</button>
             <button class="btn btn-ghost btn-sm" onclick="handleRequestAction('${request.id}', 'reject')">Reject</button>`
          : `<button class="btn btn-ghost btn-sm" onclick="handleRequestAction('${request.id}', 'cancel')">Cancel</button>`}
      </div>
    </div>
  `;
}

if (typeof window !== 'undefined') {
  window.handleRequestAction = async (requestId, action) => {
  const status = action === 'accept' ? 'accepted' : action === 'reject' ? 'rejected' : 'rejected';
  const { error } = await supabase
    .from('connections')
    .update({ status })
    .eq('id', requestId);

  if (error) {
    showToast('Unable to update that request right now.', 'error');
  } else {
    showToast(action === 'accept' ? 'Connection accepted.' : 'Request updated.', 'success');
    window.router.navigate('/connection-requests');
  }
};
}
