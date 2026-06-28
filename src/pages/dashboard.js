import { getCurrentUser, getUserProfile, refreshUserProfile } from '../main.js';
import { supabase } from '../lib/supabase.js';
import { router } from '../lib/router.js';
import { renderSidebar, setupSidebarHandlers } from '../components/sidebar.js';
import { renderHeader, setupHeaderHandlers } from '../components/header.js';
import { showToast } from '../utils/toast.js';
import { escapeHtml, safeImageUrl } from '../utils/html.js';
import { requestConnection } from '../utils/connections.js';
import { loadUniversities } from '../utils/universities.js';
import { departments, semesters } from '../utils/academic-options.js';
import { fetchPostsWithUserLike, createPost, toggleLike } from '../utils/posts.js';

export async function renderDashboard() {
  const app = document.getElementById('app');
  const profile = await refreshUserProfile();

  const initials = profile?.full_name?.split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'U';

  const firstName = profile?.full_name?.split(' ')[0] || 'Student';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  const upcomingEvents = [
    {
      title: 'Campus Career Fair',
      date: 'July 10',
      location: profile?.university || 'Main Auditorium'
    },
    {
      title: 'Study Group Mixer',
      date: 'July 18',
      location: 'Learning Commons'
    }
  ];

  // Fetch stats
  const stats = await fetchDashboardStats();

  // Fetch suggested students
  const suggestedStudents = await fetchSuggestedStudents();

  // Fetch recent students
  const recentStudents = await fetchRecentStudents();

  // Fetch pending connections
  const pendingRequests = await fetchPendingRequests();

  // Fetch campus feed posts
  const feedPosts = await fetchFeedPosts(profile);

  const onboardingPending = window.localStorage.getItem('profile-onboarding-pending') === 'true';
  const universities = await loadUniversities();

  app.innerHTML = `
    <div class="dashboard-layout">
      ${renderSidebar()}

      <div class="main-content with-sidebar">
        ${renderSidebarOverlay()}
        ${renderHeader('Dashboard', true)}

        <main class="dashboard-main">
          <div class="container container-feed">

            <section class="home-top slide-up">
              <div class="welcome-banner">
                <div class="welcome-banner-content">
                  <div class="welcome-banner-text">
                    <p class="welcome-label">${greeting}, ${escapeHtml(firstName)} 👋</p>
                    <h2>Your campus feed</h2>
                    <p class="welcome-subtitle">See what students are sharing, discover peers, and grow your network.</p>
                  </div>
                  <button class="welcome-avatar-btn" onclick="window.router.navigate('/profile')" aria-label="View profile">
                    <div class="avatar avatar-xl">
                      ${safeImageUrl(profile?.profile_image)
                        ? `<img src="${safeImageUrl(profile.profile_image)}" alt="${escapeHtml(profile.full_name)}">`
                        : `<span>${initials}</span>`
                      }
                    </div>
                  </button>
                </div>
                <button class="home-search-bar" onclick="window.router.navigate('/discover')">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                  </svg>
                  <span>Search students, universities, departments...</span>
                </button>
              </div>

              <div class="stats-row">
                ${renderStatCard('Connections', stats.connections, '/connections', 'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M8.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z M20 8v6 M23 11h-6')}
                ${renderStatCard('Messages', stats.messages, '/messages', 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z')}
                ${renderStatCard('Students', stats.students, '/discover', 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75')}
                ${renderStatCard('Requests', pendingRequests.length, '/connection-requests', 'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M8.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z M20 8v6 M23 11h-6')}
              </div>
            </section>

            <section class="stories-bar slide-up" style="animation-delay: 0.05s">
              <div class="stories-track">
                <button class="story-card story-card-add" onclick="window.router.navigate('/edit-profile')">
                  <span class="story-ring story-ring-add">
                    <span class="story-avatar story-avatar-add">+</span>
                  </span>
                  <span class="story-name">You</span>
                </button>
                ${[...suggestedStudents, ...recentStudents].slice(0, 8).map((student, i) => renderStoryCard(student, i)).join('')}
              </div>
            </section>

            <nav class="shortcut-bar slide-up" style="animation-delay: 0.1s" aria-label="Quick shortcuts">
              ${renderShortcut('Discover', '/discover', 'M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z')}
              ${renderShortcut('Messages', '/messages', 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z')}
              ${renderShortcut('Connections', '/connections', 'M12 4.354a4 4 0 1 1 0 5.292M15 21H3v-1a6 6 0 0 1 12 0v1zm0 0h6v-1a6 6 0 0 0-9-5.197')}
              ${renderShortcut('Profile', '/edit-profile', 'M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5m-1.414-9.414a2 2 0 1 1 2.828 2.828L11.828 15H9v-2.828l8.586-8.586z')}
            </nav>

            ${onboardingPending ? `
              <div class="onboarding-modal-overlay" id="profile-onboarding-modal">
                <div class="onboarding-modal glass-card scale-up">
                  <div class="modal-header">
                    <div>
                      <span class="modal-badge">Finish setup</span>
                      <h2>Complete your profile</h2>
                      <p class="modal-subtitle">Add the details that make your UniSphere profile feel complete.</p>
                    </div>
                    <button class="modal-close" id="onboarding-close" type="button" aria-label="Close onboarding prompt">×</button>
                  </div>

                  <div class="onboarding-steps">
                    <div class="step active">
                      <span>1</span>
                      <div>
                        <strong>Profile details</strong>
                        <p>Make it easier for classmates to find you.</p>
                      </div>
                    </div>
                    <div class="step">
                      <span>2</span>
                      <div>
                        <strong>Start connecting</strong>
                        <p>Search peers and send requests instantly.</p>
                      </div>
                    </div>
                  </div>

                  <form id="onboarding-form" class="onboarding-form">
                    <div class="form-row">
                      <div class="form-group">
                        <label class="form-label" for="onboarding-university">University *</label>
                        <select id="onboarding-university" name="university" class="form-input" required>
                          <option value="">Select your university</option>
                          ${universities.map(u => `<option value="${u}">${u}</option>`).join('')}
                        </select>
                      </div>
                      <div class="form-group">
                        <label class="form-label" for="onboarding-department">Department *</label>
                        <select id="onboarding-department" name="department" class="form-input" required>
                          <option value="">Select department</option>
                          ${departments.map(d => `<option value="${d}">${d}</option>`).join('')}
                        </select>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group">
                        <label class="form-label" for="onboarding-semester">Semester *</label>
                        <select id="onboarding-semester" name="semester" class="form-input" required>
                          <option value="">Select semester</option>
                          ${semesters.map(s => `<option value="${s}">Semester ${s}</option>`).join('')}
                        </select>
                      </div>
                      <div class="form-group">
                        <label class="form-label" for="onboarding-bio">Short Bio</label>
                        <textarea id="onboarding-bio" name="bio" class="form-input" rows="2" maxlength="500" placeholder="Tell people what you’re into"></textarea>
                      </div>
                    </div>
                    <div class="form-actions">
                      <button type="submit" class="btn btn-primary">Save profile</button>
                      <button type="button" class="btn btn-ghost" id="onboarding-skip">Not right now</button>
                    </div>
                  </form>
                </div>
              </div>
            ` : ''}

            <div class="dashboard-grid">
              <div class="feed-column">
                ${renderPostComposer(profile, initials)}

                <section class="feed-section slide-up" style="animation-delay: 0.15s">
                  <div class="section-header">
                    <div>
                      <h3>Campus feed</h3>
                      <p class="section-subtitle">Updates from students in your network</p>
                    </div>
                    <a href="/discover" class="btn btn-ghost btn-sm" onclick="navigateTo(event, '/discover')">Discover</a>
                  </div>
                  <div class="feed-list" id="feed-list">
                    ${feedPosts.length > 0
                      ? feedPosts.map((post, i) => renderFeedPost(post, i)).join('')
                      : renderEmptyFeed()
                    }
                  </div>
                </section>

                <section class="events-section slide-up" style="animation-delay: 0.2s">
                  <div class="section-header">
                    <div>
                      <h3>Campus events</h3>
                      <p class="section-subtitle">What's happening near you</p>
                    </div>
                  </div>
                  <div class="events-list">
                    ${upcomingEvents.map(event => renderEventCard(event)).join('')}
                  </div>
                </section>
              </div>

              <aside class="sidebar-panel slide-up" style="animation-delay: 0.25s">
                ${pendingRequests.length > 0 ? `
                  <section class="panel-card">
                    <div class="section-header">
                      <h3>Connection requests</h3>
                      <span class="badge-count">${pendingRequests.length}</span>
                    </div>
                    <div class="requests-list requests-list-stack">
                      ${pendingRequests.map(req => renderRequestCard(req)).join('')}
                    </div>
                  </section>
                ` : ''}

                <section class="panel-card">
                  <div class="section-header">
                    <h3>People you may know</h3>
                    <a href="/discover" class="btn btn-ghost btn-sm" onclick="navigateTo(event, '/discover')">See all</a>
                  </div>
                  <div class="people-list">
                    ${suggestedStudents.length > 0
                      ? suggestedStudents.map(student => renderPeopleRow(student)).join('')
                      : '<p class="empty-text">Complete your profile for better suggestions.</p>'
                    }
                  </div>
                </section>

                <section class="panel-card">
                  <div class="section-header">
                    <h3>Recently joined</h3>
                  </div>
                  <div class="people-list">
                    ${recentStudents.length > 0
                      ? recentStudents.slice(0, 4).map(student => renderPeopleRow(student)).join('')
                      : '<p class="empty-text">No new students yet.</p>'
                    }
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  `;

  setupSidebarHandlers();
  setupHeaderHandlers();
  setupComposer();
  if (onboardingPending) {
    setTimeout(() => {
      document.getElementById('profile-onboarding-modal')?.classList.add('visible');
    }, 300);
    setupOnboardingForm();
  }
}

