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
    const { matomoUrl } = this.config;

    assert(
      `[ember-matomo-tag-manager] You must pass a \`matomoUrl\` to the ${this.toString()} adapter`,
      matomoUrl,
    );

    this._injectScript(matomoUrl);
  }

  // prettier-ignore
  _injectScript(matomoUrl) {
    window._mtm = window._mtm || [];
    window._mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.src=`${matomoUrl}`; s.parentNode.insertBefore(g,s);
    g.id='matomo-tag-manager'
  }

  // eslint-disable-next-line no-unused-vars
  identify(options = {}) {
    throw new Error('Not implemented yet');
  }

  add(options = {}) {
    window._mtm.push(options);
  }

  // eslint-disable-next-line no-unused-vars
  trackPage(options = {}) {
    throw new Error('Not implemented yet');
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
