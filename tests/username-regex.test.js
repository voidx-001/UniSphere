import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { isValidUsername, validateRegisterStep } from '../src/utils/validation.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationPath = path.join(
  __dirname,
  '..',
  'supabase',
  'migrations',
  '20260627193000_004_sync_and_harden_backend.sql'
);

test('allows dots and underscores in usernames', () => {
  assert.equal(isValidUsername('student.name'), true);
  assert.equal(isValidUsername('student_name'), true);
  assert.equal(isValidUsername('ab'), false);
  assert.equal(isValidUsername('bad-name'), false);
});

test('backend migration allows dots in usernames', () => {
  const migration = readFileSync(migrationPath, 'utf8');
  assert.match(migration, /\^\[A-Za-z0-9\._\]\{3,30\}\$/);
});

test('step validation catches missing signup details', () => {
  const result = validateRegisterStep(2, {
    university: '',
    department: '',
    semester: '',
    terms: false
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.university);
  assert.ok(result.errors.department);
  assert.ok(result.errors.semester);
  assert.ok(result.errors.terms);
});
