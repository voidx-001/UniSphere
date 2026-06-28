import test from 'node:test';
import assert from 'node:assert/strict';

import { buildProfilePayload } from '../src/utils/profile-payload.js';

test('builds a profile payload with non-null required fields for signup', () => {
  const payload = buildProfilePayload({
    userId: 'user-1',
    fullName: 'Student Name',
    username: 'studentname'
  });

  assert.equal(payload.id, 'user-1');
  assert.equal(payload.university, '');
  assert.equal(payload.department, '');
  assert.equal(payload.semester, 1);
  assert.equal(payload.full_name, 'Student Name');
  assert.equal(payload.username, 'studentname');
});
