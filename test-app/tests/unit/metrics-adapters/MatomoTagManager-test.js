import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';
import MatomoTagManager from 'ember-matomo-tag-manager/metrics-adapters/MatomoTagManager';

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

  test('#identify calls MatomoTagManager with the right arguments', function (assert) {
    const stub = sinon.stub(window._mtm, 'push').callsFake(() => {
      return true;
    });

    this.adapter.identify({ userId: 123 });

    assert.ok(
      stub.calledWith(['setUserId', 123]),
      'it sends the correct arguments',
    );
  });

  test('#trackEvent calls MatomoTagManager with the right arguments', function (assert) {
    const stub = sinon.stub(window._mtm, 'push').callsFake(() => {
      return true;
    });

    this.adapter.trackEvent({
      category: 'button',
      action: 'click',
      name: 'nav buttons',
      value: 4,
    });

    assert.ok(
      stub.calledWith(['trackEvent', 'button', 'click', 'nav buttons', 4]),
      'it sends the correct arguments',
    );
  });

  test('#trackPage calls MatomoTagManager with the right arguments', function (assert) {
    const stub = sinon.stub(window._mtm, 'push').callsFake(() => {
      return true;
    });

    this.adapter.trackPage({
      page: '/my-overridden-page?id=1',
      title: 'my overridden page',
    });

    assert.ok(
      stub.calledWith(['setCustomUrl', '/my-overridden-page?id=1']),
      'it sends the correct arguments',
    );

    assert.ok(
      stub.calledWith(['trackPageView', 'my overridden page']),
      'it sends the correct arguments',
    );
  });
});