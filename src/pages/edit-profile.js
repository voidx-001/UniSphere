import { refreshUserProfile, getUserProfile } from '../main.js';
import { supabase } from '../lib/supabase.js';
import { router } from '../lib/router.js';
import { renderSidebar, setupSidebarHandlers } from '../components/sidebar.js';
import { renderHeader, setupHeaderHandlers } from '../components/header.js';
import { showToast } from '../utils/toast.js';
import { loadUniversities } from '../utils/universities.js';
import { departments, semesters } from '../utils/academic-options.js';
import { escapeHtml, safeImageUrl } from '../utils/html.js';

export async function renderEditProfile() {
  const app = document.getElementById('app');
  const profile = await refreshUserProfile();
  const universities = await loadUniversities();

  if (!profile) {
    router.navigate('/login');
    return;
  }

  const initials = profile.full_name?.split(' ')
    .map((name) => name[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'U';

  app.innerHTML = `
    <div class="dashboard-layout">
      ${renderSidebar()}
      <div class="main-content with-sidebar">
        <div id="sidebar-overlay" class="sidebar-overlay hidden" onclick="closeSidebar()"></div>
        ${renderHeader('Edit Profile')}
        <main class="page-main">
          <div class="container">
            <div class="page-card glass-card slide-up">
              <div class="section-header">
                <div>
                  <h3>Edit Profile</h3>
                  <p class="section-subtitle">Keep your academic profile current and discoverable.</p>
                </div>
              </div>
              <form id="edit-profile-form" class="settings-form">
                <div class="form-group">
                  <label class="form-label">Profile Picture</label>
                  <div class="profile-upload">
                    <div class="profile-preview">
                      ${safeImageUrl(profile.profile_image)
                        ? `<img src="${safeImageUrl(profile.profile_image)}" alt="${escapeHtml(profile.full_name)}">`
                        : `<span>${initials}</span>`}
                    </div>
                    <div class="upload-info">
                      <span class="upload-hint">Profile photos will appear in your cards and profile page.</span>
                    </div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label" for="edit-full-name">Name</label>
                    <input id="edit-full-name" class="form-input" value="${escapeHtml(profile.full_name || '')}" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="edit-username">Username</label>
                    <input id="edit-username" class="form-input" value="${escapeHtml(profile.username || '')}" required>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label" for="edit-bio">Bio</label>
                  <textarea id="edit-bio" class="form-input" rows="3" maxlength="500">${escapeHtml(profile.bio || '')}</textarea>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label" for="edit-university">University</label>
                    <select id="edit-university" class="form-input">
                      ${universities.map((university) => `<option value="${university}" ${profile.university === university ? 'selected' : ''}>${university}</option>`).join('')}
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="edit-department">Department</label>
                    <select id="edit-department" class="form-input">
                      ${departments.map((department) => `<option value="${department}" ${profile.department === department ? 'selected' : ''}>${department}</option>`).join('')}
                    </select>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label" for="edit-semester">Semester</label>
                    <select id="edit-semester" class="form-input">
                      ${semesters.map((semester) => `<option value="${semester}" ${Number(profile.semester) === Number(semester) ? 'selected' : ''}>Semester ${semester}</option>`).join('')}
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="edit-interests">Interests</label>
                    <input id="edit-interests" class="form-input" value="${escapeHtml(profile.interests || '')}">
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label" for="edit-skills">Skills</label>
                  <input id="edit-skills" class="form-input" value="${escapeHtml(profile.skills || '')}">
                </div>
                <div class="form-actions">
                  <button type="submit" class="btn btn-primary">Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  `;

  setupSidebarHandlers();
  setupHeaderHandlers();

  document.getElementById('edit-profile-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
      full_name: document.getElementById('edit-full-name').value.trim(),
      username: document.getElementById('edit-username').value.trim(),
      bio: document.getElementById('edit-bio').value.trim(),
      university: document.getElementById('edit-university').value,
      department: document.getElementById('edit-department').value,
      semester: Number(document.getElementById('edit-semester').value),
      interests: document.getElementById('edit-interests').value.trim(),
      skills: document.getElementById('edit-skills').value.trim()
    };

    const { error } = await supabase
      .from('profiles')
      .update(formData)
      .eq('id', profile.id);

    if (error) {
      showToast('Unable to save your profile right now.', 'error');
      return;
    }

    await refreshUserProfile();
    showToast('Profile updated.', 'success');
    router.navigate('/profile');
  });
}
