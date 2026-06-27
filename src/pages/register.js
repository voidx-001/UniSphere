import { router } from '../lib/router.js';
import { supabase } from '../lib/supabase.js';
import { showToast } from '../utils/toast.js';
import { loadUniversities } from '../utils/universities.js';
import { departments, semesters } from '../utils/academic-options.js';

let selectedProfileImage = null;

export async function renderRegister() {
  const app = document.getElementById('app');
  const universityOptions = await loadUniversities();

  app.innerHTML = `
    <div class="auth-page">
      <div class="auth-container">
        <div class="auth-header">
          <a href="/" class="auth-logo">
            <div class="logo-icon">
              <svg viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" stroke="url(#grad)" stroke-width="2"/>
                <circle cx="10" cy="12" r="3" fill="url(#grad)"/>
                <circle cx="22" cy="12" r="3" fill="url(#grad)"/>
                <circle cx="16" cy="21" r="3" fill="url(#grad)"/>
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#3b82f6"/>
                    <stop offset="100%" style="stop-color:#a855f7"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span>UniSphere</span>
          </a>
          <h1 class="auth-title">Create Account</h1>
          <p class="auth-subtitle">Join the student network across Pakistan</p>
        </div>

        <form id="register-form" class="auth-form">
          <div class="form-section">
            <h3 class="form-section-title">Basic Information</h3>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="fullname">Full Name *</label>
                <input type="text" id="fullname" name="fullname" class="form-input"
                  placeholder="Enter your full name" required>
                <span class="form-error" id="fullname-error"></span>
              </div>

              <div class="form-group">
                <label class="form-label" for="username">Username *</label>
                <input type="text" id="username" name="username" class="form-input"
                  placeholder="Choose a username" required>
                <span class="form-error" id="username-error"></span>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3 class="form-section-title">Account Details</h3>

            <div class="form-group">
              <label class="form-label" for="email">Email Address *</label>
              <input type="email" id="email" name="email" class="form-input"
                placeholder="your.email@university.edu" required>
              <span class="form-error" id="email-error"></span>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="password">Password *</label>
                <div class="input-with-icon">
                  <input type="password" id="password" name="password" class="form-input"
                    placeholder="Create a strong password" required>
                  <button type="button" class="toggle-password" onclick="togglePassword(this)">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </button>
                </div>
                <div class="password-strength">
                  <div class="strength-bar">
                    <span></span><span></span><span></span><span></span>
                  </div>
                  <span class="strength-text" id="strength-text">Enter password</span>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="confirm-password">Confirm Password *</label>
                <div class="input-with-icon">
                  <input type="password" id="confirm-password" name="confirmPassword" class="form-input"
                    placeholder="Re-enter your password" required>
                  <button type="button" class="toggle-password" onclick="togglePassword(this)">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </button>
                </div>
                <span class="form-error" id="confirm-password-error"></span>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3 class="form-section-title">Academic Information</h3>

            <div class="form-group">
              <label class="form-label" for="university">University *</label>
              <select id="university" name="university" class="form-input" required>
                <option value="">Select your university</option>
                ${universityOptions.map(uni => `<option value="${uni}">${uni}</option>`).join('')}
              </select>
              <span class="form-error" id="university-error"></span>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="department">Department *</label>
                <select id="department" name="department" class="form-input" required>
                  <option value="">Select department</option>
                  ${departments.map(dept => `<option value="${dept}">${dept}</option>`).join('')}
                </select>
                <span class="form-error" id="department-error"></span>
              </div>

              <div class="form-group">
                <label class="form-label" for="semester">Semester *</label>
                <select id="semester" name="semester" class="form-input" required>
                  <option value="">Select semester</option>
                  ${semesters.map(sem => `<option value="${sem}">Semester ${sem}</option>`).join('')}
                </select>
                <span class="form-error" id="semester-error"></span>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3 class="form-section-title">Profile Setup</h3>

            <div class="form-group">
              <label class="form-label">Profile Picture</label>
              <div class="profile-upload">
                <div class="profile-preview" id="profile-preview">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div class="upload-info">
                  <input type="file" id="profile-image" name="profileImage" accept="image/jpeg,image/png" class="hidden">
                  <button type="button" class="btn btn-secondary" onclick="document.getElementById('profile-image').click()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    Choose Photo
                  </button>
                  <span class="upload-hint">JPG, PNG up to 2MB</span>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="bio">Bio</label>
              <textarea id="bio" name="bio" class="form-input" rows="3" maxlength="500"
                placeholder="Tell others about yourself, your interests, and what you're looking to connect for..."></textarea>
              <span class="form-hint">Maximum 500 characters</span>
            </div>
          </div>

          <div class="form-group">
            <label class="form-checkbox">
              <input type="checkbox" id="terms" required>
              <span>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></span>
            </label>
          </div>

          <button type="submit" class="btn btn-primary btn-lg auth-submit">
            <span class="btn-text">Create Account</span>
            <span class="btn-loading hidden">
              <span class="spinner"></span>
              <span>Creating...</span>
            </span>
          </button>
        </form>

        <div class="auth-footer">
          <p>Already have an account? <a href="/login">Sign in</a></p>
        </div>
      </div>
    </div>

    <style>
      .auth-page {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--space-8) var(--space-4);
        background: var(--bg-secondary);
      }

      .auth-container {
        width: 100%;
        max-width: 640px;
      }

      .auth-header {
        text-align: center;
        margin-bottom: var(--space-8);
      }

      .auth-logo {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        color: var(--text-primary);
        font-weight: 600;
        font-size: var(--font-size-xl);
        margin-bottom: var(--space-6);
      }

      .auth-title {
        font-size: var(--font-size-2xl);
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: var(--space-2);
      }

      .auth-subtitle {
        color: var(--text-secondary);
      }

      .auth-form {
        background: var(--bg-primary);
        padding: var(--space-8);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-lg);
      }

      @media (max-width: 767px) {
        .auth-form {
          padding: var(--space-6);
        }
      }

      .form-section {
        margin-bottom: var(--space-8);
        padding-bottom: var(--space-6);
        border-bottom: 1px solid var(--border-color);
      }

      .form-section:last-of-type {
        border-bottom: none;
        margin-bottom: var(--space-6);
      }

      .form-section-title {
        font-size: var(--font-size-base);
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: var(--space-4);
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

      .input-with-icon {
        position: relative;
      }

      .input-with-icon .form-input {
        padding-right: 44px;
      }

      .toggle-password {
        position: absolute;
        right: var(--space-3);
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-muted);
        padding: var(--space-1);
        transition: color var(--transition-fast);
      }

      .toggle-password:hover {
        color: var(--text-secondary);
      }

      .password-strength {
        margin-top: var(--space-2);
        display: flex;
        align-items: center;
        gap: var(--space-3);
      }

      .strength-bar {
        display: flex;
        gap: var(--space-1);
      }

      .strength-bar span {
        width: 40px;
        height: 4px;
        background: var(--bg-tertiary);
        border-radius: var(--radius-full);
        transition: background var(--transition-fast);
      }

      .strength-bar.weak span:first-child {
        background: var(--error-500);
      }

      .strength-bar.fair span:nth-child(-n+2) {
        background: var(--warning-500);
      }

      .strength-bar.good span:nth-child(-n+3) {
        background: var(--primary-500);
      }

      .strength-bar.strong span {
        background: var(--success-500);
      }

      .strength-text {
        font-size: var(--font-size-xs);
        color: var(--text-muted);
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
        background: var(--bg-tertiary);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        flex-shrink: 0;
      }

      .profile-preview svg {
        width: 40px;
        height: 40px;
        color: var(--text-muted);
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

      .auth-submit {
        width: 100%;
        margin-top: var(--space-4);
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

      .auth-footer {
        text-align: center;
        margin-top: var(--space-6);
        color: var(--text-secondary);
      }

      .auth-footer a {
        font-weight: 500;
      }
    </style>
  `;

  // Setup form handlers
  setupFormHandlers();
}

