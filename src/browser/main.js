const Chart = require('./chart');
const PageTitle = require('./page-title');
const PageIcon = require('./page-icon');
const Pings = require('./pings');
const Title = require('./title');
const User = require('./user');
const Audio_ = require('./audio');
const Controls = require('./controls');

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