function setupOnboardingForm() {
  const form = document.getElementById('onboarding-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const university = formData.get('university');
    const department = formData.get('department');
    const semester = formData.get('semester');
    const bio = formData.get('bio') || '';

    const userId = getCurrentUser()?.id;
    if (!userId) {
      showToast('Your session is still loading. Please try again in a moment.', 'error');
      return;
    }

    const { data, error } = await supabase
      .from('profiles')
      .update({ university, department, semester: Number(semester), bio })
      .eq('id', userId)
      .select()
      .maybeSingle();

    if (error || !data) {
      showToast(error?.message || 'Unable to save your profile right now.', 'error');
      return;
    }

    window.localStorage.removeItem('profile-onboarding-pending');
    window.localStorage.setItem('profile-onboarding-complete', 'true');
    showToast('Profile details saved. You’re all set!', 'success');
    await refreshUserProfile();
    document.getElementById('profile-onboarding-modal')?.remove();
  });

  document.getElementById('onboarding-close')?.addEventListener('click', hideOnboardingModal);
  document.getElementById('onboarding-skip')?.addEventListener('click', hideOnboardingModal);
}

function hideOnboardingModal() {
  document.getElementById('profile-onboarding-modal')?.remove();
  window.localStorage.removeItem('profile-onboarding-pending');
  window.localStorage.setItem('profile-onboarding-complete', 'true');
}

