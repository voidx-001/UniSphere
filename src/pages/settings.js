import { getUserProfile, refreshUserProfile } from '../main.js';
import { supabase } from '../lib/supabase.js';
import { router } from '../lib/router.js';
import { renderSidebar, setupSidebarHandlers } from '../components/sidebar.js';
import { renderHeader, setupHeaderHandlers } from '../components/header.js';
import { showToast } from '../utils/toast.js';
import { toggleTheme, getTheme } from '../utils/theme.js';
import { departments, semesters } from '../utils/academic-options.js';
import { loadUniversities } from '../utils/universities.js';
import { escapeHtml, safeImageUrl } from '../utils/html.js';

let selectedProfileImage = null;

export async function renderSettings() {
  const app = document.getElementById('app');
  const profile = await refreshUserProfile();
  const universities = await loadUniversities();

  if (!profile) {
    router.navigate('/login');
    return;
  }

  const initials = profile.full_name?.split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'U';

  const currentTheme = getTheme();

  app.innerHTML = `
    <div class="dashboard-layout">
      ${renderSidebar()}

      <div class="main-content with-sidebar">
        <div id="sidebar-overlay" class="sidebar-overlay hidden" onclick="closeSidebar()"></div>
        ${renderHeader('Settings')}

        <main class="settings-main">
          <div class="container">
            <!-- Settings Grid -->
            <div class="settings-grid">
              <!-- Profile Section -->
              <div class="settings-section slide-up">
                <div class="section-header">
                  <h3>Profile Settings</h3>
                  <p class="section-desc">Update your personal information</p>
                </div>

                <form id="profile-form" class="settings-form card">
                  <div class="form-group">
                    <label class="form-label">Profile Picture</label>
                    <div class="profile-upload">
                      <div class="profile-preview" id="profile-preview">
                        ${safeImageUrl(profile.profile_image)
                          ? `<img src="${safeImageUrl(profile.profile_image)}" alt="${escapeHtml(profile.full_name)}">`
                          : `<span>${initials}</span>`
                        }
                      </div>
                      <div class="upload-info">
                        <input type="file" id="profile-image" accept="image/jpeg,image/png" class="hidden">
                        <button type="button" class="btn btn-secondary" onclick="document.getElementById('profile-image').click()">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/>
                            <line x1="12" y1="3" x2="12" y2="15"/>
                          </svg>
                          Change Photo
                        </button>
                        <span class="upload-hint">JPG, PNG up to 2MB</span>
                      </div>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label" for="university">University</label>
                      <select id="university" class="form-input" required>
                        ${universities.map(u => `<option value="${u}" ${profile.university === u ? 'selected' : ''}>${u}</option>`).join('')}
                      </select>
                    </div>

                    <div class="form-group">
                      <label class="form-label" for="fullname">Full Name</label>
                      <input type="text" id="fullname" class="form-input" value="${escapeHtml(profile.full_name || '')}" required>
                    </div>

                    <div class="form-group">
                      <label class="form-label" for="username">Username</label>
                      <input type="text" id="username" class="form-input" value="${escapeHtml(profile.username || '')}" required>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label" for="bio">Bio</label>
                    <textarea id="bio" class="form-input" rows="3" maxlength="500" placeholder="Tell others about yourself...">${escapeHtml(profile.bio || '')}</textarea>
                    <span class="form-hint">Maximum 500 characters</span>
                  </div>

                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label" for="department">Department</label>
                      <select id="department" class="form-input">
                        ${departments.map(d => `<option value="${d}" ${profile.department === d ? 'selected' : ''}>${d}</option>`).join('')}
                      </select>
                    </div>

                    <div class="form-group">
                      <label class="form-label" for="semester">Semester</label>
                      <select id="semester" class="form-input">
                        ${semesters.map(s => `<option value="${s}" ${profile.semester === s ? 'selected' : ''}>Semester ${s}</option>`).join('')}
                      </select>
                    </div>
                  </div>

                  <div class="form-actions">
                    <button type="submit" class="btn btn-primary">
                      <span class="btn-text">Save Changes</span>
                      <span class="btn-loading hidden">
                        <span class="spinner"></span>
                        <span>Saving...</span>
                      </span>
                    </button>
                  </div>
                </form>
              </div>

              <!-- Security Section -->
              <div class="settings-section slide-up" style="animation-delay: 0.1s">
                <div class="section-header">
                  <h3>Security</h3>
                  <p class="section-desc">Manage your password and security settings</p>
                </div>

                <form id="password-form" class="settings-form card">
                  <div class="form-group">
                    <label class="form-label" for="current-password">Current Password</label>
                    <input type="password" id="current-password" class="form-input" placeholder="Enter current password">
                  </div>

                  <div class="form-group">
                    <label class="form-label" for="new-password">New Password</label>
                    <input type="password" id="new-password" class="form-input" placeholder="Enter new password">
                  </div>

                  <div class="form-group">
                    <label class="form-label" for="confirm-new-password">Confirm New Password</label>
                    <input type="password" id="confirm-new-password" class="form-input" placeholder="Confirm new password">
                  </div>

                  <div class="form-actions">
                    <button type="submit" class="btn btn-primary">
                      <span class="btn-text">Update Password</span>
                      <span class="btn-loading hidden">
                        <span class="spinner"></span>
                        <span>Updating...</span>
                      </span>
                    </button>
                  </div>
                </form>
              </div>

              <!-- Appearance Section -->
              <div class="settings-section slide-up" style="animation-delay: 0.2s">
                <div class="section-header">
                  <h3>Appearance</h3>
                  <p class="section-desc">Customize how UniSphere looks</p>
                </div>

                <div class="settings-form card">
                  <div class="theme-toggle">
                    <div class="theme-info">
                      <span class="theme-label">Dark Mode</span>
                      <span class="theme-desc">Switch between light and dark themes</span>
                    </div>
                    <button type="button" class="toggle-btn ${currentTheme === 'dark' ? 'active' : ''}" onclick="handleThemeToggle()">
                      <span class="toggle-slider"></span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Account Section -->
              <div class="settings-section slide-up" style="animation-delay: 0.3s">
                <div class="section-header">
                  <h3>Account</h3>
                  <p class="section-desc">Manage your account settings</p>
                </div>

                <div class="settings-form card">
                  <div class="account-info">
                    <div class="info-item">
                      <span class="info-label">Email Address</span>
                      <span class="info-value">${escapeHtml(profile.email || 'Not set')}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">University</span>
                      <span class="info-value">${escapeHtml(profile.university || 'Not set')}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Account Created</span>
                      <span class="info-value">${formatDate(profile.created_at)}</span>
                    </div>
                  </div>

                  <div class="danger-zone">
                    <h4 class="danger-title">Danger Zone</h4>
                    <button class="btn btn-outline" style="color: var(--error-600); border-color: var(--error-600);" onclick="handleLogout()">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                      </svg>
                      Sign Out
                    </button>
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

      .settings-main {
        padding: var(--space-6) 0;
        flex: 1;
      }

      .settings-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-6);
      }

      @media (min-width: 1024px) {
        .settings-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      .settings-section {
        margin-bottom: var(--space-6);
      }

      .section-header {
        margin-bottom: var(--space-4);
      }

      .section-header h3 {
        font-size: var(--font-size-lg);
        font-weight: 600;
        color: var(--text-primary);
      }

      .section-desc {
        color: var(--text-tertiary);
        font-size: var(--font-size-sm);
        margin-top: var(--space-1);
      }

      .settings-form {
        padding: var(--space-6);
      }

      .settings-form.card {
        margin-bottom: 0;
      }

      .form-row {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-4);
      }

      @media (min-width: 640px) {
        .form-row {
          grid-template-columns: 1fr 1fr;
        }
      }

      .profile-upload {
        display: flex;
        align-items: center;
        gap: var(--space-4);
      }

      .profile-preview {
        width: 80px;
        height: 80px;
        border-radius: var(--radius-full);
        background: var(--gradient-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        flex-shrink: 0;
        color: white;
        font-weight: 600;
        font-size: var(--font-size-xl);
      }

      .profile-preview img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .upload-info {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
      }

      .upload-hint {
        font-size: var(--font-size-xs);
        color: var(--text-muted);
      }

      .form-actions {
        margin-top: var(--space-6);
        padding-top: var(--space-4);
        border-top: 1px solid var(--border-color);
      }

      .btn-loading {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
      }

      .btn-loading .spinner {
        width: 16px;
        height: 16px;
      }

      /* Theme Toggle */
      .theme-toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--space-3) 0;
      }

      .theme-info {
        display: flex;
        flex-direction: column;
      }

      .theme-label {
        font-weight: 500;
        color: var(--text-primary);
      }

      .theme-desc {
        font-size: var(--font-size-sm);
        color: var(--text-tertiary);
      }

      .toggle-btn {
        position: relative;
        width: 52px;
        height: 28px;
        background: var(--bg-tertiary);
        border-radius: var(--radius-full);
        transition: background var(--transition-fast);
        cursor: pointer;
      }

      .toggle-btn.active {
        background: var(--primary-500);
      }

      .toggle-slider {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 24px;
        height: 24px;
        background: white;
        border-radius: var(--radius-full);
        transition: transform var(--transition-fast);
        box-shadow: var(--shadow-sm);
      }

      .toggle-btn.active .toggle-slider {
        transform: translateX(24px);
      }

      /* Account Info */
      .account-info {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
        margin-bottom: var(--space-6);
      }

      .info-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-3) 0;
        border-bottom: 1px solid var(--border-color);
      }

      .info-item:last-child {
        border-bottom: none;
      }

      .info-label {
        color: var(--text-tertiary);
        font-size: var(--font-size-sm);
      }

      .info-value {
        color: var(--text-primary);
        font-weight: 500;
      }

      /* Danger Zone */
      .danger-zone {
        padding-top: var(--space-4);
        border-top: 1px solid var(--border-color);
      }

      .danger-title {
        color: var(--error-600);
        font-size: var(--font-size-sm);
        font-weight: 600;
        margin-bottom: var(--space-3);
      }
    </style>
  `;

  setupSidebarHandlers();
  setupHeaderHandlers();
  setupSettingsHandlers(profile);
}

