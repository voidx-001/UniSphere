import { PROTECTED_ROUTES, AUTH_ENTRY_ROUTES } from './routes.js';

export { PROTECTED_ROUTES };

export function getRouteDecision(pathname, user, authReady) {
  if (!authReady) {
    return 'loading';
  }

  if (PROTECTED_ROUTES.includes(pathname) && !user) {
    return 'login';
  }

  if (AUTH_ENTRY_ROUTES.includes(pathname) && user) {
    return 'dashboard';
  }

  return 'render';
}
