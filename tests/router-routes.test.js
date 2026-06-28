import test from 'node:test';
import assert from 'node:assert/strict';

import { router } from '../src/lib/router.js';

test('router exposes the student networking routes', () => {
  const routePaths = Object.keys(router.routes);

  for (const path of ['/discover', '/notifications', '/connections', '/connection-requests', '/edit-profile', '/reset-password']) {
    assert.ok(routePaths.includes(path), `expected route ${path} to be registered`);
  }
});
