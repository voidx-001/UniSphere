import { getUserProfile, refreshUserProfile } from '../main.js';
import { supabase } from '../lib/supabase.js';
import { router } from '../lib/router.js';
import { renderSidebar, setupSidebarHandlers } from '../components/sidebar.js';
import { renderHeader, setupHeaderHandlers } from '../components/header.js';
import { showToast } from '../utils/toast.js';
import { escapeHtml, safeImageUrl } from '../utils/html.js';
import { requestConnection } from '../utils/connections.js';
import { renderPageLoading } from '../components/loading.js';

let currentProfileId = null;

export async function renderProfile(profileId = null) {
  const app = document.getElementById('app');
  const currentUser = getUserProfile();

  // Get profile ID from URL or show own profile
  const urlParams = new URLSearchParams(window.location.search);
  currentProfileId = profileId || urlParams.get('id') || currentUser?.id;

  if (!currentProfileId) {
    router.navigate('/login');
    return;
  }

  // Show loading state
  app.innerHTML = `
    <div class="dashboard-layout">
      ${renderSidebar()}
      <div class="main-content with-sidebar">
        <div id="sidebar-overlay" class="sidebar-overlay hidden" onclick="closeSidebar()"></div>
        ${renderHeader('Profile')}
        <main class="profile-main">
          <div class="container">
            ${renderPageLoading('Loading profile...')}
          </div>
        </main>
      </div>
    </div>
  `;
  setupSidebarHandlers();
  setupHeaderHandlers();

  // Fetch profile data
  const profile = await fetchProfile(currentProfileId);
  if (!profile) {
    app.innerHTML = `
      <div class="dashboard-layout">
        ${renderSidebar()}
        <div class="main-content with-sidebar">
          <div id="sidebar-overlay" class="sidebar-overlay hidden" onclick="closeSidebar()"></div>
          ${renderHeader('Profile')}
          <main class="profile-main">
            <div class="container">
              <div class="empty-state fade-in">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <h4>Profile not found</h4>
                <p>This student profile doesn't exist or has been removed.</p>
                <button class="btn btn-primary" onclick="window.router.navigate('/search')">Find Students</button>
              </div>
            </div>
          </main>
        </div>
      </div>
    `;
    setupSidebarHandlers();
    setupHeaderHandlers();
    return;
  }

  const isOwnProfile = currentUser?.id === profile.id;
  const connectionStatus = await checkConnectionStatus(currentUser?.id, profile.id);

  const initials = profile.full_name?.split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'S';

  app.innerHTML = `
    <div class="dashboard-layout">
      ${renderSidebar()}

      <div class="main-content with-sidebar">
        <div id="sidebar-overlay" class="sidebar-overlay hidden" onclick="closeSidebar()"></div>
        ${renderHeader(isOwnProfile ? 'My Profile' : 'Student Profile')}

        <main class="profile-main">
          <div class="container">
            <!-- Profile Header -->
            <div class="profile-header glass-card slide-up">
              <div class="profile-cover"></div>
              <div class="profile-content">
                <div class="profile-avatar-wrapper">
                  <div class="profile-avatar avatar-xl">
                    ${safeImageUrl(profile.profile_image)
                      ? `<img src="${safeImageUrl(profile.profile_image)}" alt="${escapeHtml(profile.full_name)}">`
                      : `<span>${initials}</span>`
                    }
                  </div>
                </div>
                <div class="profile-info">
                  <h1 class="profile-name">${escapeHtml(profile.full_name)}</h1>
                  <p class="profile-username">@${escapeHtml(profile.username)}</p>
                  <p class="profile-bio">${escapeHtml(profile.bio || 'No bio yet')}</p>
                  <div class="profile-meta">
                    <span class="meta-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                      ${escapeHtml(profile.university)}
                    </span>
                    <span class="meta-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
                        <path d="M22 12h-4"/>
                        <line x1="12" y1="2" x2="12" y2="6"/>
                        <path d="M12 12l4 2v-2a10 10 0 0 0-4 4"/>
                      </svg>
                      ${escapeHtml(profile.department)}
                    </span>
                    <span class="meta-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                      </svg>
                      Semester ${profile.semester}
                    </span>
                  </div>
                </div>
                <div class="profile-actions">
                  ${isOwnProfile ? `
                    <button class="btn btn-primary" onclick="window.router.navigate('/settings')">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                      Edit Profile
                    </button>
                  ` : `
                    <button class="btn btn-primary" id="connect-btn" onclick="handleConnection()">
                      ${getConnectionButtonText(connectionStatus)}
                    </button>
                    ${connectionStatus === 'accepted' ? `
                      <button class="btn btn-secondary" onclick="startChat('${profile.id}')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                        Message
                      </button>
                    ` : ''}
                  `}
                </div>
              </div>
            </div>

            <!-- Profile Details -->
            <div class="profile-details slide-up" style="animation-delay: 0.1s">
              <div class="details-grid">
                <div class="detail-card card">
                  <h3 class="detail-title">Academic Information</h3>
                  <div class="detail-list">
                    <div class="detail-item">
                      <span class="detail-label">University</span>
                      <span class="detail-value">${escapeHtml(profile.university)}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Department</span>
                      <span class="detail-value">${escapeHtml(profile.department)}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Semester</span>
                      <span class="detail-value">Semester ${profile.semester}</span>
                    </div>
                  </div>
                </div>

                <div class="detail-card card">
                  <h3 class="detail-title">Account Details</h3>
                  <div class="detail-list">
                    <div class="detail-item">
                      <span class="detail-label">Joined</span>
                      <span class="detail-value">${formatDate(profile.created_at)}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Username</span>
                      <span class="detail-value">@${escapeHtml(profile.username)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>

    <style>
      .sidebar-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 99;
      }

      .profile-main {
        padding: var(--space-6) 0;
        flex: 1;
      }

      .profile-header {
        position: relative;
        margin-bottom: var(--space-6);
        overflow: hidden;
      }

      .profile-cover {
        height: 120px;
        background: var(--gradient-primary);
      }

      @media (min-width: 768px) {
        .profile-cover {
          height: 180px;
        }
      }

      .profile-content {
        padding: 0 var(--space-6) var(--space-6);
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      @media (min-width: 768px) {
        .profile-content {
          flex-direction: row;
          text-align: left;
          align-items: flex-end;
          gap: var(--space-6);
        }
      }

      .profile-avatar-wrapper {
        margin-top: -48px;
        margin-bottom: var(--space-4);
      }

      @media (min-width: 768px) {
        .profile-avatar-wrapper {
          margin: 0;
          margin-top: -40px;
        }
      }

      .profile-avatar {
        border: 4px solid var(--bg-primary);
        box-shadow: var(--shadow-lg);
      }

      .profile-info {
        flex: 1;
      }

      .profile-name {
        font-size: var(--font-size-2xl);
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: var(--space-1);
      }

      .profile-username {
        color: var(--text-secondary);
        margin-bottom: var(--space-3);
      }

      .profile-bio {
        color: var(--text-secondary);
        margin-bottom: var(--space-4);
        max-width: 500px;
      }

      .profile-meta {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-4);
        justify-content: center;
      }

      @media (min-width: 768px) {
        .profile-meta {
          justify-content: flex-start;
        }
      }

      .meta-item {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        color: var(--text-tertiary);
        font-size: var(--font-size-sm);
      }

      .meta-item svg {
        color: var(--primary-500);
      }

      .profile-actions {
        display: flex;
        gap: var(--space-3);
        margin-top: var(--space-4);
      }

      .profile-details {
        margin-top: var(--space-6);
      }

      .details-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-6);
      }

      @media (min-width: 768px) {
        .details-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      .detail-card {
        padding: var(--space-6);
      }

      .detail-title {
        font-size: var(--font-size-lg);
        font-weight: 600;
        margin-bottom: var(--space-4);
        color: var(--text-primary);
      }

      .detail-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
      }

      .detail-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-3) 0;
        border-bottom: 1px solid var(--border-color);
      }

      .detail-item:last-child {
        border-bottom: none;
      }

      .detail-label {
        color: var(--text-tertiary);
        font-size: var(--font-size-sm);
      }

      .detail-value {
        color: var(--text-primary);
        font-weight: 500;
      }

      .empty-state {
        text-align: center;
        padding: var(--space-12) var(--space-4);
      }

      .empty-state svg {
        width: 64px;
        height: 64px;
        margin-bottom: var(--space-4);
        color: var(--text-muted);
      }

      .empty-state h4 {
        color: var(--text-secondary);
        margin-bottom: var(--space-2);
      }

      .empty-state p {
        color: var(--text-tertiary);
        margin-bottom: var(--space-4);
      }
    </style>
  `;

  setupSidebarHandlers();
  setupHeaderHandlers();
  setupProfileHandlers(currentUser, profile, connectionStatus);
}