function renderStatCard(label, value, path, iconPath) {
  return `
    <button class="stat-pill" onclick="navigateTo(event, '${path}')">
      <span class="stat-pill-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="${iconPath}"/>
        </svg>
      </span>
      <span class="stat-pill-value">${value}</span>
      <span class="stat-pill-label">${label}</span>
    </button>
  `;
}

function renderShortcut(label, path, iconPath) {
  return `
    <button type="button" class="shortcut-chip" onclick="navigateTo(event, '${path}')">
      <span class="shortcut-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="${iconPath}"/>
        </svg>
      </span>
      <span>${label}</span>
    </button>
  `;
}

function renderStoryCard(student, index) {
  const initials = student.full_name?.split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'S';
  const colors = ['#3b82f6', '#a855f7', '#22c55e', '#f59e0b', '#ef4444', '#06b6d4'];
  const ringColor = colors[index % colors.length];

  return `
    <button class="story-card" onclick="viewProfile('${student.id}')">
      <span class="story-ring" style="--story-color: ${ringColor}">
        <span class="story-avatar">
          ${safeImageUrl(student.profile_image)
            ? `<img src="${safeImageUrl(student.profile_image)}" alt="${escapeHtml(student.full_name)}">`
            : `<span>${initials}</span>`
          }
        </span>
      </span>
      <span class="story-name">${escapeHtml((student.full_name || 'Student').split(' ')[0])}</span>
    </button>
  `;
}

