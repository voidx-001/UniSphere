import test from 'node:test';
import assert from 'node:assert/strict';

import { getRouteDecision } from '../src/lib/auth-guard.js';
import { PROTECTED_ROUTES } from '../src/lib/routes.js';

test('blocks protected routes until auth state is ready', () => {
  assert.equal(getRouteDecision('/dashboard', null, false), 'loading');
});

test('allows protected routes once auth state is ready and a user exists', () => {
  assert.equal(getRouteDecision('/dashboard', { id: 'user-1' }, true), 'render');
});

test('redirects logged-in users away from auth pages', () => {
  assert.equal(getRouteDecision('/login', { id: 'user-1' }, true), 'dashboard');
});

test('redirects unauthenticated users from all protected routes to login', () => {
  for (const route of PROTECTED_ROUTES) {
    assert.equal(getRouteDecision(route, null, true), 'login', `expected login redirect for ${route}`);
  }
});

test('allows public routes without authentication', () => {
  assert.equal(getRouteDecision('/', null, true), 'render');
  assert.equal(getRouteDecision('/reset-password', null, true), 'render');
});