function setupFormHandlers() {
  const form = document.getElementById('register-form');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm-password');
  const profileInput = document.getElementById('profile-image');

  // Password strength checker
  passwordInput.addEventListener('input', (e) => {
    const password = e.target.value;
    const strength = checkPasswordStrength(password);
    updateStrengthIndicator(strength);
  });

  // Profile image preview
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
        preview.innerHTML = `<img src="${e.target.result}" alt="Profile preview">`;
      };
      reader.readAsDataURL(file);
    }
  });

  // Username validation
  document.getElementById('username').addEventListener('blur', async (e) => {
    const username = e.target.value.trim();
    if (username.length >= 3) {
      const isUnique = await checkUsernameUnique(username);
      if (!isUnique) {
        showFieldError('username', 'This username is already taken');
      } else {
        clearFieldError('username');
      }
    }
  });

  // Email validation - Supabase handles uniqueness check on submit

  // Confirm password check
  confirmPasswordInput.addEventListener('input', () => {
    if (passwordInput.value !== confirmPasswordInput.value) {
      showFieldError('confirm-password', 'Passwords do not match');
    } else {
      clearFieldError('confirm-password');
    }
  });

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const submitBtn = form.querySelector('.auth-submit');
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').classList.add('hidden');
    submitBtn.querySelector('.btn-loading').classList.remove('hidden');

    try {
      await handleRegistration(form);
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').classList.remove('hidden');
      submitBtn.querySelector('.btn-loading').classList.add('hidden');
    }
  });

  // Global password toggle
  window.togglePassword = (btn) => {
    const input = btn.parentElement.querySelector('input');
    input.type = input.type === 'password' ? 'text' : 'password';
  };
}

