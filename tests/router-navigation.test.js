import test from 'node:test';
import assert from 'node:assert/strict';

test('router uses replaceState for non-history redirects', async () => {
  const replaceStateCalls = [];
  const pushStateCalls = [];

  const originalWindow = global.window;
  const originalHistory = global.history;
  const originalDocument = global.document;

  global.window = {
    location: { pathname: '/login', hash: '' },
    history: {
      replaceState: (...args) => replaceStateCalls.push(args),
      pushState: (...args) => pushStateCalls.push(args)
    },
    addEventListener() {},
    document: { getElementById() { return null; }, body: {} }
  };
  global.document = global.window.document;
  global.history = global.window.history;

  try {
    const { router } = await import('../src/lib/router.js');
    router.handleRoute = async () => {};

    await router.navigate('/dashboard', false);

    assert.equal(replaceStateCalls.length, 1);
    assert.equal(pushStateCalls.length, 0);
  } finally {
    if (originalWindow === undefined) {
      delete global.window;
    } else {
      global.window = originalWindow;
    }

    if (originalHistory === undefined) {
      delete global.history;
    } else {
      global.history = originalHistory;
    }

    if (originalDocument === undefined) {
      delete global.document;
    } else {
      global.document = originalDocument;
    }
  }
});
