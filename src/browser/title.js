const lag = require('./lag');

module.exports = (user, pings) => {
    const titleEl = document.querySelector('#title');
    user.events.on('read', () => titleEl.textContent = lag.humanize(pings.currentLag()));
};
