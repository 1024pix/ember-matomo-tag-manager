import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';
import MatomoTagManager from '@1024pix/ember-matomo-tag-manager/metrics-adapters/MatomoTagManager';

module('matomo-tag-manager adapter', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    const config = {
      matomoUrl: 'matomo.my.example.net',
      containerId: 'abcd123',
    };

    this.adapter = new MatomoTagManager(config);
    this.adapter.install();
  });

  hooks.afterEach(function () {
    this.adapter.uninstall();
  });

  test('#identify throw not implement yet Error', function (assert) {
    assert.throws(() => {
      this.adapter.identify({ userId: 123 });
    }, 'Not implemented yet');
  });

  test('#add calls MatomoTagManager with the right arguments', function (assert) {
    const stub = sinon.stub(window._mtm, 'push').callsFake(() => {
      return true;
    });

    const options = {
      category: 'button',
      action: 'click',
      name: 'nav buttons',
      value: 4,
    };

    this.adapter.add(options);

    assert.ok(stub.calledWith(options), 'it sends the correct arguments');
  });

  test('#trackPage throw not implement yet Error', function (assert) {
    assert.throws(() => {
      this.adapter.trackPage({
        page: '/my-overridden-page?id=1',
        title: 'my overridden page',
      });
    }, 'Not implemented yet');
  });
});
