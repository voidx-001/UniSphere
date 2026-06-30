/** Single source of truth for route protection used by router and auth-guard. */
export const PROTECTED_ROUTES = [
  '/home',
  '/dashboard',
  '/search',
  '/discover',
  '/profile',
  '/messages',
  '/settings',
  '/notifications',
  '/connections',
  '/connection-requests',
  '/edit-profile',
  '/post'
];

export const AUTH_ENTRY_ROUTES = ['/login', '/register'];
