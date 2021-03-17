var _mtm = _mtm || [];

const isDebugMode = document.getElementById('start-matomo-event').getAttribute('data-debug-mode');

if (isDebugMode) {
  _mtm.push(['enableDebugMode']);
} 

_mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});