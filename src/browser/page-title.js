var lag = require('./lag');

module.exports = (user, pings) => {
    var original = document.title;
    user.on('read', () => {
        document.title = original + ' (' + lag.humanize(pings.currentLag()) + ')';
    });
};
