import { getUserProfile } from '../main.js';
import { supabase } from '../lib/supabase.js';
import { router } from '../lib/router.js';
import { renderSidebar, setupSidebarHandlers } from '../components/sidebar.js';
import { renderHeader, setupHeaderHandlers } from '../components/header.js';
import { showToast } from '../utils/toast.js';
import { escapeHtml, safeImageUrl } from '../utils/html.js';
import { renderPageLoading } from '../components/loading.js';

export async function renderConnectionRequests() {
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
        ${renderHeader('Connection Requests')}
        <main class="page-main">
          <div class="container">
            ${renderPageLoading('Loading requests...')}
          </div>
        </main>
      </div>
    </div>
  `;
  setupSidebarHandlers();
  setupHeaderHandlers();

  const { data: connectionsData, error: connectionsError } = await supabase
    .from('connections')
    .select('id, requester_id, receiver_id, status')
    .or(`requester_id.eq.${profile.id},receiver_id.eq.${profile.id}`)
    .eq('status', 'pending');

  if (connectionsError) {
    console.error('Failed to load connection requests', connectionsError);
    return;
  }

  const pendingConnections = connectionsData || [];
  const received = pendingConnections.filter((c) => c.receiver_id === profile.id);
  const sent = pendingConnections.filter((c) => c.requester_id === profile.id);


  const requesterIds = Array.from(new Set(
    pendingConnections.map((c) => c.requester_id).filter(Boolean)
  ));

  const receiverIds = Array.from(new Set(
    pendingConnections.map((c) => c.receiver_id).filter(Boolean)
  ));

  const allProfileIds = Array.from(new Set([...requesterIds, ...receiverIds]));

  const { data: profilesData } = await supabase
    .from('profiles')
    .select('id, full_name, username, university, department, profile_image')
    .in('id', allProfileIds);

  const profilesById = new Map((profilesData || []).map((p) => [p.id, p]));

  const receivedWithProfiles = received.map((c) => ({
    ...c,
    profiles: profilesById.get(c.requester_id)
  }));

  const sentWithProfiles = sent.map((c) => ({
    ...c,
    profiles: profilesById.get(c.receiver_id)
  }));


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
                    ${receivedWithProfiles.length > 0
                      ? receivedWithProfiles.map((item) => renderRequestCard(item, 'received')).join('')
                      : '<p class="empty-text">No incoming requests yet.</p>'}
                  </div>

                </section>
                <section>
                  <h4>Sent</h4>
                  <div class="connections-list">
                    ${sentWithProfiles.length > 0
                      ? sentWithProfiles.map((item) => renderRequestCard(item, 'sent')).join('')
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
    <div class="connection-row card">
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
             <button class="btn btn-outline btn-sm" onclick="handleRequestAction('${request.id}', 'reject')">Decline</button>`
          : `<button class="btn btn-outline btn-sm" onclick="handleRequestAction('${request.id}', 'cancel')">Cancel</button>`}
      </div>
    </div>
  `;
}

if (typeof window !== 'undefined') {
  window.handleRequestAction = async (requestId, action) => {
  // Cancel sent request: remove the pending row.
  if (action === 'cancel') {
    const { error } = await supabase
      .from('connections')
      .delete()
      .eq('id', requestId)
      .eq('status', 'pending');

    if (error) {
      showToast('Unable to cancel that request right now.', 'error');
    } else {
      showToast('Request canceled.', 'success');
      window.router.navigate('/connection-requests');
    }
    return;
  }

  const status = action === 'accept' ? 'accepted' : 'rejected';
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
