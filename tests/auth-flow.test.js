import test from 'node:test';
import assert from 'node:assert/strict';

import { getPostAuthRoute } from '../src/utils/auth-flow.js';

test('routes signed-in users to the dashboard after a successful auth flow', () => {
  assert.equal(getPostAuthRoute({ hasSession: true }), '/dashboard');
});

test('keeps users on the login page when the auth flow did not produce a usable session', () => {
  assert.equal(getPostAuthRoute({ hasSession: false }), '/login');
});
