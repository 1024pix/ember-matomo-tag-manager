import { assert } from '@ember/debug';

export default class MatomoTagManager {
  metrics = null;
  config = null;

  constructor(config) {
    this.config = config;
  }

  toStringExtension() {
    return 'MatomoTagManager';
  }

  install() {
    const { matomoUrl, containerId } = this.config;

    assert(
      `[ember-matomo-tag-manager] You must pass a \`matomoUrl\` and a \`containerId\` to the ${this.toString()} adapter`,
      matomoUrl && containerId,
    );

    this._injectScript(matomoUrl, containerId);
  }

  // prettier-ignore
  _injectScript(matomoUrl, containerId) {
    console.log('FOO')
    window._mtm = window._mtm || [];
    window._mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.src=`https://${matomoUrl}/js/container_${containerId}.js`; s.parentNode.insertBefore(g,s);
    g.id='matomo-tag-manager'
  }

  identify(options = {}) {
    window._mtm.push(['setUserId', options.userId]);
  }

  trackEvent(options = {}) {
    window._mtm.push([
      'trackEvent',
      options.category,
      options.action,
      options.name,
      options.value,
    ]);
  }

  trackPage(options = {}) {
    window._mtm.push(['setCustomUrl', options.page]);
    window._mtm.push(['trackPageView', options.title]);
  }

  uninstall() {
    document
      .querySelectorAll(`script[id="matomo-tag-manager"]`)
      .forEach((el) => {
        el.parentElement?.removeChild(el);
      });

    delete window._mtm;
  }
}