import Service from '@ember/service';
import { getOwner } from '@ember/application';
import MatomoTagManager from '../metrics-adapters/MatomoTagManager';

export default class Metrics extends Service {
  _adapter = null;

  context = {};

  appEnvironment = null;

  constructor() {
    super(...arguments);

    const owner = getOwner(this);

    const config = owner.factoryFor('config:environment').class;
    const { metrics = [] } = config;
    this.enabled = config.metrics.enabled === true;
    const { environment = 'development' } = config;

    this._options = { metrics, environment };
    if (!this.enabled) {
      return;
    }
    this._adapter = new MatomoTagManager(this._options.metrics);
    this._adapter.install();
  }

  // eslint-disable-next-line ember/classic-decorator-hooks
  initialize() {}

  identify() {
    this.invoke('identify', ...arguments);
  }

  add() {
    this.invoke('add', ...arguments);
  }

  trackPage() {
    this.invoke('trackPage', ...arguments);
  }

  invoke(methodName, options) {
    if (!this.enabled) {
      return;
    }

    this._adapter[methodName]({ ...this.context, ...options });
  }

  willDestroy() {
    if (!this.enabled) {
      return;
    }
    this._adapter.uninstall();
  }
}
