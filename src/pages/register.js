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
                    <stop offset="0%" style="stop-color:#4f46e5"/>
                    <stop offset="100%" style="stop-color:#7c3aed"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span>UniSphere</span>
          </a>
          <h1 class="auth-title">Create your account</h1>
          <p class="auth-subtitle">Join the student network across Pakistan</p>
        </div>

        <form id="register-form" class="auth-form">
          <div class="form-section">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="fullname">Full Name *</label>
                <input type="text" id="fullname" name="fullname" class="form-input"
                  placeholder="Enter your full name" required>
                <span class="form-error" id="fullname-error"></span>
                <span class="form-success" id="fullname-success"></span>
              </div>

              <div class="form-group">
                <label class="form-label" for="username">Username *</label>
                <input type="text" id="username" name="username" class="form-input"
                  placeholder="Choose a username" required>
                <span class="form-error" id="username-error"></span>
                <span class="form-success" id="username-success"></span>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="email">Email Address *</label>
              <input type="email" id="email" name="email" class="form-input"
                placeholder="Enter your .edu or .edu.pk email" required>
              <span class="form-hint" id="email-hint">Must be a university .edu or .edu.pk address</span>
              <span class="form-error" id="email-error"></span>
              <span class="form-success" id="email-success"></span>
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
                <span class="form-error" id="password-error"></span>
                <span class="form-success" id="password-success"></span>
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
                <span class="form-success" id="confirm-password-success"></span>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-primary btn-lg auth-submit">
            <span class="btn-text">Create account</span>
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

  // Password real-time validation
  passwordInput.addEventListener('input', (e) => {
    const password = e.target.value;
    const strength = checkPasswordStrength(password);
    updateStrengthIndicator(strength);
    
    if (password.length === 0) {
      clearFieldError('password');
      clearFieldSuccess('password');
    } else if (password.length < 8) {
      showFieldError('password', 'Password must be at least 8 characters.');
      clearFieldSuccess('password');
    } else if (password.length < 12 && !/[A-Z]/.test(password)) {
      showFieldError('password', 'Add uppercase, lowercase, and numbers for a stronger password.');
      clearFieldSuccess('password');
    } else {
      clearFieldError('password');
      showFieldSuccess('password', 'Looks good');
    }
  });

  // Debounced real-time username availability check
  let usernameDebounceTimer;
  if (usernameInput) {
    usernameInput.addEventListener('input', (e) => {
      const username = e.target.value.trim();

      if (username.length === 0) {
        clearFieldError('username');
        clearFieldSuccess('username');
        clearTimeout(usernameDebounceTimer);
        return;
      }

      if (username.length < 3) {
        showFieldError('username', 'Username must be at least 3 characters.');
        clearFieldSuccess('username');
        clearTimeout(usernameDebounceTimer);
        return;
      }

      if (!isValidUsername(username)) {
        showFieldError('username', 'Usernames can only contain letters, numbers, dots, and underscores.');
        clearFieldSuccess('username');
        clearTimeout(usernameDebounceTimer);
        return;
      }

      clearFieldError('username');
      showFieldSuccess('username', 'Checking availability...');

      clearTimeout(usernameDebounceTimer);
      usernameDebounceTimer = setTimeout(async () => {
        const isUnique = await checkUsernameUnique(username);
        if (usernameInput.value.trim() !== username) return;

        if (!isUnique) {
          showFieldError('username', 'That username is already taken. Please choose another.');
          clearFieldSuccess('username');
        } else {
          clearFieldError('username');
          showFieldSuccess('username', 'Username is available');
        }
      }, 350);
    });
  }

  // Debounced real-time email availability check
  let emailDebounceTimer;
  const emailInput = document.getElementById('email');
  if (emailInput) {
    emailInput.addEventListener('input', (e) => {
      const email = e.target.value.trim();

      if (email.length === 0) {
        clearFieldError('email');
        clearFieldSuccess('email');
        clearTimeout(emailDebounceTimer);
        return;
      }

      if (!validateEmail(email)) {
        showFieldError('email', 'Please use your university .edu or .edu.pk email address.');
        clearFieldSuccess('email');
        clearTimeout(emailDebounceTimer);
        return;
      }

      clearFieldError('email');
      showFieldSuccess('email', 'Checking availability...');

      clearTimeout(emailDebounceTimer);
      emailDebounceTimer = setTimeout(async () => {
        const isUnique = await checkEmailUnique(email);
        if (emailInput.value.trim() !== email) return;

        if (!isUnique) {
          showFieldError('email', 'That email is already registered. Sign in or use another email.');
          clearFieldSuccess('email');
        } else {
          clearFieldError('email');
          showFieldSuccess('email', 'Email is available');
        }
      }, 350);
    });
  }

  // Confirm password real-time check
  confirmPasswordInput.addEventListener('input', () => {
    if (passwordInput.value !== confirmPasswordInput.value) {
      showFieldError('confirm-password', 'Passwords do not match');
      clearFieldSuccess('confirm-password');
    } else if (confirmPasswordInput.value.length > 0) {
      clearFieldError('confirm-password');
      showFieldSuccess('confirm-password', 'Passwords match!');
    } else {
      clearFieldError('confirm-password');
      clearFieldSuccess('confirm-password');
    }
  });

  // Full name real-time validation
  const fullnameInput = document.getElementById('fullname');
  if (fullnameInput) {
    fullnameInput.addEventListener('input', (e) => {
      const fullname = e.target.value.trim();
      
      if (fullname.length === 0) {
        clearFieldError('fullname');
        clearFieldSuccess('fullname');
        return;
      }
      
      if (fullname.length < 2) {
        showFieldError('fullname', 'Name must be at least 2 characters.');
        clearFieldSuccess('fullname');
        return;
      }

      clearFieldError('fullname');
      showFieldSuccess('fullname', 'Looks good');
    });
  }

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
  const successEl = document.getElementById(`${field}-success`);
  const inputEl = getFieldElement(field);
  if (errorEl) errorEl.textContent = message;
  if (successEl) successEl.textContent = '';
  if (inputEl) {
    inputEl.classList.add('error');
    inputEl.classList.remove('success');
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

function showFieldSuccess(field, message) {
  const successEl = document.getElementById(`${field}-success`);
  const errorEl = document.getElementById(`${field}-error`);
  const inputEl = getFieldElement(field);
  if (successEl) successEl.textContent = message;
  if (errorEl) errorEl.textContent = '';
  if (inputEl) {
    inputEl.classList.add('success');
    inputEl.classList.remove('error');
  }
}

function clearFieldSuccess(field) {
  const successEl = document.getElementById(`${field}-success`);
  const inputEl = getFieldElement(field);
  if (successEl) successEl.textContent = '';
  if (inputEl) {
    inputEl.classList.remove('success');
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.edu(\.[^\s@]+)?$/.test(email);
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

