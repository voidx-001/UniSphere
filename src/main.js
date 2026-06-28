import { supabase } from './lib/supabase.js';
import { router } from './lib/router.js';
import './utils/theme.js';

const isBrowserRuntime =
  typeof window !== 'undefined' &&
  typeof document !== 'undefined' &&
  typeof import.meta !== 'undefined' &&
  'env' in import.meta &&
  import.meta.env?.SSR !== true;

if (isBrowserRuntime) {
  import('./styles/dashboard.css');
}

// Auth state
export let currentUser = null;
export let userProfile = null;

let authReady = false;
let authReadyPromise = null;
let authChangeListenerRegistered = false;

function syncAuthState() {
  if (typeof globalThis !== 'undefined') {
    globalThis.__unisphereCurrentUser = currentUser;
    globalThis.__unisphereUserProfile = userProfile;
    globalThis.__unisphereAuthReady = authReady;
  }
}

export function getCurrentUser() {
  return currentUser;
}

export function getUserProfile() {
  return userProfile;
}

export function isAuthReady() {
  return authReady;
}

export function waitForAuthReady() {
  return authReadyPromise || Promise.resolve(true);
}

export async function refreshUserProfile() {
  if (!currentUser) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', currentUser.id)
    .maybeSingle();

  if (error) return userProfile;

  // Auth is the source of truth for private account data such as email.
  userProfile = data ? { ...data, email: currentUser.email || '' } : null;
  return userProfile;
}

// Check initial auth state
async function initAuth() {
  authReadyPromise = (async () => {
    const { data: { session } } = await supabase.auth.getSession();
    currentUser = session?.user || null;

    if (currentUser) {
      await refreshUserProfile();
    }

    authReady = true;
    syncAuthState();

    if (!authChangeListenerRegistered) {
      authChangeListenerRegistered = true;
      supabase.auth.onAuthStateChange((event, session) => {
        (async () => {
          currentUser = session?.user || null;

          if (event === 'TOKEN_REFRESHED') return;

          if (currentUser) {
            await refreshUserProfile();
          } else {
            userProfile = null;
          }

          syncAuthState();

          if (event === 'PASSWORD_RECOVERY') {
            router.navigate('/reset-password', false);
            return;
          }

          if (event !== 'INITIAL_SESSION') {
            router.handleRoute();
          }
        })();
      });
    }

    return true;
  })();

  return authReadyPromise;
}

// Initialize routing
async function init() {
  await initAuth();
  window.addEventListener('popstate', () => router.handleRoute());

  const hash = window.location.hash || '';
  const isRecoveryLink = hash.includes('type=recovery');
  const onResetPage = window.location.pathname === '/reset-password';

  if (isRecoveryLink && !onResetPage) {
    router.navigate('/reset-password', false);
    return;
  }

  await router.handleRoute();
}

if (isBrowserRuntime) {
  init();
}
