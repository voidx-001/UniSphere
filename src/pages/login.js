import { router } from '../lib/router.js';
import { supabase } from '../lib/supabase.js';
import { showToast } from '../utils/toast.js';
import { getPostAuthRoute } from '../utils/auth-flow.js';

const REMEMBER_IDENTIFIER_KEY = 'unisphere-remember-identifier';

export async function renderLogin() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="auth-page">
      <div class="auth-bg-shapes" aria-hidden="true">
        <div class="auth-shape auth-shape-1"></div>
        <div class="auth-shape auth-shape-2"></div>
        <div class="auth-shape auth-shape-3"></div>
      </div>
      <div class="auth-container auth-container-sm">
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
          <h1 class="auth-title">Welcome back</h1>
          <p class="auth-subtitle">Sign in to continue connecting with students across Pakistan</p>
        </div>

        <form id="login-form" class="auth-form">
          <div class="form-group">
            <label class="form-label" for="email">Email or username</label>
            <input type="text" id="email" name="email" class="form-input"
              placeholder="you@university.edu.pk or @username" required autocomplete="username">
            <span class="form-error" id="email-error"></span>
          </div>

          <div class="form-group">
            <label class="form-label" for="password">Password</label>
            <div class="input-with-icon">
              <input type="password" id="password" name="password" class="form-input"
                placeholder="Enter your password" required autocomplete="current-password">
              <button type="button" class="toggle-password" aria-label="Toggle password visibility"
                onclick="togglePasswordVisibility()">
                <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <svg class="eye-off-icon hidden" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              </button>
            </div>
            <span class="form-error" id="password-error"></span>
          </div>

          <div class="form-row-between">
            <label class="form-checkbox">
              <input type="checkbox" id="remember" name="remember">
              <span>Remember me</span>
            </label>
            <a href="#" class="forgot-link" onclick="showForgotPassword(event)">Forgot password?</a>
          </div>

          <button type="submit" class="btn btn-primary btn-lg auth-submit">
            <span class="btn-text">Sign in to UniSphere</span>
            <span class="btn-loading hidden">
              <span class="spinner"></span>
              <span>Signing in...</span>
            </span>
          </button>
        </form>

        <div class="auth-footer">
          <p>Don't have an account? <a href="/register" onclick="window.router.navigate('/register'); return false;">Sign up</a></p>
        </div>

        <div id="forgot-modal" class="modal hidden">
          <div class="modal-backdrop" onclick="hideForgotPassword()"></div>
          <div class="modal-content">
            <div class="modal-header">
              <h3>Reset password</h3>
              <button class="modal-close" type="button" onclick="hideForgotPassword()" aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div class="modal-body">
              <p class="modal-desc">Enter your email and we'll send you a link to choose a new password.</p>
              <div class="form-group">
                <label class="form-label" for="reset-email">Email address</label>
                <input type="email" id="reset-email" class="form-input" placeholder="you@university.edu.pk" autocomplete="email">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" onclick="hideForgotPassword()">Cancel</button>
              <button type="button" class="btn btn-primary" id="send-reset-btn" onclick="sendResetEmail()">
                <span class="btn-text">Send reset link</span>
                <span class="btn-loading hidden">
                  <span class="spinner"></span>
                  <span>Sending...</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  setupLoginForm();
}

