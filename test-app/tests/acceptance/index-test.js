import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | lifecycle', function (hooks) {
  setupApplicationTest(hooks);

  test('should add Matomo script', async function (assert) {
    await visit('/');
    assert.strictEqual(currentURL(), '/');

    const matomoScript = document.querySelector('script[id="matomo-tag-manager"]');
    assert.ok(matomoScript);
  });
});