function renderPostComposer(profile, initials) {
  return `
    <div class="post-composer social-composer slide-up" style="animation-delay: 0.12s">
      <div class="composer-header">
        <div class="composer-avatar">
          ${safeImageUrl(profile?.profile_image)
            ? `<img src="${safeImageUrl(profile.profile_image)}" alt="${escapeHtml(profile?.full_name || '')}">`
            : `<span>${initials}</span>`
          }
        </div>
        <button type="button" class="composer-trigger" id="composer-trigger">
          What's on your mind, ${escapeHtml((profile?.full_name || 'Student').split(' ')[0])}?
        </button>
      </div>
      <div class="composer-toolbar">
        <button type="button" class="composer-tool" onclick="navigateTo(event, '/edit-profile')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          Update bio
        </button>
        <button type="button" class="composer-tool" onclick="navigateTo(event, '/discover')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          Find peers
        </button>
        <button type="button" class="composer-tool" onclick="navigateTo(event, '/messages')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Message
        </button>
      </div>
      <div class="composer-expanded hidden" id="composer-expanded">
        <textarea id="composer-text" class="form-input" rows="3" maxlength="500" placeholder="Share an update with your campus network..."></textarea>
        <div class="composer-actions">
          <button type="button" class="btn btn-ghost btn-sm" id="composer-cancel">Cancel</button>
          <button type="button" class="btn btn-primary btn-sm" id="composer-post">Post update</button>
        </div>
      </div>
    </div>
  `;
}

function renderPeopleRow(student) {
  const initials = student.full_name?.split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'S';

  return `
    <div class="people-row">
      <button class="people-row-main" onclick="viewProfile('${student.id}')">
        <div class="people-avatar">
          ${safeImageUrl(student.profile_image)
            ? `<img src="${safeImageUrl(student.profile_image)}" alt="${escapeHtml(student.full_name)}">`
            : `<span>${initials}</span>`
          }
        </div>
        <div class="people-info">
          <strong>${escapeHtml(student.full_name)}</strong>
          <span>${escapeHtml(student.university || 'University')}</span>
        </div>
      </button>
      <button class="btn btn-primary btn-sm" onclick="connectWith(event, '${student.id}')">Connect</button>
    </div>
  `;
}

