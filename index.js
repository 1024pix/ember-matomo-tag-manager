'use strict';

const moduleName = require('./package').name;

module.exports = {
  name: moduleName,

  contentFor(type, config) {
    if (type === 'head' && config.matomo && config.matomo.url) {
      const matomoUrl = config.matomo.url;
      const debugMode = config.matomo.debug ? config.matomo.debug : false;

      const loadMatomoScript = `<!-- Matomo Tag Manager -->
      <script type="text/javascript" async defer src="${matomoUrl}"></script>`;

      const startEventScript = `
        <script id="start-matomo-event" type="text/javascript" src="/ember-cli-matomo-tag-manager/start-matomo-event.js" data-debug-mode="${debugMode}"></script>
        <!-- End Matomo Tag Manager -->`;

      return loadMatomoScript + startEventScript;
    }
  }
};
