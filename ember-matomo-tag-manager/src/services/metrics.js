import Service from '@ember/service';
import { getOwner } from '@ember/application';
import MatomoTagManager from '../metrics-adapters/MatomoTagManager';

export default class Metrics extends Service {
  _adapter = null;

  context = {};

  enabled = typeof navigator !== 'undefined' && navigator.doNotTrack !== '1';

  appEnvironment = null;

  constructor() {
    super(...arguments);

    const owner = getOwner(this);

    const config = owner.factoryFor('config:environment').class;
    const { metrics = [] } = config;
    const { environment = 'development' } = config;

    this._options = { metrics, environment };
    this.appEnvironment = environment;
    this._adapter = new MatomoTagManager(this._options.metrics);
    this._adapter.install();
  }

  identify() {
    this.invoke('identify', ...arguments);
  }

  alias() {
    this.invoke('alias', ...arguments);
  }

  trackEvent() {
    this.invoke('trackEvent', ...arguments);
  }

  trackPage() {
    this.invoke('trackPage', ...arguments);
  }

  invoke(methodName, ...options) {
    if (!this.enabled) {
      return;
    }

    this._adapter[methodName]({ ...this.context, ...options });
  }

  willDestroy() {
    this._adapter.uninstall();
  }
}
