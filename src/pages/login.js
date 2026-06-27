import { router } from '../lib/router.js';
import { supabase } from '../lib/supabase.js';
import { showToast } from '../utils/toast.js';

export async function renderLogin() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="auth-page">
      <div class="auth-container auth-container-sm">
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
          <h1 class="auth-title">Welcome Back</h1>
          <p class="auth-subtitle">Sign in to continue networking</p>
        </div>

        <form id="login-form" class="auth-form">
          <div class="form-group">
            <label class="form-label" for="email">Email Address</label>
            <input type="email" id="email" name="email" class="form-input"
              placeholder="Enter your email" required autocomplete="email">
            <span class="form-error" id="email-error"></span>
          </div>

          <div class="form-group">
            <label class="form-label" for="password">Password</label>
            <div class="input-with-icon">
              <input type="password" id="password" name="password" class="form-input"
                placeholder="Enter your password" required autocomplete="current-password">
              <button type="button" class="toggle-password" onclick="togglePasswordVisibility()">
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
            <span class="btn-text">Sign In</span>
            <span class="btn-loading hidden">
              <span class="spinner"></span>
              <span>Signing in...</span>
            </span>
          </button>

          <div class="auth-divider">
            <span>or continue with</span>
          </div>

          <div class="social-buttons">
            <button type="button" class="btn btn-secondary social-btn" disabled>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Google</span>
            </button>
          </div>
        </form>

        <div class="auth-footer">
          <p>Don't have an account? <a href="/register">Create one</a></p>
        </div>

        <!-- Forgot Password Modal -->
        <div id="forgot-modal" class="modal hidden">
          <div class="modal-backdrop" onclick="hideForgotPassword()"></div>
          <div class="modal-content">
            <div class="modal-header">
              <h3>Reset Password</h3>
              <button class="modal-close" onclick="hideForgotPassword()">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div class="modal-body">
              <p class="modal-desc">Enter your email address and we'll send you a link to reset your password.</p>
              <div class="form-group">
                <label class="form-label" for="reset-email">Email Address</label>
                <input type="email" id="reset-email" class="form-input" placeholder="your.email@example.com">
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" onclick="hideForgotPassword()">Cancel</button>
              <button class="btn btn-primary" onclick="sendResetEmail()">Send Reset Link</button>
            </div>
          </div>
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

      .auth-container-sm {
        max-width: 420px;
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

      .form-row-between {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: var(--space-6);
      }

      .forgot-link {
        font-size: var(--font-size-sm);
        color: var(--primary-600);
      }

      .auth-submit {
        width: 100%;
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

      .auth-divider {
        display: flex;
        align-items: center;
        margin: var(--space-6) 0;
        color: var(--text-muted);
        font-size: var(--font-size-sm);
      }

      .auth-divider::before,
      .auth-divider::after {
        content: '';
        flex: 1;
        height: 1px;
        background: var(--border-color);
      }

      .auth-divider span {
        padding: 0 var(--space-4);
      }

      .social-buttons {
        display: flex;
        gap: var(--space-3);
      }

      .social-btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-2);
      }

      .auth-footer {
        text-align: center;
        margin-top: var(--space-6);
        color: var(--text-secondary);
      }

      .auth-footer a {
        font-weight: 500;
      }

      /* Modal Styles */
      .modal {
        position: fixed;
        inset: 0;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--space-4);
      }

      .modal-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
      }

      .modal-content {
        position: relative;
        background: var(--bg-primary);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-xl);
        width: 100%;
        max-width: 420px;
        animation: modalEnter 0.2s ease-out;
      }

      @keyframes modalEnter {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--space-5) var(--space-6);
        border-bottom: 1px solid var(--border-color);
      }

      .modal-header h3 {
        font-size: var(--font-size-lg);
        font-weight: 600;
      }

      .modal-close {
        color: var(--text-muted);
        padding: var(--space-1);
      }

      .modal-close:hover {
        color: var(--text-primary);
      }

      .modal-body {
        padding: var(--space-6);
      }

      .modal-desc {
        color: var(--text-secondary);
        margin-bottom: var(--space-4);
      }

      .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: var(--space-3);
        padding: var(--space-4) var(--space-6);
        border-top: 1px solid var(--border-color);
      }
    </style>
  `;

  setupLoginForm();
}

function setupLoginForm() {
  const form = document.getElementById('login-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value;
    const remember = form.remember.checked;

    // Basic validation
    if (!email) {
      showFieldError('email', 'Please enter your email');
      return;
    }
    clearFieldError('email');

    if (!password) {
      showFieldError('password', 'Please enter your password');
      return;
    }
    clearFieldError('password');

    const submitBtn = form.querySelector('.auth-submit');
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').classList.add('hidden');
    submitBtn.querySelector('.btn-loading').classList.remove('hidden');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          showToast('Invalid email or password. Please try again.', 'error');
        } else {
          showToast(error.message, 'error');
        }
        return;
      }

      showToast('Signed in successfully!', 'success');
      router.navigate('/dashboard');
    } catch (err) {
      showToast('An error occurred. Please try again.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').classList.remove('hidden');
      submitBtn.querySelector('.btn-loading').classList.add('hidden');
    }
  });

  // Global functions for onclick handlers
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
  };

  window.hideForgotPassword = () => {
    document.getElementById('forgot-modal').classList.add('hidden');
  };

  window.sendResetEmail = async () => {
    const email = document.getElementById('reset-email').value.trim();

    if (!email) {
      showToast('Please enter your email address', 'error');
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      showToast(error.message, 'error');
    } else {
      showToast('Password reset email sent! Check your inbox.', 'success');
      hideForgotPassword();
    }
  };
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