function setupSettingsHandlers(profile) {
  // Profile image upload
  const profileInput = document.getElementById('profile-image');
  profileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        showToast('Please choose a JPG or PNG image', 'error');
        e.target.value = '';
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        showToast('Image size should be less than 2MB', 'error');
        return;
      }

      selectedProfileImage = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = document.getElementById('profile-preview');
        preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
      };
      reader.readAsDataURL(file);
    }
  });

  // Profile form
  document.getElementById('profile-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = e.target.querySelector('.btn-primary');
    btn.disabled = true;
    btn.querySelector('.btn-text').classList.add('hidden');
    btn.querySelector('.btn-loading').classList.remove('hidden');

    try {
      const fullname = document.getElementById('fullname').value.trim();
      const username = document.getElementById('username').value.trim();
      const bio = document.getElementById('bio').value.trim();
      const university = document.getElementById('university').value;
      const department = document.getElementById('department').value;
      const semester = parseInt(document.getElementById('semester').value);

      if (fullname.length < 2 || !/^[A-Za-z0-9_]{3,30}$/.test(username)) {
        showToast('Enter a valid name and a 3–30 character username', 'error');
        return;
      }

      if (bio.length > 500) {
        showToast('Bio must be 500 characters or fewer', 'error');
        return;
      }

      // Upload profile image if changed
      let profileImageUrl = profile.profile_image;
      if (selectedProfileImage) {
        const fileExt = selectedProfileImage.type === 'image/png' ? 'png' : 'jpg';
        const fileName = `${profile.id}/avatar.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('profile-images')
          .upload(fileName, selectedProfileImage, { upsert: true });

        if (!uploadError) {
          const { data: urlData } = supabase.storage
            .from('profile-images')
            .getPublicUrl(fileName);
          profileImageUrl = urlData.publicUrl;
        }
      }

      // Update profile
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullname,
          username,
          bio,
          university,
          department,
          semester,
          profile_image: profileImageUrl
        })
        .eq('id', profile.id);

      if (error) {
        showToast(error.message, 'error');
      } else {
        showToast('Profile updated successfully!', 'success');
        await refreshUserProfile();
      }
    } catch (err) {
      showToast('Failed to update profile', 'error');
    } finally {
      btn.disabled = false;
      btn.querySelector('.btn-text').classList.remove('hidden');
      btn.querySelector('.btn-loading').classList.add('hidden');
    }
  });

  // Password form
  document.getElementById('password-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-new-password').value;

    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast('Please fill in all password fields', 'error');
      return;
    }

    if (newPassword.length < 8) {
      showToast('New password must be at least 8 characters', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }

    const btn = e.target.querySelector('.btn-primary');
    btn.disabled = true;
    btn.querySelector('.btn-text').classList.add('hidden');
    btn.querySelector('.btn-loading').classList.remove('hidden');

    try {
      const { error: reauthError } = await supabase.auth.signInWithPassword({
        email: profile.email,
        password: currentPassword
      });

      if (reauthError) {
        showToast('Current password is incorrect', 'error');
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        showToast(error.message, 'error');
      } else {
        showToast('Password updated successfully!', 'success');
        document.getElementById('password-form').reset();
      }
    } catch (err) {
      showToast('Failed to update password', 'error');
    } finally {
      btn.disabled = false;
      btn.querySelector('.btn-text').classList.remove('hidden');
      btn.querySelector('.btn-loading').classList.add('hidden');
    }
  });

  // Theme toggle
  window.handleThemeToggle = () => {
    const newTheme = toggleTheme();
    const toggleBtn = document.querySelector('.toggle-btn');
    if (newTheme === 'dark') {
      toggleBtn?.classList.add('active');
    } else {
      toggleBtn?.classList.remove('active');
    }
  };

  // Logout
  window.handleLogout = async () => {
    await supabase.auth.signOut();
    showToast('Logged out successfully', 'success');
    router.navigate('/');
  };
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}
