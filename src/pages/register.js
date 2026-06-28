import { router } from '../lib/router.js';
import { supabase } from '../lib/supabase.js';
import { showToast } from '../utils/toast.js';
import { getSignupErrorMessage } from '../utils/auth-errors.js';
import { buildSupabaseSignupPayload } from '../utils/auth-signup.js';
import { isValidUsername, validateRegisterStep } from '../utils/validation.js';
import { getPostAuthRoute } from '../utils/auth-flow.js';


export async function renderRegister() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="auth-page">
      <div class="auth-bg-shapes" aria-hidden="true">
        <div class="auth-shape auth-shape-1"></div>
        <div class="auth-shape auth-shape-2"></div>
        <div class="auth-shape auth-shape-3"></div>
      </div>
      <div class="auth-container">
        <div class="auth-header">
          <a href="/" class="auth-logo" onclick="window.router.navigate('/'); return false;">
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
          <div class="auth-note">One quick account setup, then complete your profile inside the dashboard.</div>
        </div>

        <form id="register-form" class="auth-form">
          <div class="form-section">
            <h3 class="form-section-title">Create your account</h3>

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

          <button type="submit" class="btn btn-primary btn-lg auth-submit">
            <span class="btn-text">Create Account</span>
            <span class="btn-loading hidden">
              <span class="spinner"></span>
              <span>Creating...</span>
            </span>
          </button>
        </form>

        <div class="auth-footer">
          <p>Already have an account? <a href="/login" onclick="window.router.navigate('/login'); return false;">Sign in</a></p>
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
        color: var(--primary-700);
        font-weight: 700;
        font-size: var(--font-size-xl);
        margin-bottom: var(--space-4);
        padding: var(--space-2) var(--space-3);
        background: rgba(59, 130, 246, 0.1);
        border-radius: var(--radius-full);
      }

      .auth-title {
        font-size: var(--font-size-3xl);
        font-weight: 800;
        color: var(--text-primary);
        margin-bottom: var(--space-2);
      }

      .auth-subtitle {
        color: var(--text-secondary);
        max-width: 520px;
        margin: 0 auto;
      }

      .auth-form {
        background: var(--bg-primary);
        padding: var(--space-8);
        border-radius: var(--radius-2xl);
        box-shadow: var(--shadow-xl);
        max-width: 720px;
        margin: 0 auto;
        position: relative;
        overflow: hidden;
      }

      .auth-note {
        margin-top: var(--space-3);
        max-width: 520px;
        margin-left: auto;
        margin-right: auto;
        font-size: var(--font-size-sm);
        color: var(--text-secondary);
        background: rgba(59, 130, 246, 0.08);
        border: 1px solid rgba(59, 130, 246, 0.16);
        border-radius: var(--radius-xl);
        padding: var(--space-4);
      }

      @media (max-width: 767px) {
        .auth-form {
          padding: var(--space-6);
        }
      }

      .form-section {
        margin-bottom: var(--space-6);
        padding: var(--space-6);
        background: var(--bg-secondary);
        border-radius: var(--radius-xl);
        border: 1px solid var(--border-color);
      }

      .form-section:last-of-type {
        border-bottom: none;
        margin-bottom: var(--space-4);
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
        margin-top: var(--space-3);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-3);
      }

      .strength-bar {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: var(--space-1);
        flex: 1;
        min-width: 120px;
      }

      .strength-bar span {
        height: 5px;
        background: var(--bg-tertiary);
        border-radius: var(--radius-full);
        transition: background var(--transition-fast);
      }

      .strength-bar.weak span:nth-child(1) {
        background: var(--error-500);
      }

      .strength-bar.fair span:nth-child(1),
      .strength-bar.fair span:nth-child(2) {
        background: var(--warning-500);
      }

      .strength-bar.good span:nth-child(1),
      .strength-bar.good span:nth-child(2),
      .strength-bar.good span:nth-child(3) {
        background: var(--primary-500);
      }

      .strength-bar.strong span {
        background: var(--success-500);
      }

      .strength-text {
        font-size: var(--font-size-xs);
        color: var(--text-muted);
        white-space: nowrap;
      }

      .auth-submit {
        width: 100%;
        margin-top: var(--space-5);
        padding: var(--space-4) var(--space-6);
        border-radius: var(--radius-full);
      }

      .auth-footer {
        text-align: center;
        margin-top: var(--space-6);
        color: var(--text-secondary);
      }

      .auth-footer a {
        font-weight: 500;
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
    </style>
  `;

  // Setup form handlers
  setupFormHandlers();
}

function getFieldValue(fieldName) {
  const form = document.getElementById('register-form');
  return form?.elements.namedItem(fieldName)?.value ?? '';
}

function getFieldElement(fieldName) {
  return document.getElementById(fieldName) || document.querySelector(`[name="${fieldName}"]`);
}

function setupFormHandlers() {
  const form = document.getElementById('register-form');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm-password');
  const usernameInput = document.getElementById('username');

  if (!form || !passwordInput || !confirmPasswordInput || !usernameInput) {
    return;
  }

  // Password strength checker
  passwordInput.addEventListener('input', (e) => {
    const password = e.target.value;
    const strength = checkPasswordStrength(password);
    updateStrengthIndicator(strength);
  });

  // Username validation
  usernameInput.addEventListener('blur', async (e) => {
    const username = e.target.value.trim();

    if (username.length === 0) {
      clearFieldError('username');
      return;
    }

    if (username.length < 3) {
      showFieldError('username', 'Username gotta be 3+ chars.');
      return;
    }

    if (!isValidUsername(username)) {
      showFieldError('username', 'Use only letters, numbers, dots, and underscores.');
      return;
    }

    const isUnique = await checkUsernameUnique(username);
    if (!isUnique) {
      showFieldError('username', 'That username is already taken. Pick another one.');
    } else {
      clearFieldError('username');
    }
  });

  const emailInput = document.getElementById('email');
  if (emailInput) {
    emailInput.addEventListener('blur', async (e) => {
      const email = e.target.value.trim();

      if (email.length === 0) {
        clearFieldError('email');
        return;
      }

      if (!validateEmail(email)) {
        showFieldError('email', 'That email looks sus. Use a real one.');
        return;
      }

      const isUnique = await checkEmailUnique(email);
      if (!isUnique) {
        showFieldError('email', 'That email is already registered. Sign in or use another one.');
      } else {
        clearFieldError('email');
      }
    });
  }

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

    if (!await validateForm()) return;

    const submitBtn = form.querySelector('.auth-submit');
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').classList.add('hidden');
    submitBtn.querySelector('.btn-loading').classList.remove('hidden');

    try {
      const result = await handleRegistration(form);
      if (result?.field) {
        showFieldError(result.field, result.message);
        getFieldElement(result.field)?.focus();
        return;
      }
    } catch (error) {
      showToast(error.message || 'Unable to create your account right now.', 'error');
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

async function validateForm() {
  const values = {
    fullname: getFieldValue('fullname'),
    username: getFieldValue('username'),
    email: getFieldValue('email'),
    password: getFieldValue('password'),
    confirmPassword: getFieldValue('confirmPassword')
  };

  ['fullname', 'username', 'email', 'password', 'confirm-password'].forEach(clearFieldError);

  const result = validateRegisterStep(1, values);
  if (!result.isValid) {
    Object.entries(result.errors).forEach(([field, message]) => {
      showFieldError(field, message);
    });

    const firstErrorField = Object.keys(result.errors)[0];
    const firstFieldEl = getFieldElement(firstErrorField);
    if (firstErrorField === 'confirm-password' && !result.errors.email && !result.errors.username) {
      getFieldElement('password')?.focus();
    }
    if (firstFieldEl?.focus) firstFieldEl.focus();
    firstFieldEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return false;
  }

  const email = values.email.trim();
  if (email && validateEmail(email)) {
    const isEmailUnique = await checkEmailUnique(email);
    if (!isEmailUnique) {
      showFieldError('email', 'That email is already registered. Sign in or use another one.');
      getFieldElement('email')?.focus();
      return false;
    }
  }

  return true;
}

function showFieldError(field, message) {
  const errorEl = document.getElementById(`${field}-error`);
  const inputEl = getFieldElement(field);
  if (errorEl) errorEl.textContent = message;
  if (inputEl) {
    inputEl.classList.add('error');
    if (field === 'terms') {
      inputEl.closest('.form-checkbox')?.classList.add('error');
    }
  }
}

function clearFieldError(field) {
  const errorEl = document.getElementById(`${field}-error`);
  const inputEl = getFieldElement(field);
  if (errorEl) errorEl.textContent = '';
  if (inputEl) {
    inputEl.classList.remove('error');
    if (field === 'terms') {
      inputEl.closest('.form-checkbox')?.classList.remove('error');
    }
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function checkPasswordStrength(password) {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  const level = score >= 5 ? 'strong' : score >= 4 ? 'good' : score >= 3 ? 'fair' : 'weak';
  const feedback = score >= 5 ? 'Strong' : score >= 4 ? 'Good' : score >= 3 ? 'Fair' : 'Too weak';

  return {
    score,
    level,
    feedback
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

async function checkEmailUnique(email) {
  const { data, error } = await supabase.rpc('is_email_available', {
    candidate: email
  });

  if (error) {
    console.warn('Email availability check failed:', error.message || error);
    return true;
  }

  return data === true;
}

async function handleRegistration(form) {
  const formData = new FormData(form);
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');
  const fullName = String(formData.get('fullname') || '').trim();
  const username = String(formData.get('username') || '').trim();

  const { data: authData, error: authError } = await supabase.auth.signUp({
    ...buildSupabaseSignupPayload({ email, password }),
    options: {
      emailRedirectTo: window.location.origin,
      data: { full_name: fullName, username }
    }
  });

  if (authError) {
    const message = getSignupErrorMessage(authError);
    if (/already registered|duplicate|already.*in use/i.test(message)) {
      return { field: 'email', message };
    }
    throw new Error(message);
  }

  if (!authData.user) {
    throw new Error('Failed to create account. Please try again.');
  }

  const user = authData.user;
  let session = authData.session;

  if (!session) {
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    session = signInData?.session || null;
    if (signInError) {
      console.warn('Auto sign-in after signup failed:', signInError.message);
    }
  }

  window.localStorage.setItem('profile-onboarding-pending', 'true');
  window.localStorage.removeItem('profile-onboarding-complete');

  const nextRoute = getPostAuthRoute({ hasSession: Boolean(session) });
  showToast('Account created! Complete your profile in the dashboard.', 'success');
  router.navigate(nextRoute);
}