async function fetchProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  return data;
}

async function checkConnectionStatus(currentUserId, profileId) {
  if (!currentUserId || !profileId || currentUserId === profileId) return null;

  const { data, error } = await supabase
    .from('connections')
    .select('status, requester_id')
    .or(`and(requester_id.eq.${currentUserId},receiver_id.eq.${profileId}),and(requester_id.eq.${profileId},receiver_id.eq.${currentUserId})`)
    .maybeSingle();

  if (!data) return 'none';
  return data.status;
}

function getConnectionButtonText(status) {
  switch (status) {
    case 'pending':
      return 'Request Pending';
    case 'accepted':
      return 'Connected';
    case 'rejected':
      return 'Connect';
    default:
      return 'Connect';
  }
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });
}

function setupProfileHandlers(currentUser, profile, connectionStatus) {
  window.handleConnection = async () => {
    if (!currentUser) {
      router.navigate('/login');
      return;
    }

    const btn = document.getElementById('connect-btn');

    if (connectionStatus === 'pending') {
      showToast('Connection request already pending', 'info');
      return;
    }

    if (connectionStatus === 'accepted') {
      showToast('Already connected', 'info');
      return;
    }

    try {
      const status = await requestConnection(profile.id);
      if (status === 'accepted') {
        showToast('Already connected', 'info');
        return;
      }
      showToast('Connection request sent!', 'success');
      btn.textContent = 'Request Pending';
      connectionStatus = 'pending';
    } catch {
      showToast('Failed to send request', 'error');
    }
  };

  window.startChat = (userId) => {
    router.navigate(`/messages?user=${userId}`);
  };
}
