import { assert } from '@ember/debug';

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

class MatomoTagManager {
  constructor(config) {
    _defineProperty(this, "metrics", null);
    _defineProperty(this, "config", null);
    this.config = config;
  }
  toStringExtension() {
    return 'MatomoTagManager';
  }
  install() {
    const {
      matomoUrl
    } = this.config;
    assert(`[ember-matomo-tag-manager] You must pass a \`matomoUrl\` to the ${this.toString()} adapter`, matomoUrl);
    this._injectScript(matomoUrl);
  }

  // prettier-ignore
  _injectScript(matomoUrl) {
    window._mtm = window._mtm || [];
    window._mtm.push({
      'mtm.startTime': new Date().getTime(),
      'event': 'mtm.Start'
    });
    var d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0];
    g.type = 'text/javascript';
    g.async = true;
    g.src = `${matomoUrl}`;
    s.parentNode.insertBefore(g, s);
    g.id = 'matomo-tag-manager';
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
    document.querySelectorAll(`script[id="matomo-tag-manager"]`).forEach(el => {
      el.parentElement?.removeChild(el);
    });
    delete window._mtm;
  }
}

export { MatomoTagManager as M, _defineProperty as _ };
//# sourceMappingURL=MatomoTagManager-44733d6e.js.map