function validateForm() {
  let isValid = true;
  const form = document.getElementById('register-form');

  // Full name
  const fullname = form.fullname.value.trim();
  if (fullname.length < 2) {
    showFieldError('fullname', 'Name must be at least 2 characters');
    isValid = false;
  } else {
    clearFieldError('fullname');
  }

  // Username
  const username = form.username.value.trim();
  if (username.length < 3) {
    showFieldError('username', 'Username must be at least 3 characters');
    isValid = false;
  } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    showFieldError('username', 'Username can only contain letters, numbers, and underscores');
    isValid = false;
  } else {
    clearFieldError('username');
  }

  // Email
  const email = form.email.value.trim();
  if (!validateEmail(email)) {
    showFieldError('email', 'Please enter a valid email address');
    isValid = false;
  } else {
    clearFieldError('email');
  }

  // Password
  const password = form.password.value;
  if (password.length < 8) {
    showFieldError('password', 'Password must be at least 8 characters');
    isValid = false;
  } else if (checkPasswordStrength(password).score < 2) {
    showFieldError('password', 'Password is too weak. Include uppercase, lowercase, and numbers');
    isValid = false;
  } else {
    clearFieldError('password');
  }

  // Confirm password
  if (password !== form.confirmPassword.value) {
    showFieldError('confirm-password', 'Passwords do not match');
    isValid = false;
  } else {
    clearFieldError('confirm-password');
  }

  // University
  if (!form.university.value) {
    showFieldError('university', 'Please select your university');
    isValid = false;
  } else {
    clearFieldError('university');
  }

  // Department
  if (!form.department.value) {
    showFieldError('department', 'Please select your department');
    isValid = false;
  } else {
    clearFieldError('department');
  }

  // Semester
  if (!form.semester.value) {
    showFieldError('semester', 'Please select your semester');
    isValid = false;
  } else {
    clearFieldError('semester');
  }

  return isValid;
}

function showFieldError(field, message) {
  const errorEl = document.getElementById(`${field}-error`);
  const inputEl = document.getElementById(field.replace('-', ''));
  if (errorEl) errorEl.textContent = message;
  if (inputEl) inputEl.classList.add('error');
}

function clearFieldError(field) {
  const errorEl = document.getElementById(`${field}-error`);
  const inputEl = document.getElementById(field.replace('-', ''));
  if (errorEl) errorEl.textContent = '';
  if (inputEl) inputEl.classList.remove('error');
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function checkPasswordStrength(password) {
  let score = 0;
  let feedback = 'Too weak';

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  const levels = ['weak', 'weak', 'fair', 'good', 'strong'];
  const feedbacks = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'];

  return {
    score,
    level: levels[score] || 'weak',
    feedback: feedbacks[score] || 'Too weak'
  };
}

function updateStrengthIndicator(strength) {
  const strengthBar = document.querySelector('.strength-bar');
  const strengthText = document.getElementById('strength-text');

  strengthBar.className = 'strength-bar ' + strength.level;
  strengthText.textContent = strength.feedback;
}

async function checkUsernameUnique(username) {
  const { data, error } = await supabase.rpc('is_username_available', {
    candidate: username
  });

  // The unique database constraint remains the final authority.
  return error ? true : data === true;
}

async function handleRegistration(form) {
  const formData = new FormData(form);

  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: formData.get('email'),
    password: formData.get('password'),
    options: {
      data: {
        full_name: formData.get('fullname'),
        username: formData.get('username'),
        university: formData.get('university'),
        department: formData.get('department'),
        semester: parseInt(formData.get('semester')),
        bio: formData.get('bio') || ''
      }
    }
  });

  if (authError) {
    throw new Error(authError.message);
  }

  if (!authData.user) {
    throw new Error('Failed to create account. Please try again.');
  }

  // Email-confirmation projects do not return a session at sign-up. The
  // database trigger still creates the profile; image upload waits for login.
  let profileImageUrl = '';
  if (selectedProfileImage && authData.session) {
    const fileExt = selectedProfileImage.type === 'image/png' ? 'png' : 'jpg';
    const fileName = `${authData.user.id}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('profile-images')
      .upload(fileName, selectedProfileImage);

    if (!uploadError) {
      const { data: urlData } = supabase.storage
        .from('profile-images')
        .getPublicUrl(fileName);
      profileImageUrl = urlData.publicUrl;
    }
  }

  if (profileImageUrl) {
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ profile_image: profileImageUrl })
      .eq('id', authData.user.id);

    if (profileError) console.error('Profile image update error:', profileError);
  }

  showToast('Account created successfully! Please check your email to verify.', 'success');
  router.navigate('/login');
}
