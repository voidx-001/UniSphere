import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';

import { getSignupErrorMessage } from '../src/utils/auth-errors.js';
import { buildSupabaseSignupPayload } from '../src/utils/auth-signup.js';

test('maps Supabase email rate limit errors to a friendly message', () => {
  const message = getSignupErrorMessage({ message: 'Email rate limit exceeded' });
  assert.equal(message, 'Signup is temporarily rate-limited by Supabase. Please wait a few minutes and try again.');
});

test('keeps generic auth errors intact', () => {
  const message = getSignupErrorMessage({ message: 'Invalid login credentials' });
  assert.equal(message, 'Invalid login credentials');
});

test('database trigger migration avoids invalid cast on signup metadata', () => {
  const migrationPath = path.join(process.cwd(), 'supabase', 'migrations', '20260627193000_004_sync_and_harden_backend.sql');
  const migration = readFileSync(migrationPath, 'utf8');
  assert.match(migration, /CASE\s*WHEN v_semester IS NULL OR v_semester !~ '\^\[0-9\]\+\$' THEN NULL/);
  assert.match(migration, /ELSE v_semester::integer/);
});

test('signup payload omits metadata so older triggers do not crash', () => {
  const payload = buildSupabaseSignupPayload({ email: 'test@example.com', password: 'TestPass123!' });
  assert.deepEqual(payload, { email: 'test@example.com', password: 'TestPass123!' });
  assert.equal('options' in payload, false);
});

test('backend migration auto-confirms new auth users so signup does not require email verification', () => {
  const migrationPath = path.join(process.cwd(), 'supabase', 'migrations', '20260627193000_004_sync_and_harden_backend.sql');
  const migration = readFileSync(migrationPath, 'utf8');
  assert.match(migration, /NEW\.email_confirmed_at := now\(\);/);
  assert.match(migration, /BEFORE INSERT ON auth\.users/);
});
