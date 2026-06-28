import { router } from '../lib/router.js';
import { supabase } from '../lib/supabase.js';
import { showToast } from '../utils/toast.js';
import { getCurrentUser, waitForAuthReady } from '../main.js';

export async function renderResetPassword() {
  const app = document.getElementById('app');

  // For recovery links, wait briefly for Supabase to process the token
  // before deciding the link is invalid.
  await waitForAuthReady();
  let user = getCurrentUser();

  if (!user && window.location.hash.includes('type=recovery')) {
    user = await waitForRecoverySession(3000);
  }

  if (!user) {
    app.innerHTML = `
      <div class="auth-page">
        <div class="auth-container auth-container-sm">
          <div class="auth-card auth-card-centered">
            <div class="auth-icon auth-icon-warning">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <h1 class="auth-title">Link expired or invalid</h1>
            <p class="auth-subtitle">Request a new password reset link to continue.</p>
            <button class="btn btn-primary btn-lg auth-submit" onclick="window.router.navigate('/login')">
              Back to sign in
            </button>
          </div>
        </div>
      </div>
    `;
    return;
  }

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
          <h1 class="auth-title">Set new password</h1>
          <p class="auth-subtitle">Choose a strong password for your account</p>
        </div>

        <form id="reset-password-form" class="auth-form">
          <div class="form-group">
            <label class="form-label" for="new-password">New Password</label>
            <div class="input-with-icon">
              <input type="password" id="new-password" name="password" class="form-input"
                placeholder="Enter a new password" required autocomplete="new-password" minlength="8">
              <button type="button" class="toggle-password" aria-label="Toggle password visibility"
                onclick="toggleResetPassword('new-password', this)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </div>
            <div class="password-strength">
              <div class="strength-bar" id="reset-strength-bar">
                <span></span><span></span><span></span><span></span>
              </div>
              <span class="strength-text" id="reset-strength-text">Enter password</span>
            </div>
            <span class="form-error" id="password-error"></span>
          </div>

          <div class="form-group">
            <label class="form-label" for="confirm-password">Confirm Password</label>
            <div class="input-with-icon">
              <input type="password" id="confirm-password" name="confirmPassword" class="form-input"
                placeholder="Re-enter your new password" required autocomplete="new-password">
              <button type="button" class="toggle-password" aria-label="Toggle password visibility"
                onclick="toggleResetPassword('confirm-password', this)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </div>
            <span class="form-error" id="confirm-password-error"></span>
          </div>

          <button type="submit" class="btn btn-primary btn-lg auth-submit">
            <span class="btn-text">Update password</span>
            <span class="btn-loading hidden">
              <span class="spinner"></span>
              <span>Updating...</span>
            </span>
          </button>
        </form>

        <div class="auth-footer">
          <p>Remember your password? <a href="/login" onclick="window.router.navigate('/login'); return false;">Sign in</a></p>
        </div>
      </div>
    </div>
  `;

  setupResetPasswordForm();
}

function setupResetPasswordForm() {
  const form = document.getElementById('reset-password-form');
  const passwordInput = document.getElementById('new-password');
  const confirmInput = document.getElementById('confirm-password');

  passwordInput?.addEventListener('input', (e) => {
    updateStrengthIndicator(checkPasswordStrength(e.target.value));
  });

  confirmInput?.addEventListener('input', () => {
    if (confirmInput.value && passwordInput.value !== confirmInput.value) {
      showFieldError('confirm-password', 'Passwords do not match');
    } else {
      clearFieldError('confirm-password');
    }
  });

  window.toggleResetPassword = (inputId, btn) => {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.type = input.type === 'password' ? 'text' : 'password';
    btn.classList.toggle('is-visible', input.type === 'text');
  };

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const password = passwordInput.value;
    const confirm = confirmInput.value;

    clearFieldError('password');
    clearFieldError('confirm-password');

    if (password.length < 8) {
      showFieldError('password', 'Password must be at least 8 characters');
      return;
    }

    if (password !== confirm) {
      showFieldError('confirm-password', 'Passwords do not match');
      return;
    }

    const submitBtn = form.querySelector('.auth-submit');
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').classList.add('hidden');
    submitBtn.querySelector('.btn-loading').classList.remove('hidden');

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        showToast(error.message, 'error');
        return;
      }

      showToast('Password updated successfully!', 'success');
      router.navigate('/dashboard');
    } catch {
      showToast('Unable to update password. Please try again.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').classList.remove('hidden');
      submitBtn.querySelector('.btn-loading').classList.add('hidden');
    }
  });
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
  return { level, feedback };
}

function updateStrengthIndicator(strength) {
  const strengthBar = document.getElementById('reset-strength-bar');
  const strengthText = document.getElementById('reset-strength-text');
  if (strengthBar) strengthBar.className = 'strength-bar ' + strength.level;
  if (strengthText) strengthText.textContent = strength.feedback;
}

function showFieldError(field, message) {
  const errorEl = document.getElementById(`${field}-error`);
  const inputEl = document.getElementById(field === 'password' ? 'new-password' : field);
  if (errorEl) errorEl.textContent = message;
  if (inputEl) inputEl.classList.add('error');
}

function clearFieldError(field) {
  const errorEl = document.getElementById(`${field}-error`);
  const inputEl = document.getElementById(field === 'password' ? 'new-password' : field);
  if (errorEl) errorEl.textContent = '';
  if (inputEl) inputEl.classList.remove('error');
}

function waitForRecoverySession(timeoutMs = 3000) {
  return new Promise((resolve) => {
    const existingUser = getCurrentUser();
    if (existingUser) {
      resolve(existingUser);
      return;
    }

    let subscription = null;
    const timer = setTimeout(() => {
      if (subscription) subscription.unsubscribe();
      resolve(getCurrentUser());
    }, timeoutMs);

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'INITIAL_SESSION' || event === 'SIGNED_IN') {
        clearTimeout(timer);
        if (subscription) subscription.unsubscribe();
        resolve(session?.user || getCurrentUser());
      }
    });

    subscription = sub;
  });
}
