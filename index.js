'use strict';

const moduleName = require('./package').name;

module.exports = {
  name: moduleName,

  contentFor(type, config) {
    if (type === 'head') {
      if (config.matomo) {
        if (!config.matomo.url) {
          console.log(`[${moduleName}] No Matomo container URL has been defined in config/environment.js`);
        }

        const matomoUrl = config.matomo.url;
        const debugMode = config.matomo.debug ? config.matomo.debug : false;

        let script = `
<!-- Matomo Tag Manager -->
<script type="text/javascript">
var _mtm = _mtm || [];`;

        if (debugMode) {
          script += `
_mtm.push(['enableDebugMode']);`;
        }

        script += `
_mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
g.type='text/javascript'; g.async=true; g.defer=true; g.src='${matomoUrl}'; s.parentNode.insertBefore(g,s);
</script>
<!-- End Matomo Tag Manager -->
`;
        return script;
      }
    }
  }
};
