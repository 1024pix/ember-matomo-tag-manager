'use strict';

const moduleName = require('./package').name;

module.exports = {
  name: moduleName,

  contentFor(type, config) {
    if (type === 'head' && config.matomo && config.matomo.url) {
      const matomoUrl = config.matomo.url;
      const debugMode = config.matomo.debug ? config.matomo.debug : false;

      let startEventScript = `<!-- Matomo Tag Manager -->
        <script type="text/javascript">
        var _mtm = _mtm || [];`;

      startEventScript += debugMode ? `\n _mtm.push(['enableDebugMode']);` : '';

      startEventScript += `
        _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
        </script>`;

      let loadMatomoScript = `
        <script type="text/javascript" async defer src="${matomoUrl}"></script>
        <!-- End Matomo Tag Manager -->
        `;

      return startEventScript + loadMatomoScript;
    }
  }
};
