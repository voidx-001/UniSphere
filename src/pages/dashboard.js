import { getUserProfile, refreshUserProfile } from '../main.js';
import { supabase } from '../lib/supabase.js';
import { router } from '../lib/router.js';
import { renderSidebar, setupSidebarHandlers } from '../components/sidebar.js';
import { renderHeader, setupHeaderHandlers } from '../components/header.js';
import { showToast } from '../utils/toast.js';
import { escapeHtml, safeImageUrl } from '../utils/html.js';
import { requestConnection } from '../utils/connections.js';

export async function renderDashboard() {
  const app = document.getElementById('app');
  const profile = await refreshUserProfile();

  const initials = profile?.full_name?.split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'U';

  // Fetch stats
  const stats = await fetchDashboardStats();

  // Fetch suggested students
  const suggestedStudents = await fetchSuggestedStudents();

  // Fetch recent students
  const recentStudents = await fetchRecentStudents();

  // Fetch pending connections
  const pendingRequests = await fetchPendingRequests();

  app.innerHTML = `
    <div class="dashboard-layout">
      ${renderSidebar()}

      <div class="main-content with-sidebar">
        ${renderSidebarOverlay()}
        ${renderHeader('Dashboard', true)}

        <main class="dashboard-main">
          <div class="container">
            <!-- Welcome Card -->
            <div class="welcome-card glass-card slide-up">
              <div class="welcome-content">
                <h2>Welcome back, ${escapeHtml(profile?.full_name?.split(' ')[0] || 'Student')}!</h2>
                <p>Connect with students across Pakistan and expand your network.</p>
              </div>
              <div class="welcome-avatar">
                <div class="avatar avatar-xl">
                  ${safeImageUrl(profile?.profile_image)
                    ? `<img src="${safeImageUrl(profile.profile_image)}" alt="${escapeHtml(profile.full_name)}">`
                    : `<span>${initials}</span>`
                  }
                </div>
              </div>
            </div>

            <!-- Stats Grid -->
            <div class="stats-grid slide-up" style="animation-delay: 0.1s">
              <div class="stat-card card">
                <div class="stat-icon" style="background: var(--primary-50); color: var(--primary-600);">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div class="stat-info">
                  <span class="stat-value">${stats.connections}</span>
                  <span class="stat-label">Connections</span>
                </div>
              </div>

              <div class="stat-card card">
                <div class="stat-icon" style="background: var(--accent-50); color: var(--accent-600);">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <div class="stat-info">
                  <span class="stat-value">${stats.messages}</span>
                  <span class="stat-label">Messages</span>
                </div>
              </div>

              <div class="stat-card card">
                <div class="stat-icon" style="background: var(--success-50); color: var(--success-600);">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                </div>
                <div class="stat-info">
                  <span class="stat-value">${stats.students}</span>
                  <span class="stat-label">Students</span>
                </div>
              </div>

              <div class="stat-card card">
                <div class="stat-icon" style="background: var(--warning-50); color: var(--warning-600);">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <div class="stat-info">
                  <span class="stat-value">${escapeHtml(profile?.university || 'University')}</span>
                  <span class="stat-label">Your University</span>
                </div>
              </div>
            </div>

            <!-- Main Content Grid -->
            <div class="dashboard-grid">
              <!-- Suggested Students -->
              <section class="dashboard-section slide-up" style="animation-delay: 0.2s">
                <div class="section-header">
                  <h3>Suggested Students</h3>
                  <a href="/search" class="btn btn-ghost btn-sm" onclick="navigateTo(event, '/search')">View All</a>
                </div>
                <div class="students-list">
                  ${suggestedStudents.length > 0
                    ? suggestedStudents.map(student => renderStudentCard(student)).join('')
                    : '<p class="empty-text">No suggestions available. Complete your profile for better matches!</p>'
                  }
                </div>
              </section>

              <!-- Recent Students -->
              <section class="dashboard-section slide-up" style="animation-delay: 0.3s">
                <div class="section-header">
                  <h3>Recently Joined</h3>
                  <a href="/search" class="btn btn-ghost btn-sm" onclick="navigateTo(event, '/search')">View All</a>
                </div>
                <div class="students-list">
                  ${recentStudents.length > 0
                    ? recentStudents.map(student => renderStudentCard(student)).join('')
                    : '<p class="empty-text">No recent students to show.</p>'
                  }
                </div>
              </section>

              <!-- Pending Requests -->
              ${pendingRequests.length > 0 ? `
                <section class="dashboard-section full-width slide-up" style="animation-delay: 0.4s">
                  <div class="section-header">
                    <h3>Connection Requests (${pendingRequests.length})</h3>
                  </div>
                  <div class="requests-list">
                    ${pendingRequests.map(req => renderRequestCard(req)).join('')}
                  </div>
                </section>
              ` : ''}
            </div>
          </div>
        </main>
      </div>
    </div>
  `;

  setupSidebarHandlers();
  setupHeaderHandlers();
}

function renderSidebarOverlay() {
  return `
    <div id="sidebar-overlay" class="sidebar-overlay hidden" onclick="closeSidebar()"></div>
    <style>
      .sidebar-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 99;
      }
    </style>
  `;
}

