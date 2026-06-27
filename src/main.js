import { supabase } from './lib/supabase.js';
import { router } from './lib/router.js';
import './utils/theme.js';
import './styles/dashboard.css';

window.router = router;

// Auth state
export let currentUser = null;
export let userProfile = null;

export function getCurrentUser() {
  return currentUser;
}

export function getUserProfile() {
  return userProfile;
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
  const { data: { session } } = await supabase.auth.getSession();
  currentUser = session?.user || null;

  if (currentUser) {
    await refreshUserProfile();
  }

  // Listen for auth changes
  supabase.auth.onAuthStateChange((event, session) => {
    (async () => {
      currentUser = session?.user || null;

      if (event === 'TOKEN_REFRESHED') return;

      if (currentUser) {
        await refreshUserProfile();
      } else {
        userProfile = null;
      }

      if (event !== 'INITIAL_SESSION') router.handleRoute();
    })();
  });
}

// Initialize routing
async function init() {
  await initAuth();
  window.addEventListener('popstate', () => router.handleRoute());
  router.handleRoute();
}

init();
