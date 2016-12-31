const lag = require('./lag');

module.exports = (user, pings) => {
  const original = document.title;
  user.events.on('read', () => {
    document.title = `${original} (${lag.humanize(pings.currentLag())})`;
  });
};