function setupLoginForm() {
  const form = document.getElementById('login-form');
  const savedIdentifier = window.localStorage.getItem(REMEMBER_IDENTIFIER_KEY);

  if (savedIdentifier) {
    form.email.value = savedIdentifier;
    form.remember.checked = true;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let identifier = form.email.value.trim();
    const password = form.password.value;
    const remember = form.remember.checked;

    if (!identifier) {
      showFieldError('email', 'Email or username is required');
      return;
    }

    // Strip a leading @ if the user typed @username
    if (identifier.startsWith('@')) {
      identifier = identifier.slice(1);
    }

    let email = identifier;
    if (!identifier.includes('@')) {
      if (!isValidUsername(identifier)) {
        showFieldError('email', 'Enter a valid email address or username');
        return;
      }

      const resolved = await resolveEmailFromUsername(identifier);
      if (!resolved) {
        showFieldError('email', 'No account found with that username');
        return;
      }
      email = resolved;
    } else if (!validateEmail(identifier)) {
      showFieldError('email', 'Enter a valid email address');
      return;
    }

    clearFieldError('email');

    if (!password) {
      showFieldError('password', 'Password is required');
      return;
    }
    clearFieldError('password');

    const submitBtn = form.querySelector('.auth-submit');
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').classList.add('hidden');
    submitBtn.querySelector('.btn-loading').classList.remove('hidden');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        const message = error.message.includes('Invalid login credentials')
          ? 'Incorrect username/email or password. Please try again.'
          : error.message;
        showToast(message, 'error');
        return;
      }

      if (remember) {
        window.localStorage.setItem(REMEMBER_IDENTIFIER_KEY, identifier);
      } else {
        window.localStorage.removeItem(REMEMBER_IDENTIFIER_KEY);
      }

      showToast('Signed in successfully!', 'success');
      router.navigate(getPostAuthRoute({ hasSession: Boolean(data?.session) }));
    } catch {
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').classList.remove('hidden');
      submitBtn.querySelector('.btn-loading').classList.add('hidden');
    }
  });

  window.togglePasswordVisibility = () => {
    const input = document.getElementById('password');
    const eyeIcon = document.querySelector('.eye-icon');
    const eyeOffIcon = document.querySelector('.eye-off-icon');

    if (input.type === 'password') {
      input.type = 'text';
      eyeIcon.classList.add('hidden');
      eyeOffIcon.classList.remove('hidden');
    } else {
      input.type = 'password';
      eyeIcon.classList.remove('hidden');
      eyeOffIcon.classList.add('hidden');
    }
  };

  window.showForgotPassword = (e) => {
    e.preventDefault();
    document.getElementById('forgot-modal').classList.remove('hidden');
    document.getElementById('reset-email')?.focus();
  };

  window.hideForgotPassword = () => {
    document.getElementById('forgot-modal').classList.add('hidden');
  };

  window.sendResetEmail = async () => {
    const email = document.getElementById('reset-email').value.trim();
    const sendBtn = document.getElementById('send-reset-btn');

    if (!email) {
      showToast('Enter your email address first.', 'error');
      return;
    }
    if (!validateEmail(email)) {
      showToast('Enter a valid email address.', 'error');
      return;
    }

    sendBtn.disabled = true;
    sendBtn.querySelector('.btn-text').classList.add('hidden');
    sendBtn.querySelector('.btn-loading').classList.remove('hidden');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:5173/reset-password'
      });

      if (error) {
        showToast(error.message, 'error');
        return;
      }

      showToast('Reset link sent! Check your inbox.', 'success');
      hideForgotPassword();
    } finally {
      sendBtn.disabled = false;
      sendBtn.querySelector('.btn-text').classList.remove('hidden');
      sendBtn.querySelector('.btn-loading').classList.add('hidden');
    }
  };
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUsername(username) {
  return /^[a-zA-Z0-9._]{3,30}$/.test(username);
}

async function resolveEmailFromUsername(username) {
  const { data, error } = await supabase.rpc('get_email_by_username', {
    candidate: username
  });

  if (error) {
    console.warn('Username lookup failed:', error.message || error);
    return null;
  }

  return data || null;
}

function showFieldError(field, message) {
  const errorEl = document.getElementById(`${field}-error`);
  const inputEl = document.getElementById(field);
  if (errorEl) errorEl.textContent = message;
  if (inputEl) inputEl.classList.add('error');
}

function clearFieldError(field) {
  const errorEl = document.getElementById(`${field}-error`);
  const inputEl = document.getElementById(field);
  if (errorEl) errorEl.textContent = '';
  if (inputEl) inputEl.classList.remove('error');
}