function setupComposer() {
  const trigger = document.getElementById('composer-trigger');
  const expanded = document.getElementById('composer-expanded');
  const cancel = document.getElementById('composer-cancel');
  const post = document.getElementById('composer-post');
  const textarea = document.getElementById('composer-text');

  trigger?.addEventListener('click', () => {
    expanded?.classList.remove('hidden');
    trigger.classList.add('hidden');
    textarea?.focus();
  });

  cancel?.addEventListener('click', () => {
    expanded?.classList.add('hidden');
    trigger?.classList.remove('hidden');
    if (textarea) textarea.value = '';
  });

  post?.addEventListener('click', async () => {
    const text = textarea?.value.trim();
    if (!text) {
      showToast('Write something before posting.', 'error');
      return;
    }

    const submitBtn = post;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Posting...';

    try {
      await createPost(text);
      window.localStorage.removeItem('profile-onboarding-pending');
      window.localStorage.setItem('profile-onboarding-complete', 'true');
      showToast('Posted to campus feed!', 'success');
      router.navigate('/dashboard');
    } catch (err) {
      showToast(err.message || 'Unable to post right now.', 'error');
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Post update';
    }
  });
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

function renderFeedPost(post, index = 0) {
  const initials = post.author_name?.split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'S';

  const timeAgo = formatTimeAgo(post.created_at);
  const likeClass = post.is_liked ? 'post-action-btn active' : 'post-action-btn';
  const likeText = post.is_liked ? 'Liked' : 'Like';

  return `
    <article class="post-card social-post" data-post-id="${post.id}">
      <header class="post-header">
        <button class="post-author" onclick="viewProfile('${post.user_id}')">
          <div class="composer-avatar">
            ${safeImageUrl(post.author_profile_image)
              ? `<img src="${safeImageUrl(post.author_profile_image)}" alt="${escapeHtml(post.author_name)}">`
              : `<span>${initials}</span>`
            }
          </div>
          <div class="post-author-info">
            <strong>${escapeHtml(post.author_name)}</strong>
            <span class="post-meta">@${escapeHtml(post.author_username || 'student')} · ${escapeHtml(post.author_university || 'University')}</span>
          </div>
        </button>
        <span class="post-time">${timeAgo}</span>
      </header>
      <div class="post-content">${escapeHtml(post.content)}</div>
      <div class="post-stats">${post.likes_count || 0} likes · ${post.comments_count || 0} comments</div>
      <footer class="post-actions">
        <button type="button" class="${likeClass}" onclick="togglePostLike(event, '${post.id}')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${post.is_liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          ${likeText}
        </button>
        <button type="button" class="post-action-btn" onclick="openPostComments('${post.id}')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Comment
        </button>
        <button type="button" class="post-action-btn" onclick="connectWith(event, '${post.user_id}')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
          Connect
        </button>
      </footer>
    </article>
  `;
}

function renderEventCard(event) {
  return `
    <div class="event-card social-event">
      <div class="event-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      </div>
      <div class="event-info">
        <strong>${escapeHtml(event.title)}</strong>
        <p class="event-meta">${escapeHtml(event.date)} · ${escapeHtml(event.location)}</p>
      </div>
      <button class="btn btn-outline btn-sm" type="button">Interested</button>
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

async function fetchFeedPosts(profile) {
  if (!profile) return [];

  try {
    return await fetchPostsWithUserLike(profile.id, 50);
  } catch (e) {
    console.warn('Failed to load feed posts:', e.message || e);
    return [];
  }
}

function renderEmptyFeed() {
  return `
    <div class="empty-state-card">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      <p>No posts yet. Be the first to share something with your campus!</p>
      <button class="btn btn-primary btn-sm" onclick="document.getElementById('composer-trigger')?.click()">Create a post</button>
    </div>
  `;
}

function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Global handlers
if (typeof window !== 'undefined') {
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

  window.togglePostLike = async (e, postId) => {
    e.stopPropagation();
    const btn = e.currentTarget;
    btn.disabled = true;

    try {
      const isLiked = await toggleLike(postId);
      const card = btn.closest('.post-card');
      const stats = card?.querySelector('.post-stats');
      const currentLikes = parseInt(stats?.textContent || '0', 10);
      const newLikes = isLiked ? currentLikes + 1 : Math.max(0, currentLikes - 1);
      const currentComments = stats?.textContent.match(/(\d+) comments/)?.[1] || '0';
      if (stats) stats.textContent = `${newLikes} likes · ${currentComments} comments`;

      btn.classList.toggle('active', isLiked);
      btn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="${isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        ${isLiked ? 'Liked' : 'Like'}
      `;
    } catch {
      showToast('Unable to like post.', 'error');
    } finally {
      btn.disabled = false;
    }
  };

  window.openPostComments = (postId) => {
    router.navigate(`/post?id=${postId}`);
  };
}