function renderStudentCard(student) {
  const initials = student.full_name?.split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'S';

  return `
    <div class="student-card card" onclick="viewProfile('${student.id}')">
      <div class="student-avatar avatar">
        ${safeImageUrl(student.profile_image)
          ? `<img src="${safeImageUrl(student.profile_image)}" alt="${escapeHtml(student.full_name)}">`
          : `<span>${initials}</span>`
        }
      </div>
      <div class="student-info">
        <h4 class="student-name">${escapeHtml(student.full_name)}</h4>
        <p class="student-meta">${escapeHtml(student.university)}</p>
        <p class="student-detail">${escapeHtml(student.department)} - Sem ${student.semester}</p>
      </div>
      <button class="btn btn-primary btn-sm" onclick="connectWith(event, '${student.id}')">Connect</button>
    </div>
  `;
}

function renderRequestCard(request) {
  const initials = request.profiles?.full_name?.split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'S';

  return `
    <div class="request-card card">
      <div class="request-user">
        <div class="student-avatar avatar">
          ${safeImageUrl(request.profiles?.profile_image)
            ? `<img src="${safeImageUrl(request.profiles.profile_image)}" alt="${escapeHtml(request.profiles.full_name)}">`
            : `<span>${initials}</span>`
          }
        </div>
        <div class="student-info">
          <h4 class="student-name">${escapeHtml(request.profiles?.full_name || 'Student')}</h4>
          <p class="student-meta">${escapeHtml(request.profiles?.university || '')}</p>
        </div>
      </div>
      <div class="request-actions">
        <button class="btn btn-primary btn-sm" onclick="acceptRequest(event, '${request.id}')">Accept</button>
        <button class="btn btn-secondary btn-sm" onclick="rejectRequest(event, '${request.id}')">Decline</button>
      </div>
    </div>
  `;
}

async function fetchDashboardStats() {
  const user = getUserProfile();
  if (!user) return { connections: 0, messages: 0, students: 0 };

  try {
    // Count connections
    const { count: connectionsCount } = await supabase
      .from('connections')
      .select('*', { count: 'exact', head: true })
      .or(`requester_id.eq.${user.id},receiver_id.eq.${user.id}`)
      .eq('status', 'accepted');

    // Count messages
    const { count: messagesCount } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('receiver_id', user.id)
      .eq('read', false);

    // Count total students
    const { count: studentsCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    return {
      connections: connectionsCount || 0,
      messages: messagesCount || 0,
      students: studentsCount || 0
    };
  } catch (e) {
    return { connections: 0, messages: 0, students: 0 };
  }
}

async function fetchSuggestedStudents() {
  const user = getUserProfile();
  if (!user) return [];

  try {
    const { data: existingConnections } = await supabase
      .from('connections')
      .select('requester_id, receiver_id')
      .or(`requester_id.eq.${user.id},receiver_id.eq.${user.id}`);

    const excludedIds = new Set([user.id]);
    for (const connection of existingConnections || []) {
      excludedIds.add(connection.requester_id);
      excludedIds.add(connection.receiver_id);
    }

    // Separate equality queries avoid PostgREST filter parsing problems for
    // university names containing commas.
    const [sameUniversity, sameDepartment] = await Promise.all([
      supabase.from('profiles').select('*').eq('university', user.university).limit(10),
      supabase.from('profiles').select('*').eq('department', user.department).limit(10)
    ]);

    const unique = new Map();
    for (const student of [...(sameUniversity.data || []), ...(sameDepartment.data || [])]) {
      if (!excludedIds.has(student.id)) unique.set(student.id, student);
    }

    return [...unique.values()].slice(0, 5);
  } catch (e) {
    return [];
  }
}

async function fetchRecentStudents() {
  const user = getUserProfile();
  if (!user) return [];

  try {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .neq('id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    return data || [];
  } catch (e) {
    return [];
  }
}

async function fetchPendingRequests() {
  const user = getUserProfile();
  if (!user) return [];

  try {
    const { data } = await supabase
      .from('connections')
      .select(`
        id,
        requester_id,
        profiles!connections_requester_id_fkey(id, full_name, university, profile_image)
      `)
      .eq('receiver_id', user.id)
      .eq('status', 'pending');

    return data || [];
  } catch (e) {
    return [];
  }
}

// Global handlers
window.viewProfile = (userId) => {
  router.navigate(`/profile?id=${userId}`);
};

window.connectWith = async (e, userId) => {
  e.stopPropagation();
  try {
    const status = await requestConnection(userId);
    showToast(
      status === 'accepted' ? 'You are already connected' : 'Connection request sent!',
      status === 'accepted' ? 'info' : 'success'
    );
  } catch {
    showToast('Failed to send connection request', 'error');
  }
};

window.acceptRequest = async (e, requestId) => {
  e.stopPropagation();

  const { error } = await supabase
    .from('connections')
    .update({ status: 'accepted' })
    .eq('id', requestId);

  if (error) {
    showToast('Failed to accept request', 'error');
  } else {
    showToast('Connection accepted!', 'success');
    router.navigate('/dashboard');
  }
};

window.rejectRequest = async (e, requestId) => {
  e.stopPropagation();

  const { error } = await supabase
    .from('connections')
    .update({ status: 'rejected' })
    .eq('id', requestId);

  if (error) {
    showToast('Failed to reject request', 'error');
  } else {
    router.navigate('/dashboard');
  }
};

window.navigateTo = (e, path) => {
  e.preventDefault();
  router.navigate(path);
};
