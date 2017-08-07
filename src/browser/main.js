(function _setupErrorHandling() {
  const originalOnError = window.onerror || (() => {});
  onerror = (...args) => {
    originalOnError.apply(this, args);
    const [message, , , , error] = args;
    alert((error && error.message) || error || message); // eslint-disable-line no-alert
  };
}());

const Chart = require('./chart');
const PageTitle = require('./page-title');
const PageIcon = require('./page-icon');
const Pings = require('./pings');
const Title = require('./title');
const User = require('./user');
const Audio_ = require('./audio');
const Controls = require('./controls');
const eventLoopLag = require('../event-loop-lag');
const IntervalAverage = require('../interval-average');

const user = new User();
const pings = new Pings();
new Chart(user, pings);
new PageTitle(user, pings);
new PageIcon(user, pings);
new Title(user, pings);

try {
  new Controls(Audio_.create(user, pings));
} catch (error) {
  setTimeout(() => {
    throw error;
  });
}

if (navigator.serviceWorker) navigator.serviceWorker.register('/service-worker.js');

(() => {
  const DISPLAY_INTERVAL = 1000;
  const averageLagPerSecond = new IntervalAverage({interval: DISPLAY_INTERVAL});
  eventLoopLag.monitor({
    sampleInterval: 10 /* ms */,
    callback: lag => averageLagPerSecond.add(lag),
  });
  // eslint-disable-next-line no-console
  setInterval(() => console.log(`Lag: ${averageLagPerSecond}`), DISPLAY_INTERVAL);
})();
